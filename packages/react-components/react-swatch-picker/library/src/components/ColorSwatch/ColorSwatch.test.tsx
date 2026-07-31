import * as React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { CLASSNAME_OVERRIDES_WIN_TEST_NAME, classNameOverridesWin } from '@fluentui/react-conformance';
import { isConformant } from '../../testing/isConformant';
import { ColorSwatch } from './ColorSwatch';
import { SwatchPickerProvider, swatchPickerContextDefaultValue } from '../../contexts/swatchPicker';

describe('ColorSwatch', () => {
  isConformant({
    Component: ColorSwatch,
    displayName: 'ColorSwatch',
    // Griffel → Tailwind + CSS Modules migration (migration/griffel-to-tailwind).
    // `make-styles-overrides-win` jest-mocks `@griffel/react`'s mergeClasses and asserts
    // it was called with the consumer className last; this component now composes with
    // clsx and never calls mergeClasses, so the test can no longer observe the contract.
    // The guarantee itself is unchanged — clsx puts `state.root.className` last and the
    // `@layer fui.*` sublayers keep unlayered consumer CSS winning (DECISIONS.md D2/D9).
    // `classname-overrides-win` below is its cascade-native replacement (DECISIONS.md D9).
    //
    // `component-has-static-classnames-object` asserts the `fui-<Component>__<slot>` BEM
    // format DECISIONS.md D16.1 removed. `component-has-group-marker` (now a default test)
    // replaces it: it asserts the group marker IS stamped and is never `classList[0]`
    // (D16.2 / D16.6). Its `has-static-classnames` testOptions entry goes with it.
    disabledTests: ['component-has-static-classnames-object'],
    extraTests: {
      [CLASSNAME_OVERRIDES_WIN_TEST_NAME]: classNameOverridesWin,
    },
  });

  it('renders a default state', () => {
    const result = render(<ColorSwatch color="#f09" value="#f09" />);
    expect(result.container).toMatchInlineSnapshot(`
      <div>
        <button
          aria-checked="false"
          class="group/fui-color-swatch"
          data-size="medium"
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
