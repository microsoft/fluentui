import * as path from 'path';
import * as fs from 'fs';

type Report = { sizes: { [entryName: string]: number } };

export function mergeBundleSizes(reportPath: string, mergeFileName: string) {
  const projects = fs.readdirSync(reportPath).filter(value => {
    return fs.statSync(path.join(reportPath, value)).isDirectory();
  });

  const result: Report = {
    sizes: {},
  };

  projects.forEach(projectName => {
    const bundleSizeJson = path.join(reportPath, projectName, 'bundlesize.json');
    if (fs.existsSync(bundleSizeJson)) {
      const json: Report = JSON.parse(fs.readFileSync(bundleSizeJson, 'utf-8'));
      Object.assign(result.sizes, json.sizes);
    }
  });

  const mergeFilePath = path.join(reportPath, mergeFileName);

  console.log(`CREATE: ${mergeFilePath}`);
  fs.writeFileSync(mergeFilePath, JSON.stringify(result));
}
