import * as React from 'react';
import * as renderer from 'react-test-renderer';
import { mount, ReactWrapper } from 'enzyme';
import * as ReactTestUtils from 'react-dom/test-utils';

import { ColorPicker } from './ColorPicker';
import { ColorPickerBase, IColorPickerState } from './ColorPicker.base';
import { IColorPickerProps, IColorPickerStrings } from './ColorPicker.types';
import { IColor } from '../../utilities/color/interfaces';
import { resetIds } from '../../Utilities';
import { getColorFromString } from '../../utilities/color/getColorFromString';
import { mockEvent } from '../../common/testUtilities';
import { ColorRectangleBase } from './ColorRectangle/ColorRectangle.base';
import { ColorSliderBase } from './ColorSlider/ColorSlider.base';
import { isConformant } from '../../common/isConformant';

const noOp = () => undefined;
const abcdef = getColorFromString('#abcdef')!;
const black = getColorFromString('#000000')!;
const white = getColorFromString('#ffffff')!;
const AEAEAE = getColorFromString('#AEAEAE')!;

describe('ColorPicker', () => {
  beforeEach(() => {
    // Resetting ids to create predictability in generated ids.
    resetIds();
  });

  let wrapper: ReactWrapper<IColorPickerProps, IColorPickerState, ColorPickerBase> | undefined;
  let colorPicker: ColorPickerBase | null = null;
  const colorPickerRef = (ref: ColorPickerBase | null) => {
    colorPicker = ref;
  };

  let updatedColor: IColor | undefined;
  const onChange = jest.fn((ev: any, color: IColor) => {
    updatedColor = color;
  });

  interface IValidateChangeOptions {
    calls: number;
    prop: keyof IColor;
    value: string | number;
    input?: HTMLInputElement;
    inputValue?: string;
  }

  /** Verify that the text inputs have the correct values */
  function verifyInputs(color: IColor, alphaType: IColorPickerProps['alphaType'] = 'alpha') {
    const hasAlpha = alphaType !== 'none';
    const inputs = wrapper!.getDOMNode().querySelectorAll('input') as NodeListOf<HTMLInputElement>;
    expect(inputs).toHaveLength(hasAlpha ? 5 : 4);
    expect(inputs[0].value).toBe(color.hex);
    expect(inputs[1].value).toBe(String(color.r));
    expect(inputs[2].value).toBe(String(color.g));
    expect(inputs[3].value).toBe(String(color.b));
    if (hasAlpha) {
      expect(inputs[4].value).toBe(String(alphaType === 'transparency' ? color.t : color.a));
    }
  }

  function validateChange(opts: IValidateChangeOptions) {
    const { calls, prop, value, input, inputValue = String(value) } = opts;
    expect(onChange).toHaveBeenCalledTimes(calls);
    if (calls > 0) {
      expect(updatedColor![prop]).toBe(value);
    }
    expect(colorPicker!.color[prop]).toBe(value);
    if (input) {
      expect(input.value).toBe(inputValue);
    }
  }

  afterEach(() => {
    if (wrapper) {
      wrapper.unmount();
      wrapper = undefined;
    }
    updatedColor = undefined;
    // clear onChange calls
    onChange.mockClear();
  });

  it('renders correctly', () => {
    const component = renderer.create(<ColorPicker color="#abcdef" />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders correctly with preview', () => {
    const component = renderer.create(<ColorPicker color="#abcdef" showPreview />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders correctly with transparency', () => {
    const component = renderer.create(<ColorPicker color="#abcdef" alphaType="transparency" />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  isConformant({
    Component: ColorPicker,
    displayName: 'ColorPicker',
    // Problem: Doesn’t handle ref.
    // Solution: Add a ref to the root element.
    disabledTests: ['has-top-level-file', 'component-handles-ref', 'component-has-root-ref'],
  });

  it('uses provided color string', () => {
    wrapper = mount(<ColorPicker color={abcdef.str} onChange={noOp} componentRef={colorPickerRef} />);

    expect(colorPicker!.color.hex).toEqual(abcdef.hex);
    verifyInputs(abcdef);
  });

  it('uses provided color object', () => {
    wrapper = mount(<ColorPicker color={abcdef} onChange={noOp} componentRef={colorPickerRef} />);

    expect(colorPicker!.color).toEqual(abcdef);
    verifyInputs(abcdef);
  });

  it('handles color object with 0 values correctly', () => {
    wrapper = mount(<ColorPicker color={black} onChange={noOp} componentRef={colorPickerRef} />);
    // Inputs should not have empty strings
    verifyInputs(black);
  });

  it('respects color prop change', () => {
    wrapper = mount(<ColorPicker color="#abcdef" onChange={onChange} componentRef={colorPickerRef} />);

    wrapper.setProps({ color: AEAEAE.str });
    expect(colorPicker!.color.hex).toEqual(AEAEAE.hex);
    verifyInputs(AEAEAE);
    // shouldn't call onChange when the consumer updates the color prop
    expect(onChange).toHaveBeenCalledTimes(0);
  });

  it('ignores invalid updates to color prop', () => {
    wrapper = mount(<ColorPicker color={abcdef} onChange={onChange} componentRef={colorPickerRef} />);

    wrapper.setProps({ color: 'foo' });
    expect(colorPicker!.color.hex).toEqual(abcdef.hex);
    verifyInputs(abcdef);
    expect(onChange).toHaveBeenCalledTimes(0);
  });

  it('hides alpha control slider', () => {
    wrapper = mount(<ColorPicker color={white} alphaType="none" />);

    const alphaSlider = wrapper.find('.is-alpha');
    const tableHeaders = wrapper.find('thead td');

    // There should only be table headers and inputs for hex, red, green, and blue (no alpha)
    expect(alphaSlider.exists()).toBe(false);
    expect(tableHeaders).toHaveLength(4);
    verifyInputs(white, 'none');
  });

  it('shows preview box', () => {
    wrapper = mount(<ColorPicker color="#FFFFFF" showPreview={true} />);

    const previewBox = wrapper.find('.is-preview');

    // There should be one preview box
    expect(previewBox.exists()).toBe(true);
  });

  it('hides preview box', () => {
    wrapper = mount(<ColorPicker color="#FFFFFF" showPreview={false} />);

    const previewBox = wrapper.find('.is-preview');

    // There should be one preview box
    expect(previewBox.exists()).toBe(false);
  });

  it('renders default RGBA/Hex strings', () => {
    wrapper = mount(<ColorPicker color="#FFFFFF" />);

    const tableHeaders = wrapper.find('thead td');
    const strings = ColorPickerBase.defaultProps.strings!;
    const textHeaders = [strings.hex, strings.red, strings.green, strings.blue, strings.alpha];

    tableHeaders.forEach((node, index) => {
      expect(node.text()).toEqual(textHeaders[index]);
    });

    // also check the corresponding aria labels
    const inputs = wrapper.find('input');
    inputs.forEach((node, index) => {
      expect(node.prop('aria-label')).toEqual(textHeaders[index]);
    });
  });

  it('renders custom strings', () => {
    const fields = ['Custom Hex', 'Custom Red', 'Custom Green', 'Custom Blue', 'Custom Alpha'];
    const customStrings: IColorPickerStrings = {
      hex: fields[0],
      red: fields[1],
      green: fields[2],
      blue: fields[3],
      alpha: fields[4],
      svAriaLabel: 'custom rectangle',
      svAriaDescription: 'custom rectangle description',
      svAriaValueFormat: 'custom rectangle value', // missing placeholders but code doesn't check for that
      hueAriaLabel: 'custom hue',
    };

    wrapper = mount(<ColorPicker color="#FFFFFF" strings={customStrings} />);

    const tableHeaders = wrapper.find('thead td');
    tableHeaders.forEach((node, index) => {
      expect(node.text()).toEqual(fields[index]);
    });

    // Check for the aria strings in the HTML of the corresponding components (simplest way
    // to verify ColorPicker is passing custom values through correctly)
    const rectangleHtml = wrapper.find(ColorRectangleBase).html();
    expect(rectangleHtml).toContain(customStrings.svAriaLabel);
    expect(rectangleHtml).toContain(customStrings.svAriaDescription);
    expect(rectangleHtml).toContain(customStrings.svAriaValueFormat);

    const sliders = wrapper.find(ColorSliderBase);
    expect(sliders.at(0).html()).toContain(customStrings.hueAriaLabel);
    expect(sliders.at(1).html()).toContain('Custom Alpha');
  });

  it('uses default aria label', () => {
    wrapper = mount(<ColorPicker color="#abcdef" />);
    expect(wrapper.getDOMNode().getAttribute('aria-label')).toBe(
      'Color picker, Red 171 Green 205 Blue 239 Alpha 100% selected.',
    );

    wrapper.setProps({ color: 'rgba(255, 0, 0, 0.5)' });
    expect(wrapper.getDOMNode().getAttribute('aria-label')).toBe(
      'Color picker, Red 255 Green 0 Blue 0 Alpha 50% selected.',
    );
  });

  it('can use custom aria label', () => {
    wrapper = mount(<ColorPicker color="#abcdef" strings={{ rootAriaLabelFormat: 'custom color picker {0}' }} />);
    expect(wrapper.getDOMNode().getAttribute('aria-label')).toBe(
      'custom color picker Red 171 Green 205 Blue 239 Alpha 100%',
    );
  });

  it('handles transparency', () => {
    const color = getColorFromString('rgba(20, 30, 40, 0.3)')!;
    wrapper = mount(
      <ColorPicker color={color} alphaType="transparency" onChange={noOp} componentRef={colorPickerRef} />,
    );

    expect(colorPicker!.color).toEqual(color);
    verifyInputs(color, 'transparency');

    const tableHeaders = wrapper.find('thead td');
    expect(tableHeaders.at(4).text()).toBe('Transparency');
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
      />,
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
    wrapper = mount(<ColorPicker onChange={onChange} color="#000000" componentRef={colorPickerRef} />);

    const inputs = wrapper.getDOMNode().querySelectorAll('.ms-ColorPicker-input input') as NodeListOf<HTMLInputElement>;

    const redInput = inputs[1];
    ReactTestUtils.Simulate.input(redInput, mockEvent('255'));
    validateChange({ calls: 1, prop: 'str', value: '#ff0000' });
    validateChange({ calls: 1, prop: 'r', value: 255, input: redInput });
    // blur and make sure nothing changes
    ReactTestUtils.Simulate.blur(redInput);
    validateChange({ calls: 1, prop: 'str', value: '#ff0000' });

    const hexInput = inputs[0];
    ReactTestUtils.Simulate.input(hexInput, mockEvent('00ff00'));
    validateChange({ calls: 2, prop: 'str', value: '#00ff00' });
    validateChange({ calls: 2, prop: 'hex', value: '00ff00', input: hexInput });
    ReactTestUtils.Simulate.blur(hexInput);
    validateChange({ calls: 2, prop: 'str', value: '#00ff00' });

    const alphaInput = inputs[4];
    ReactTestUtils.Simulate.input(alphaInput, mockEvent('50'));
    ReactTestUtils.Simulate.blur(alphaInput);
    validateChange({ calls: 3, prop: 'str', value: 'rgba(0, 255, 0, 0.5)' });
    validateChange({ calls: 3, prop: 'a', value: 50 });
  });

  it('handles updating transparency text field', () => {
    wrapper = mount(
      <ColorPicker alphaType="transparency" onChange={onChange} color="#000000" componentRef={colorPickerRef} />,
    );

    const transparencyInput = wrapper.getDOMNode().querySelectorAll('input')[4];

    ReactTestUtils.Simulate.input(transparencyInput, mockEvent('30'));
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(updatedColor!.t).toBe(30);
    expect(colorPicker!.color.t).toBe(30);
    expect(transparencyInput.value).toBe('30');
    expect(updatedColor!.a).toBe(70);
    expect(colorPicker!.color.a).toBe(70);
  });

  // This has repeatedly broken in the past (really)
  it('allows updating text fields when alpha slider is hidden', () => {
    wrapper = mount(<ColorPicker onChange={onChange} color="#000000" alphaType="none" componentRef={colorPickerRef} />);

    const inputs = wrapper.getDOMNode().querySelectorAll('.ms-ColorPicker-input input') as NodeListOf<HTMLInputElement>;

    const redInput = inputs[1];
    ReactTestUtils.Simulate.input(redInput, mockEvent('255'));
    validateChange({ calls: 1, prop: 'str', value: '#ff0000' });
    validateChange({ calls: 1, prop: 'r', value: 255, input: redInput });
    // blur and make sure nothing changes
    ReactTestUtils.Simulate.blur(redInput);
    validateChange({ calls: 1, prop: 'str', value: '#ff0000' });

    const hexInput = inputs[0];
    ReactTestUtils.Simulate.input(hexInput, mockEvent('00ff00'));
    validateChange({ calls: 2, prop: 'str', value: '#00ff00' });
    validateChange({ calls: 2, prop: 'hex', value: '00ff00', input: hexInput });
    ReactTestUtils.Simulate.blur(hexInput);
    validateChange({ calls: 2, prop: 'str', value: '#00ff00' });
  });

  it('does not update if default prevented', () => {
    let newColor: IColor | undefined;
    const onChange1 = jest.fn((ev: React.SyntheticEvent, color: IColor) => {
      newColor = color;
      ev.preventDefault();
    });
    wrapper = mount(<ColorPicker onChange={onChange1} color="#000000" componentRef={colorPickerRef} />);

    const redInput = wrapper.getDOMNode().querySelectorAll('.ms-ColorPicker-input input')[1] as HTMLInputElement;
    ReactTestUtils.Simulate.input(redInput, mockEvent('255'));
    expect(onChange1).toHaveBeenCalledTimes(1);
    expect(newColor!.r).toBe(255);
    expect(colorPicker!.color.r).toBe(0);
  });

  it('ignores non-numeric RGBA input', () => {
    wrapper = mount(<ColorPicker onChange={onChange} color="#000000" componentRef={colorPickerRef} />);

    const redInput = wrapper.getDOMNode().querySelectorAll('.ms-ColorPicker-input input')[1] as HTMLInputElement;

    // valid value => accepted
    ReactTestUtils.Simulate.input(redInput, mockEvent('12'));
    validateChange({ calls: 1, prop: 'r', value: 12, input: redInput });

    // decimal added to valid value => totally ignored
    ReactTestUtils.Simulate.input(redInput, mockEvent('12.'));
    validateChange({ calls: 1, prop: 'r', value: 12 });

    // non-number added to valid value => totally ignored
    ReactTestUtils.Simulate.input(redInput, mockEvent('12x'));
    validateChange({ calls: 1, prop: 'r', value: 12 });

    // empty value => color not updated, value preserved
    ReactTestUtils.Simulate.input(redInput, mockEvent(''));
    validateChange({ calls: 1, prop: 'r', value: 12, input: redInput, inputValue: '' });

    // non-number in empty field => totally ignored
    ReactTestUtils.Simulate.input(redInput, mockEvent('x'));
    validateChange({ calls: 1, prop: 'r', value: 12, input: redInput, inputValue: '' });
  });

  it('reverts to previous valid RGBA value on blur if field is empty', () => {
    wrapper = mount(<ColorPicker onChange={onChange} color="#000000" componentRef={colorPickerRef} />);

    const redInput = wrapper.getDOMNode().querySelectorAll('.ms-ColorPicker-input input')[1] as HTMLInputElement;

    // valid value => accepted
    ReactTestUtils.Simulate.input(redInput, mockEvent('123'));
    validateChange({ calls: 1, prop: 'r', value: 123, input: redInput });

    // empty value => color not updated, value preserved
    ReactTestUtils.Simulate.input(redInput, mockEvent(''));
    validateChange({ calls: 1, prop: 'r', value: 123, input: redInput, inputValue: '' });

    // reverts to previous valid value on blur
    ReactTestUtils.Simulate.blur(redInput);
    validateChange({ calls: 1, prop: 'r', value: 123 });
  });

  it('clamps RGB input too large', () => {
    wrapper = mount(<ColorPicker onChange={onChange} color="#000000" componentRef={colorPickerRef} />);

    const redInput = wrapper.getDOMNode().querySelectorAll('.ms-ColorPicker-input input')[1] as HTMLInputElement;

    ReactTestUtils.Simulate.input(redInput, mockEvent('123'));
    validateChange({ calls: 1, prop: 'r', value: 123, input: redInput });

    // value too large => allowed in field but onChange not called
    ReactTestUtils.Simulate.input(redInput, mockEvent('456'));
    validateChange({ calls: 1, prop: 'r', value: 123, input: redInput, inputValue: '456' });

    // blur => value clamped
    ReactTestUtils.Simulate.blur(redInput);
    validateChange({ calls: 2, prop: 'r', value: 255, input: redInput });
  });

  it('clamps alpha input too large', () => {
    wrapper = mount(<ColorPicker onChange={onChange} color="#000000" componentRef={colorPickerRef} />);

    const alphaInput = wrapper.getDOMNode().querySelectorAll('.ms-ColorPicker-input input')[4] as HTMLInputElement;

    ReactTestUtils.Simulate.input(alphaInput, mockEvent('50'));
    validateChange({ calls: 1, prop: 'a', value: 50, input: alphaInput });

    // value too large => allowed in field but onChange not called
    ReactTestUtils.Simulate.input(alphaInput, mockEvent('123'));
    validateChange({ calls: 1, prop: 'a', value: 50, input: alphaInput, inputValue: '123' });

    // blur => value clamped
    ReactTestUtils.Simulate.blur(alphaInput);
    validateChange({ calls: 2, prop: 'a', value: 100, input: alphaInput });
  });

  it('handles RGBA input too long', () => {
    wrapper = mount(<ColorPicker onChange={onChange} color="#000000" componentRef={colorPickerRef} />);

    const redInput = wrapper.getDOMNode().querySelectorAll('.ms-ColorPicker-input input')[1] as HTMLInputElement;

    // valid value => accepted
    ReactTestUtils.Simulate.input(redInput, mockEvent('123'));
    validateChange({ calls: 1, prop: 'r', value: 123, input: redInput });

    // extra char added => use existing substring
    ReactTestUtils.Simulate.input(redInput, mockEvent('1234'));
    validateChange({ calls: 1, prop: 'r', value: 123, input: redInput });

    // new value too long "pasted" => use substring
    ReactTestUtils.Simulate.input(redInput, mockEvent('1000'));
    validateChange({ calls: 2, prop: 'r', value: 100, input: redInput });

    // invalid new value too long "pasted" => use substring but don't call onChange
    ReactTestUtils.Simulate.input(redInput, mockEvent('4567'));
    validateChange({ calls: 2, prop: 'r', value: 100, input: redInput, inputValue: '456' });
  });

  it('handles 3-char hex value', () => {
    wrapper = mount(<ColorPicker onChange={onChange} color="#000000" componentRef={colorPickerRef} />);

    const hexInput = wrapper.getDOMNode().querySelector('.ms-ColorPicker-input input') as HTMLInputElement;

    ReactTestUtils.Simulate.input(hexInput, mockEvent('faf'));
    expect(onChange).toHaveBeenCalledTimes(0);
    expect(hexInput.value).toBe('faf');

    ReactTestUtils.Simulate.blur(hexInput);
    validateChange({ calls: 1, prop: 'hex', value: 'ffaaff', input: hexInput });
    expect(colorPicker!.color.str).toBe('#faf');
  });

  it('handles incrementally typing a 6-char hex value', () => {
    wrapper = mount(<ColorPicker onChange={onChange} color="#000000" componentRef={colorPickerRef} />);

    const hexInput = wrapper.getDOMNode().querySelector('.ms-ColorPicker-input input') as HTMLInputElement;
    const testHexValue = 'f1f2f3';

    // The intermediate value should be preserved, not automatically converted to length 6
    for (let i = 2; i <= 5; i++) {
      const hexSubstr = testHexValue.substr(0, i);
      ReactTestUtils.Simulate.input(hexInput, mockEvent(hexSubstr));
      validateChange({ calls: 0, prop: 'hex', value: '000000', input: hexInput, inputValue: hexSubstr });
    }

    // Only the full-length value should trigger onChange
    ReactTestUtils.Simulate.input(hexInput, mockEvent(testHexValue));
    validateChange({ calls: 1, prop: 'hex', value: testHexValue, input: hexInput });
  });

  it('handles uppercase hex', () => {
    wrapper = mount(<ColorPicker onChange={onChange} color="#000000" componentRef={colorPickerRef} />);

    const hexInput = wrapper.getDOMNode().querySelector('.ms-ColorPicker-input input') as HTMLInputElement;
    const testHexValue = 'F1F2F3';

    ReactTestUtils.Simulate.input(hexInput, mockEvent(testHexValue));
    validateChange({ calls: 1, prop: 'hex', value: testHexValue.toLowerCase(), input: hexInput });
    validateChange({ calls: 1, prop: 'str', value: '#' + testHexValue });
  });

  it('ignores non-hexadecimal hex input', () => {
    wrapper = mount(<ColorPicker onChange={onChange} color="#000000" componentRef={colorPickerRef} />);

    const hexInput = wrapper.getDOMNode().querySelector('.ms-ColorPicker-input input') as HTMLInputElement;

    ReactTestUtils.Simulate.input(hexInput, mockEvent('hello'));
    validateChange({ calls: 0, prop: 'hex', value: '000000', input: hexInput });

    ReactTestUtils.Simulate.input(hexInput, mockEvent('abc'));
    validateChange({ calls: 0, prop: 'hex', value: '000000', input: hexInput, inputValue: 'abc' });

    ReactTestUtils.Simulate.input(hexInput, mockEvent('abch'));
    validateChange({ calls: 0, prop: 'hex', value: '000000', input: hexInput, inputValue: 'abc' });

    ReactTestUtils.Simulate.blur(hexInput);
    validateChange({ calls: 1, prop: 'hex', value: 'aabbcc', input: hexInput });
  });

  it('handles hex value too long', () => {
    wrapper = mount(<ColorPicker onChange={onChange} color="#000000" componentRef={colorPickerRef} />);

    const hexInput = wrapper.getDOMNode().querySelector('.ms-ColorPicker-input input') as HTMLInputElement;

    // input too long "pasted" => use substring
    ReactTestUtils.Simulate.input(hexInput, mockEvent('1234567'));
    validateChange({ calls: 1, prop: 'hex', value: '123456', input: hexInput });

    // invalid new value too long "pasted" => ignore
    ReactTestUtils.Simulate.input(hexInput, mockEvent('hello world'));
    validateChange({ calls: 1, prop: 'hex', value: '123456', input: hexInput });
  });

  it('reverts to previous valid hex value on blur if input is too short', () => {
    wrapper = mount(<ColorPicker onChange={onChange} color="#abcdef" componentRef={colorPickerRef} />);

    const hexInput = wrapper.getDOMNode().querySelector('.ms-ColorPicker-input input') as HTMLInputElement;

    ReactTestUtils.Simulate.input(hexInput, mockEvent(''));
    validateChange({ calls: 0, prop: 'hex', value: 'abcdef', input: hexInput, inputValue: '' });
    ReactTestUtils.Simulate.blur(hexInput);
    validateChange({ calls: 0, prop: 'hex', value: 'abcdef' });

    ReactTestUtils.Simulate.input(hexInput, mockEvent('12'));
    validateChange({ calls: 0, prop: 'hex', value: 'abcdef', input: hexInput, inputValue: '12' });
    ReactTestUtils.Simulate.blur(hexInput);
    validateChange({ calls: 0, prop: 'hex', value: 'abcdef' });
  });

  it('handles hex value of length 4 or 5 on blur', () => {
    wrapper = mount(<ColorPicker onChange={onChange} color="#000000" componentRef={colorPickerRef} />);

    const hexInput = wrapper.getDOMNode().querySelector('.ms-ColorPicker-input input') as HTMLInputElement;

    ReactTestUtils.Simulate.input(hexInput, mockEvent('abcd'));
    validateChange({ calls: 0, prop: 'hex', value: '000000', input: hexInput, inputValue: 'abcd' });
    // interpret as 3-char hex on blur
    ReactTestUtils.Simulate.blur(hexInput);
    validateChange({ calls: 1, prop: 'hex', value: 'aabbcc' });

    ReactTestUtils.Simulate.input(hexInput, mockEvent('12345'));
    validateChange({ calls: 1, prop: 'hex', value: 'aabbcc', input: hexInput, inputValue: '12345' });
    ReactTestUtils.Simulate.blur(hexInput);
    validateChange({ calls: 2, prop: 'hex', value: '112233' });
  });

  it('handles typing invalid value then going back to previous valid value', () => {
    wrapper = mount(<ColorPicker onChange={onChange} color="#abcdef" componentRef={colorPickerRef} />);

    const hexInput = wrapper.getDOMNode().querySelector('.ms-ColorPicker-input input') as HTMLInputElement;

    // suppose they delete a character
    ReactTestUtils.Simulate.input(hexInput, mockEvent('abcde'));
    validateChange({ calls: 0, prop: 'hex', value: 'abcdef', input: hexInput, inputValue: 'abcde' });
    // then add it back
    ReactTestUtils.Simulate.input(hexInput, mockEvent('abcdef'));
    validateChange({ calls: 0, prop: 'hex', value: 'abcdef', input: hexInput });
    // verify the internal intermediate value is cleared
    expect(colorPicker!.state.editingColor).toBeUndefined();

    // original value is preserved on blur
    ReactTestUtils.Simulate.blur(hexInput);
    validateChange({ calls: 0, prop: 'hex', value: 'abcdef', input: hexInput });
  });

  it('handles intermediate invalid transparency values', () => {
    const color = getColorFromString('rgba(20, 30, 40, 0.3)')!;

    wrapper = mount(
      <ColorPicker alphaType="transparency" onChange={onChange} color={color} componentRef={colorPickerRef} />,
    );

    const transparencyInput = wrapper.getDOMNode().querySelectorAll('input')[4];

    // value too large => allowed in field but onChange not called
    ReactTestUtils.Simulate.input(transparencyInput, mockEvent('123'));
    expect(onChange).toHaveBeenCalledTimes(0);
    expect(colorPicker!.color.a).toBe(30); // original value
    expect(colorPicker!.color.t).toBe(70);
    expect(colorPicker!.state.editingColor).toEqual({ component: 't', value: '123' });
    expect(transparencyInput.value).toBe('123');

    // blur => value clamped (with correct alpha/transparency conversion)
    ReactTestUtils.Simulate.blur(transparencyInput);
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(colorPicker!.color.t).toBe(100);
    expect(updatedColor!.t).toBe(100);
    expect(transparencyInput.value).toBe('100');
    expect(colorPicker!.color.a).toBe(0);
    expect(updatedColor!.a).toBe(0);
  });
});
