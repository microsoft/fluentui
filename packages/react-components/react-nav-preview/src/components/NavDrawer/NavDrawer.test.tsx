import { isConformant } from '../../testing/isConformant';
import { NavDrawer } from './NavDrawer';

/// Why are these tests disabled?
/// Because the Drawer component uses the Dialog under the hood and Dialog does not handle ref,
// The underlying Drawer component tests also disable these.

describe('NavDrawer', () => {
  isConformant({
    Component: NavDrawer,
    displayName: 'NavDrawer',
    disabledTests: [
      'component-handles-ref',
      'component-has-root-ref',
      'component-handles-classname',
      'component-has-static-classnames-object',
      'consistent-callback-args',
      'make-styles-overrides-win',
    ],
  });
});
