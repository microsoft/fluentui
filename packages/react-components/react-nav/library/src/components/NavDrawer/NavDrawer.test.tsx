import { CLASSNAME_OVERRIDES_WIN_TEST_NAME, classNameOverridesWin } from '@fluentui/react-conformance';
import { isConformant } from '../../testing/isConformant';
import { NavDrawer } from './NavDrawer';
import type { NavDrawerProps } from './NavDrawer.types';

/**
 * Why these tests are disabled:
 * component-handles-ref|component-has-root-ref: Drawer (NavDrawer's base) uses the Dialog under the hood and Dialog do not handle ref, as it is a renderless component
 * component-handles-classname: Drawer uses the DialogSurface component to render the classname, so the main component do not handle classname.
 * consistent-callback-args: Disabled that as the Drawer callback function uses the same signature as the Dialog, and Dialog has those tests disabled.
 *
 * Griffel → Tailwind + CSS Modules migration (migration/griffel-to-tailwind):
 * `make-styles-overrides-win` jest-mocks `@griffel/react`'s mergeClasses and asserts it was
 * called with the consumer className last; this component now composes with clsx and never
 * calls mergeClasses. `classname-overrides-win` below is its cascade-native replacement
 * (DECISIONS.md D9). `component-has-static-classnames-object` asserts the exact
 * `fui-<Component>` format the D16 statics-removal sweep retired; `navDrawerClassNames.root`
 * is now the group marker (D16.5/D16.6) and `component-has-group-marker` (a default test)
 * replaces it.
 */

describe('NavDrawer', () => {
  const testid = 'test';
  // `open` is part of requiredProps because Drawer defaults to `open: false` +
  // `unmountOnClose: true`, i.e. NavDrawer renders NOTHING by default. The default `type` is
  // `overlay`, so what it renders is PORTALLED — the container's first child is the portal's
  // `<span hidden />` placeholder, not the drawer — which is why the two tests that resolve
  // the root (`component-has-group-marker` and `classname-overrides-win`) need
  // `getTargetElement`. Same wiring react-drawer's own Drawer conformance uses.
  const props = {
    'data-testid': testid,
    open: true,
  } as NavDrawerProps;

  isConformant<NavDrawerProps>({
    Component: NavDrawer,
    displayName: 'NavDrawer',
    requiredProps: props,
    getTargetElement: result => result.getByTestId(testid),
    disabledTests: [
      'component-handles-ref',
      'component-has-root-ref',
      'component-handles-classname',
      'component-has-static-classnames-object',
      'consistent-callback-args',
    ],
    extraTests: { [CLASSNAME_OVERRIDES_WIN_TEST_NAME]: classNameOverridesWin },
    testOptions: {
      // A NavDrawer IS a Drawer IS an OverlayDrawer: NavDrawer's root element type is
      // react-drawer's `Drawer`, which in turn picks `OverlayDrawer` (the default `type`) as
      // ITS root, and all three hooks stamp their marker on the very same element
      // (DECISIONS.md D16.3). Declaring the whole set keeps `component-has-group-marker`
      // running — it is an exact set comparison, so an undeclared marker still fails — and
      // keeps its `classList[0]` half, the D16.2 invariant nwsapi's jsdom `:scope` polyfill
      // depends on.
      'has-group-marker': {
        markers: ['group/fui-nav-drawer', 'group/fui-drawer', 'group/fui-overlay-drawer'],
      },
    },
  });
});
