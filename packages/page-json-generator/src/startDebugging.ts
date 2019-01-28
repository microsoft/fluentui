import * as path from 'path';
import { generateJson } from './index';

// Generate JSON for office-ui-fabric-react
generateJson({
  apiJsonPath:
    'C:\\Users\\naethell\\Documents\\office-ui-fabric-react\\packages\\office-ui-fabric-react\\dist\\office-ui-fabric-react.api.json',
  pageJsonFolderPath: path.join(__dirname, '../../../common/pages'),
  pageNames: ['Button', 'Breadcrumb', 'Calendar', 'Callout', 'Checkbox', 'ChoiceGroup', 'ComboBox']
});

// Generate JSON for styling
// generateJson({
//   apiJsonPath: 'C:\\Users\\naethell\\office-ui-fabric-react\\packages\\styling\\dist\\styling.api.json',
//   pageJsonFolderPath: path.join(__dirname, '../../../common/pages'),
//   pageNames: ['ITheme', 'IScheme', 'IStyle']
// });

// // Generate JSON for utilities
// generateJson({
//   apiJsonPath: 'C:\\Users\\naethell\\office-ui-fabric-react\\packages\\utilities\\dist\\utilities.api.json',
//   pageJsonFolderPath: path.join(__dirname, '../temp/utilitiesPages'),
//   pageNames: []
// });
