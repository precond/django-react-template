const webpackConfig = require('./webpack.config');

module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        env: {
            prod: {
                NODE_ENV: 'production'
            }
        },

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

        uglify: {
            app: {
                files: {'static/js/app.bundle.js': ['static/js/app.bundle.js']}
            }
        },

        cssmin: {
            combine: {
                files: {
                    'static/css/app.bundle.css': ['static/css/app.bundle.css']
                }
            }
        },

        eslint: {
            all: {
                src: ['frontend/src/js/**/*.js', 'frontend/src/js/**/*.jsx'],
            },
            jenkins: {
                src: ['frontend/src/js/**/*.js', 'frontend/src/js/**/*.jsx'],
                options: {
                    format: 'checkstyle',
                    outputFile: 'reports/eslint.xml'
                },
            },
        },

        webpack: {
            options: {
                stats: !process.env.NODE_ENV || process.env.NODE_ENV === 'development'
            },
            prod: webpackConfig,
            dev: webpackConfig
        }
    });

    // Load plugins here.
    grunt.loadNpmTasks('grunt-env');
    grunt.loadNpmTasks('grunt-eslint');
    grunt.loadNpmTasks('grunt-exec');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-webpack');

    // Register tasks here.
    grunt.registerTask('default', ['exec:collectstatic', 'webpack:dev']);
    grunt.registerTask('dist', ['env:prod', 'clean:staticdir', 'exec:collectstatic', 'webpack:prod', 'uglify', 'cssmin']);
    grunt.registerTask('lint', ['exec:flake8', 'eslint:all']);
};
