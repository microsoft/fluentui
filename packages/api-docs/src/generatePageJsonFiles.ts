import { generateJson } from './PageJsonGenerator';
import { IPageJsonOptions } from './PageJsonGenerator.types';

// Generate JSON for office-ui-fabric-react, react-cards, styling, utilities, and merge-styles
export function generatePageJsonFiles(options: IPageJsonOptions[]): void {
  generateJson(options);
}

// For running in debugger
if (require.main === module) {
  const config: IPageJsonOptions[] = require('../../config/api-docs');
  generatePageJsonFiles(config);
}
