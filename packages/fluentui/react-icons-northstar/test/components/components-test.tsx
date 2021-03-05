import * as icons from '@fluentui/react-icons-northstar';
import * as fs from 'fs';
import * as path from 'path';
import * as ReactIs from 'react-is';

const iconsDir = 'src/components';

describe('Icon components', () => {
  fs.readdirSync(iconsDir).forEach(file => {
    const componentName = path.basename(file, '.tsx');
    const IconComponent = (icons as any)[componentName];

    test(`${componentName} has 'Icon' suffix in the name`, () => {
      expect(componentName.endsWith('Icon')).toBeTruthy();
    });

    test(`${file} is exported in package`, () => {
      expect(IconComponent).toBeDefined();
    });

    test(`${file} is a valid component`, () => {
      expect(ReactIs.isValidElementType(IconComponent)).toEqual(true);
    });

    test(`${file} matches displayName`, () => {
      expect(IconComponent.displayName).toEqual(componentName);
    });
  });
});
