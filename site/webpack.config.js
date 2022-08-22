const path = require('path');
module.exports = {
    entry: './index.ts',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'index.js',
    },
    experiments: {
        asyncWebAssembly: true,
        syncWebAssembly: true,
    },
    mode: 'development',
    module: {
        rules: [
            {
                test: /\.m?js$/,
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
};
