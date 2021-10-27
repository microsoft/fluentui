import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as ReactTestUtils from 'react-dom/test-utils';
import { mount, ReactWrapper } from 'enzyme';
import { resetIds, KeyCodes } from '@fluentui/utilities';
import { create } from '@fluentui/utilities/lib/test';
import { Slider } from './Slider';
import { isConformant } from '../../common/isConformant';
import type { ISlider } from './Slider.types';

const MIN_PREFIX = 'min';
const MAX_PREFIX = 'max';

describe('Slider', () => {
  let wrapper: ReactWrapper | undefined;

  beforeEach(() => {
    resetIds();
  });

  afterEach(() => {
    if (wrapper) {
      wrapper.unmount();
      wrapper = undefined;
    }
    if ((setTimeout as any).mock) {
      jest.useRealTimers();
    }
  });

  isConformant({
    Component: Slider,
    displayName: 'Slider',
  });

  it('renders correctly', () => {
    const component = create(<Slider label="I am a slider" />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders range slider correctly', () => {
    const component = create(<Slider label="I am a ranged slider" ranged defaultValue={5} />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('can provide the current value', () => {
    const slider = React.createRef<ISlider>();

    wrapper = mount(<Slider defaultValue={12} min={0} max={100} componentRef={slider} />);
    expect(slider.current?.value).toEqual(12);
  });

  it('can provide the current range', () => {
    const slider = React.createRef<ISlider>();

    wrapper = mount(<Slider defaultValue={12} min={0} max={100} componentRef={slider} ranged />);
    expect(slider.current?.range).toEqual([0, 12]);
  });

  it('can set id', () => {
    wrapper = mount(<Slider id="test_id" styles={{ titleLabel: 'test_label' }} />);

    const sliderSlideBox = wrapper.find('.ms-Slider-slideBox');
    expect(sliderSlideBox.getDOMNode().id).toEqual('test_id');

    // properly associates label with custom id
    const label = wrapper.find('label.test_label');
    expect(label.prop('htmlFor')).toBe('test_id');
  });

  it('can set id via buttonProps', () => {
    // Not the recommended way of doing things, but it should work consistently still
    wrapper = mount(<Slider buttonProps={{ id: 'test_id' }} styles={{ titleLabel: 'test_label' }} />);

    const sliderSlideBox = wrapper.find('.ms-Slider-slideBox');
    expect(sliderSlideBox.getDOMNode().id).toEqual('test_id');

    // properly associates label with custom id
    const label = wrapper.find('label.test_label');
    expect(label.prop('htmlFor')).toBe('test_id');
  });

  it('handles zero default value', () => {
    const slider = React.createRef<ISlider>();

    wrapper = mount(<Slider defaultValue={0} min={-100} max={100} componentRef={slider} />);
    expect(slider.current!.value).toEqual(0);
  });

  it('handles zero value', () => {
    const slider = React.createRef<ISlider>();

    wrapper = mount(<Slider value={0} min={-100} max={100} componentRef={slider} />);
    expect(slider.current!.value).toEqual(0);
  });

  it('calls onChange and onChanged when slider value changes with mouse', () => {
    const onChange = jest.fn();
    const onChanged = jest.fn();
    const slider = React.createRef<ISlider>();
    wrapper = mount(<Slider onChange={onChange} defaultValue={5} onChanged={onChanged} componentRef={slider} />);

    const sliderLine = wrapper.find('.ms-Slider-line');
    const sliderThumb = wrapper.find('.ms-Slider-slideBox');

    sliderLine.getDOMNode().getBoundingClientRect = () =>
      ({ left: 0, top: 0, right: 100, bottom: 40, width: 100, height: 40 } as DOMRect);

    sliderThumb.simulate('mousedown', { type: 'mousedown', clientX: 0, clientY: 0 });
    // Default min is 0.
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange.mock.calls[0][0]).toEqual(0);
    expect(onChanged).toHaveBeenCalledTimes(0); // not called yet
    expect(slider.current!.value).toBe(0);

    // have to use a real event to trigger onChanged
    window.dispatchEvent(new Event('mouseup'));
    expect(onChange).toHaveBeenCalledTimes(1); // not called again
    expect(onChanged).toHaveBeenCalledTimes(1);
    expect(onChanged.mock.calls[0][1]).toEqual(0);
  });

  it('calls onChange and onChanged when range slider range changes with mouse', () => {
    const onChange = jest.fn();
    const onChanged = jest.fn();
    const slider = React.createRef<ISlider>();
    wrapper = mount(<Slider onChange={onChange} onChanged={onChanged} defaultValue={5} ranged componentRef={slider} />);

    const sliderLine = wrapper.find('.ms-Slider-line');
    const sliderThumb = wrapper.find('.ms-Slider-slideBox');

    sliderLine.getDOMNode().getBoundingClientRect = () =>
      ({ left: 0, top: 0, right: 100, bottom: 40, width: 100, height: 40 } as DOMRect);

    sliderThumb.simulate('mousedown', { type: 'mousedown', clientX: 0, clientY: 0 });
    // Default min is 0.
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange.mock.calls[0][1]).toEqual([0, 5]);
    expect(onChanged).toHaveBeenCalledTimes(0);
    expect(slider.current!.range).toEqual([0, 5]);

    window.dispatchEvent(new Event('mouseup'));
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChanged).toHaveBeenCalledTimes(1);
    expect(onChanged.mock.calls[0][2]).toEqual([0, 5]);
  });

  it('does not call onChange or onChanged with range when ranged is false', () => {
    const onChange = jest.fn();
    const onChanged = jest.fn();
    wrapper = mount(<Slider onChange={onChange} onChanged={onChanged} defaultValue={5} />);

    const sliderLine = wrapper.find('.ms-Slider-line');
    const sliderThumb = wrapper.find('.ms-Slider-slideBox');

    sliderLine.getDOMNode().getBoundingClientRect = () =>
      ({ left: 0, top: 0, right: 100, bottom: 40, width: 100, height: 40 } as DOMRect);

    sliderThumb.simulate('mousedown', { type: 'mousedown', clientX: 0, clientY: 0 });

    expect(onChange.mock.calls[0][1]).toBeUndefined();

    window.dispatchEvent(new Event('mouseup'));
    expect(onChanged.mock.calls[0][2]).toBeUndefined();
  });

  it('can slide to default min/max and execute onChange', () => {
    const onChange = jest.fn();

    wrapper = mount(<Slider onChange={onChange} />);

    const sliderLine = wrapper.find('.ms-Slider-line');
    const sliderThumb = wrapper.find('.ms-Slider-slideBox');

    sliderLine.getDOMNode().getBoundingClientRect = () =>
      ({ left: 0, top: 0, right: 100, bottom: 40, width: 100, height: 40 } as DOMRect);

    sliderThumb.simulate('mousedown', { type: 'mousedown', clientX: 100, clientY: 0 });

    // Default max is 10.
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange.mock.calls[0][0]).toEqual(10);

    sliderThumb.simulate('mousedown', { type: 'mousedown', clientX: 0, clientY: 0 });

    // Default min is 0.
    expect(onChange).toHaveBeenCalledTimes(2);
    expect(onChange.mock.calls[1][0]).toEqual(0);
  });

  it('updates the upper value thumb when click to the right side of it', () => {
    const onChange = jest.fn();

    wrapper = mount(<Slider onChange={onChange} ranged defaultValue={5} />);

    const sliderLine = wrapper.find('.ms-Slider-line');
    const sliderThumb = wrapper.find('.ms-Slider-slideBox');

    sliderLine.getDOMNode().getBoundingClientRect = () =>
      ({ left: 0, top: 0, right: 100, bottom: 40, width: 100, height: 40 } as DOMRect);

    sliderThumb.simulate('mousedown', { type: 'mousedown', clientX: 80, clientY: 0 });

    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange.mock.calls[0][1]).toEqual([0, 8]);
  });

  it('updates the upper value thumb when click close to it', () => {
    const onChange = jest.fn();

    wrapper = mount(<Slider onChange={onChange} ranged defaultValue={5} />);

    const sliderLine = wrapper.find('.ms-Slider-line');
    const sliderThumb = wrapper.find('.ms-Slider-slideBox');

    sliderLine.getDOMNode().getBoundingClientRect = () =>
      ({ left: 0, top: 0, right: 100, bottom: 40, width: 100, height: 40 } as DOMRect);

    sliderThumb.simulate('mousedown', { type: 'mousedown', clientX: 40, clientY: 0 });

    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange.mock.calls[0][1]).toEqual([0, 4]);
  });

  it('updates the lower value thumb when click close to it', () => {
    const onChange = jest.fn();
    const onChanged = jest.fn();

    wrapper = mount(<Slider onChange={onChange} onChanged={onChanged} ranged defaultValue={5} />);

    const sliderLine = wrapper.find('.ms-Slider-line');
    const sliderThumb = wrapper.find('.ms-Slider-slideBox');

    sliderLine.getDOMNode().getBoundingClientRect = () =>
      ({ left: 0, top: 0, right: 100, bottom: 40, width: 100, height: 40 } as DOMRect);

    sliderThumb.simulate('mousedown', { type: 'mousedown', clientX: 10, clientY: 0 });

    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange.mock.calls[0][1]).toEqual([1, 5]);

    // test onChanged here too, since the earlier tests don't cover the lower thumb
    window.dispatchEvent(new Event('mouseup'));
    expect(onChanged).toHaveBeenCalledTimes(1);
    expect(onChanged.mock.calls[0][2]).toEqual([1, 5]);
  });

  it('updates the lower value thumb when click to the left of it', () => {
    let range;
    const onChange = (val: number, sliderRange: [number, number]) => {
      range = sliderRange;
    };

    wrapper = mount(<Slider onChange={onChange} ranged defaultValue={5} />);

    const sliderLine = wrapper.find('.ms-Slider-line');
    const sliderThumb = wrapper.find('.ms-Slider-slideBox');

    sliderLine.getDOMNode().getBoundingClientRect = () =>
      ({ left: 0, top: 0, right: 100, bottom: 40, width: 100, height: 40 } as DOMRect);

    sliderThumb.simulate('mousedown', { type: 'mousedown', clientX: 10, clientY: 0 });

    sliderThumb.simulate('mousedown', { type: 'mousedown', clientX: 20, clientY: 0 });

    expect(range).toEqual([2, 5]);
  });

  it('has type=button on all buttons', () => {
    wrapper = mount(<Slider />);

    wrapper.find('button').forEach(button => {
      expect(button.prop('type')).toEqual('button');
    });
  });

  it('renders correct aria-valuetext', () => {
    wrapper = mount(<Slider />);

    expect(wrapper.find('.ms-Slider-slideBox').prop('aria-valuetext')).toEqual('0');

    const values = ['small', 'medium', 'large'];
    const selected = 1;
    const getTextValue = (value: number) => values[value];

    wrapper.unmount();
    wrapper = mount(<Slider value={selected} ariaValueText={getTextValue} />);

    expect(wrapper.find('.ms-Slider-slideBox').prop('aria-valuetext')).toEqual(values[selected]);
  });

  it('renders correct aria properties for range slider', () => {
    wrapper = mount(<Slider ranged defaultValue={5} aria-label={'range'} />);

    const lowerValueThumb = wrapper.find('.ms-Slider-thumb').at(0);

    expect(lowerValueThumb.prop('aria-valuemax')).toEqual(5);
    expect(lowerValueThumb.prop('aria-valuemin')).toEqual(0);
    expect(lowerValueThumb.prop('aria-valuenow')).toEqual(0);
    expect(lowerValueThumb.prop('aria-label')).toEqual(`${MIN_PREFIX} range`);

    const upperValueThumb = wrapper.find('.ms-Slider-thumb').at(1);

    expect(upperValueThumb.prop('aria-valuemax')).toEqual(10);
    expect(upperValueThumb.prop('aria-valuemin')).toEqual(0);
    expect(upperValueThumb.prop('aria-valuenow')).toEqual(5);
    expect(upperValueThumb.prop('aria-label')).toEqual(`${MAX_PREFIX} range`);
  });

  it('formats the value when a format function is passed', () => {
    const value = 10;
    const valueFormat = (val: number) => `${val}%`;
    wrapper = mount(<Slider value={value} min={0} max={100} showValue={true} valueFormat={valueFormat} />);

    expect(wrapper.find('label.ms-Label.ms-Slider-value').text()).toEqual(valueFormat(value));
  });

  it('updates value correctly when down and up are pressed', () => {
    const slider = React.createRef<ISlider>();
    const onChange = jest.fn();

    wrapper = mount(
      <Slider label="slider" componentRef={slider} defaultValue={12} min={0} max={100} onChange={onChange} ranged />,
    );
    const sliderSlideBox = wrapper.find('.ms-Slider-slideBox');

    sliderSlideBox.simulate('keydown', { which: KeyCodes.down });
    sliderSlideBox.simulate('keydown', { which: KeyCodes.down });
    sliderSlideBox.simulate('keydown', { which: KeyCodes.down });
    sliderSlideBox.simulate('keydown', { which: KeyCodes.up });
    sliderSlideBox.simulate('keydown', { which: KeyCodes.down });

    expect(slider.current?.value).toEqual(9);

    expect(onChange).toHaveBeenCalledTimes(5);
  });

  it('updates value for range slider correctly when down and up are pressed', () => {
    const slider = React.createRef<ISlider>();
    const onChange = jest.fn();

    wrapper = mount(
      <Slider label="slider" componentRef={slider} defaultValue={20} min={12} max={100} onChange={onChange} ranged />,
    );
    const lowerValueThumb = wrapper.find('.ms-Slider-thumb').at(0);

    lowerValueThumb.simulate('keydown', { which: KeyCodes.down });
    lowerValueThumb.simulate('keydown', { which: KeyCodes.down });
    lowerValueThumb.simulate('keydown', { which: KeyCodes.down });
    lowerValueThumb.simulate('keydown', { which: KeyCodes.up });
    lowerValueThumb.simulate('keydown', { which: KeyCodes.down });

    expect(slider.current?.value).toEqual(17);

    expect(onChange).toHaveBeenCalledTimes(5);
  });

  it('calls onChanged after keyboard event', () => {
    jest.useFakeTimers();
    const onChanged = jest.fn();

    const container = document.createElement('div');
    document.body.appendChild(container);

    ReactDOM.render(<Slider label="slider" defaultValue={12} min={0} max={100} onChanged={onChanged} />, container);
    const sliderSlideBox = container.querySelector('.ms-Slider-slideBox') as HTMLElement;

    ReactTestUtils.Simulate.keyDown(sliderSlideBox, { which: KeyCodes.down });
    ReactTestUtils.Simulate.keyDown(sliderSlideBox, { which: KeyCodes.down });
    ReactTestUtils.Simulate.keyDown(sliderSlideBox, { which: KeyCodes.down });
    ReactTestUtils.Simulate.keyDown(sliderSlideBox, { which: KeyCodes.up });
    ReactTestUtils.Simulate.keyDown(sliderSlideBox, { which: KeyCodes.down });

    expect(sliderSlideBox.getAttribute('aria-valuenow')).toEqual('9');

    // onChanged should only be called after a delay
    expect(onChanged).toHaveBeenCalledTimes(0);
    jest.runOnlyPendingTimers();
    expect(onChanged).toHaveBeenCalledTimes(1);
  });

  it('onChanged returns the correct value', () => {
    jest.useFakeTimers();
    const onChanged = jest.fn();

    const container = document.createElement('div');
    document.body.appendChild(container);

    ReactDOM.render(<Slider label="slider" defaultValue={5} min={0} max={100} onChanged={onChanged} />, container);
    const sliderSlideBox = container.querySelector('.ms-Slider-slideBox') as HTMLElement;

    ReactTestUtils.Simulate.keyDown(sliderSlideBox, { which: KeyCodes.down });
    ReactTestUtils.Simulate.keyDown(sliderSlideBox, { which: KeyCodes.down });
    ReactTestUtils.Simulate.keyDown(sliderSlideBox, { which: KeyCodes.down });
    ReactTestUtils.Simulate.keyDown(sliderSlideBox, { which: KeyCodes.up });
    ReactTestUtils.Simulate.keyDown(sliderSlideBox, { which: KeyCodes.down });

    // onChanged should only be called after a delay
    expect(onChanged).toHaveBeenCalledTimes(0);
    jest.runOnlyPendingTimers();
    expect(onChanged).toHaveBeenCalledTimes(1);
    expect(onChanged.mock.calls[0][1]).toEqual(2);
  });

  it('does not update the value when slider is controlled', () => {
    const slider = React.createRef<ISlider>();
    const onChange = jest.fn();

    wrapper = mount(<Slider label="slider" componentRef={slider} value={3} min={0} max={100} onChange={onChange} />);
    const sliderSlideBox = wrapper.find('.ms-Slider-slideBox');

    sliderSlideBox.simulate('keydown', { which: KeyCodes.down });

    expect(slider.current?.value).toEqual(3);

    expect(onChange).toHaveBeenCalledTimes(1);
  });

  it('calls onChange with correct value when controlled', () => {
    const slider = React.createRef<ISlider>();
    const onChange = jest.fn();

    wrapper = mount(<Slider label="slider" componentRef={slider} value={3} min={0} max={100} onChange={onChange} />);
    const sliderSlideBox = wrapper.find('.ms-Slider-slideBox');

    sliderSlideBox.simulate('keydown', { which: KeyCodes.down });

    expect(slider.current?.value).toEqual(3);

    // Get the first argument passed into the call
    expect(onChange.mock.calls[0][0]).toEqual(2);
  });

  it('calls onChange with correct range when controlled', () => {
    const slider = React.createRef<ISlider>();
    const onChange = jest.fn();

    wrapper = mount(
      <Slider label="slider" componentRef={slider} value={3} min={0} max={100} onChange={onChange} ranged />,
    );
    const sliderSlideBox = wrapper.find('.ms-Slider-slideBox');

    sliderSlideBox.simulate('keydown', { which: KeyCodes.down });

    expect(slider.current?.range).toEqual([0, 3]);

    // Get the second argument passed into the call
    expect(onChange.mock.calls[0][1]).toEqual([0, 2]);
  });

  it('calls onChange on multiple calls with correct value when controlled', () => {
    const slider = React.createRef<ISlider>();
    const onChange = jest.fn();

    wrapper = mount(<Slider label="slider" componentRef={slider} value={3} min={0} max={100} onChange={onChange} />);
    const sliderSlideBox = wrapper.find('.ms-Slider-slideBox');

    sliderSlideBox.simulate('keydown', { which: KeyCodes.up });
    sliderSlideBox.simulate('keydown', { which: KeyCodes.up });
    sliderSlideBox.simulate('keydown', { which: KeyCodes.up });

    expect(slider.current?.value).toEqual(3);

    // Get the first argument passed into the third call
    expect(onChange.mock.calls[2][0]).toEqual(4);
  });

  it('correctly changes value with negative steps', () => {
    const slider = React.createRef<ISlider>();
    const onChange = jest.fn();

    wrapper = mount(
      <Slider label="slider" defaultValue={10} componentRef={slider} step={-3} min={0} max={100} onChange={onChange} />,
    );
    const sliderSlideBox = wrapper.find('.ms-Slider-slideBox');

    sliderSlideBox.simulate('keydown', { which: KeyCodes.up });
    expect(slider.current?.value).toEqual(7);
  });

  it('correctly changes value with decimal steps', () => {
    const container = document.createElement('div');
    const slider = React.createRef<ISlider>();
    const onChange = jest.fn();
    const step = 0.0000001;
    const defaultValue = 10;

    wrapper = mount(
      <Slider
        label="slider"
        defaultValue={defaultValue}
        componentRef={slider}
        step={step}
        min={0}
        max={100}
        onChange={onChange}
      />,
    );
    const sliderSlideBox = wrapper.find('.ms-Slider-slideBox');

    sliderSlideBox.simulate('keydown', { which: KeyCodes.up });
    expect(slider.current?.value).toEqual(defaultValue + step);
    ReactDOM.unmountComponentAtNode(container);
  });
});
