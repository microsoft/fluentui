import * as React from 'react';
import { render } from '@testing-library/react';
import { DrawerInline } from './DrawerInline';
import { isConformant } from '../../testing/isConformant';

describe('DrawerInline', () => {
  isConformant({
    Component: DrawerInline,
    displayName: 'DrawerInline',
    requiredProps: {
      open: true,
    },
    // Disabled as this component returns null when not open by default
    disabledTests: ['make-styles-overrides-win'],
  });

  // TODO add more tests here, and create visual regression tests in /apps/vr-tests

  it('renders a default state', () => {
    const result = render(<DrawerInline>Default Drawer</DrawerInline>);
    expect(result.container).toMatchInlineSnapshot(`<div />`);
  });

  it('renders an closed inline drawer', () => {
    const result = render(<DrawerInline>Default Drawer</DrawerInline>);
    expect(result.container).toMatchInlineSnapshot(`<div />`);
  });

  it('renders an open inline drawer', () => {
    const result = render(<DrawerInline open>Default Drawer</DrawerInline>);
    expect(result.container).toMatchInlineSnapshot(`
      <div>
        <div
          class="fui-DrawerInline"
        >
          Default Drawer
        </div>
      </div>
    `);
  });
});
