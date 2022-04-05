import * as icons from './index';
import * as fs from 'fs';
import * as path from 'path';
import * as ReactIs from 'react-is';

const iconsDir = 'src/components';

describe('Icon components', () => {
  fs.readdirSync(iconsDir).forEach(file => {
    const componentName = path.basename(file, '.tsx');
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const IconComponent = (icons as any)[componentName];

    test(`${componentName} has 'Icon' suffix in the name`, () => {
      expect(componentName.endsWith('Icon')).toEqual(true);
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
