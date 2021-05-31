module.exports = {
    entry: "./src/js/app.js",
    output: {
        filename: 'app.js'
    },
    mode: "production",
    module: {
        rules: [{
            test: /\.js$/,
            loader: 'babel-loader',
            exclude: '/node_modules/'
        }]
    }
}