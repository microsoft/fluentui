import { isConformant } from '../../common/isConformant';
import * as path from 'path';

import { Text } from './Text';

describe('Text', () => {
  isConformant({
    componentPath: path.join(__dirname, 'Text.ts'),
    Component: Text,
    displayName: 'Text',
  });
});
