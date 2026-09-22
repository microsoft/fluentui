import * as React from 'react';
import { render } from '@testing-library/react';
import { isConformant } from '../../testing/isConformant';
import { DATA_OVERFLOWING, DATA_OVERFLOW_MENU, Overflow, overflowClassNames } from './';

describe('Overflow', () => {
  isConformant({
    Component: Overflow,
    displayName: 'Overflow',
    disableTypeTests: true,
    requiredProps: { children: <div /> },
    disabledTests: [
      'component-handles-classname',
      'exported-top-level',
      'has-top-level-file',
      'make-styles-overrides-win',
    ],
  });

  it('applies stable styling to the overflow container and preserves a consumer class', () => {
    const { getByTestId } = render(
      <Overflow>
        <div className="consumer-class" data-testid="overflow-root">
          <span data-overflow-menu="true" />
          <span data-overflowing="true" />
        </div>
      </Overflow>,
    );

    expect(getByTestId('overflow-root')).toHaveClass(overflowClassNames.root, 'consumer-class');
  });

  it('exports the stable overflow data attributes', () => {
    expect(DATA_OVERFLOW_MENU).toBe('data-overflow-menu');
    expect(DATA_OVERFLOWING).toBe('data-overflowing');
  });
});
