module.exports = {
    plugins: {
        autoprefixer: {
            overrideBrowserslist: [
                "last 2 versions",
                "Safari >= 10",
                "iOS >= 10",
                "not ie <= 10",
                "> 1%"
            ]
        }
    }
};