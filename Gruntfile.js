const webpackDevConfig = require('./webpack.development.config');
const webpackProdConfig = require('./webpack.config');

module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        exec: {
            collectstatic: {
                command: 'src/manage.py collectstatic --noinput'
            },
            flake8: {
                command: 'flake8 src/template'
            }
        },

        clean: {
            staticdir: ['static']
        },

        eslint: {
            all: {
                src: ['frontend/src/js/**/*.js', 'frontend/src/js/**/*.jsx']
            },
            jenkins: {
                src: ['frontend/src/js/**/*.js', 'frontend/src/js/**/*.jsx'],
                options: {
                    format: 'checkstyle',
                    outputFile: 'reports/eslint.xml'
                }
            }
        },

        webpack: {
            options: {
                stats: !process.env.NODE_ENV || process.env.NODE_ENV === 'development'
            },
            prod: webpackProdConfig,
            dev: webpackDevConfig
        }
    });

    // Load plugins here.
    grunt.loadNpmTasks('grunt-eslint');
    grunt.loadNpmTasks('grunt-exec');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-webpack');

    // Register tasks here.
    grunt.registerTask('default', ['exec:collectstatic', 'webpack:dev']);
    grunt.registerTask('dist', ['clean:staticdir', 'exec:collectstatic', 'webpack:prod']);
    grunt.registerTask('lint', ['exec:flake8', 'eslint:all']);
};
