import * as React from 'react';
import * as renderer from 'react-test-renderer';
import { mount, ReactWrapper } from 'enzyme';

import { ColorSlider } from './ColorSlider';
import { ColorSliderBase } from './ColorSlider.base';
import { KeyCodes } from '../../../Utilities';
import { MAX_COLOR_HUE, MAX_COLOR_ALPHA } from '../../../utilities/color';
import type { IColorSliderState } from './ColorSlider.base';
import type { IColorSliderProps } from './ColorSlider.types';

describe('ColorSlider', () => {
  let wrapper: ReactWrapper<IColorSliderProps, IColorSliderState, ColorSliderBase> | undefined;
  let component: renderer.ReactTestRenderer | undefined;
  let colorSlider: ColorSliderBase | null = null;
  const colorSliderRef = (ref: ColorSliderBase | null) => {
    colorSlider = ref;
  };

  // Use a width of 100 in the fake bounding rect to simplify math
  const width = 100;
  const getBoundingClientRect = () =>
    ({
      left: 0,
      top: 0,
      right: width,
      bottom: 18,
      width,
      height: 18,
    } as DOMRect);

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

  /** Verify stored value and thumb position */
  function verifyValue(type: IColorSliderProps['type'], value: number) {
    expect(colorSlider!.value).toBeCloseTo(value);

    const thumbStyle = wrapper!.find('.ms-ColorPicker-thumb').prop('style')!;
    const max = type === 'hue' ? MAX_COLOR_HUE : MAX_COLOR_ALPHA;
    expect(Number((thumbStyle.left as string).replace('%', ''))).toBeCloseTo((100 * value) / max);
  }

  it('renders hue slider correctly', () => {
    component = renderer.create(<ColorSlider type="hue" value={30} ariaLabel="Hue" />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders alpha slider correctly', () => {
    component = renderer.create(<ColorSlider type="alpha" value={30} overlayColor="ff0000" ariaLabel="Alpha" />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders transparency slider correctly', () => {
    component = renderer.create(
      <ColorSlider type="transparency" value={30} overlayColor="ff0000" ariaLabel="Transparency" />,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('defaults to hue slider', () => {
    wrapper = mount(<ColorSlider />);
    // hue slider doesn't have an overlay
    expect(wrapper.find('.ms-ColorPicker-sliderOverlay')).toHaveLength(0);
  });

  it('handles alpha slider overlay', () => {
    wrapper = mount(<ColorSlider type="alpha" value={0} overlayColor="ff0000" />);

    const overlay = wrapper.find('.ms-ColorPicker-sliderOverlay');
    expect(overlay).toHaveLength(1);
    const background = overlay.prop('style')!.background;
    expect(background).toEqual('linear-gradient(to right, transparent, #ff0000)');
  });

  it('handles transparency slider overlay', () => {
    wrapper = mount(<ColorSlider type="transparency" value={0} overlayColor="ff0000" />);

    const overlay = wrapper.find('.ms-ColorPicker-sliderOverlay');
    expect(overlay).toHaveLength(1);
    const background = overlay.prop('style')!.background;
    expect(background).toEqual('linear-gradient(to right, #ff0000, transparent)');
  });

  it('defaults to 0', () => {
    wrapper = mount(<ColorSlider componentRef={colorSliderRef} />);
    verifyValue('hue', 0);
  });

  it('respects value prop', () => {
    wrapper = mount(<ColorSlider type="alpha" value={15} overlayColor="ff0000" componentRef={colorSliderRef} />);
    verifyValue('alpha', 15);
  });

  it('respects updates to value prop', () => {
    const onChange = jest.fn();
    wrapper = mount(
      <ColorSlider type="alpha" value={15} overlayColor="ff0000" onChange={onChange} componentRef={colorSliderRef} />,
    );

    wrapper.setProps({ value: 30 });
    wrapper.update();

    verifyValue('alpha', 30);
    expect(onChange).toHaveBeenCalledTimes(0);
  });

  it('respects value prop for transparency', () => {
    // The slider is meant to take in actual transparency values, rather than taking in alpha
    // and displaying transparency.
    wrapper = mount(<ColorSlider type="transparency" value={15} overlayColor="ff0000" componentRef={colorSliderRef} />);
    verifyValue('transparency', 15);
  });

  it('uses appropriate default aria label', () => {
    wrapper = mount(<ColorSlider type="hue" />);
    expect(wrapper.getDOMNode().getAttribute('aria-label')).toBe('hue');

    wrapper.setProps({ type: 'alpha' });
    expect(wrapper.getDOMNode().getAttribute('aria-label')).toBe('alpha');

    wrapper.setProps({ ariaLabel: 'custom' });
    expect(wrapper.getDOMNode().getAttribute('aria-label')).toBe('custom');
  });

  it('respects custom aria label', () => {
    wrapper = mount(<ColorSlider type="hue" ariaLabel="custom" />);
    expect(wrapper.getDOMNode().getAttribute('aria-label')).toBe('custom');
  });

  it('handles key events', () => {
    let value: number | undefined;
    const onChange = jest.fn((ev: any, newValue?: number) => {
      value = newValue;
    });
    wrapper = mount(<ColorSlider type="hue" value={100} onChange={onChange} componentRef={colorSliderRef} />);

    wrapper.simulate('keydown', { which: KeyCodes.left });
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(value).toBe(99);
    verifyValue('hue', 99);

    wrapper.simulate('keydown', { which: KeyCodes.right, shiftKey: true });
    expect(onChange).toHaveBeenCalledTimes(2);
    expect(value).toBe(109);
    verifyValue('hue', 109);

    wrapper.simulate('keydown', { which: KeyCodes.home });
    expect(onChange).toHaveBeenCalledTimes(3);
    expect(value).toBe(0);
    verifyValue('hue', 0);

    wrapper.simulate('keydown', { which: KeyCodes.end });
    expect(onChange).toHaveBeenCalledTimes(4);
    expect(value).toBe(359);
    verifyValue('hue', 359);
  });

  it('does not modify value if event default prevented', () => {
    let value: number | undefined;
    const onChange = jest.fn((ev: React.SyntheticEvent, newValue?: number) => {
      value = newValue;
      ev.preventDefault();
    });
    wrapper = mount(<ColorSlider type="hue" value={100} onChange={onChange} componentRef={colorSliderRef} />);

    wrapper.simulate('keydown', { which: KeyCodes.left });
    wrapper.update();
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(value).toBe(99);
    verifyValue('hue', 100);
  });

  it('handles mouse events in range', () => {
    const onChange = jest.fn();
    wrapper = mount(
      <ColorSlider type="alpha" overlayColor="ff0000" value={0} onChange={onChange} componentRef={colorSliderRef} />,
    );
    wrapper.getDOMNode().getBoundingClientRect = getBoundingClientRect;

    wrapper.simulate('mousedown', { type: 'mousedown', clientX: 5, clientY: 0 });
    expect(onChange).toHaveBeenCalledTimes(1);
    verifyValue('alpha', 5);

    wrapper.simulate('mousedown', { type: 'mousedown', clientX: 10, clientY: 0 });
    expect(onChange).toHaveBeenCalledTimes(2);
    verifyValue('alpha', 10);

    // mouse up => keep setting
    wrapper.simulate('mouseup');
    expect(onChange).toHaveBeenCalledTimes(2);
    verifyValue('alpha', 10);
  });

  it('handles mouse events out of range', () => {
    const onChange = jest.fn();
    wrapper = mount(<ColorSlider type="hue" value={0} onChange={onChange} componentRef={colorSliderRef} />);
    wrapper.getDOMNode().getBoundingClientRect = getBoundingClientRect;

    wrapper.simulate('mousedown', { type: 'mousedown', clientX: 100, clientY: 0 });
    expect(onChange).toHaveBeenCalledTimes(1);
    verifyValue('hue', 359);

    // ignore movement out of range
    wrapper.simulate('mousemove', { type: 'mousemove', clientX: 200, clientY: 0 });
    expect(onChange).toHaveBeenCalledTimes(1);
    verifyValue('hue', 359);

    // mouse up => keep setting
    wrapper.simulate('mouseup');
    expect(onChange).toHaveBeenCalledTimes(1);
    verifyValue('hue', 359);
  });
});
