import * as React from 'react';
import { mount, ReactWrapper } from 'enzyme';
import * as ReactTestUtils from 'react-dom/test-utils';
import * as WarnUtil from '@uifabric/utilities/lib-commonjs/warn';

import { ColorPicker } from './ColorPicker';
import { ColorPickerBase, IColorPickerState } from './ColorPicker.base';
import { IColorPicker, IColorPickerProps } from './ColorPicker.types';
import { IColor } from '../../utilities/color/colors';
import { mockEvent } from '../../common/testUtilities';

describe('ColorPicker deprecated', () => {
  let wrapper: ReactWrapper<IColorPickerProps, IColorPickerState, ColorPickerBase> | undefined;
  const colorPickerRef = React.createRef<IColorPicker>();

  beforeAll(() => {
    // Prevent warn deprecations from failing test
    jest.spyOn(WarnUtil, 'warnDeprecations').mockImplementation(() => {
      /** no impl **/
    });
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  afterEach(() => {
    if (wrapper) {
      wrapper.unmount();
      wrapper = undefined;
    }
  });

  it('respects color prop change', () => {
    const onChange = jest.fn();
    wrapper = mount(<ColorPicker color="#abcdef" onColorChanged={onChange} componentRef={colorPickerRef} />);

    wrapper.setProps({ color: '#AEAEAE' });
    expect(colorPickerRef.current!.color.hex).toEqual('aeaeae');
    // weird but preserves existing behavior
    expect(onChange).toHaveBeenCalledTimes(1);
  });

  it('allows updating text fields when color is specified', () => {
    let updatedColor: string | undefined;
    const onChange = jest.fn((ev: any, color: IColor) => {
      updatedColor = color.str;
    });

    wrapper = mount(<ColorPicker onColorChanged={onChange} color="#000000" componentRef={colorPickerRef} />);

    const inputs = wrapper.getDOMNode().querySelectorAll('.ms-ColorPicker-input input');

    const redInput = inputs[1];
    ReactTestUtils.Simulate.input(redInput, mockEvent('255'));
    ReactTestUtils.Simulate.blur(redInput);
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(updatedColor).toBe('#ff0000');
    expect(colorPickerRef.current!.color.str).toBe('#ff0000');

    const hexInput = inputs[0];
    ReactTestUtils.Simulate.input(hexInput, mockEvent('00ff00'));
    ReactTestUtils.Simulate.blur(hexInput);
    expect(onChange).toHaveBeenCalledTimes(2);
    expect(updatedColor).toBe('#00ff00');
    expect(colorPickerRef.current!.color.str).toBe('#00ff00');

    const alphaInput = inputs[4];
    ReactTestUtils.Simulate.input(alphaInput, mockEvent('50'));
    ReactTestUtils.Simulate.blur(alphaInput);
    expect(onChange).toHaveBeenCalledTimes(3);
    expect(updatedColor).toBe('rgba(0, 255, 0, 0.5)');
    expect(colorPickerRef.current!.color.str).toBe('rgba(0, 255, 0, 0.5)');
  });
});
