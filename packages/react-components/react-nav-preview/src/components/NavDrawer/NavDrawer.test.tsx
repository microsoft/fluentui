import { isConformant } from '../../testing/isConformant';
import { NavDrawer } from './NavDrawer';

/**
 * Why these tests are disabled:
 * component-handles-ref|component-has-root-ref: Drawer (NavDrawer's base) uses the Dialog under the hood and Dialog do not handle ref, as it is a renderless component
 * component-handles-classname|component-has-static-classnames-object|make-styles-overrides-win: Drawer uses the DialogSurface component to render the classname, so the main component do not handle classname.
 * consistent-callback-args: Disabled that as the Drawer callback function uses the same signature as the Dialog, and Dialog has those tests disabled.
 */

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
