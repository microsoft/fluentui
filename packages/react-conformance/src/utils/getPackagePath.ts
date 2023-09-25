export function getPackagePath(componentPath: string) {
  // Use lastIndexOf in case anyone has all their repos under a folder called "src" (it happens)
  const srcIndex = componentPath.replace(/\\/g, '/').lastIndexOf('/src/');
  return componentPath.slice(0, srcIndex);
}
