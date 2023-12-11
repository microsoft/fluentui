
export const config = {
  "file": "./dist/esm/button/button.bench.js",
  "size": "m",
  "test": "mount",
  "browsers": [
    "chrome"
  ],
  "numRuns": 25,
  "imports": {
    "@tensile-perf/tools": "/node_modules/@tensile-perf/tools/lib/index.js",
    "afterframe": "/node_modules/afterframe/dist/afterframe.module.js",
    "random-seedable": "/node_modules/random-seedable/src/index.js",
    "@tensile-perf/web-components": "/node_modules/@tensile-perf/web-components/lib/index.js",
    "@microsoft/fast-element": "/node_modules/@microsoft/fast-element/dist/fast-element.min.js",
    "@microsoft/fast-element/utilities.js": "/node_modules/@microsoft/fast-element/dist/esm/utilities.js",
    "@microsoft/fast-foundation": "/node_modules/@microsoft/fast-foundation/dist/esm/index.js",
    "@microsoft/fast-foundation/utilities.js": "/node_modules/@microsoft/fast-foundation/dist/esm/utilities/index.js",
    "@microsoft/fast-web-utilities": "/node_modules/@microsoft/fast-web-utilities/dist/index.js",
    "@fluentui/tokens": "/tensile-assets/benchmark-dependencies/tokens.js",
    "@fluentui/web-components": "/node_modules/@fluentui/web-components/dist/esm/index.js",
    "@floating-ui/dom": "/node_modules/@floating-ui/dom/dist/floating-ui.dom.esm.js",
    "@floating-ui/core": "/node_modules/@floating-ui/core/dist/floating-ui.core.esm.js",
    "exenv-es6": "/node_modules/exenv-es6/dist/index.js",
    "tabbable": "/node_modules/tabbable/dist/index.esm.js",
    "tslib": "/node_modules/tslib/tslib.es6.js"
  },
  "scripts": [],
  "cssSheets": [],
  "metrics": {
    "memory": false,
    "domSize": true
  },
  "parameters": {
    "seed": 4212021,
    "minBreadth": 4,
    "maxBreadth": 20,
    "minDepth": 4,
    "maxDepth": 20,
    "targetSize": 1000
  },
  "fixtureFileName": "fixture__m.js",
  "testFile": ".//esm/button/button.bench.js"
};
