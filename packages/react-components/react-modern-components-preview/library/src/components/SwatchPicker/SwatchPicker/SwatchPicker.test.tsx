import * as React from 'react';
import { fireEvent, render } from '@testing-library/react';
import { SwatchPicker } from './SwatchPicker';
import { ColorSwatch } from '../ColorSwatch/ColorSwatch';
import { SwatchPickerRow } from '../SwatchPickerRow/SwatchPickerRow';
import { swatchPickerClassNames } from './useSwatchPickerStyles.styles';
import { colorSwatchClassNames } from '../ColorSwatch/useColorSwatchStyles.styles';

describe('SwatchPicker', () => {
  it('provides visual defaults and updates selection', () => {
    const onSelectionChange = jest.fn();
    const { getByRole } = render(
      <SwatchPicker onSelectionChange={onSelectionChange} className="custom-root">
        <ColorSwatch aria-label="Red" color="#f00" value="red" />
      </SwatchPicker>,
    );
    const root = getByRole('radiogroup');
    const swatch = getByRole('radio');

    expect(root).toHaveClass(swatchPickerClassNames.root, 'custom-root');
    expect(root).toHaveAttribute('data-size', 'medium');
    expect(root).toHaveAttribute('data-shape', 'square');
    expect(root).toHaveAttribute('data-spacing', 'medium');
    expect(swatch).toHaveClass(colorSwatchClassNames.root);

    fireEvent.click(swatch);
    expect(swatch).toHaveAttribute('aria-checked', 'true');
    expect(onSelectionChange).toHaveBeenCalledWith(
      expect.anything(),
      expect.objectContaining({ selectedSwatch: '#f00', selectedValue: 'red' }),
    );
  });

  it('renders grid rows with inherited spacing', () => {
    const { getByRole } = render(
      <SwatchPicker layout="grid" spacing="small">
        <SwatchPickerRow />
      </SwatchPicker>,
    );
    expect(getByRole('grid')).toHaveAttribute('data-layout', 'grid');
    expect(getByRole('row')).toHaveAttribute('data-spacing', 'small');
  });
});
