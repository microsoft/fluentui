import * as React from 'react';
import { render } from '@testing-library/react';

import { InfoButton } from '../InfoButton';
import { InfoLabel } from './InfoLabel';

/**
 * A `components` swap alone does not change what renders: `state.components` is read at render
 * only by `assertSlots`, inside a `process.env.NODE_ENV !== 'production'` guard, while the element
 * type that renders is the slot object's own metadata symbol. Every swapped slot must ALSO be
 * re-slotted with its new elementType, and only a production-mode render can tell the two apart —
 * under the default test mode `assertSlots` patches the symbol and both shapes pass.
 */
describe('InfoLabel slot swaps under NODE_ENV=production', () => {
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

  it('renders the windmod Label and InfoButton (S1, S2)', () => {
    withProduction(() => {
      const { container } = render(
        <InfoLabel info="Info" size="large">
          Label
        </InfoLabel>,
      );

      expect(container.querySelector('label')).toHaveClass('fui-label');
      expect(container.querySelector('button')).toHaveClass('fui-info-button');
    });
  });

  it('renders the windmod Popover and PopoverSurface (S3, S4)', () => {
    withProduction(() => {
      const { baseElement } = render(<InfoButton info="Info" popover={{ open: true }} />);

      const surface = baseElement.querySelector('[data-popover-surface]');

      expect(surface).toHaveClass('fui-popover-surface');
      // The look context only reaches the surface through the windmod Popover.
      expect(surface).toHaveAttribute('data-size', 'small');
    });
  });
});
