module.exports = {
    entry: "./ts/app.ts",
    output: {
        path: __dirname + "/www",
        filename: "bundle.js"
    },
    module: {
        loaders: [
            { test: /\.css$/, loader: "style!css" },
            { test: /\.jsx$/, loader: "jsx-loader?insertPragma=React.DOM&harmony" },
            { test: /\.tsx?$/, loader: 'babel-loader!ts-loader' }
        ]
    },
    resolve: {
        extensions: ['', '.js', '.jsx', '.ts', '.tsx']
    },
    externals: {
        'react': 'React'
    }
};
