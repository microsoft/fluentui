import { isConformant } from 'test/specs/commonTests';

import { Layout } from 'src/components/Layout/Layout';

describe('Layout', () => {
  isConformant(Layout, {
    testPath: __filename,
    constructorName: 'Layout',
    hasAccessibilityProp: false,
    disabledTests: ['component-handles-ref', 'component-has-root-ref'],
  });
});
