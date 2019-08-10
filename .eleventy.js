module.exports = function(config) {
    config.addFilter('ruDate', function(value) {
        return value.toLocaleString('ru', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        }).replace(' г.', '');
    });

    config.addFilter('enDate', function(value) {
        return value.toLocaleString('en', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    });

    config.addFilter('htmlmin', function(value) {
        let htmlmin = require('html-minifier');
        return htmlmin.minify(
            value, {
                removeComments: true,
                collapseWhitespace: true
            }
        );
    });

    return {
        dir: {
            input: 'src',
            output: 'dist',
            includes: "includes",
            layouts: "layouts"
        },
        dataTemplateEngine: 'njk',
        markdownTemplateEngine: 'njk',
        htmlTemplateEngine: 'njk'
    };
};
