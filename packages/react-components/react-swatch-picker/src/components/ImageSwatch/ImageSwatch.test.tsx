import * as React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { isConformant } from '../../testing/isConformant';
import { ImageSwatch } from './ImageSwatch';
import { SwatchPickerProvider, swatchPickerContextDefaultValue } from '../../contexts/swatchPicker';

describe('ImageSwatch', () => {
  isConformant({
    Component: ImageSwatch,
    displayName: 'ImageSwatch',
  });

  it('renders a default state', () => {
    const result = render(<ImageSwatch src="path/img.png" value="img" />);
    expect(result.container).toMatchInlineSnapshot(`
      <div>
        <button
          aria-checked="false"
          class="fui-ImageSwatch"
          role="radio"
          style="background-image: url(path/img.png);"
        />
      </div>
    `);
  });

  it('selected when clicked', () => {
    const onSelect = jest.fn();
    const contextValue = {
      ...swatchPickerContextDefaultValue,
      requestSelectionChange: onSelect,
    };

    const result = render(
      <SwatchPickerProvider value={contextValue}>
        <ImageSwatch src="path/img.png" value="img" />
      </SwatchPickerProvider>,
    );

    const swatch = result.getByRole('radio');
    fireEvent.click(swatch);
    expect(onSelect).toHaveBeenCalledWith(expect.anything(), { selectedSwatch: 'path/img.png', selectedValue: 'img' });
  });

  it('has correct a11y attributes in a row layout', () => {
    const result = render(
      <SwatchPickerProvider value={swatchPickerContextDefaultValue}>
        <ImageSwatch src="path/img.png" value="img" />
      </SwatchPickerProvider>,
    );

    const swatch = result.getByRole('radio');
    expect(swatch.getAttribute('aria-checked')).toBe('false');
  });

  it('has correct a11y attributes in a grid layout', () => {
    const contextValue = {
      ...swatchPickerContextDefaultValue,
      isGrid: true,
    };
    const result = render(
      <SwatchPickerProvider value={contextValue}>
        <ImageSwatch src="path/img.png" value="img" />
      </SwatchPickerProvider>,
    );

    const swatch = result.getByRole('gridcell');
    expect(swatch.getAttribute('aria-selected')).toBe('false');
  });
});
