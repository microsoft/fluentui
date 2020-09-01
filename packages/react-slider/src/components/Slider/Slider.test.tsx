import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { create } from '@uifabric/utilities/lib/test';
import * as ReactTestUtils from 'react-dom/test-utils';
import * as path from 'path';
import { mount, ReactWrapper } from 'enzyme';
import { Slider } from './Slider';
import { ISlider } from './Slider.types';
import { ONKEYDOWN_TIMEOUT_DURATION } from './Slider.base';
import { sharedIsConformant } from '../../common/sharedIsConformant';
import { resetIds, KeyCodes } from '@uifabric/utilities';

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
  });

  sharedIsConformant({
    componentPath: path.join(__dirname, 'Slider.tsx'),
    Component: Slider,
    displayName: 'Slider',
  });

  it('renders correctly', () => {
    const component = create(<Slider label="I am a slider" />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('calls onChange when slider value changes', () => {
    const onChange = jest.fn();
    wrapper = mount(<Slider onChange={onChange} defaultValue={5} />);

    const sliderLine = wrapper.find('.ms-Slider-line');
    const sliderThumb = wrapper.find('.ms-Slider-slideBox');

    sliderLine.getDOMNode().getBoundingClientRect = () =>
      ({
        left: 0,
        top: 0,
        right: 100,
        bottom: 40,
        width: 100,
        height: 40,
      } as DOMRect);

    sliderThumb.simulate('mousedown', {
      type: 'mousedown',
      clientX: 0,
      clientY: 0,
    });
    // Default min is 0.
    expect(onChange.mock.calls.length).toEqual(1);
  });

  it('can slide to default min/max and execute onChange', () => {
    let changedValue;
    const onChange = (val: number) => {
      changedValue = val;
    };

    wrapper = mount(<Slider onChange={onChange} />);

    const sliderLine = wrapper.find('.ms-Slider-line');
    const sliderThumb = wrapper.find('.ms-Slider-slideBox');

    sliderLine.getDOMNode().getBoundingClientRect = () =>
      ({
        left: 0,
        top: 0,
        right: 100,
        bottom: 40,
        width: 100,
        height: 40,
      } as DOMRect);
    sliderThumb.simulate('mousedown', {
      type: 'mousedown',
      clientX: 100,
      clientY: 0,
    });

    // Default max is 10.
    expect(changedValue).toEqual(10);

    sliderThumb.simulate('mousedown', {
      type: 'mousedown',
      clientX: 0,
      clientY: 0,
    });

    // Default min is 0.
    expect(changedValue).toEqual(0);
  });

  it('has type=button on all buttons', () => {
    wrapper = mount(<Slider />);

    wrapper.find('button').forEach(button => {
      expect(button.prop('type')).toEqual('button');
    });
  });

  it('can provide the current value', () => {
    const slider = React.createRef<ISlider>();

    wrapper = mount(<Slider label="slider" defaultValue={12} min={0} max={100} componentRef={slider} />);
    expect(slider.current!.value).toEqual(12);
  });

  it('can set id on slider', () => {
    wrapper = mount(<Slider buttonProps={{ id: 'test_id' }} />);

    const sliderSlideBox = wrapper.find('.ms-Slider-slideBox');
    expect(sliderSlideBox.getDOMNode().id).toEqual('test_id');
  });

  it('should be able to handler zero default value', () => {
    const slider = React.createRef<ISlider>();

    wrapper = mount(<Slider label="slider" defaultValue={0} min={-100} max={100} componentRef={slider} />);
    expect(slider.current!.value).toEqual(0);
  });

  it('should be able to handler zero value', () => {
    const slider = React.createRef<ISlider>();

    wrapper = mount(<Slider label="slider" value={0} min={-100} max={100} componentRef={slider} />);
    expect(slider.current!.value).toEqual(0);
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
      <Slider label="slider" componentRef={slider} defaultValue={12} min={0} max={100} onChange={onChange} />,
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

    setTimeout(() => {
      expect(onChanged).toHaveBeenCalledTimes(1);
    }, ONKEYDOWN_TIMEOUT_DURATION);

    jest.runOnlyPendingTimers();
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
