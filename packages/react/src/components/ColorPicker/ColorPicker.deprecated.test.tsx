import '@testing-library/jest-dom';
import * as React from 'react';
import { render, screen } from '@testing-library/react';

import { ColorPicker } from './ColorPicker';
import type { IColorPickerStrings } from './ColorPicker.types';
import { setWarningCallback } from '@fluentui/utilities';
import { getByAllSelector, getBySelector } from '../../common/testUtilities';

describe('ColorPicker', () => {
  beforeAll(() => {
    // Prevent warn deprecations from failing test
    setWarningCallback(() => {
      /* no-op */
    });
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('hides alpha control slider', () => {
    const { container } = render(<ColorPicker color="#ffffff" alphaSliderHidden={true} />);

    const alphaSlider = getBySelector(container, '.is-alpha');
    const tableHeaders = getByAllSelector(container, 'thead td');

    // There should only be table headers and inputs for hex, red, green, and blue (no alpha)
    expect(alphaSlider).toBeNull();
    expect(tableHeaders).toHaveLength(4);

    const inputs = screen.getAllByRole('textbox');
    expect(inputs).toHaveLength(4);
    expect(inputs[0]).toHaveValue('ffffff');
    expect(inputs[1]).toHaveValue('255');
    expect(inputs[2]).toHaveValue('255');
    expect(inputs[3]).toHaveValue('255');
  });

  it('renders deprecated custom strings', () => {
    const fields = ['Custom Hex', 'Custom Red', 'Custom Green', 'Custom Blue', 'Custom Alpha'];

    const { container } = render(
      <ColorPicker
        color="#FFFFFF"
        hexLabel={fields[0]}
        redLabel={fields[1]}
        greenLabel={fields[2]}
        blueLabel={fields[3]}
        alphaLabel={fields[4]}
      />,
    );

    const tableHeaders = getByAllSelector(container, 'thead td');
    tableHeaders.forEach((node, index) => {
      expect(node).toHaveTextContent(fields[index]);
    });

    const sliders = screen.getAllByRole('slider');

    expect(sliders.at(2)?.getAttribute('aria-label')).toEqual('Custom Alpha');
  });

  it('renders mix of new and deprecated custom strings', () => {
    const customRed = 'Custom Red';
    const customAlpha = 'Custom Alpha';
    const customStrings = {
      hex: 'Custom Hex',
      blue: 'Custom Blue',
    } satisfies IColorPickerStrings;

    const { container } = render(
      <ColorPicker color="#FFFFFF" strings={customStrings} redLabel={customRed} alphaLabel={customAlpha} />,
    );

    const tableHeaders = getByAllSelector(container, 'thead td');
    expect(tableHeaders[0]).toHaveTextContent(customStrings.hex);
    expect(tableHeaders[1]).toHaveTextContent(customRed);
    expect(tableHeaders[2]).toHaveTextContent('Green'); // not customized
    expect(tableHeaders[3]).toHaveTextContent(customStrings.blue);
    expect(tableHeaders[4]).toHaveTextContent(customAlpha);
  });
});
