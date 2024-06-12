import * as React from 'react';
import { render } from '@testing-library/react';
import { InlineDrawer } from './InlineDrawer';
import { isConformant } from '../../testing/isConformant';
import { InlineDrawerProps } from './InlineDrawer.types';

describe('InlineDrawer', () => {
  isConformant<InlineDrawerProps>({
    Component: InlineDrawer,
    displayName: 'InlineDrawer',
    requiredProps: {
      open: true,
    },
    // Disabled as this component returns null when not open by default
    disabledTests: ['make-styles-overrides-win'],
  });

  it('renders a default state', () => {
    const result = render(<InlineDrawer>Default Drawer</InlineDrawer>);
    expect(result.container).toMatchInlineSnapshot(`<div />`);
  });

  it('renders an closed inline drawer', () => {
    const result = render(<InlineDrawer>Default Drawer</InlineDrawer>);
    expect(result.container).toMatchInlineSnapshot(`<div />`);
  });

  it('renders an open inline drawer', () => {
    const result = render(<InlineDrawer open>Default Drawer</InlineDrawer>);
    expect(result.container).toMatchInlineSnapshot(`
      <div>
        <div
          class="fui-InlineDrawer"
        >
          Default Drawer
        </div>
      </div>
    `);
  });
});
