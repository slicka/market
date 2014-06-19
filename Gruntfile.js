module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat: {
      options: {
        separator: ';'
      },
      dist: {
        src: ['js/**/*.js'],
        dest: 'dist/<%= pkg.name %>.js'
      }
    },
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
      },
      dist: {
        files: {
          'dist/<%= pkg.name %>.min.js': ['<%= concat.dist.dest %>']
        }
      }
    },
    karma: {
      options: {
        configFile: 'karma.conf.js'
      },
      ci: {
        singleRun: true
      }
    },
    jshint: {
      files: ['Gruntfile.js', 'js/**/*.js', 'test/**/*.js'],
      options: {
        // options here to override JSHint defaults
        globals: {
          jQuery: true,
          console: true,
          module: true,
          document: true
        }
      }
    },
    watch: {
      files: ['<%= jshint.files %>'],
      tasks: ['jshint', 'qunit']
    }

    // Commenting this out because I got ahead of myself and
    // I don't know what I'm dooooiiiiinggggg
    // sass: {
    //   tmp: {
    //     options: {
    //       compass: true,
    //       style: 'compressed'
    //     },
    //     files: {
    //       '.tmp/css/style.css': 'css/style.scss'
    //     }
    //   }
    // },
    // jst: {
    //   compile: {
    //     files: {
    //       '.tmp/js/templates.js': ['js/templates/*.html']
    //     }
    //   }
    // }
    
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-karma');
  grunt.loadNpmTasks('grunt-contrib-jasmine');
  //grunt.loadNpmTasks('grunt-contrib-sass');
  //grunt.loadNpmTasks('grunt-contrib-jst');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');

  grunt.registerTask('test', ['jshint', 'karma:ci']);

  grunt.registerTask('default', ['jshint', 'karma', 'concat', 'uglify']);

};
