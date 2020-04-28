import * as glob from 'glob';
import * as fs from 'fs-extra';
import * as path from 'path';

import { FluentComponentInfo } from '@fluentui/react-docgen';
import { componentMenuFile, componentInfoFolder } from './constants';
import { ComponentMenuItem } from './types';

export function writeComponentMenu() {
  const menuItems = glob
    .sync(path.join(componentInfoFolder, '*'))
    .map<ComponentMenuItem | undefined>(file => {
      const componentInfo: FluentComponentInfo = fs.readJSONSync(file);
      if (componentInfo.isParent) {
        return {
          displayName: componentInfo.displayName,
          type: componentInfo.type,
        };
      }
    })
    .filter(Boolean)
    .sort();

  fs.writeJSONSync(componentMenuFile, menuItems);
}
