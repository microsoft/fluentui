import * as React from 'react';
import { render } from '@testing-library/react';
import { isConformant } from '../../../testing/isConformant';
import { ColorSwatch } from './ColorSwatch';
import { SwatchPicker } from '../SwatchPicker';

describe('ColorSwatch', () => {
  isConformant({
    Component: ColorSwatch,
    displayName: 'ColorSwatch',
    requiredProps: { color: '#f09', value: 'pink', 'aria-label': 'Pink' },
    renderOptions: {
      wrapper: ({ children }) => <SwatchPicker aria-label="Colors">{children}</SwatchPicker>,
    },
    getTargetElement: result => result.getByRole('radio'),
    disabledTests: ['has-top-level-file-extra'],
  });

  it('emits selected and disabled state attributes', () => {
    const { getByRole } = render(<ColorSwatch color="#f09" value="pink" aria-label="Pink" disabled />, {
      wrapper: ({ children }) => (
        <SwatchPicker aria-label="Colors" selectedValue="pink">
          {children}
        </SwatchPicker>
      ),
    });
    const swatch = getByRole('radio');
    expect(swatch).toHaveAttribute('aria-label', 'Pink');
    expect(swatch).toHaveAttribute('aria-checked', 'true');
    expect(swatch).toHaveAttribute('data-selected');
    expect(swatch).toHaveAttribute('data-disabled');
  });
});
