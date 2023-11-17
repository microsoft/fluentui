import { isConformant } from '../../testing/isConformant';
import { Nav } from './Nav';

describe('Nav', () => {
  isConformant({
    Component: Nav,
    displayName: 'Nav',
  });
});
