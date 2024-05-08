import { isConformant } from '../../testing/isConformant';
import { NavDrawerFooter } from './NavDrawerFooter';

describe('NavDrawerFooter', () => {
  isConformant({
    Component: NavDrawerFooter,
    displayName: 'NavDrawerFooter',
    disabledTests: ['component-has-static-classnames-object'],
  });
});
