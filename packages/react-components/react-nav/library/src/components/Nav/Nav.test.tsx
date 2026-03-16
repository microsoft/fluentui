import { isConformant } from '../../testing/isConformant';
import { Nav } from './Nav';

describe('Nav', () => {
  isConformant({
    Component: Nav,
    displayName: 'Nav',
    // todo - # 30012, remove when conformance is updated
    disabledTests: ['consistent-callback-args'],
  });
});
