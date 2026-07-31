import * as React from 'react';
import { render } from '@testing-library/react';
import { resetIdsForTests } from '@fluentui/react-utilities';
import { CLASSNAME_OVERRIDES_WIN_TEST_NAME, classNameOverridesWin } from '@fluentui/react-conformance';

import { isConformant } from '../../testing/isConformant';
import { Drawer } from './Drawer';
import type { DrawerProps } from './Drawer.types';

describe('Drawer', () => {
  const testid = 'test';
  // `open` is part of requiredProps because Drawer defaults to `open: false` +
  // `unmountOnClose: true`, i.e. it renders NOTHING by default — and the conformance tests
  // that resolve the root through `getTargetElement` below (including
  // `component-has-group-marker`, a default test since DECISIONS.md D16.6) need an element
  // to inspect.
  const props = {
    'data-testid': testid,
    open: true,
  } as DrawerProps;

  beforeEach(() => {
    resetIdsForTests();
  });

  /**
   * Note: see more visual regression tests for Drawer in /apps/vr-tests.
   *
   * Why these tests are disabled:
   * component-handles-ref|component-has-root-ref: Drawer uses the Dialog under the hood and Dialog do not handle ref, as it is a renderless component
   * component-handles-classname|component-has-static-classnames-object: Drawer uses the DialogSurface component to render the classname, so the main component do not handle classname.
   * consistent-callback-args: Disabled that as the Drawer callback function uses the same signature as the Dialog, and Dialog has those tests disabled.
   */
  isConformant<DrawerProps>({
    Component: Drawer,
    displayName: 'Drawer',
    disabledTests: [
      'component-handles-ref',
      'component-has-root-ref',
      'component-handles-classname',
      'component-has-static-classnames-object',
      'consistent-callback-args',
    ],
    testOptions: {
      // A Drawer IS an InlineDrawer or an OverlayDrawer: `useDrawer_unstable` picks one as
      // the root's element type, and that component's own hook stamps its marker on the very
      // same element. So this root legitimately carries two markers (DECISIONS.md D16.3).
      // Declaring the whole set keeps `component-has-group-marker` running — it is an exact
      // set comparison, so an undeclared marker still fails — and keeps its `classList[0]`
      // half, the D16.2 invariant nwsapi's jsdom `:scope` polyfill depends on.
      //
      // `overlay` is the default `type`, so this set matches the requiredProps render.
      'has-group-marker': {
        markers: ['group/fui-drawer', 'group/fui-overlay-drawer'],
      },
    },
    requiredProps: props,
    getTargetElement: result => result.getByTestId(testid),
    extraTests: { [CLASSNAME_OVERRIDES_WIN_TEST_NAME]: classNameOverridesWin },
  });

  it('renders a default state', () => {
    const result = render(<Drawer>Default Drawer</Drawer>);
    expect(result.container).toMatchInlineSnapshot(`<div />`);
  });
});
