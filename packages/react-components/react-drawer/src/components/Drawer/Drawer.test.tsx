import * as React from 'react';
import { render } from '@testing-library/react';
import { Drawer } from './Drawer';
import { isConformant } from '../../testing/isConformant';
import { resetIdsForTests } from '@fluentui/react-utilities';
import { DrawerProps } from './Drawer.types';

describe('Drawer', () => {
  const testid = 'test';
  const props = {
    'data-testid': testid,
  } as DrawerProps;

  beforeEach(() => {
    resetIdsForTests();
  });

  isConformant({
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
