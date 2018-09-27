// A packages cache that makes sure that we don't inject the same packageName twice in the same bundle -
// this cache is local to the module closure inside this bundle
const packagesCache: { [name: string]: string } = {};
export function setVersion(packageName: string, packageVersion: string): void {
  if (typeof window !== 'undefined' && !packagesCache[packageName]) {
    packagesCache[packageName] = packageVersion;

    // tslint:disable-next-line:no-any
    const packages = ((window as any).__packages__ = (window as any).__packages__ || {});
    const versions = (packages[packageName] = packages[packageName] || []);
    versions.push(packageVersion);
  }
}
