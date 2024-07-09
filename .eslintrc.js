const base = require("@mendix/pluggable-widgets-tools/configs/eslint.ts.base.json");

module.exports = {
    ...base,
    module: {
        rules: [
            {
                test: /\.(mp3|wav)$/,
                use: {
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]',
                        outputPath: 'assets/audio/',
                    },
                },
            },
            // Other rules...
        ],
    },
};
