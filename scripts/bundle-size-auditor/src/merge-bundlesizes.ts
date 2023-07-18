import * as path from 'path';
import * as fs from 'fs';

type Report = { sizes: { [entryName: string]: number } };

export function mergeBundleSizes(reportPath: string, mergeFileName: string) {
  const mergeFilePath = path.join(reportPath, mergeFileName);
  const result: Report = {
    sizes: {},
  };

  if (!fs.existsSync(reportPath)) {
    fs.mkdirSync(reportPath, { recursive: true });
    fs.writeFileSync(mergeFilePath, JSON.stringify(result), 'utf-8');
    console.log(`INFO: no bundle-size-auditor reports present!`);
    console.log(`CREATE: ${mergeFilePath}`);
    return;
  }

  const projects = fs.readdirSync(reportPath).filter(value => {
    return fs.statSync(path.join(reportPath, value)).isDirectory();
  });

  projects.forEach(projectName => {
    const bundleSizeJson = path.join(reportPath, projectName, 'bundlesize.json');
    if (fs.existsSync(bundleSizeJson)) {
      const json: Report = JSON.parse(fs.readFileSync(bundleSizeJson, 'utf-8'));
      Object.assign(result.sizes, json.sizes);
    }
  });

  console.log(`CREATE: ${mergeFilePath}`);
  fs.writeFileSync(mergeFilePath, JSON.stringify(result));
}
