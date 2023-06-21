import * as fs from 'fs';

export function mergeBundleSizes(configPaths: string[], mergeConfigPath: string) {
  const result: { sizes: { [entryName: string]: number } } = {
    sizes: {},
  };

  configPaths.forEach(configPath => {
    const json = JSON.parse(fs.readFileSync(configPath, 'utf-8'));
    Object.assign(result.sizes, json.sizes);
  });

  fs.writeFileSync(mergeConfigPath, JSON.stringify(result));
}
