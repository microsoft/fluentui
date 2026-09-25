export function examplePath(pageUrl: string, name: string): string {
  const [collection, ...slugs] = pageUrl.split('/').filter(Boolean);
  return `/examples/${collection}/${encodeURIComponent(name)}/${slugs.join('/')}`;
}
