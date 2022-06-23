import * as React from 'react';
import { render, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { ColorPicker } from './ColorPicker';
import { ColorPickerBase } from './ColorPicker.base';
import { resetIds } from '../../Utilities';
import { getColorFromString } from '../../utilities/color/getColorFromString';
import { isConformant } from '../../common/isConformant';
import type { IColorPickerProps, IColorPickerStrings } from './ColorPicker.types';
import type { IColor } from '../../utilities/color/interfaces';

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
  function verifyInputs(
    inputs: HTMLInputElement[],
    color: IColor,
    alphaType: IColorPickerProps['alphaType'] = 'alpha',
  ) {
    const hasAlpha = alphaType !== 'none';
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
    updatedColor = undefined;
    // clear onChange calls
    onChange.mockClear();
  });

  it('renders correctly', () => {
    const { container } = render(<ColorPicker color="#abcdef" />);
    expect(container).toMatchSnapshot();
  });

  it('renders correctly with preview', () => {
    const { container } = render(<ColorPicker color="#abcdef" showPreview />);
    expect(container).toMatchSnapshot();
  });

  it('renders correctly with transparency', () => {
    const { container } = render(<ColorPicker color="#abcdef" alphaType="transparency" />);
    expect(container).toMatchSnapshot();
  });

  isConformant({
    Component: ColorPicker,
    displayName: 'ColorPicker',
    // Problem: Doesn’t handle ref.
    // Solution: Add a ref to the root element.
    disabledTests: ['has-top-level-file', 'component-handles-ref', 'component-has-root-ref'],
  });

  it('uses provided color string', () => {
    const { getAllByRole } = render(<ColorPicker color={abcdef.str} onChange={noOp} componentRef={colorPickerRef} />);

    expect(colorPicker!.color.hex).toEqual(abcdef.hex);
    const inputs = getAllByRole('textbox') as HTMLInputElement[];
    verifyInputs(inputs, abcdef);
  });

  it('uses provided color object', () => {
    const { getAllByRole } = render(<ColorPicker color={abcdef} onChange={noOp} componentRef={colorPickerRef} />);

    expect(colorPicker!.color).toEqual(abcdef);
    const inputs = getAllByRole('textbox') as HTMLInputElement[];
    verifyInputs(inputs, abcdef);
  });

  it('handles color object with 0 values correctly', () => {
    const { getAllByRole } = render(<ColorPicker color={black} onChange={noOp} componentRef={colorPickerRef} />);
    const inputs = getAllByRole('textbox') as HTMLInputElement[];
    // Inputs should not have empty strings
    verifyInputs(inputs, black);
  });

  it('respects color prop change', () => {
    const { getAllByRole, rerender } = render(
      <ColorPicker color="#abcdef" onChange={onChange} componentRef={colorPickerRef} />,
    );

    rerender(<ColorPicker color={AEAEAE.str} onChange={onChange} componentRef={colorPickerRef} />);
    expect(colorPicker!.color.hex).toEqual(AEAEAE.hex);
    const inputs = getAllByRole('textbox') as HTMLInputElement[];
    verifyInputs(inputs, AEAEAE);
    // shouldn't call onChange when the consumer updates the color prop
    expect(onChange).toHaveBeenCalledTimes(0);
  });

  it('ignores invalid updates to color prop', () => {
    const { getAllByRole, rerender } = render(
      <ColorPicker color={abcdef} onChange={onChange} componentRef={colorPickerRef} />,
    );

    rerender(<ColorPicker color={'foo'} onChange={onChange} componentRef={colorPickerRef} />);
    expect(colorPicker!.color.hex).toEqual(abcdef.hex);
    const inputs = getAllByRole('textbox') as HTMLInputElement[];
    verifyInputs(inputs, abcdef);
    expect(onChange).toHaveBeenCalledTimes(0);
  });

  it('hides alpha control slider', () => {
    const { container, getAllByRole, queryByRole } = render(<ColorPicker color={white} alphaType="none" />);

    const alphaSlider = queryByRole('slider', { name: 'Alpha' });
    const tableHeaders = container.querySelectorAll('thead td');

    // There should only be table headers and inputs for hex, red, green, and blue (no alpha)
    expect(alphaSlider).toBeFalsy();
    expect(tableHeaders).toHaveLength(4);
    const inputs = getAllByRole('textbox') as HTMLInputElement[];
    verifyInputs(inputs, white, 'none');
  });

  it('shows preview box', () => {
    const { getAllByRole } = render(<ColorPicker color="#FFFFFF" showPreview={true} />);
    const colorPickerRoot = getAllByRole('group')[0];
    const previewBox = colorPickerRoot.querySelector('.is-preview');

    // There should be one preview box
    expect(previewBox).toBeTruthy();
  });

  it('hides preview box', () => {
    const { getAllByRole } = render(<ColorPicker color="#FFFFFF" showPreview={false} />);
    const colorPickerRoot = getAllByRole('group')[0];
    const previewBox = colorPickerRoot.querySelector('.is-preview');

    // There should be one preview box
    expect(previewBox).toBeFalsy();
  });

  it('renders default RGBA/Hex strings', () => {
    const { container, getAllByRole } = render(<ColorPicker color="#FFFFFF" />);

    const tableHeaders = container.querySelectorAll('thead td');
    const strings = ColorPickerBase.defaultProps.strings!;
    const textHeaders = [strings.hex, strings.red, strings.green, strings.blue, strings.alpha];

    tableHeaders.forEach((node, index) => {
      expect(node.textContent).toEqual(textHeaders[index]);
    });

    // also check the corresponding aria labels
    const inputs = getAllByRole('textbox') as HTMLInputElement[];
    inputs.forEach((node, index) => {
      expect(node.getAttribute('aria-label')).toEqual(textHeaders[index]);
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

    const { container, getAllByRole } = render(<ColorPicker color="#FFFFFF" strings={customStrings} />);

    const tableHeaders = container.querySelectorAll('thead td');
    tableHeaders.forEach((node, index) => {
      expect(node.textContent).toEqual(fields[index]);
    });

    // Check for the aria strings in the HTML of the corresponding components (simplest way
    // to verify ColorPicker is passing custom values through correctly)
    const rectangleHtml = getAllByRole('slider')[0];
    expect(rectangleHtml.getAttribute('aria-label')).toEqual(customStrings.svAriaLabel);
    expect(rectangleHtml.firstElementChild!.textContent).toEqual(customStrings.svAriaDescription);
    expect(rectangleHtml.getAttribute('aria-valuetext')).toEqual(customStrings.svAriaValueFormat);

    const sliders = getAllByRole('slider');
    expect(sliders[1].getAttribute('aria-label')).toEqual(customStrings.hueAriaLabel);
    expect(sliders[2].getAttribute('aria-label')).toEqual('Custom Alpha');
  });

  it('uses default aria label', () => {
    const { getAllByRole, rerender } = render(<ColorPicker color="#abcdef" />);
    const colorPickerRoot = getAllByRole('group')[0];
    expect(colorPickerRoot.getAttribute('aria-label')).toBe(
      'Color picker, Red 171 Green 205 Blue 239 Alpha 100% selected.',
    );

    rerender(<ColorPicker color="rgba(255, 0, 0, 0.5)" />);

    expect(colorPickerRoot.getAttribute('aria-label')).toBe('Color picker, Red 255 Green 0 Blue 0 Alpha 50% selected.');
  });

  it('can use custom aria label', () => {
    const { getAllByRole } = render(
      <ColorPicker color="#abcdef" strings={{ rootAriaLabelFormat: 'custom color picker {0}' }} />,
    );
    const colorPickerRoot = getAllByRole('group')[0];
    expect(colorPickerRoot.getAttribute('aria-label')).toBe(
      'custom color picker Red 171 Green 205 Blue 239 Alpha 100%',
    );
  });

  it('handles transparency', () => {
    const color = getColorFromString('rgba(20, 30, 40, 0.3)')!;
    const { container, getAllByRole } = render(
      <ColorPicker color={color} alphaType="transparency" onChange={noOp} componentRef={colorPickerRef} />,
    );

    expect(colorPicker!.color).toEqual(color);
    const inputs = getAllByRole('textbox') as HTMLInputElement[];
    verifyInputs(inputs, color, 'transparency');

    const tableHeaders = container.querySelectorAll('thead td');

    expect(tableHeaders[4].textContent).toBe('Transparency');
  });

  it('keeps color value when tabbing between Hex and RGBA text inputs', () => {
    const colorStringValue = 'abcdef';
    const colorChangeSpy = jest.fn();
    const inputClassName = 'input-tab-test';
    const { getAllByRole } = render(
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
    const inputs = getAllByRole('textbox') as HTMLInputElement[];
    expect(inputs.length).toBe(5);

    userEvent.click(inputs[0]);
    for (let i = 1; i < inputs.length; i++) {
      userEvent.tab();

      expect(colorPicker!.color.hex).toEqual(colorStringValue);
      expect(colorChangeSpy).toHaveBeenCalledTimes(0);
    }
  });

  it('allows updating text fields', () => {
    const { container, getAllByRole } = render(
      <ColorPicker onChange={onChange} color="#000000" componentRef={colorPickerRef} />,
    );

    const inputs = getAllByRole('textbox') as HTMLInputElement[];

    const redInput = inputs[1];
    userEvent.clear(redInput);
    userEvent.type(redInput, '255');
    validateChange({ calls: 3, prop: 'str', value: '#ff0000' });
    validateChange({ calls: 3, prop: 'r', value: 255, input: redInput });
    // blur and make sure nothing changes
    userEvent.click(container);
    validateChange({ calls: 3, prop: 'str', value: '#ff0000' });

    const hexInput = inputs[0];
    userEvent.clear(hexInput);
    userEvent.type(hexInput, '00ff00');
    validateChange({ calls: 4, prop: 'str', value: '#00ff00' });
    validateChange({ calls: 4, prop: 'hex', value: '00ff00', input: hexInput });
    userEvent.click(container);
    validateChange({ calls: 4, prop: 'str', value: '#00ff00' });

    const alphaInput = inputs[4];
    userEvent.clear(alphaInput);
    userEvent.type(alphaInput, '50');
    userEvent.click(container);
    validateChange({ calls: 6, prop: 'str', value: 'rgba(0, 255, 0, 0.5)' });
    validateChange({ calls: 6, prop: 'a', value: 50 });
  });

  it('handles updating transparency text field', () => {
    const { getAllByRole } = render(
      <ColorPicker alphaType="transparency" onChange={onChange} color="#000000" componentRef={colorPickerRef} />,
    );

    const transparencyInput = getAllByRole('textbox')[4] as HTMLInputElement;

    userEvent.clear(transparencyInput);
    userEvent.type(transparencyInput, '30');
    expect(onChange).toHaveBeenCalledTimes(2);
    expect(updatedColor!.t).toBe(30);
    expect(colorPicker!.color.t).toBe(30);
    expect(transparencyInput.value).toBe('30');
    expect(updatedColor!.a).toBe(70);
    expect(colorPicker!.color.a).toBe(70);
  });

  // This has repeatedly broken in the past (really)
  it('allows updating text fields when alpha slider is hidden', () => {
    const { container, getAllByRole } = render(
      <ColorPicker onChange={onChange} color="#000000" alphaType="none" componentRef={colorPickerRef} />,
    );

    const inputs = getAllByRole('textbox') as HTMLInputElement[];

    const redInput = inputs[1];
    userEvent.clear(redInput);
    userEvent.type(redInput, '255');
    validateChange({ calls: 3, prop: 'str', value: '#ff0000' });
    validateChange({ calls: 3, prop: 'r', value: 255, input: redInput });
    // blur and make sure nothing changes
    userEvent.click(container);
    validateChange({ calls: 3, prop: 'str', value: '#ff0000' });

    const hexInput = inputs[0];
    userEvent.clear(hexInput);
    userEvent.type(hexInput, '00ff00');
    validateChange({ calls: 4, prop: 'str', value: '#00ff00' });
    validateChange({ calls: 4, prop: 'hex', value: '00ff00', input: hexInput });
    userEvent.click(container);
    validateChange({ calls: 4, prop: 'str', value: '#00ff00' });
  });

  it('does not update if default prevented', () => {
    let newColor: IColor | undefined;
    const onChange1 = jest.fn((ev: React.SyntheticEvent, color: IColor) => {
      newColor = color;
      ev.preventDefault();
    });
    const { getAllByRole } = render(<ColorPicker onChange={onChange1} color="#000000" componentRef={colorPickerRef} />);

    const redInput = getAllByRole('textbox')[1] as HTMLInputElement;
    userEvent.clear(redInput);
    userEvent.paste(redInput, '255');
    expect(onChange1).toHaveBeenCalledTimes(1);
    expect(newColor!.r).toBe(255);
    expect(colorPicker!.color.r).toBe(0);
  });

  it('ignores non-numeric RGBA input', () => {
    const { getAllByRole } = render(<ColorPicker onChange={onChange} color="#000000" componentRef={colorPickerRef} />);

    const redInput = getAllByRole('textbox')[1] as HTMLInputElement;

    // valid value => accepted
    userEvent.clear(redInput);
    userEvent.type(redInput, '12');
    validateChange({ calls: 2, prop: 'r', value: 12, input: redInput });

    // decimal added to valid value => totally ignored
    userEvent.type(redInput, '.');
    validateChange({ calls: 2, prop: 'r', value: 12 });

    // non-number added to valid value => totally ignored
    userEvent.type(redInput, 'x');
    validateChange({ calls: 2, prop: 'r', value: 12 });

    // empty value => color not updated, value preserved
    userEvent.clear(redInput);
    validateChange({ calls: 2, prop: 'r', value: 12, input: redInput, inputValue: '' });

    // non-number in empty field => totally ignored
    userEvent.type(redInput, 'x');
    validateChange({ calls: 2, prop: 'r', value: 12, input: redInput, inputValue: '' });
  });

  it('reverts to previous valid RGBA value on blur if field is empty', () => {
    const { container, getAllByRole } = render(
      <ColorPicker onChange={onChange} color="#000000" componentRef={colorPickerRef} />,
    );

    const redInput = getAllByRole('textbox')[1] as HTMLInputElement;

    // valid value => accepted
    userEvent.clear(redInput);
    userEvent.type(redInput, '123');
    validateChange({ calls: 3, prop: 'r', value: 123, input: redInput });

    // empty value => color not updated, value preserved
    userEvent.clear(redInput);
    validateChange({ calls: 3, prop: 'r', value: 123, input: redInput, inputValue: '' });

    // reverts to previous valid value on blur
    userEvent.click(container);
    validateChange({ calls: 3, prop: 'r', value: 123 });
  });

  it('clamps RGB input too large', () => {
    const { container, getAllByRole } = render(
      <ColorPicker onChange={onChange} color="#000000" componentRef={colorPickerRef} />,
    );

    const redInput = getAllByRole('textbox')[1] as HTMLInputElement;
    userEvent.clear(redInput);
    userEvent.type(redInput, '123');
    validateChange({ calls: 3, prop: 'r', value: 123, input: redInput });

    // value too large => allowed in field but onChange not called
    userEvent.clear(redInput);
    userEvent.type(redInput, '456');
    validateChange({ calls: 5, prop: 'r', value: 45, input: redInput, inputValue: '456' });

    // blur => value clamped
    userEvent.click(container);
    validateChange({ calls: 6, prop: 'r', value: 255, input: redInput });
  });

  it('clamps alpha input too large', () => {
    const { container, getAllByRole } = render(
      <ColorPicker onChange={onChange} color="#000000" componentRef={colorPickerRef} />,
    );

    const alphaInput = getAllByRole('textbox')[4] as HTMLInputElement;

    userEvent.clear(alphaInput);
    userEvent.type(alphaInput, '50');
    validateChange({ calls: 2, prop: 'a', value: 50, input: alphaInput });

    // value too large => allowed in field but onChange not called
    userEvent.clear(alphaInput);
    userEvent.type(alphaInput, '123');
    validateChange({ calls: 4, prop: 'a', value: 12, input: alphaInput, inputValue: '123' });

    // blur => value clamped
    userEvent.click(container);
    validateChange({ calls: 5, prop: 'a', value: 100, input: alphaInput });
  });

  it('shows error state and tooltip for invalid red value', () => {
    jest.useFakeTimers();
    const { getAllByRole } = render(
      <ColorPicker color="#000000" componentRef={colorPickerRef} tooltipProps={{ delay: 2 }} />,
    );

    const redInput = getAllByRole('textbox')[1] as HTMLInputElement;

    // input should be valid before entering an invalid number
    expect(redInput.getAttribute('aria-invalid')).toEqual('false');

    // choose a number that can be typed, but is not allowed
    userEvent.type(redInput, '456');

    act(() => {
      jest.runAllTimers();
    });

    const redTooltip = document.querySelector('.ms-Tooltip');

    expect(redInput.getAttribute('aria-invalid')).toEqual('true');
    expect(redTooltip?.textContent).toBe('Red must be between 0 and 255');

    jest.useRealTimers();
  });

  it('shows error state and tooltip for invalid hex value', () => {
    jest.useFakeTimers();
    const customHexError = 'test hex error';
    const { getAllByRole } = render(
      <ColorPicker
        color="#000000"
        componentRef={colorPickerRef}
        tooltipProps={{ delay: 2 }}
        strings={{ hexError: customHexError }}
      />,
    );

    const hexInput = getAllByRole('textbox')[0] as HTMLInputElement;

    // input should be valid before entering an invalid hex
    expect(hexInput.getAttribute('aria-invalid')).toEqual('false');

    userEvent.clear(hexInput);
    // enter a 2-digit hex
    userEvent.type(hexInput, 'ff');

    act(() => {
      jest.runAllTimers();
    });

    const hexTooltip = document.querySelector('.ms-Tooltip');

    expect(hexInput.getAttribute('aria-invalid')).toEqual('true');
    expect(hexTooltip?.textContent).toBe(customHexError);

    jest.useRealTimers();
  });

  it('handles RGBA input too long', () => {
    const { getAllByRole } = render(<ColorPicker onChange={onChange} color="#000000" componentRef={colorPickerRef} />);

    const redInput = getAllByRole('textbox')[1] as HTMLInputElement;

    // valid value => accepted
    userEvent.clear(redInput);
    userEvent.type(redInput, '123');
    validateChange({ calls: 3, prop: 'r', value: 123, input: redInput });

    // extra char added => use existing substring
    userEvent.type(redInput, '4');
    validateChange({ calls: 3, prop: 'r', value: 123, input: redInput });

    // new value too long "pasted" => use substring
    userEvent.clear(redInput);
    userEvent.paste(redInput, '1000');
    validateChange({ calls: 4, prop: 'r', value: 100, input: redInput });

    // invalid new value too long "pasted" => use substring but don't call onChange
    userEvent.clear(redInput);
    userEvent.paste(redInput, '4567');

    validateChange({ calls: 4, prop: 'r', value: 100, input: redInput, inputValue: '456' });
  });

  it('handles 3-char hex value', () => {
    const { container, getAllByRole } = render(
      <ColorPicker onChange={onChange} color="#000000" componentRef={colorPickerRef} />,
    );

    const hexInput = getAllByRole('textbox')[0] as HTMLInputElement;

    userEvent.clear(hexInput);
    userEvent.type(hexInput, 'faf');
    expect(onChange).toHaveBeenCalledTimes(0);
    expect(hexInput.value).toBe('faf');

    userEvent.click(container);
    validateChange({ calls: 1, prop: 'hex', value: 'ffaaff', input: hexInput });
    expect(colorPicker!.color.str).toBe('#faf');
  });

  it('handles incrementally typing a 6-char hex value', () => {
    const { getAllByRole } = render(<ColorPicker onChange={onChange} color="#000000" componentRef={colorPickerRef} />);

    const hexInput = getAllByRole('textbox')[0] as HTMLInputElement;
    const testHexValue = 'f1f2f3';

    // The intermediate value should be preserved, not automatically converted to length 6
    for (let i = 2; i <= 5; i++) {
      const hexSubstr = testHexValue.substring(0, i);
      userEvent.clear(hexInput);
      userEvent.type(hexInput, hexSubstr);
      validateChange({ calls: 0, prop: 'hex', value: '000000', input: hexInput, inputValue: hexSubstr });
    }

    // Only the full-length value should trigger onChange
    userEvent.clear(hexInput);
    userEvent.type(hexInput, testHexValue);
    validateChange({ calls: 1, prop: 'hex', value: testHexValue, input: hexInput });
  });

  it('handles uppercase hex', () => {
    const { getAllByRole } = render(<ColorPicker onChange={onChange} color="#000000" componentRef={colorPickerRef} />);

    const hexInput = getAllByRole('textbox')[0] as HTMLInputElement;

    const testHexValue = 'F1F2F3';

    userEvent.clear(hexInput);
    userEvent.type(hexInput, testHexValue);

    validateChange({ calls: 1, prop: 'hex', value: testHexValue.toLowerCase(), input: hexInput });
    validateChange({ calls: 1, prop: 'str', value: '#' + testHexValue });
  });

  it('ignores non-hexadecimal hex input', () => {
    const { container, getAllByRole } = render(
      <ColorPicker onChange={onChange} color="#000000" componentRef={colorPickerRef} />,
    );

    const hexInput = getAllByRole('textbox')[0] as HTMLInputElement;

    userEvent.type(hexInput, 'hello');
    validateChange({ calls: 0, prop: 'hex', value: '000000', input: hexInput });
    userEvent.clear(hexInput);
    userEvent.type(hexInput, 'abc');
    validateChange({ calls: 0, prop: 'hex', value: '000000', input: hexInput, inputValue: 'abc' });

    userEvent.type(hexInput, 'h');
    validateChange({ calls: 0, prop: 'hex', value: '000000', input: hexInput, inputValue: 'abc' });

    userEvent.click(container);
    validateChange({ calls: 1, prop: 'hex', value: 'aabbcc', input: hexInput });
  });

  it('handles hex value too long', () => {
    const { getAllByRole } = render(<ColorPicker onChange={onChange} color="#000000" componentRef={colorPickerRef} />);

    const hexInput = getAllByRole('textbox')[0] as HTMLInputElement;

    // input too long "pasted" => use substring
    userEvent.clear(hexInput);
    userEvent.type(hexInput, '1234567');
    validateChange({ calls: 1, prop: 'hex', value: '123456', input: hexInput });

    // invalid new value too long "pasted" => ignore
    userEvent.paste(hexInput, 'hello world');
    validateChange({ calls: 1, prop: 'hex', value: '123456', input: hexInput });
  });

  it('reverts to previous valid hex value on blur if input is too short', () => {
    const { container, getAllByRole } = render(
      <ColorPicker onChange={onChange} color="#abcdef" componentRef={colorPickerRef} />,
    );

    const hexInput = getAllByRole('textbox')[0] as HTMLInputElement;

    userEvent.clear(hexInput);
    validateChange({ calls: 0, prop: 'hex', value: 'abcdef', input: hexInput, inputValue: '' });
    userEvent.click(container);
    validateChange({ calls: 0, prop: 'hex', value: 'abcdef' });

    userEvent.clear(hexInput);
    userEvent.type(hexInput, '12');
    validateChange({ calls: 0, prop: 'hex', value: 'abcdef', input: hexInput, inputValue: '12' });
    userEvent.click(container);
    validateChange({ calls: 0, prop: 'hex', value: 'abcdef' });
  });

  it('handles hex value of length 4 or 5 on blur', () => {
    const { container, getAllByRole } = render(
      <ColorPicker onChange={onChange} color="#000000" componentRef={colorPickerRef} />,
    );

    const hexInput = getAllByRole('textbox')[0] as HTMLInputElement;

    userEvent.clear(hexInput);
    userEvent.type(hexInput, 'abcd');

    validateChange({ calls: 0, prop: 'hex', value: '000000', input: hexInput, inputValue: 'abcd' });
    // interpret as 3-char hex on blur
    userEvent.click(container);
    validateChange({ calls: 1, prop: 'hex', value: 'aabbcc' });

    userEvent.clear(hexInput);
    userEvent.type(hexInput, '12345');
    validateChange({ calls: 1, prop: 'hex', value: 'aabbcc', input: hexInput, inputValue: '12345' });
    userEvent.click(container);
    validateChange({ calls: 2, prop: 'hex', value: '112233' });
  });

  it('handles typing invalid value then going back to previous valid value', () => {
    const { container, getAllByRole } = render(
      <ColorPicker onChange={onChange} color="#abcdef" componentRef={colorPickerRef} />,
    );

    const hexInput = getAllByRole('textbox')[0] as HTMLInputElement;

    // suppose they delete a character
    userEvent.type(hexInput, '{backspace}');
    validateChange({ calls: 0, prop: 'hex', value: 'abcdef', input: hexInput, inputValue: 'abcde' });
    // then add it back
    userEvent.type(hexInput, 'f');
    validateChange({ calls: 0, prop: 'hex', value: 'abcdef', input: hexInput });
    // verify the internal intermediate value is cleared
    expect(colorPicker!.state.editingColor).toBeUndefined();

    // original value is preserved on blur
    userEvent.click(container);
    validateChange({ calls: 0, prop: 'hex', value: 'abcdef', input: hexInput });
  });

  it('handles intermediate invalid transparency values', () => {
    const color = getColorFromString('rgba(20, 30, 40, 0.3)')!;

    const { container, getAllByRole } = render(
      <ColorPicker alphaType="transparency" onChange={onChange} color={color} componentRef={colorPickerRef} />,
    );

    const transparencyInput = getAllByRole('textbox')[4] as HTMLInputElement;

    // value too large => allowed in field but onChange not called
    userEvent.clear(transparencyInput);
    userEvent.paste(transparencyInput, '123');
    expect(onChange).toHaveBeenCalledTimes(0);
    expect(colorPicker!.color.a).toBe(30); // original value
    expect(colorPicker!.color.t).toBe(70);
    expect(colorPicker!.state.editingColor).toEqual({ component: 't', value: '123' });
    expect(transparencyInput.value).toBe('123');

    // blur => value clamped (with correct alpha/transparency conversion)
    userEvent.click(container);
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(colorPicker!.color.t).toBe(100);
    expect(updatedColor!.t).toBe(100);
    expect(transparencyInput.value).toBe('100');
    expect(colorPicker!.color.a).toBe(0);
    expect(updatedColor!.a).toBe(0);
  });
});
