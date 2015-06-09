module.exports = function(grunt) {
    // Call these here instead, where the variable grunt is defined.
    // grunt.loadNpmTasks('grunt-contrib-compass');

    grunt.initConfig({
        qunit: {
            files: ['tests/index.html']
        },
        uglify: {
            my_target:{
                options:{
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
    // Default task.
    grunt.registerTask('default', 'build' );

    // Travis CI task.
    grunt.registerTask('travis', ['qunit', 'jshint']);

    // Build task.
    grunt.registerTask('build', ['jshint', 'qunit', 'uglify']);

    // Load Plugins
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-qunit');
    grunt.loadNpmTasks('grunt-contrib-jshint');

};
