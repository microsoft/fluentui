import * as React from 'react';
import { render } from '@testing-library/react';
import { resetIdsForTests } from '@fluentui/react-utilities';

import { isConformant } from '../../testing/isConformant';
import { OverlayDrawer } from './OverlayDrawer';
import type { OverlayDrawerProps } from './OverlayDrawer.types';

describe('OverlayDrawer', () => {
  const testid = 'test';
  const props = {
    'data-testid': testid,
  } as OverlayDrawerProps;

  beforeEach(() => resetIdsForTests());

  /**
   * Note: see more visual regression tests for OverlayDrawer in /apps/vr-tests.
   *
   * Why these tests are disabled:
   * component-handles-ref|component-has-root-ref: OverlayDrawer uses the Dialog under the hood and Dialog do not handle ref, as it is a renderless component
   * component-handles-classname|component-has-static-classnames-object|make-styles-overrides-win: OverlayDrawer uses the DialogSurface component to render the className, so the main component do not handle className.
   * consistent-callback-args: Disabled that as the OverlayDrawer callback function uses the same signature as the Dialog, and Dialog has those tests disabled.
   */
  isConformant<OverlayDrawerProps>({
    Component: OverlayDrawer,
    displayName: 'OverlayDrawer',
    disabledTests: [
      'component-handles-ref',
      'component-has-root-ref',
      'component-handles-classname',
      'component-has-static-classnames-object',
      'consistent-callback-args',
    ],
    requiredProps: props,
    getTargetElement: result => result.getByTestId(testid),
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
});
