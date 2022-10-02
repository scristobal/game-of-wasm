const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: './index.ts',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'index.js',
    },
    experiments: {
        asyncWebAssembly: true,
        syncWebAssembly: true,
        topLevelAwait: true,
    },
    mode: 'development',
    module: {
        rules: [
            {
                test: /\.ts$/,
                exclude: /(node_modules)/,
                use: {
                    loader: 'swc-loader',
                },
            },
        ],
    },
    devServer: {
        static: {
            directory: __dirname,
        },

        port: 3000,
    },
    plugins: [
        new CopyPlugin({
            patterns: ['./index.html'],
        }),
    ],
};
