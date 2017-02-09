exports.config = {

  // =================
  // Service Providers
  // =================
  // WebdriverIO supports Sauce Labs, Browserstack and Testing Bot (other cloud providers
  // should work too though). These services define specific user and key (or access key)
  // values you need to put in here in order to connect to these services.
  //
  services: ['browserstack'],
  user: process.env.BROWSERSTACK_USER,
  key: process.env.BROWSERSTACK_ACCESS_KEY,
  //
  // ==================
  // Specify Test Files
  // ==================
  // Define which test specs should run. The pattern is relative to the directory
  // from which `wdio` was called. Notice that, if you are calling `wdio` from an
  // NPM script (see https://docs.npmjs.com/cli/run-script) then the current working
  // directory is where your package.json resides, so `wdio` will be called from there.
  //
  specs: [
    'stories/**/*.tests.js'
  ],
  maxInstances: 10,
  //
  // If you have trouble getting all important capabilities together, check out the
  // Sauce Labs platform configurator - a great tool to configure your capabilities:
  // https://docs.saucelabs.com/reference/platforms-configurator
  //
  capabilities: [{
    browserName: 'chrome',
    platform: 'mac',
    'browserstack.local': true,
    'browserstack.localIdentifier': process.env.BROWSERSTACK_LOCAL_IDENTIFIER
  }],
  //
  // When enabled opens a debug port for node-inspector and pauses execution
  // on `debugger` statements. The node-inspector can be attached with:
  // `node-inspector --debug-port 5859 --no-preload`
  // When debugging it is also recommended to change the timeout interval of
  // test runner (eg. jasmineNodeOpts.defaultTimeoutInterval) to a very high
  // value and setting maxInstances to 1.
  debug: false,
  //
  // Additional list node arguments to use when starting child processes
  execArgv: null,
  //
  //
  // ===================
  // Test Configurations
  // ===================
  // Define all options that are relevant for the WebdriverIO instance here
  //
  // Per default WebdriverIO commands getting executed in a synchronous way using
  // the wdio-sync package. If you still want to run your tests in an async way
  // using promises you can set the sync command to false.
  sync: true,
  //
  // Level of logging verbosity: silent | verbose | command | data | result | error
  logLevel: 'silent',
  //
  // Enables colors for log output.
  coloredLogs: true,
  //
  // If you only want to run your tests until a specific amount of tests have failed use
  // bail (default is 0 - don't bail, run all tests).
  bail: 0,
  //
  // Saves a screenshot to a given path if a command fails.
  screenshotPath: 'shots',
  //
  // Set a base URL in order to shorten url command calls. If your url parameter starts
  //  with "/", the base url gets prepended.
  baseUrl: 'http://localhost:9001',
  //
  // Default timeout for all waitForXXX commands.
  waitforTimeout: 1000,
  //
  // Initialize the browser instance with a WebdriverIO plugin. The object should have the
  // plugin name as key and the desired plugin options as property. Make sure you have
  // the plugin installed before running any tests. The following plugins are currently
  // available:
  // WebdriverCSS: https://github.com/webdriverio/webdrivercss
  // WebdriverRTC: https://github.com/webdriverio/webdriverrtc
  // Browserevent: https://github.com/webdriverio/browserevent
  plugins: {
    // webdrivercss: {
    //     screenshotRoot: 'my-shots',
    //     failedComparisonsRoot: 'diffs',
    //     misMatchTolerance: 0.05,
    //     screenWidth: [320,480,640,1024]
    // },
    // webdriverrtc: {},
    // browserevent: {}
  },
  //
  // Framework you want to run your specs with.
  // The following are supported: mocha, jasmine and cucumber
  // see also: http://webdriver.io/guide/testrunner/frameworks.html
  //
  // Make sure you have the wdio adapter package for the specific framework installed before running any tests.
  framework: 'mocha',
  //
  // Test reporter for stdout.
  // The only one supported by default is 'dot'
  // see also: http://webdriver.io/guide/testrunner/reporters.html
  reporters: ['dot'],
  //
  // Some reporter require additional information which should get defined here
  reporterOptions: {
    //
    // If you are using the "xunit" reporter you should define the directory where
    // WebdriverIO should save all unit reports.
    outputDir: './'
  },
  //
  // Options to be passed to Mocha.
  // See the full list at http://mochajs.org/
  mochaOpts: {
    ui: 'bdd'
  },
  //
  // Options to be passed to Jasmine.
  // See also: https://github.com/webdriverio/wdio-jasmine-framework#jasminenodeopts-options
  jasmineNodeOpts: {
    //
    // Jasmine default timeout
    defaultTimeoutInterval: 5000,
    //
    // The Jasmine framework allows it to intercept each assertion in order to log the state of the application
    // or website depending on the result. For example it is pretty handy to take a screenshot every time
    // an assertion fails.
    expectationResultHandler: function (passed, assertion) {
      // do something
    },
    //
    // Make use of Jasmine-specific grep functionality
    grep: null,
    invertGrep: null
  },
  //
  // If you are using Cucumber you need to specify where your step definitions are located.
  // See also: https://github.com/webdriverio/wdio-cucumber-framework#cucumberopts-options
  cucumberOpts: {
    require: [],        // <string[]> (file/dir) require files before executing features
    backtrace: false,   // <boolean> show full backtrace for errors
    compiler: [],       // <string[]> ("extension:module") require files with the given EXTENSION after requiring MODULE (repeatable)
    dryRun: false,      // <boolean> invoke formatters without executing steps
    failFast: false,    // <boolean> abort the run on first failure
    format: ['pretty'], // <string[]> (type[:path]) specify the output format, optionally supply PATH to redirect formatter output (repeatable)
    colors: true,       // <boolean> disable colors in formatter output
    snippets: true,     // <boolean> hide step definition snippets for pending steps
    source: true,       // <boolean> hide source URIs
    profile: [],        // <string[]> (name) specify the profile to use
    strict: false,      // <boolean> fail if there are any undefined or pending steps
    tags: [],           // <string[]> (expression) only execute the features or scenarios with tags matching the expression
    timeout: 20000,      // <number> timeout for step definitions
    ignoreUndefinedDefinitions: false, // <boolean> Enable this config to treat undefined definitions as warnings.
  },
  //
  // =====
  // Hooks
  // =====
  // WebdriverIO provides a several hooks you can use to interfere the test process in order to enhance
  // it and build services around it. You can either apply a single function to it or an array of
  // methods. If one of them returns with a promise, WebdriverIO will wait until that promise got
  // resolved to continue.
  //
  // Gets executed once before all workers get launched.
  onPrepare: function (config, capabilities) {
  },
  //
  // Gets executed just before initialising the webdriver session and test framework. It allows you
  // to manipulate configurations depending on the capability or spec.
  beforeSession: function (config, capabilities, specs) {
  },
  //
  // Gets executed before test execution begins. At this point you can access to all global
  // variables like `browser`. It is the perfect place to define custom commands.
  before: function (capabilities, specs) {
  },
  //
  // Hook that gets executed before the suite starts
  beforeSuite: function (suite) {
  },
  //
  // Hook that gets executed _before_ a hook within the suite starts (e.g. runs before calling
  // beforeEach in Mocha)
  beforeHook: function () {
  },
  //
  // Hook that gets executed _after_ a hook within the suite starts (e.g. runs after calling
  // afterEach in Mocha)
  afterHook: function () {
  },
  //
  // Function to be executed before a test (in Mocha/Jasmine) or a step (in Cucumber) starts.
  beforeTest: function (test) {
  },
  //
  // Runs before a WebdriverIO command gets executed.
  beforeCommand: function (commandName, args) {
  },
  //
  // Runs after a WebdriverIO command gets executed
  afterCommand: function (commandName, args, result, error) {
  },
  //
  // Function to be executed after a test (in Mocha/Jasmine) or a step (in Cucumber) starts.
  afterTest: function (test) {
  },
  //
  // Hook that gets executed after the suite has ended
  afterSuite: function (suite) {
  },
  //
  // Gets executed after all tests are done. You still have access to all global variables from
  // the test.
  after: function (result, capabilities, specs) {
  },
  //
  // Gets executed right after terminating the webdriver session.
  afterSession: function (config, capabilities, specs) {
  },
  //
  // Gets executed after all workers got shut down and the process is about to exit. It is not
  // possible to defer the end of the process using a promise.
  onComplete: function (exitCode) {
  },
  //
  // Cucumber specific hooks
  beforeFeature: function (feature) {
  },
  beforeScenario: function (scenario) {
  },
  beforeStep: function (step) {
  },
  afterStep: function (stepResult) {
  },
  afterScenario: function (scenario) {
  },
  afterFeature: function (feature) {
  }
};