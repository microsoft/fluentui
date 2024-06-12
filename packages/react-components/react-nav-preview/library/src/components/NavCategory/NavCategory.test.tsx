import { isConformant } from '../../testing/isConformant';
import { NavCategory } from './NavCategory';

describe('NavCategory', () => {
  // NavCategory is a wrapper component, so it doesn't have a root element
  isConformant({
    Component: NavCategory,
    displayName: 'NavCategory',
    disabledTests: [
      'component-handles-ref',
      'component-has-root-ref',
      'component-handles-classname',
      'component-has-static-classnames-object',
      'make-styles-overrides-win',
    ],
  });
});
