import * as fs from 'fs';
import * as path from 'path';

/**
 *
 * collates bundle size information from minified files in apps/test-bundles/dist/<packageName> and writes to apps/test-bundles/dist/<packageName>/bundlesizes.json.
 *
 * It is uploaded as an artifact by the build definition in Azure Dev Ops and used to compare baseline and PR file size information which gets reported by Size Auditor
 */
export function bundleSizeCollect(config: { packageName: string; filename?: string }) {
  const { packageName, filename: outputFilename = 'bundlesize.json' } = config;

  if (!packageName) {
    throw new Error('🚨 No packageName provided! Set it via env variable name "PACKAGE"');
  }

  const distRoot = path.join(__dirname, '../dist', packageName.replace('@fluentui/', ''));

  const sizes: Record<string, number> = {};

  const items = fs.readdirSync(distRoot);
  items.forEach(item => {
    const file = path.join(distRoot, item);

    const isMinifiedJavascriptFile = item.match(/.min.js$/);
    if (isMinifiedJavascriptFile) {
      sizes[getComponentName(item)] = getFilesizeInBytes(file);
    }
  });

  fs.writeFileSync(path.join(distRoot, outputFilename), JSON.stringify({ sizes }));

  function getFilesizeInBytes(fileName: string) {
    return fs.statSync(fileName).size;
  }

  function getComponentName(fileName: string) {
    return path.basename(fileName, '.min.js');
  }
}
