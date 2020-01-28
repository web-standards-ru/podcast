module.exports = function(config) {
    config.addFilter('length', function(path) {
        const fs = require('fs');
        const stats = fs.statSync(path);
        return stats.size;
    });

    function getDuration(path) {
        const music = require('music-metadata');

        return music.parseFile(path)
            .then(metadata => {
                const duration = parseFloat(metadata.format.duration);
                const date = new Date(null).setSeconds(Math.ceil(duration));

                return new Intl.DateTimeFormat('en-US', {
                    hour: 'numeric',
                    minute: 'numeric',
                    second: 'numeric',
                    hour12: false,
                    timeZone: 'UTC',
                }).format(date);
            })
            .catch(error => {
                console.log(error);
            });
    }

    config.addNunjucksAsyncFilter('duration', async function (path, callback) {
        const duration = await getDuration(path);

        callback(null, duration);
    });

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

    config.addFilter('markdown', function(value) {
        let markdown = require('markdown-it')({
            html: true
        });
        return markdown.render(value);
    });

    config.addTransform('xmlmin', function(content, outputPath) {
        if(outputPath && outputPath.endsWith('.xml')) {
            let prettydata = require('pretty-data');
            return prettydata.pd.xmlmin(content);
        }
        return content;
    });

    return {
        dir: {
            input: 'src',
            output: 'dist',
            includes: 'includes',
            data: 'data'
        },
        dataTemplateEngine: 'njk',
        markdownTemplateEngine: 'njk',
        htmlTemplateEngine: 'njk'
    };
};
