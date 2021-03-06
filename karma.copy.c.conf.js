module.exports = function(config) {

  var path = require('path');
  var conf = require('./gulp/conf');

  var _ = require('lodash');
  var wiredep = require('wiredep');

  var pathSrcHtml = [
    path.join(conf.paths.src, '/**/*.html')
  ];


  var basePath = '../',
    report = './Cucumber-Karma-Example/reports/',
    bdd = 'bdd/',
    coverage = 'coverage/',
    libs;

  var unwatchedPattern = function(path) {
    return {pattern: path, included: true, served: true, watched: false};
  };

  var pkgMainDir = function (pkgName) {
    return path.dirname(require.resolve(pkgName));
  };

  var browserFile = function (pkgName, file) {
    return path.resolve(file ? pkgMainDir(pkgName) + file : require.resolve(pkgName));
  };

  // npm
  libs = [].concat(
    unwatchedPattern(browserFile(__dirname + '/test-config/adapter.js')),
    unwatchedPattern(browserFile('chai-as-promised')),
    unwatchedPattern(browserFile('sinon-chai', '/sinon-chai.js')),
    unwatchedPattern(browserFile('chai', '/chai.js')),
    unwatchedPattern(browserFile('sinon', '/../pkg/sinon.js'))
  );

  console.log(libs);

  function listFiles() {
    var wiredepOptions = _.extend({}, conf.wiredep, {
      dependencies: true,
      devDependencies: true
    });

    var patterns = wiredep(wiredepOptions).js
      .concat([
        // path.join(conf.paths.src, '/app/**/*.module.js'),
        // path.join(conf.paths.src, '/app/**/*.js'),
        // path.join(conf.paths.src, '/**/*.spec.js'),
        // path.join(conf.paths.src, '/**/*.mock.js'),
        path.join(conf.paths.src, '/**/*.feature'),
        path.join(conf.paths.src, '/**/*.steps.js')
      ])
      .concat(pathSrcHtml);

    var files = patterns.map(function(pattern) {
      return {
        pattern: pattern
      };
    });
    files.push({
      pattern: path.join(conf.paths.src, '/assets/**/*'),
      included: false,
      served: true,
      watched: false
    });
    return files;
  }

  var options = {

    files: [].concat(
      'node_modules/bootstrap/dist/css/bootstrap.css',
      'node_modules/es5-shim/es5-shim.js',
      'node_modules/json3/lib/json3.js',
      'node_modules/jquery/dist/jquery.js',
      'node_modules/angular/angular.js',
      'node_modules/bootstrap/dist/js/bootstrap.js',
      'node_modules/angular-resource/angular-resource.js',
      'node_modules/angular-cookies/angular-cookies.js',
      'node_modules/angular-sanitize/angular-sanitize.js',
      'node_modules/angular-route/angular-route.js',
      'node_modules/jquery-ui.1.11.1/dist/jquery-ui.js',
      'node_modules/angular-local-storage/dist/angular-local-storage.js',
      'node_modules/angular-ui-sortable/dist/sortable.js',
      'node_modules/angular-mocks/angular-mocks.js',
      'node_modules/angular-midway/angular-midway.js',
      // 'angular-midway/angular-midway.js',

      // // app
      // 'Cucumber-Karma-Example/src/app/**/*.js',
      //
      // // // api
      // // 'app/api/**/*.json',
      //
      // // html
      // 'Cucumber-Karma-Example/src/app/**/*.html',
      //
      // // css
      // 'Cucumber-Karma-Example/src/app/**/*.css',

      // images
      {pattern: 'app/img/**/*.png', included: false},

      { pattern: "Cucumber-Karma-Example/src/app/**/*.feature", included: false },
      // { pattern: "Cucumber-Karma-Example/src/app/**/*.steps.js", included: true }

      // "Cucumber-Karma-Example/src/app/**/*.steps.js"
      'Cucumber-Karma-Example/src/app/main/step_definitions/main.steps.js'
    ),


    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: basePath,

    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ["cucumber-js", 'chai-as-promised', 'chai-sinon'],

    // list of files / patterns to load in the browser
    // files: listFiles(),

    client: {
      args: ['--tags', '@todo']
    },

    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['mocha', 'bdd-json', 'html', 'hy-html',  'coverage'],

    preprocessors: {
      'app/html/**/*.html': ['ng-html2js'],
      'app/**/*.js': ['coverage']
    },

    ngHtml2JsPreprocessor: {
      stripPrefix: 'app/',
      moduleName: 'cacheTemplates'
    },

    coverageReporter: {
      dir: report + bdd + coverage,
      reporters: [
        {
          type : 'html',
          subdir : 'html'
        },
        {
          type: 'text-summary'
        }
      ]

    },

    bddJSONReporter: {
      outputFile: report + bdd + 'summary/results.json'
    },

    htmlReporter: {
      outputDir: report + bdd,
      templatePath: null, // set if you moved jasmine_template.html
      focusOnFailures: true, // reports show failures on start
      namedFiles: false, // name files instead of creating sub-directories
      pageTitle: null, // page title for reports; browser info by default
      urlFriendlyName: false, // simply replaces spaces with _ for files/dirs
      reportName: 'summary/', // report summary filename; browser info by default

      // experimental
      preserveDescribeNesting: false, // folded suites stay folded
      foldAll: true
    },

    htmlAngularReport:{
      outputFile:'angular.html',
      reportFolder: report + bdd + 'summary/',
      reportTitle:'angular report'
    },


    // web server port
    port: 9877,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['Chrome'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false,

    // Concurrency level
    // how many browser should be started simultanous
    concurrency: Infinity
  };

  config.set(options);

};
