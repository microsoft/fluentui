import { isConformant } from '../../testing/isConformant';
import { NavDrawerHeaderNav } from './NavDrawerHeaderNav';

describe('NavDrawerHeaderNav', () => {
  isConformant({
    Component: NavDrawerHeaderNav,
    displayName: 'NavDrawerHeaderNav',
    disabledTests: ['component-has-static-classnames-object'],
  });
});
