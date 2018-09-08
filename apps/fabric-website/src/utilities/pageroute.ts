/*
  Retreive the route URL for a page without the string after the last hash.
*/
export function getPathMinusLastHash(path: string): string {
  const hashIndex = path.lastIndexOf('#');
  if (hashIndex > 0) {
    path = path.substr(0, hashIndex);
  }
  return path;
}
