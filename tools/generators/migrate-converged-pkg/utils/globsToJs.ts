export function globsToJs(tsConfigGlob: string[]) {
  return tsConfigGlob.map(glob => {
    if (glob.endsWith('.d.ts')) {
      return glob;
    }

    return glob.replace(/\.ts(x)?$/, '.js$1');
  });
}
