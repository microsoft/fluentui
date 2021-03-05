import { isConformant } from '@fluentui/react-conformance';
import * as path from 'path';

import { Text } from './Text';

describe('Text', () => {
  isConformant({
    asPropHandlesRef: true,
    componentPath: path.join(__dirname, 'Text.ts'),
    Component: Text,
    displayName: 'Text',
    disabledTests: ['has-docblock'],
  });
});
