import * as React from 'react';
import { render } from '@testing-library/react';
import { resetIdsForTests } from '@fluentui/react-utilities';

import { isConformant } from '../../testing/isConformant';
import { Drawer } from './Drawer';
import type { DrawerProps } from './Drawer.types';

describe('Drawer', () => {
  const testid = 'test';
  const props = {
    'data-testid': testid,
  } as DrawerProps;

  beforeEach(() => {
    resetIdsForTests();
  });

  /**
   * Note: see more visual regression tests for Drawer in /apps/vr-tests.
   *
   * Why these tests are disabled:
   * component-handles-ref|component-has-root-ref: Drawer uses the Dialog under the hood and Dialog do not handle ref, as it is a renderless component
   * component-handles-classname|component-has-static-classnames-object|make-styles-overrides-win: Drawer uses the DialogSurface component to render the classname, so the main component do not handle classname.
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
      'make-styles-overrides-win',
    ],
    requiredProps: props,
    getTargetElement: result => result.getByTestId(testid),
  });

  it('renders a default state', () => {
    const result = render(<Drawer>Default Drawer</Drawer>);
    expect(result.container).toMatchInlineSnapshot(`<div />`);
  });
});
