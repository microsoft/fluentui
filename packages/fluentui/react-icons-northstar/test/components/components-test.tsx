import * as icons from '@fluentui/react-icons-northstar';
import * as fs from 'fs';
import * as React from 'react';

const iconsDir = 'src/components';

describe('Icon components', () => {
  fs.readdirSync(iconsDir).forEach(file => {
    const componentName = file.split('.')[0];
    const IconComponent = (icons as any)[componentName];

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
