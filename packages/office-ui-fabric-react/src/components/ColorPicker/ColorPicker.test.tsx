/* tslint:disable:no-unused-variable */
import * as React from 'react';
/* tslint:enable:no-unused-variable */
import * as renderer from 'react-test-renderer';
import { mount } from 'enzyme';

import { ColorPicker } from './ColorPicker';
import { ColorPickerBase, IColorPickerState } from './ColorPicker.base';
import { IColorPicker, IColorPickerProps } from './ColorPicker.types';
import { IColor, getColorFromString } from '../../utilities/color/colors';

describe('ColorPicker', () => {
  it('renders ColorPicker correctly', () => {
    const component = renderer.create(<ColorPicker color="#FFFFFF" />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('Props are correctly parsed', () => {
    let colorPickerComponent: any;
    const setRef = (ref: IColorPicker): void => {
      colorPickerComponent = ref;
    };

    mount(<ColorPicker color="#FFFFFF" componentRef={setRef} />);

    expect(colorPickerComponent.state.color.hex).toEqual('ffffff');
  });

  it('Reacts to props change', () => {
    let colorPickerComponent: any;
    const setRef = (ref: IColorPicker): void => {
      colorPickerComponent = ref;
    };

    mount(<ColorPicker color="#FFFFFF" componentRef={setRef} />);

    const component = colorPickerComponent;
    colorPickerComponent.componentWillReceiveProps({ color: '#AEAEAE' });
    expect(component.state.color.hex).toEqual('aeaeae');
  });

  it('onColorChange is called', () => {
    let color = '#FFFFFF';
    let newColorObject;
    const onColorChanged = (str: string, colorObject: IColor): void => {
      color = str;
      newColorObject = colorObject;
    };

    let colorPickerComponent: any;
    const setRef = (ref: IColorPicker): void => {
      colorPickerComponent = ref;
    };

    mount(<ColorPicker color={color} componentRef={setRef} onColorChanged={onColorChanged} />);

    const newColor = '#AEAEAE';
    const component = colorPickerComponent;
    colorPickerComponent.componentWillReceiveProps({ color: newColor });

    expect(component.state.color.hex).toEqual('aeaeae');
    expect(color).toEqual(newColor);
    expect(newColorObject).toEqual(getColorFromString(newColor));
  });

  it('Hides alpha control slider', () => {
    const wrapper = mount(<ColorPicker color="#FFFFFF" alphaSliderHidden={true} />);

    const alphaSlider = wrapper.find('.is-alpha');
    const tableHeaders = wrapper.find('.ms-ColorPicker-table > thead > tr > td');
    const tableInputs = wrapper.find('.ms-ColorPicker-table > tbody> tr > td');

    // There should only be table headers and inputs for hex, red, green, and blue (no alpha)
    const expectedTableComponents = 4;

    expect(alphaSlider.exists()).toBe(false);
    expect(tableHeaders).toHaveLength(expectedTableComponents);
    expect(tableInputs).toHaveLength(expectedTableComponents);
  });

  it('Renders default RGBA/Hex strings', () => {
    const wrapper = mount(<ColorPicker color="#FFFFFF" />);

    const tableHeaders = wrapper.find('.ms-ColorPicker-table > thead > tr > td');
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

  it('Renders custom RGBA/Hex strings', () => {
    const textHeaders = ['Custom Hex', 'Custom Red', 'Custom Green', 'Custom Blue', 'Custom Alpha'];

    const wrapper = mount(
      <ColorPicker
        color="#FFFFFF"
        hexLabel={textHeaders[0]}
        redLabel={textHeaders[1]}
        greenLabel={textHeaders[2]}
        blueLabel={textHeaders[3]}
        alphaLabel={textHeaders[4]}
      />
    );

    const tableHeaders = wrapper.find('.ms-ColorPicker-table > thead > tr > td');
    tableHeaders.forEach((node, index) => {
      expect(node.text()).toEqual(textHeaders[index]);
    });
  });

  it('Keeps color value when tabbing between Hex and RGBA text inputs', () => {
    const colorStringValue = 'ffffff';
    let colorChangeCalled = false;
    const onColorChanged = (newColor: string): void => {
      colorChangeCalled = newColor !== colorStringValue;
    };

    let colorPickerComponent: any;
    const setRef = (ref: IColorPicker): void => {
      colorPickerComponent = ref;
    };

    const inputClassName = 'input-tab-test';
    const wrapper = mount<IColorPickerProps, IColorPickerState>(
      <ColorPicker
        color={`#${colorStringValue}`}
        onColorChanged={onColorChanged}
        componentRef={setRef}
        styles={{ input: inputClassName }}
      />
    );

    expect(colorPickerComponent.state.color.hex).toEqual(colorStringValue);
    expect(colorChangeCalled).toBeFalsy();

    // Tab between text inputs checking state after each time.
    const allInputs = wrapper.find(`.${inputClassName} input`);
    expect(allInputs.length).toBe(5);

    allInputs.forEach(input => {
      input.simulate('blur');

      expect(colorPickerComponent.state.color.hex).toEqual(colorStringValue);
      expect(colorChangeCalled).toBeFalsy();
    });
  });
});
