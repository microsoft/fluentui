import { isConformant } from '@fluentui/react-conformance';
import * as path from 'path';

import { Image } from './Image';

describe('Image', () => {
  isConformant({
    asPropHandlesRef: true,
    componentPath: path.join(__dirname, 'Image.tsx'),
    Component: Image,
    displayName: 'Image',
    disabledTests: ['has-docblock'],
  });
});
