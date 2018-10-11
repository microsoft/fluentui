// A packages cache that makes sure that we don't inject the same packageName twice in the same bundle -
// this cache is local to the module closure inside this bundle
const packagesCache: { [name: string]: string } = {};
export function setVersion(packageName: string, packageVersion: string): void {
  if (typeof window !== 'undefined') {
    // tslint:disable-next-line:no-any
    const packages = ((window as any).__packages__ = (window as any).__packages__ || {});

    // We allow either the global packages or local packages caches to invalidate so testing can just clear the global to set this state
    if (!packages[packageName] || !packagesCache[packageName]) {
      packagesCache[packageName] = packageVersion;
      const versions = (packages[packageName] = packages[packageName] || []);
      versions.push(packageVersion);
    }
  }
}
