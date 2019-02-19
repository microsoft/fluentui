import * as React from 'react';
import { mount, ReactWrapper } from 'enzyme';
import * as ReactTestUtils from 'react-dom/test-utils';
import { setWarningCallback } from '@uifabric/utilities';
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

  it('respects color prop change', () => {
    const onColorChanged = jest.fn();
    wrapper = mount(<ColorPicker color="#abcdef" onColorChanged={onColorChanged} componentRef={colorPickerRef} />);

    wrapper.setProps({ color: '#AEAEAE' });
    expect(colorPickerRef.current!.color.hex).toEqual('aeaeae');
    // It's weird that a change handler would be called when the consumer updated props,
    // but we do that with onColorChanged to preserve existing behavior (in case anyone
    // depended on it).
    expect(onColorChanged).toHaveBeenCalledTimes(1);
  });

  it('allows updating text fields when color is specified', () => {
    let updatedColor: string | undefined;
    const onColorChanged = jest.fn((ev: any, color: IColor) => {
      updatedColor = color.str;
    });

    wrapper = mount(<ColorPicker onColorChanged={onColorChanged} color="#000000" componentRef={colorPickerRef} />);

    const inputs = wrapper.getDOMNode().querySelectorAll('.ms-ColorPicker-input input');

    const redInput = inputs[1];
    ReactTestUtils.Simulate.input(redInput, mockEvent('255'));
    ReactTestUtils.Simulate.blur(redInput);
    expect(onColorChanged).toHaveBeenCalledTimes(1);
    expect(updatedColor).toBe('#ff0000');
    expect(colorPickerRef.current!.color.str).toBe('#ff0000');

    const hexInput = inputs[0];
    ReactTestUtils.Simulate.input(hexInput, mockEvent('00ff00'));
    ReactTestUtils.Simulate.blur(hexInput);
    expect(onColorChanged).toHaveBeenCalledTimes(2);
    expect(updatedColor).toBe('#00ff00');
    expect(colorPickerRef.current!.color.str).toBe('#00ff00');

    const alphaInput = inputs[4];
    ReactTestUtils.Simulate.input(alphaInput, mockEvent('50'));
    ReactTestUtils.Simulate.blur(alphaInput);
    expect(onColorChanged).toHaveBeenCalledTimes(3);
    expect(updatedColor).toBe('rgba(0, 255, 0, 0.5)');
    expect(colorPickerRef.current!.color.str).toBe('rgba(0, 255, 0, 0.5)');
  });
});
