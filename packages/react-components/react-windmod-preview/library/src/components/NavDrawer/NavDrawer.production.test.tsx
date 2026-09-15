import * as React from 'react';
import { render } from '@testing-library/react';

import { NavDrawer } from './NavDrawer';

/**
 * A `components` swap alone does not change what renders: `state.components` is read at render
 * only by `assertSlots`, inside a `process.env.NODE_ENV !== 'production'` guard, while the element
 * type that renders is the slot object's own metadata symbol. The root slot must ALSO be re-slotted
 * with its new elementType, and only a production-mode render can tell the two apart — under the
 * default test mode `assertSlots` patches the symbol and both shapes pass.
 */
describe('NavDrawer root re-slot under NODE_ENV=production', () => {
  const withProduction = (fn: () => void): void => {
    const previous = process.env.NODE_ENV;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any -- NODE_ENV is typed as a literal union
    (process.env as any).NODE_ENV = 'production';
    try {
      fn();
    } finally {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any -- restoring the literal union
      (process.env as any).NODE_ENV = previous;
    }
  };

  it('renders the windmod InlineDrawer', () => {
    withProduction(() => {
      const { container } = render(
        <NavDrawer type="inline" open>
          Nav drawer content
        </NavDrawer>,
      );
      const root = container.querySelector<HTMLElement>('.fui-nav-drawer')!;

      expect(root).toHaveClass('fui-drawer');
      expect(root).toHaveClass('fui-inline-drawer');
      expect(root.getAttribute('data-position')).toBe('start');
    });
  });

  it('renders the windmod OverlayDrawer', () => {
    withProduction(() => {
      const { container } = render(<NavDrawer open>Nav drawer content</NavDrawer>);
      const surface = container.querySelector('dialog')!;

      expect(surface).toHaveClass('fui-nav-drawer');
      expect(surface).toHaveClass('fui-drawer');
      expect(surface).toHaveClass('fui-overlay-drawer');
    });
  });
});
