import * as React from 'react';
import { render } from '@testing-library/react';
import { renderHook } from '@testing-library/react-hooks';
import { InlineDrawer } from './InlineDrawer';
import { isConformant } from '../../testing/isConformant';
import type { InlineDrawerProps } from './InlineDrawer.types';
import { useInlineDrawer_unstable, useInlineDrawerBase_unstable } from './useInlineDrawer';

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

  it('keeps size in state for styled drawer styles and motion', () => {
    const ref = React.createRef<HTMLDivElement>();
    const { result } = renderHook(() => useInlineDrawer_unstable({ open: true, size: 'large' }, ref));

    expect(result.current.size).toBe('large');
  });
});

describe('InlineDrawer DOM attributes', () => {
  it('does not render component props as DOM attributes', () => {
    const consoleError = jest.spyOn(console, 'error').mockImplementation(() => undefined);
    const { container } = render(
      <InlineDrawer open position="end" separator size="large" unmountOnClose={false}>
        Drawer
      </InlineDrawer>,
    );

    expect(consoleError).not.toHaveBeenCalled();
    consoleError.mockRestore();
    expect((container.firstElementChild as HTMLElement).getAttributeNames().sort()).toEqual(['class']);
  });

  it('does not forward drawer props from the base hook to the root slot', () => {
    const { result } = renderHook(() =>
      useInlineDrawerBase_unstable({ open: true, position: 'end', unmountOnClose: false }, React.createRef()),
    );

    expect(result.current.root).not.toHaveProperty('open');
    expect(result.current.root).not.toHaveProperty('position');
    expect(result.current.root).not.toHaveProperty('unmountOnClose');
  });
});
