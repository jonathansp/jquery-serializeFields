module.exports = function (grunt) {
    grunt.initConfig({
        qunit: {
            files: ['tests/index.html']
        },
        uglify: {
            my_target: {
                options: {
                    preserveComments: 'some'
                },
                files: {
                    'dist/jquery-serializeFields.min.js': ['src/jquery-serializeFields.js']
                }
            }
        },
        jshint: {
            files: ['Gruntfile.js', 'src/*.js', 'tests/*.js']
        }
    });
    grunt.registerTask('default', 'build');
    grunt.registerTask('build', ['jshint', 'qunit', 'uglify']);
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-qunit');
    grunt.loadNpmTasks('grunt-contrib-jshint');
};