module.exports = {
    content: ['./src/**/*.{js,jsx}', './public/index.html'],
    theme: {
        extend: {
            colors: {
                primary: '#1B73E8',
                reddit_dark: {
                    DEFAULT: '#030303',
                    bright: '#040f13'
                },
                reddit_text: {
                    DEFAULT: 'rgb(215,218,220)',
                    darker: "#a9a9a9"
                }
            },
        },
    },
    plugins: [],
};

