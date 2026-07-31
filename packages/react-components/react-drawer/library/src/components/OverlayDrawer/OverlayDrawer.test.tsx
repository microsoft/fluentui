import * as React from 'react';
import { render } from '@testing-library/react';
import { resetIdsForTests } from '@fluentui/react-utilities';
import { CLASSNAME_OVERRIDES_WIN_TEST_NAME, classNameOverridesWin } from '@fluentui/react-conformance';

import { isConformant } from '../../testing/isConformant';
import { OverlayDrawer } from './OverlayDrawer';
import type { OverlayDrawerProps } from './OverlayDrawer.types';

describe('OverlayDrawer', () => {
  const testid = 'test';
  // `open` is part of requiredProps because OverlayDrawer defaults to `open: false` +
  // `unmountOnClose: true`, i.e. it renders NOTHING by default — and the conformance tests
  // that resolve the root through `getTargetElement` below (including
  // `component-has-group-marker`, a default test since DECISIONS.md D16.6) need an element
  // to inspect.
  const props = {
    'data-testid': testid,
    open: true,
  } as OverlayDrawerProps;

  beforeEach(() => resetIdsForTests());

  /**
   * Note: see more visual regression tests for OverlayDrawer in /apps/vr-tests.
   *
   * Why these tests are disabled:
   * component-handles-ref|component-has-root-ref: OverlayDrawer uses the Dialog under the hood and Dialog do not handle ref, as it is a renderless component
   * component-handles-classname|component-has-static-classnames-object: OverlayDrawer uses the DialogSurface component to render the className, so the main component do not handle className.
   * consistent-callback-args: Disabled that as the OverlayDrawer callback function uses the same signature as the Dialog, and Dialog has those tests disabled.
   */
  isConformant<OverlayDrawerProps>({
    Component: OverlayDrawer,
    displayName: 'OverlayDrawer',
    // `classname-overrides-win` (extraTests below) pins the styling override contract
    // cascade-natively: the consumer `className` is composed last, and unlayered consumer CSS
    // beats the component’s `@layer fui.*` rules (DECISIONS.md D2/D9).
    disabledTests: [
      'component-handles-ref',
      'component-has-root-ref',
      'component-handles-classname',
      'component-has-static-classnames-object',
      'consistent-callback-args',
    ],
    requiredProps: props,
    getTargetElement: result => result.getByTestId(testid),
    extraTests: { [CLASSNAME_OVERRIDES_WIN_TEST_NAME]: classNameOverridesWin },
  });

  it('renders a default state', () => {
    const result = render(<OverlayDrawer>Default OverlayDrawer</OverlayDrawer>);
    expect(result.container).toMatchInlineSnapshot(`<div />`);
  });

  it('respects the mountNode prop', () => {
    const mountNode = document.createElement('div');
    render(
      <OverlayDrawer id="drawer" mountNode={mountNode} open={true}>
        Default OverlayDrawer
      </OverlayDrawer>,
    );

    const result = mountNode.querySelector('#drawer');
    expect(result).toBeTruthy();
  });

  it('accept mountNode as object with className', () => {
    const customClassName = 'CustomMountNode';

    const { baseElement } = render(
      <OverlayDrawer id="drawer" mountNode={{ className: customClassName }} open={true}>
        Default OverlayDrawer
      </OverlayDrawer>,
    );

    const mountNodeElement = baseElement.querySelector(`.${customClassName}`);
    const drawerInsideMountNode = mountNodeElement?.querySelector('#drawer');

    expect(mountNodeElement).toBeTruthy();
    expect(drawerInsideMountNode).toBeTruthy();
  });
});
