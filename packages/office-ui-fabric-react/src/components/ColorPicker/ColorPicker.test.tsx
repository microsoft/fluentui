import * as React from 'react';
import * as renderer from 'react-test-renderer';
import { mount, ReactWrapper } from 'enzyme';
import * as ReactTestUtils from 'react-dom/test-utils';

import { ColorPicker } from './ColorPicker';
import { ColorPickerBase, IColorPickerState } from './ColorPicker.base';
import { IColorPickerProps } from './ColorPicker.types';
import { getColorFromString, IColor } from '../../utilities/color/colors';
import { mockEvent } from '../../common/testUtilities';

const noOp = () => undefined;

describe('ColorPicker', () => {
  let wrapper: ReactWrapper<IColorPickerProps, IColorPickerState, ColorPickerBase> | undefined;
  let colorPicker: ColorPickerBase | null = null;
  const colorPickerRef = (ref: ColorPickerBase | null) => {
    colorPicker = ref;
  };

  afterEach(() => {
    if (wrapper) {
      wrapper.unmount();
      wrapper = undefined;
    }
  });

  it('renders correctly', () => {
    const component = renderer.create(<ColorPicker color="#abcdef" />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('uses provided color string', () => {
    wrapper = mount(<ColorPicker color="#abcdef" onChange={noOp} componentRef={colorPickerRef} />);

    expect(colorPicker!.color.hex).toEqual('abcdef');
  });

  it('uses provided color object', () => {
    const color = getColorFromString('#abcdef')!;
    wrapper = mount(<ColorPicker color={color} onChange={noOp} componentRef={colorPickerRef} />);

    expect(colorPicker!.color).toEqual(color);
  });

  it('respects color prop change', () => {
    const onChange = jest.fn();
    wrapper = mount(<ColorPicker color="#abcdef" onChange={onChange} componentRef={colorPickerRef} />);

    wrapper.setProps({ color: '#AEAEAE' });
    expect(colorPicker!.color.hex).toEqual('aeaeae');
    // shouldn't call onChange when the consumer updates the color prop
    expect(onChange).toHaveBeenCalledTimes(0);
  });

  it('ignores invalid updates to color prop', () => {
    const onChange = jest.fn();
    wrapper = mount(<ColorPicker color="#abcdef" onChange={onChange} componentRef={colorPickerRef} />);

    wrapper.setProps({ color: 'foo' });
    expect(colorPicker!.color.hex).toEqual('abcdef');
    expect(onChange).toHaveBeenCalledTimes(0);
  });

  it('hides alpha control slider', () => {
    wrapper = mount(<ColorPicker color="#FFFFFF" alphaSliderHidden={true} />);

    const alphaSlider = wrapper.find('.is-alpha');
    const tableHeaders = wrapper.find('thead td');
    const inputs = wrapper.find('.ms-TextField');

    // There should only be table headers and inputs for hex, red, green, and blue (no alpha)
    expect(alphaSlider.exists()).toBe(false);
    expect(tableHeaders).toHaveLength(4);
    expect(inputs).toHaveLength(4);
  });

  it('renders default RGBA/Hex strings', () => {
    wrapper = mount(<ColorPicker color="#FFFFFF" />);

    const tableHeaders = wrapper.find('thead td');
    const textHeaders = [
      ColorPickerBase.defaultProps.hexLabel,
      ColorPickerBase.defaultProps.redLabel,
      ColorPickerBase.defaultProps.greenLabel,
      ColorPickerBase.defaultProps.blueLabel,
      ColorPickerBase.defaultProps.alphaLabel
    ];

    tableHeaders.forEach((node, index) => {
      expect(node.text()).toEqual(textHeaders[index]);
    });
  });

  it('renders custom RGBA/Hex strings', () => {
    const textHeaders = ['Custom Hex', 'Custom Red', 'Custom Green', 'Custom Blue', 'Custom Alpha'];

    wrapper = mount(
      <ColorPicker
        color="#FFFFFF"
        hexLabel={textHeaders[0]}
        redLabel={textHeaders[1]}
        greenLabel={textHeaders[2]}
        blueLabel={textHeaders[3]}
        alphaLabel={textHeaders[4]}
      />
    );

    const tableHeaders = wrapper.find('thead td');
    tableHeaders.forEach((node, index) => {
      expect(node.text()).toEqual(textHeaders[index]);
    });
  });

  it('keeps color value when tabbing between Hex and RGBA text inputs', () => {
    const colorStringValue = 'abcdef';
    const colorChangeSpy = jest.fn();
    const inputClassName = 'input-tab-test';
    wrapper = mount(
      <ColorPicker
        color={`#${colorStringValue}`}
        onChange={colorChangeSpy}
        componentRef={colorPickerRef}
        styles={{ input: inputClassName }}
      />
    );

    expect(colorPicker!.color.hex).toEqual(colorStringValue);
    expect(colorChangeSpy).toHaveBeenCalledTimes(0);

    // Tab between text inputs checking state after each time.
    const allInputs = wrapper.find(`.${inputClassName} input`);
    expect(allInputs.length).toBe(5);

    allInputs.forEach(input => {
      input.simulate('focus');
      input.simulate('blur');

      expect(colorPicker!.color.hex).toEqual(colorStringValue);
      expect(colorChangeSpy).toHaveBeenCalledTimes(0);
    });
  });

  it('allows updating text fields', () => {
    let updatedColor: string | undefined;
    const onChange = jest.fn((ev: any, color: IColor) => {
      updatedColor = color.str;
    });

    wrapper = mount(<ColorPicker onChange={onChange} color="#000000" componentRef={colorPickerRef} />);

    const inputs = wrapper.getDOMNode().querySelectorAll('.ms-ColorPicker-input input');

    const redInput = inputs[1];
    ReactTestUtils.Simulate.input(redInput, mockEvent('255'));
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(updatedColor).toBe('#ff0000');
    expect(colorPicker!.color.str).toBe('#ff0000');
    // blur and make sure nothing changes
    ReactTestUtils.Simulate.blur(redInput);
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(colorPicker!.color.str).toBe('#ff0000');

    const hexInput = inputs[0];
    ReactTestUtils.Simulate.input(hexInput, mockEvent('00ff00'));
    expect(onChange).toHaveBeenCalledTimes(2);
    expect(updatedColor).toBe('#00ff00');
    expect(colorPicker!.color.str).toBe('#00ff00');
    ReactTestUtils.Simulate.blur(hexInput);
    expect(onChange).toHaveBeenCalledTimes(2);
    expect(colorPicker!.color.str).toBe('#00ff00');

    const alphaInput = inputs[4];
    ReactTestUtils.Simulate.input(alphaInput, mockEvent('50'));
    ReactTestUtils.Simulate.blur(alphaInput);
    expect(onChange).toHaveBeenCalledTimes(3);
    expect(updatedColor).toBe('rgba(0, 255, 0, 0.5)');
    expect(colorPicker!.color.str).toBe('rgba(0, 255, 0, 0.5)');
  });

  it('allows updating text fields when alpha slider is hidden', () => {
    let updatedColor: string | undefined;
    const onChange = jest.fn((ev: any, color: IColor) => {
      updatedColor = color.str;
    });

    wrapper = mount(<ColorPicker onChange={onChange} color="#000000" alphaSliderHidden componentRef={colorPickerRef} />);

    const inputs = wrapper.getDOMNode().querySelectorAll('.ms-ColorPicker-input input');

    const redInput = inputs[1];
    ReactTestUtils.Simulate.input(redInput, mockEvent('255'));
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(updatedColor).toBe('#ff0000');
    expect(colorPicker!.color.str).toBe('#ff0000');
    // blur and make sure nothing changes
    ReactTestUtils.Simulate.blur(redInput);
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(colorPicker!.color.str).toBe('#ff0000');

    const hexInput = inputs[0];
    ReactTestUtils.Simulate.input(hexInput, mockEvent('00ff00'));
    expect(onChange).toHaveBeenCalledTimes(2);
    expect(updatedColor).toBe('#00ff00');
    expect(colorPicker!.color.str).toBe('#00ff00');
    ReactTestUtils.Simulate.blur(hexInput);
    expect(onChange).toHaveBeenCalledTimes(2);
    expect(colorPicker!.color.str).toBe('#00ff00');
  });
});
