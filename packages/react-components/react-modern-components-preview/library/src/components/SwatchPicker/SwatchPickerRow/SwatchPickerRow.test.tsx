import * as React from 'react';
import { render } from '@testing-library/react';
import { SwatchPicker } from '../SwatchPicker/SwatchPicker';
import { SwatchPickerRow } from './SwatchPickerRow';
import { swatchPickerRowClassNames } from './useSwatchPickerRowStyles.styles';

describe('SwatchPickerRow', () => {
  it('inherits spacing and preserves consumer classes', () => {
    const { getByRole } = render(
      <SwatchPicker layout="grid" spacing="small">
        <SwatchPickerRow className="custom-row" />
      </SwatchPicker>,
    );
    expect(getByRole('row')).toHaveClass(swatchPickerRowClassNames.root, 'custom-row');
    expect(getByRole('row')).toHaveAttribute('data-spacing', 'small');
  });
});
