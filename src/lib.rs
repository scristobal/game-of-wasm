extern crate console_error_panic_hook;
mod utils;

use utils::log;
use wasm_bindgen::{prelude::*, JsCast};

use std::{cell::RefCell, rc::Rc};

use nom::{
    branch::alt,
    bytes::complete::tag,
    character::complete::{self, newline},
    multi::separated_list0,
    sequence::separated_pair,
    IResult,
};

#[derive(Clone, Copy, PartialEq, Eq, Hash)]
struct Coords([i32; 2]);

impl Coords {
    fn mov(&mut self, dir: &Coords) {
        self.0[0] += dir.0[0];
        self.0[1] += dir.0[1];
    }

    fn diff(&self, coord: &Coords) -> Coords {
        Coords([self.0[0] - coord.0[0], self.0[1] - coord.0[1]])
    }

    fn normalize(&mut self) {
        if self.0[0].abs() <= 1 && self.0[1].abs() <= 1 {
            *self = Coords([0, 0]);
        }
        if self.0[0].abs() > 1 {
            self.0[0] /= self.0[0].abs();
        }
        if self.0[1].abs() > 1 {
            self.0[1] /= self.0[1].abs();
        }
    }
}

struct LongRope([Coords; 10]);

impl LongRope {
    fn mov(&mut self, mov: Coords) {
        self.0[0].mov(&mov);

        for l in 0..(self.0.len() - 1) {
            let mut diff = self.0[l].diff(&self.0[l + 1]);
            diff.normalize();
            self.0[l + 1].mov(&diff);
        }
    }

    fn draw(&self, img_data: &mut Vec<u8>) {
        copy_vec_on_matrix_x4(&self.0.iter().copied().collect(), img_data);
    }
}

struct Trail(Vec<Coords>);

impl Trail {
    fn draw(&self, img_data: &mut Vec<u8>) {
        copy_vec_on_matrix_x4(&self.0.iter().copied().collect(), img_data);
    }
}

fn copy_vec_on_matrix_x4(source: &Vec<Coords>, dest: &mut Vec<u8>) {
    let size = (dest.len() as f32 / 4 as f32).sqrt() as usize;
    let lim = dest.len();

    for point in source.iter() {
        let ind = point.0[0] as usize + size * point.0[1] as usize;

        dest[4 * ind % lim as usize] = 128;
        dest[(4 * ind + 1) % lim as usize] = 128;
        dest[(4 * ind + 2) % lim as usize] = 128;

        dest[(4 * ind + 4) % lim as usize] = 128;
        dest[(4 * ind + 5) % lim as usize] = 128;
        dest[(4 * ind + 6) % lim as usize] = 128;

        dest[(4 * ind + 4 * size) % lim as usize] = 128;
        dest[(4 * ind + 1 + 4 * size) % lim as usize] = 128;
        dest[(4 * ind + 2 + 4 * size) % lim as usize] = 128;

        dest[(4 * ind + 4 + 4 * size) % lim as usize] = 128;
        dest[(4 * ind + 5 + 4 * size) % lim as usize] = 128;
        dest[(4 * ind + 6 + 4 * size) % lim as usize] = 128;
    }
}

fn up(input: &str) -> IResult<&str, Vec<Coords>> {
    let (input, (_, times)) = separated_pair(tag("U"), tag(" "), complete::i32)(input)?;
    Ok((input, (0..times).map(|_| Coords([0, 1])).collect()))
}

fn down(input: &str) -> IResult<&str, Vec<Coords>> {
    let (input, (_, times)) = separated_pair(tag("D"), tag(" "), complete::i32)(input)?;
    Ok((input, (0..times).map(|_| Coords([0, -1])).collect()))
}

fn left(input: &str) -> IResult<&str, Vec<Coords>> {
    let (input, (_, times)) = separated_pair(tag("L"), tag(" "), complete::i32)(input)?;
    Ok((input, (0..times).map(|_| Coords([-1, 0])).collect()))
}

fn right(input: &str) -> IResult<&str, Vec<Coords>> {
    let (input, (_, times)) = separated_pair(tag("R"), tag(" "), complete::i32)(input)?;
    Ok((input, (0..times).map(|_| Coords([1, 0])).collect()))
}

fn moves(input: &str) -> IResult<&str, Vec<Coords>> {
    let (input, moves) = separated_list0(newline, alt((up, down, right, left)))(input)?;
    Ok((input, moves.into_iter().flatten().collect()))
}

#[wasm_bindgen(start)]
pub fn run() -> Result<(), JsValue> {
    let window = web_sys::window().expect("no global `window` exists");
    let document = window.document().expect("should have a document on window");

    let canvas = document
        .get_element_by_id("rope-canvas")
        .expect("canvas not found")
        .dyn_into::<web_sys::HtmlCanvasElement>()?;

    let context = canvas
        .get_context("2d")
        .unwrap()
        .unwrap()
        .dyn_into::<web_sys::CanvasRenderingContext2d>()
        .unwrap();

    fn request_animation_frame(f: &Closure<dyn FnMut()>) {
        web_sys::window()
            .expect("no global window")
            .request_animation_frame(f.as_ref().unchecked_ref())
            .expect("should register `requestAnimationFrame` OK");
    }

    let f = Rc::new(RefCell::new(Option::None));
    let g = f.clone();

    let input = document
        .get_element_by_id("input-moves")
        .expect("textarea not found")
        .dyn_into::<web_sys::HtmlTextAreaElement>()?;

    let input = input.value();

    let start_button = document
        .get_element_by_id("start-button")
        .expect("button not found")
        .dyn_into::<web_sys::HtmlButtonElement>()?;

    let start = Closure::wrap(Box::new(move || {
        log!("pressed");
    }) as Box<dyn FnMut()>);

    start_button.set_onclick(Some(start.as_ref().unchecked_ref()));

    start.forget();

    let (_, mut moves) = moves(&input).unwrap();

    let size = 512 as usize;

    let mut rope = LongRope([Coords([(size / 2) as i32, (size / 2) as i32]); 10]);
    let mut trail = Trail(Vec::<Coords>::new());

    *g.borrow_mut() = Some(Closure::wrap(Box::new(move || {
        let next_move = moves.pop().unwrap();

        rope.mov(next_move);

        trail.0.push(rope.0[9]);

        //let mut data = (0..(size * size)).map(|_| 255).collect::<Vec<u8>>();

        let mut data = Vec::<u8>::new();

        for _ in 0..(size * size) {
            data.push(255);
            data.push(255);
            data.push(255);
            data.push(255);
        }

        rope.draw(&mut data);

        trail.draw(&mut data);

        let img = web_sys::ImageData::new_with_u8_clamped_array_and_sh(
            wasm_bindgen::Clamped(&mut data),
            size as u32,
            size as u32,
        )
        .expect("failed to create image from data");

        context
            .put_image_data(&img, 0.into(), 0.into())
            .expect("failed to update canvas");

        // Schedule ourself for another requestAnimationFrame callback.
        request_animation_frame(f.borrow().as_ref().unwrap());
    }) as Box<dyn FnMut()>));

    request_animation_frame(g.borrow().as_ref().unwrap());
    Ok(())
}
