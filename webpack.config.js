const path = require('path'); // Import the path module
const HtmlWebpackPlugin = require('html-webpack-plugin'); // Import HTML Webpack Plugin
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); // Import Mini CSS Extract Plugin
const autoprefixer = require('autoprefixer'); // Import Autoprefixer

module.exports = {
    entry: './src/index.js', // Entry point for your application
    output: {
        path: path.resolve(__dirname, 'dist'), // Output directory
        filename: 'bundle.js', // Output bundle filename
        clean: true, // Clean the output directory before each build
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/, // Transpile JS/JSX files
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                },
            },
            {
                test: /\.css$/, // Handle CSS files
                use: [
                    MiniCssExtractPlugin.loader, // Extract CSS into separate files
                    'css-loader', // Translates CSS into CommonJS
                    {
                        loader: 'postcss-loader', // Post-process CSS with PostCSS
                        options: {
                            postcssOptions: {
                                plugins: [
                                    autoprefixer, // Add vendor prefixes
                                ],
                            },
                        },
                    },
                ],
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i, // Handle image files
                type: 'asset/resource', // Use asset modules for images
            },
        ],
    },
    resolve: {
        extensions: ['.js', '.jsx'], // Resolve these extensions
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './public/index.html', // HTML template
        }),
        new MiniCssExtractPlugin({
            filename: '[name].css', // Output CSS filename
            chunkFilename: '[id].css', // Output chunk filename
        }),
    ],
    devServer: {
        static: {
            directory: path.join(__dirname, 'public'), // Serve static files from public directory
        },
        compress: true, // Enable gzip compression
        port: 8080, // Port for the dev server
        historyApiFallback: true, // Enable history API fallback
        hot: true, // Enable hot module replacement
    },
    mode: process.env.NODE_ENV === 'production' ? 'production' : 'development', // Set mode based on environment
    devtool: process.env.NODE_ENV === 'production' ? 'source-map' : 'eval-source-map', // Source map settings
};
