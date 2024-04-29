# @fluentui/public-docsite-setup

This is an **internal use only** package for sharing bootstrapping and version switching code between different major versions of Fluent/Fabric on https://developer.microsoft.com/fluentui, as well as the local and PR deploy versions of the site. It's consumed from npm by `@uifabric/fabric-website` in the `7.0`, `6.0`, and `5.0` branches.

## Usage

The most important file in this package is `src/loadSite.ts`, which handles various bootstrapping tasks for the site. It's intended to be used in your site version via a webpack config as follows.

1. Ensure `webpack` 4 or 5 and `copy-webpack-plugin` >= 4 are installed. (These are not listed in `peerDependencies` because they're only required when using the `getLoadSiteConfig` utility, not the types.)

1. In your webpack config file(s), add the result of `getLoadSiteConfig()` to your array of exported configs:

   ```js
   const getLoadSiteConfig = require('@fluentui/public-docsite-setup/scripts/getLoadSiteConfig');

   module.exports = [
     getLoadSiteConfig({
       libraryPath: 'path/to/@fluentui/react', // or 'office-ui-fabric-react' if appropriate
       outDir: path.join(__dirname, 'dist'), // full path to output directory
       isProduction: isProductionArg, // whether to do a minified build (filename is the same regardless)
     }),
     ...yourOtherConfigs,
   ];
   ```

This should give you two files:

- `[outDir]/index.html`: has some basic styling and a reference to `loadSite.js`
- `[outDir]/loadSite.js` does a few setup tasks:
  - Load the rest of the site. For local or PR deploy builds, this will load the locally deployed files starting with `[outDir]/[bundleName].js`. For the real site, this uses the manifest file (prod or df) for the appropriate major version: latest by default, or a version specified with `?fabricVer`.
  - Define `window.__versionSwitcherDefinition` with metadata for switching between available major versions of the site.
  - Define `window.MonacoConfig` used by the example editor.
