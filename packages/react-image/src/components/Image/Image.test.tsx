import { isConformant } from '@fluentui/react-conformance';
import * as path from 'path';

import { Image } from './Image';

describe('Image', () => {
  isConformant({
    componentPath: path.join(__dirname, 'Image.tsx'),
    Component: Image,
    displayName: 'Image',
    disabledTests: ['has-docblock', 'as-renders-html', 'as-passes-as-value', 'as-renders-react-class', 'as-renders-fc'],
  });
});
