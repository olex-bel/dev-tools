const path = require('path');

module.exports = {
    mode: 'production',
    entry: {
        jsonlint: './src/jsonlint.js',
        xmlformatter: './src/xmlformatter.js',
    },
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'public/javascripts/dist'),
    },
};