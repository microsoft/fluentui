import * as React from 'react';
import { render } from '@testing-library/react';
import { DrawerOverlay } from './DrawerOverlay';
import { isConformant } from '../../testing/isConformant';
import { resetIdsForTests } from '@fluentui/react-utilities';
import { DrawerOverlayProps } from './DrawerOverlay.types';

describe('DrawerOverlay', () => {
  const testid = 'test';
  const props = {
    'data-testid': testid,
  } as DrawerOverlayProps;

  beforeEach(() => {
    resetIdsForTests();
  });

  /**
   * Note: see more visual regression tests for DrawerOverlay in /apps/vr-tests.
   *
   * Why these tests are disabled:
   * component-handles-ref|component-has-root-ref: DrawerOverlay uses the Dialog under the hood and Dialog do not handle ref, as it is a renderless component
   * component-handles-classname|component-has-static-classnames-object|make-styles-overrides-win: DrawerOverlay uses the DialogSurface component to render the classname, so the main component do not handle classname.
   * consistent-callback-args: Disabled that as the DrawerOverlay callback function uses the same signature as the Dialog, and Dialog has those tests disabled.
   */
  isConformant({
    Component: DrawerOverlay,
    displayName: 'DrawerOverlay',
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
    const result = render(<DrawerOverlay>Default DrawerOverlay</DrawerOverlay>);
    expect(result.container).toMatchInlineSnapshot(`<div />`);
  });
});
