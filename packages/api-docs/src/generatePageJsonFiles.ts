import * as path from 'path';
import * as fse from 'fs-extra';
import { ApiModel } from '@microsoft/api-extractor-model';
import { IPageJsonOptions } from './types';
import { generatePageJson } from './pageJson';

/**
 * Main entry point to create API \*.page.json files.
 */
export function generatePageJsonFiles(options: IPageJsonOptions): void {
  const { pageGroups = {}, fallbackGroup, outputRoot, apiJsonPaths, min } = options;

  // Create and/or empty output folders
  fse.emptyDirSync(outputRoot);
  for (const group of Object.keys(pageGroups)) {
    fse.emptyDirSync(path.join(outputRoot, group));
  }
  if (fallbackGroup) {
    fse.emptyDirSync(path.join(outputRoot, fallbackGroup));
  }

  // Load api-extractor output from packages into a model
  const apiModel = new ApiModel();
  for (const apiJsonPath of apiJsonPaths) {
    console.log('Loading ' + apiJsonPath);
    apiModel.loadPackage(apiJsonPath);
  }

  // Generate the page data
  const pageJsonByName = generatePageJson(apiModel, pageGroups, fallbackGroup);

  // Warn if any requested page names didn't correspond to a docCategory found in the API info
  const requestedPages = ([] as string[]).concat(...Object.values(pageGroups));
  for (const pageName of requestedPages) {
    if (!pageJsonByName.has(pageName)) {
      console.warn('Warning: no API items found for expected @docCategory ' + pageName);
    }
  }

  // Write the files
  for (const [pageName, pageJson] of pageJsonByName.entries()) {
    const pageJsonPath = path.join(outputRoot, pageJson.group || '', pageName + '.page.json');

    console.log('Writing ' + pageJsonPath);
    const json = min ? JSON.stringify(pageJson) : JSON.stringify(pageJson, null, 2);
    fse.writeFileSync(pageJsonPath, json);
  }
}

// For running in debugger
if (require.main === module) {
  const config: IPageJsonOptions = require('../config/api-docs');
  generatePageJsonFiles(config);
}
