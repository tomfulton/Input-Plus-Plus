module.exports = function (grunt) {
  require('load-grunt-tasks')(grunt);
  require('time-grunt')(grunt);

  //cant load this with require
  grunt.loadNpmTasks('grunt-contrib-jshint');
  

  if (grunt.option('target') && !grunt.file.isDir(grunt.option('target'))) {
    grunt.fail.warn('The --target option specified is not a valid directory');
  }
    
    
  var pkg = grunt.file.readJSON('package.json');
  var version = process.env.APPVEYOR_BUILD_VERSION || pkg.version;
  
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    version: version,
    dest: grunt.option('target') || 'build/dist',
    basePath: 'App_Plugins/<%= pkg.name %>',

    concat: {
      dist: {
        src: [
           'app/scripts/controllers/iconpicker.controller.js',
		       'app/scripts/controllers/textbox.config.controller.js',
		       'app/scripts/controllers/textbox.controller.js'
        ],
        dest: '<%= dest %>/<%= basePath %>/js/epiphany.input-plus-plus.js',
        nonull: true
      }
    },

    sass: {
      dist: {
        options: {
          paths: ['app/styles'],
        },
        files: {
          '<%= dest %>/<%= basePath %>/css/epiphany.input-plus-plus.css': 'app/styles/epiphany.input-plus-plus.scss',
        }
      }
    },

    watch: {
      options: {
        atBegin: true
      },
      js: {
        files: ['app/scripts/**/*.js'],
        tasks: ['concat:dist']
      },

      html: {
        files: ['app/views/**/*.html'],
        tasks: ['copy:views']
      },

      config: {
        files: ['config/package.manifest'],
        tasks: ['copy:config']
      }
    },

    copy: {
      config: {
        src: 'config/package.manifest',
        dest: '<%= dest %>/<%= basePath %>/package.manifest',
      },

      views: {
        expand: true,
        cwd: 'app/views/',
        src: '**',
        dest: '<%= dest %>/<%= basePath %>/views/'
      },

      nuget: {
        files: [
          {
            cwd: '<%= dest %>',
            src: ['**/*', '!bin', '!bin/*'],
            dest: 'build/tmp/nuget/content',
            expand: true
          },
          {
            cwd: '<%= dest %>/bin',
            src: ['*.dll'],
            dest: 'build/tmp/nuget/lib/net40',
            expand: true
          }
        ]
      },

      umbraco: {
        expand: true,
        cwd: '<%= dest %>/',
        src: '**',
        dest: 'build/tmp/umbraco/'
      },

      dll: {
        cwd: 'app/Epiphany.InputPlusPlus/bin/Release/',
        src: 'Epiphany.SeoMetadata.dll',
        dest: '<%= dest %>/bin/',
        expand: true
      },
    },

    template: {
      nuspec: {
        options: {
          data: {
            name:        '<%= pkg.name %>',
            version:     '<%= version %>',
            author:      '<%= pkg.author.name %>',
            description: '<%= pkg.description %>'
          }
        },
        files: {
          'build/tmp/nuget/<%= pkg.name %>.nuspec': 'config/package.nuspec'
        }
      }
    },

    mkdir: {
      pkg: {
        options: {
          create: ['build/pkg/nuget', 'build/pkg/umbraco']
        },
      },
    },

    nugetpack: {
      dist: {
        src: 'build/tmp/nuget/<%= pkg.name %>.nuspec',
        dest: 'build/pkg/nuget/'
      }
    },

    umbracoPackage: {
      dist: {
        src: 'build/tmp/umbraco',
        dest: 'build/pkg/umbraco',
        options: {
          name:        '<%= pkg.name %>',
          version:     '<%= pkg.version %>',
          url:         '<%= pkg.repository.url %>',
          license:     '<%= pkg.license %>',
          licenseUrl:  '<%= pkg.licenseUrl %>',
          author:      '<%= pkg.author.name %>',
          authorUrl:   '<%= pkg.author.url %>',
          readme:      'Check out github.com/epiphanysearch/Input-Plus-Plus for full documentation'
        }
      }
    },

    clean: {
      tmp: 'build/tmp',
      dist: 'build/dist',
    },
    jshint: {
      dev: {
        files: {
          src: ['app/scripts/**/*.js']
        },
        options: {
          curly: true,
          eqeqeq: true,
          immed: true,
          latedef: true,
          newcap: true,
          noarg: true,
          sub: true,
          boss: true,
          eqnull: true,
          //NOTE: we need to use eval sometimes so ignore it
          evil: true,
          //NOTE: we need to check for strings such as "javascript:" so don't throw errors regarding those
          scripturl: true,
          //NOTE: we ignore tabs vs spaces because enforcing that causes lots of errors depending on the text editor being used
          smarttabs: true,
          globals: {}
        }
      }
    },

    assemblyinfo: {
      options: {
        files: ['app/Epiphany.InputPlusPlus/Epiphany.InputPlusPlus.csproj'],
        filename: 'AssemblyInfo.cs',
        info: {
          version: '<%= (pkg.version.indexOf("-") > 0 ? pkg.version.substring(0, pkgMeta.version.indexOf("-")) : pkg.version) %>', 
          fileVersion: '<%= pkg.version %>'
        }
      }
    },

    msbuild: {
      options: {
        stdout: true,
        verbosity: 'quiet',
        maxCpuCount: 4,
      version: 4.0,
        buildParameters: {
          WarningLevel: 2,
          NoWarn: 1607
        }
      },
      dist: {
        src: ['app/Epiphany.InputPlusPlus/Epiphany.InputPlusPlus.csproj'],
        options: {
          projectConfiguration: 'Release',
          targets: ['Clean', 'Rebuild'],
        }
      }
    },

    /*
      See https://github.com/vojtajina/grunt-bump

      For bumping a version, best to do the following
      grunt bump-only:minor
      grunt assemblyinfo
      grunt bump-commit
    */

    bump: {
      options: {
        files: ['package.json'],
        updateConfigs: [],
        commit: true,
        commitMessage: 'Release v%VERSION%',
        commitFiles: ['package.json', 'app/Epiphany.InputPlusPlus/Properties/AssemblyInfo.cs'],
        createTag: true,
        tagName: 'v%VERSION%',
        tagMessage: 'Version %VERSION%',
        push: true,
        pushTo: 'origin',
        gitDescribeOptions: '--tags --always --abbrev=1 --dirty=-d',
        globalReplace: false,
        prereleaseName: 'pre',
        regExp: false
      }
    }

  });

  grunt.registerTask('default', ['concat', 'sass', 'assemblyinfo', 'msbuild', 'copy:config', 'copy:views', 'copy:dll']);
  grunt.registerTask('nuget', ['clean', 'default', 'copy:nuget', 'template:nuspec', 'mkdir:pkg', 'nugetpack']);
  grunt.registerTask('package', ['clean', 'default', 'copy:umbraco', 'mkdir:pkg', 'umbracoPackage']);
};
