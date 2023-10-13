import * as React from 'react';
import { render } from '@testing-library/react';
import { OverlayDrawer } from './OverlayDrawer';
import { isConformant } from '../../testing/isConformant';
import { resetIdsForTests } from '@fluentui/react-utilities';
import { OverlayDrawerProps } from './OverlayDrawer.types';

describe('OverlayDrawer', () => {
  const testid = 'test';
  const props = {
    'data-testid': testid,
  } as OverlayDrawerProps;

  beforeEach(() => {
    resetIdsForTests();
  });

  /**
   * Note: see more visual regression tests for OverlayDrawer in /apps/vr-tests.
   *
   * Why these tests are disabled:
   * component-handles-ref|component-has-root-ref: OverlayDrawer uses the Dialog under the hood and Dialog do not handle ref, as it is a renderless component
   * component-handles-classname|component-has-static-classnames-object|make-styles-overrides-win: OverlayDrawer uses the DialogSurface component to render the classname, so the main component do not handle classname.
   * consistent-callback-args: Disabled that as the OverlayDrawer callback function uses the same signature as the Dialog, and Dialog has those tests disabled.
   */
  isConformant({
    Component: OverlayDrawer,
    displayName: 'OverlayDrawer',
    disabledTests: [
      'component-handles-ref',
      'component-has-root-ref',
      'component-handles-classname',
      'component-has-static-classnames-object',
      'consistent-callback-args',
      'make-styles-overrides-win',
    ],
    requiredProps: props,
    getTargetElement: result => result.getByTestId(testid),
  });

  it('renders a default state', () => {
    const result = render(<OverlayDrawer>Default OverlayDrawer</OverlayDrawer>);
    expect(result.container).toMatchInlineSnapshot(`<div />`);
  });
});
