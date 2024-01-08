import { isConformant } from '../../testing/isConformant';
import { NavItem } from './NavItem';

describe('NavItem', () => {
  isConformant({
    Component: NavItem,
    displayName: 'NavItem',
  });
});
