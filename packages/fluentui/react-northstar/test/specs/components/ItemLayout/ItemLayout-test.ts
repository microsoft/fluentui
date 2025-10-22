import { isConformant } from 'test/specs/commonTests';

import { ItemLayout } from 'src/components/ItemLayout/ItemLayout';

describe('ItemLayout', () => {
  isConformant(ItemLayout, {
    defaultAs: null,
    testPath: __filename,
    constructorName: 'ItemLayout',
    hasAccessibilityProp: false,
    disabledTests: ['component-handles-ref', 'component-has-root-ref'],
  });
});
