import * as React from 'react';
import { mount, ReactWrapper } from 'enzyme';

import { ColorPicker } from './ColorPicker';
import { ColorPickerBase } from './ColorPicker.base';
import { ColorSliderBase } from './ColorSlider/ColorSlider.base';
import { setWarningCallback } from '../../Utilities';
import type { IColorPickerState } from './ColorPicker.base';
import type { IColorPickerProps, IColorPickerStrings } from './ColorPicker.types';

describe('ColorPicker', () => {
  let wrapper: ReactWrapper<IColorPickerProps, IColorPickerState, ColorPickerBase> | undefined;

  beforeAll(() => {
    // Prevent warn deprecations from failing test
    setWarningCallback(() => {
      /* no-op */
    });
  });

  afterAll(() => {
    setWarningCallback();
  });

  afterEach(() => {
    if (wrapper) {
      wrapper.unmount();
      wrapper = undefined;
    }
  });

  it('hides alpha control slider', () => {
    wrapper = mount(<ColorPicker color="#ffffff" alphaSliderHidden={true} />);

    const alphaSlider = wrapper.find('.is-alpha');
    const tableHeaders = wrapper.find('thead td');

    // There should only be table headers and inputs for hex, red, green, and blue (no alpha)
    expect(alphaSlider.exists()).toBe(false);
    expect(tableHeaders).toHaveLength(4);

    const inputs = wrapper.getDOMNode().querySelectorAll('input') as NodeListOf<HTMLInputElement>;
    expect(inputs).toHaveLength(4);
    expect(inputs[0].value).toBe('ffffff');
    expect(inputs[1].value).toBe('255');
    expect(inputs[2].value).toBe('255');
    expect(inputs[3].value).toBe('255');
  });

  it('renders deprecated custom strings', () => {
    const fields = ['Custom Hex', 'Custom Red', 'Custom Green', 'Custom Blue', 'Custom Alpha'];

    wrapper = mount(
      <ColorPicker
        color="#FFFFFF"
        hexLabel={fields[0]}
        redLabel={fields[1]}
        greenLabel={fields[2]}
        blueLabel={fields[3]}
        alphaLabel={fields[4]}
      />,
    );

    const tableHeaders = wrapper.find('thead td');
    tableHeaders.forEach((node, index) => {
      expect(node.text()).toEqual(fields[index]);
    });

    const sliders = wrapper.find(ColorSliderBase);
    expect(sliders.at(1).html()).toContain('Custom Alpha');
  });

  it('renders mix of new and deprecated custom strings', () => {
    const customRed = 'Custom Red';
    const customAlpha = 'Custom Alpha';
    const customStrings: IColorPickerStrings = {
      hex: 'Custom Hex',
      blue: 'Custom Blue',
    };

    wrapper = mount(
      <ColorPicker color="#FFFFFF" strings={customStrings} redLabel={customRed} alphaLabel={customAlpha} />,
    );

    const tableHeaders = wrapper.find('thead td');
    expect(tableHeaders.at(0).text()).toEqual(customStrings.hex);
    expect(tableHeaders.at(1).text()).toEqual(customRed);
    expect(tableHeaders.at(2).text()).toEqual('Green'); // not customized
    expect(tableHeaders.at(3).text()).toEqual(customStrings.blue);
    expect(tableHeaders.at(4).text()).toEqual(customAlpha);
  });
});
