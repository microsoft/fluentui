import * as React from 'react';
import * as renderer from 'react-test-renderer';
import { mount, ReactWrapper } from 'enzyme';
import * as ReactTestUtils from 'react-dom/test-utils';

import { ColorPicker } from './ColorPicker';
import { ColorPickerBase, IColorPickerState } from './ColorPicker.base';
import { IColorPicker, IColorPickerProps } from './ColorPicker.types';
import { IColor, getColorFromString } from '../../utilities/color/colors';
import { mockEvent } from '../../common/testUtilities';

describe('ColorPicker', () => {
  let wrapper: ReactWrapper<IColorPickerProps, IColorPickerState, ColorPickerBase> | undefined;
  const colorPickerRef = React.createRef<IColorPicker>();

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

  it('correctly parses props', () => {
    wrapper = mount(<ColorPicker color="#abcdef" componentRef={colorPickerRef} />);

    expect(colorPickerRef.current!.color.hex).toEqual('abcdef');
  });

  it('reacts to props change', () => {
    wrapper = mount(<ColorPicker color="#abcdef" componentRef={colorPickerRef} />);

    wrapper.setProps({ color: '#AEAEAE' });
    expect(colorPickerRef.current!.color.hex).toEqual('aeaeae');
  });

  it('calls onColorChange', () => {
    let color = '#FFFFFF';
    let newColorObject: IColor | undefined;
    const onColorChanged = (str: string, colorObject: IColor): void => {
      color = str;
      newColorObject = colorObject;
    };

    wrapper = mount(<ColorPicker color={color} componentRef={colorPickerRef} onColorChanged={onColorChanged} />);

    const newColor = '#AEAEAE';
    wrapper.setProps({ color: newColor });

    expect(colorPickerRef.current!.color.hex).toEqual('aeaeae');
    expect(color).toEqual(newColor);
    expect(newColorObject).toEqual(getColorFromString(newColor));
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
        onColorChanged={colorChangeSpy}
        componentRef={colorPickerRef}
        styles={{ input: inputClassName }}
      />
    );

    expect(colorPickerRef.current!.color.hex).toEqual(colorStringValue);
    expect(colorChangeSpy).toHaveBeenCalledTimes(0);

    // Tab between text inputs checking state after each time.
    const allInputs = wrapper.find(`.${inputClassName} input`);
    expect(allInputs.length).toBe(5);

    allInputs.forEach(input => {
      input.simulate('focus');
      input.simulate('blur');

      expect(colorPickerRef.current!.color.hex).toEqual(colorStringValue);
      expect(colorChangeSpy).toHaveBeenCalledTimes(0);
    });
  });

  it('allows updating text fields', () => {
    let updatedColor: string | undefined;
    const onChange = jest.fn((color: string) => (updatedColor = color));

    wrapper = mount(<ColorPicker onColorChanged={onChange} color="#000000" />);

    const inputs = wrapper.getDOMNode().querySelectorAll('.ms-ColorPicker-input input');
    const redInput = inputs[1];
    ReactTestUtils.Simulate.input(redInput, mockEvent('255'));
    ReactTestUtils.Simulate.blur(redInput);
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(updatedColor).toBe('#ff0000');

    const hexInput = inputs[0];
    ReactTestUtils.Simulate.input(hexInput, mockEvent('00ff00'));
    ReactTestUtils.Simulate.blur(hexInput);
    expect(onChange).toHaveBeenCalledTimes(2);
    expect(updatedColor).toBe('#00ff00');

    const alphaInput = inputs[4];
    ReactTestUtils.Simulate.input(alphaInput, mockEvent('50'));
    ReactTestUtils.Simulate.blur(alphaInput);
    expect(onChange).toHaveBeenCalledTimes(3);
    expect(updatedColor).toBe('rgba(0, 255, 0, 0.5)');
  });

  it('allows updating text fields when alpha slider is hidden', () => {
    let updatedColor: string | undefined;
    const onChange = jest.fn((color: string) => (updatedColor = color));

    wrapper = mount(<ColorPicker onColorChanged={onChange} color="#000000" alphaSliderHidden />);

    const inputs = wrapper.getDOMNode().querySelectorAll('.ms-ColorPicker-input input');
    const redInput = inputs[1];
    ReactTestUtils.Simulate.input(redInput, mockEvent('255'));
    ReactTestUtils.Simulate.blur(redInput);
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(updatedColor).toBe('#ff0000');

    const hexInput = inputs[0];
    ReactTestUtils.Simulate.input(hexInput, mockEvent('00ff00'));
    ReactTestUtils.Simulate.blur(hexInput);
    expect(onChange).toHaveBeenCalledTimes(2);
    expect(updatedColor).toBe('#00ff00');
  });
});
