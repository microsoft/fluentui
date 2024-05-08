import { isConformant } from '../../testing/isConformant';
import { NavDrawerBody } from './NavDrawerBody';

describe('NavDrawerBody', () => {
  isConformant({
    Component: NavDrawerBody,
    displayName: 'NavDrawerBody',
    disabledTests: ['component-has-static-classnames-object'],
  });
});
