import * as React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { isConformant } from '../../testing/isConformant';
import { ColorSwatch } from './ColorSwatch';
import { colorSwatchClassNames } from './useColorSwatchStyles.styles';
import { SwatchPickerProvider, swatchPickerContextDefaultValue } from '../../contexts/swatchPicker';

describe('ColorSwatch', () => {
  isConformant({
    Component: ColorSwatch,
    displayName: 'ColorSwatch',
    testOptions: {
      'has-static-classnames': [
        {
          props: {},
          expectedClassNames: {
            root: colorSwatchClassNames.root,
          },
        },
      ],
    },
  });

  it('renders a default state', () => {
    const result = render(<ColorSwatch color="#f09" value="#f09" />);
    expect(result.container).toMatchInlineSnapshot(`
      <div>
        <button
          aria-checked="false"
          class="fui-ColorSwatch"
          role="radio"
          style="--fui-SwatchPicker--color: #f09; --fui-SwatchPicker--borderColor: var(--colorTransparentStroke);"
          type="button"
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
        <ColorSwatch color="#f09" value="f09" />
      </SwatchPickerProvider>,
    );

    const swatch = result.getByRole('radio');
    fireEvent.click(swatch);
    expect(onSelect).toHaveBeenCalledWith(expect.anything(), { selectedSwatch: '#f09', selectedValue: 'f09' });
  });

  it('has correct a11y attributes in a row layout', () => {
    const result = render(
      <SwatchPickerProvider value={swatchPickerContextDefaultValue}>
        <ColorSwatch color="#f09" value="f09" />
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
        <ColorSwatch color="#f09" value="f09" />
      </SwatchPickerProvider>,
    );

    const swatch = result.getByRole('gridcell');
    expect(swatch.getAttribute('aria-selected')).toBe('false');
  });
});
