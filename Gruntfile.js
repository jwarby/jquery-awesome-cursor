'use strict';

module.exports = function (grunt) {
  // Load all grunt tasks
  require('load-grunt-tasks')(grunt);
  // Show elapsed time at the end
  require('time-grunt')(grunt);

  // Project configuration.
  grunt.initConfig({
    // Metadata.
    pkg: grunt.file.readJSON('_unified_manifest.json'),
    banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
      '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
      '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
      '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= ' +
        'pkg.author.name %>;' +
      ' Licensed MIT */\n',
    // Task configuration.
    clean: {
      files: ['dist']
    },
    concat: {
      options: {
        banner: '<%= banner %>',
        stripBanners: true
      },
      dist: {
        src: ['src/<%= pkg.name.replace(\'-\', \'.\') %>.js'],
        dest: 'dist/<%= pkg.name.replace(\'-\', \'.\') %>.js'
      }
    },
    uglify: {
      options: {
        banner: '<%= banner %>'
      },
      dist: {
        src: '<%= concat.dist.dest %>',
        dest: 'dist/<%= pkg.name.replace(\'-\', \'.\') %>.min.js'
      }
    },
    karma: {
      options: {
        browsers: ['Chrome'], // @todo , 'Firefox'],
        configFile: 'karma.conf.js',
        singleRun: true
      },
      src: {
      },
      dist: {

        /* Override files list.  Should be able to extend list from Karma config
         * but it's not working... @todo
         */
        files: [
          {
            src: ['bower_components/fontawesome/fonts/*.*'],
            served: true,
            included: false
          },
          {
            src: ['test/awesome-cursor-test-font/fonts/*.*'],
            served: true,
            included: false
          },
          { src: ['bower_components/fontawesome/**/*.css'] },
          { src: ['test/awesome-cursor-test-font/style.css'] },
          { src: ['test/**/*.png'], served: true, included: false },
          { src: ['bower_components/jquery/dist/jquery.js'] },
          { src: ['dist/*.min.js'] },
          { src: ['test/*.js'] }
        ]
      },
      watch: {
        singleRun: false
      }
    },
    jshint: {
      options: {
        reporter: require('jshint-stylish')
      },
      gruntfile: {
        options: {
          jshintrc: '.jshintrc'
        },
        src: 'Gruntfile.js'
      },
      src: {
        options: {
          jshintrc: 'src/.jshintrc'
        },
        src: ['src/**/*.js']
      },
      test: {
        options: {
          jshintrc: 'test/.jshintrc'
        },
        src: ['test/**/*.js']
      }
    },
    watch: {
      gruntfile: {
        files: '<%= jshint.gruntfile.src %>',
        tasks: ['jshint:gruntfile']
      },
      src: {
        files: '<%= jshint.src.src %>',
        tasks: ['jshint:src', 'qunit']
      },
      test: {
        files: '<%= jshint.test.src %>',
        tasks: ['jshint:test', 'qunit']
      }
    },
    unifiedmanifest: {
      all: {
        files: {
          './': '_unified_manifest.json'
        }
      }
    }
  });

  // Default task.
  grunt.registerTask('default', [
    'jshint', 'unifiedmanifest', 'clean', 'concat', 'uglify',  'karma:src',
    'karma:dist'
  ]);

  grunt.registerTask('test', ['karma:src']);
};
