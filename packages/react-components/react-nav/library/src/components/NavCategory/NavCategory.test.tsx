import { COMPONENT_HAS_GROUP_MARKER_TEST_NAME } from '@fluentui/react-conformance';
import { isConformant } from '../../testing/isConformant';
import { NavCategory } from './NavCategory';

describe('NavCategory', () => {
  // NavCategory is a wrapper component, so it doesn't have a root element
  isConformant({
    Component: NavCategory,
    displayName: 'NavCategory',
    // `component-has-group-marker` became a default test with the D16 statics-removal sweep
    // (DECISIONS.md D16.6). It renders the component and reads `classList` off the container's
    // first child; NavCategory renders NO element at all — `renderNavCategory_unstable`
    // returns only a `NavCategoryProvider` around `state.children` — so there is nothing to
    // stamp a marker on and nothing to assert. This is the same reason the four tests below
    // it were already disabled, and it is not a conversion opt-out: the component has no
    // styles hook and no module.
    disabledTests: [
      'component-handles-ref',
      'component-has-root-ref',
      'component-handles-classname',
      'component-has-static-classnames-object',
      'make-styles-overrides-win',
      COMPONENT_HAS_GROUP_MARKER_TEST_NAME,
    ],
  });
});
