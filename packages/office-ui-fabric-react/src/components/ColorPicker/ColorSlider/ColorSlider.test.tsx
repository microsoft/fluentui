import * as React from 'react';
import * as renderer from 'react-test-renderer';
import { mount, ReactWrapper } from 'enzyme';

import { ColorSlider } from './ColorSlider';
import { ColorSliderBase, IColorSliderState } from './ColorSlider.base';
import { IColorSliderProps } from './ColorSlider.types';
import { KeyCodes } from '../../../Utilities';
import { MAX_COLOR_HUE, MAX_COLOR_ALPHA } from '../../../utilities/color/index';

describe('ColorSlider', () => {
  let wrapper: ReactWrapper<IColorSliderProps, IColorSliderState, ColorSliderBase> | undefined;
  let component: renderer.ReactTestRenderer | undefined;
  let colorSlider: ColorSliderBase | null = null;
  const colorSliderRef = (ref: ColorSliderBase | null) => {
    colorSlider = ref;
  };

  const getBoundingClientRect = () => ({
    left: 0,
    top: 0,
    right: 100,
    bottom: 18,
    width: 100,
    height: 18
  });

  afterEach(() => {
    if (wrapper) {
      wrapper.unmount();
      wrapper = undefined;
    }
    if (component) {
      component.unmount();
      component = undefined;
    }
  });

  it('renders hue slider correctly', () => {
    component = renderer.create(<ColorSlider value={30} minValue={0} maxValue={MAX_COLOR_HUE} ariaLabel="Hue" />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders alpha slider correctly', () => {
    component = renderer.create(
      <ColorSlider isAlpha value={30} overlayColor="#ff0000" minValue={0} maxValue={MAX_COLOR_ALPHA} ariaLabel="Alpha" />
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('defaults to 0', () => {
    wrapper = mount(<ColorSlider componentRef={colorSliderRef} />);
    expect(colorSlider!.value).toBe(0);
  });

  it('respects value prop', () => {
    const onChange = jest.fn();
    wrapper = mount(<ColorSlider value={15} isAlpha onChange={onChange} componentRef={colorSliderRef} />);
    expect(colorSlider!.value).toBe(15);

    wrapper.setProps({ value: 20 });
    expect(colorSlider!.value).toBe(20);
    expect(onChange).toHaveBeenCalledTimes(0);
  });

  it('uses appropriate aria label', () => {
    wrapper = mount(<ColorSlider />);
    expect(wrapper.getDOMNode().getAttribute('aria-label')).toBe('Hue');

    wrapper.setProps({ isAlpha: true });
    expect(wrapper.getDOMNode().getAttribute('aria-label')).toBe('Alpha');

    wrapper.setProps({ ariaLabel: 'custom' });
    expect(wrapper.getDOMNode().getAttribute('aria-label')).toBe('custom');
  });

  it('respects updates to value prop', () => {
    wrapper = mount(<ColorSlider value={15} isAlpha componentRef={colorSliderRef} />);
    wrapper.setProps({ value: 30 });
    expect(colorSlider!.value).toBe(30);
  });

  it('handles key events', () => {
    let value: number | undefined;
    const onChange = jest.fn((ev: any, newValue?: number) => {
      value = newValue;
    });
    wrapper = mount(<ColorSlider value={100} maxValue={MAX_COLOR_HUE} onChange={onChange} componentRef={colorSliderRef} />);

    wrapper.simulate('keydown', { which: KeyCodes.left });
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(value).toBe(99);
    expect(colorSlider!.value).toBe(99);

    wrapper.simulate('keydown', { which: KeyCodes.right, shiftKey: true });
    expect(onChange).toHaveBeenCalledTimes(2);
    expect(colorSlider!.value).toBe(109);
    expect(value).toBe(109);

    wrapper.simulate('keydown', { which: KeyCodes.home });
    expect(onChange).toHaveBeenCalledTimes(3);
    expect(colorSlider!.value).toBe(0);
    expect(value).toBe(0);

    wrapper.simulate('keydown', { which: KeyCodes.end });
    expect(onChange).toHaveBeenCalledTimes(4);
    expect(colorSlider!.value).toBe(359);
    expect(value).toBe(359);
  });

  it('does not modify value if event default prevented', () => {
    let value: number | undefined;
    const onChange = jest.fn((ev: React.SyntheticEvent, newValue?: number) => {
      value = newValue;
      ev.preventDefault();
    });
    wrapper = mount(<ColorSlider value={100} maxValue={MAX_COLOR_HUE} onChange={onChange} componentRef={colorSliderRef} />);

    wrapper.simulate('keydown', { which: KeyCodes.left });
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(value).toBe(99);
    expect(colorSlider!.value).toBe(100);
  });

  it('handles mouse events in range', () => {
    const onChange = jest.fn();
    wrapper = mount(<ColorSlider value={0} isAlpha onChange={onChange} componentRef={colorSliderRef} />);
    wrapper.getDOMNode().getBoundingClientRect = getBoundingClientRect;

    wrapper.simulate('mousedown', { type: 'mousedown', clientX: 5, clientY: 0 });
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(colorSlider!.value).toEqual(5);

    wrapper.simulate('mousedown', { type: 'mousedown', clientX: 10, clientY: 0 });
    expect(onChange).toHaveBeenCalledTimes(2);
    expect(colorSlider!.value).toEqual(10);

    // mouse up => keep setting
    wrapper.simulate('mouseup');
    expect(onChange).toHaveBeenCalledTimes(2);
    expect(colorSlider!.value).toEqual(10);
  });

  it('handles mouse events out of range', () => {
    const onChange = jest.fn();
    wrapper = mount(<ColorSlider value={0} maxValue={MAX_COLOR_HUE} onChange={onChange} componentRef={colorSliderRef} />);
    wrapper.getDOMNode().getBoundingClientRect = getBoundingClientRect;

    wrapper.simulate('mousedown', { type: 'mousedown', clientX: 100, clientY: 0 });
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(colorSlider!.value).toEqual(359);

    // ignore movement out of range
    wrapper.simulate('mousemove', { type: 'mousemove', clientX: 200, clientY: 0 });
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(colorSlider!.value).toEqual(359);

    // mouse up => keep setting
    wrapper.simulate('mouseup');
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(colorSlider!.value).toEqual(359);
  });
});
