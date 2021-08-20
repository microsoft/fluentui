function importAll(r: __WebpackModuleApi.RequireContext): void {
  r.keys().forEach(r);
}

// Explicitly add to browser test
importAll(require.context('../', true, /\.spec\.js$/));

// In order to build under isolated modules, files without imports must at least export an empty namespace.
export {};
