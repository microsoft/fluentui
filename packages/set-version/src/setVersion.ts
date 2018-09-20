export function setVersion(packageName: string, packageVersion: string): void {
  if (typeof window !== 'undefined') {
    // tslint:disable-next-line:no-any
    const packages = ((window as any).__packages__ = (window as any).__packages__ || {});
    const versions = (packages[packageName] = packages[packageName] || []);
    versions.push(packageVersion);
  }
}
