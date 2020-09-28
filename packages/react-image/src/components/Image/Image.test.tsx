import { isConformant } from '../../common/isConformant';
import { Image } from './Image';

describe('Image', () => {
  isConformant({
    Component: Image,
    displayName: 'Image',
    asPropHandlesRef: true,
  });
});
