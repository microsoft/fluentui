// A packages cache that makes sure that we don't inject the same packageName twice in the same bundle -
// this cache is local to the module closure inside this bundle
const packagesCache: { [name: string]: string } = {};

// Cache access to window to avoid IE11 memory leak.
let _win: Window | undefined = undefined;

try {
  _win = window;
} catch (e) {
  /* no-op */
}

export function setVersion(packageName: string, packageVersion: string): void {
  if (typeof _win !== 'undefined') {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const packages = ((_win as any).__packages__ = (_win as any).__packages__ || {});

    // We allow either the global packages or local packages caches to invalidate so testing can
    // just clear the global to set this state
    if (!packages[packageName] || !packagesCache[packageName]) {
      packagesCache[packageName] = packageVersion;
      const versions = (packages[packageName] = packages[packageName] || []);
      versions.push(packageVersion);
    }
  }
}
