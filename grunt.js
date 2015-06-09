// Default task.
grunt.registerTask('default', 'lint qunit concat min');

// Travis CI task.
grunt.registerTask('travis', 'lint qunit');
