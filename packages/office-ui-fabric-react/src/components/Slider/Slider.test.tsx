import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as renderer from 'react-test-renderer';
import * as ReactTestUtils from 'react-dom/test-utils';
import { mount, ReactWrapper } from 'enzyme';
import { Slider } from './Slider';
import { ISlider } from './Slider.types';
import { ONKEYDOWN_TIMEOUT_DURATION } from './Slider.base';
import { KeyCodes, resetIds } from '../../Utilities';
import { isConformant } from '../../common/isConformant';

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
  });

  isConformant({
    Component: Slider,
    displayName: 'Slider',
  });

  it('renders correctly', () => {
    const component = renderer.create(<Slider label="I am a slider" />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders range slider correctly', () => {
    const component = renderer.create(<Slider label="I am a ranged slider" ranged defaultValue={5} />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('can slide to default min/max and execute onChange', () => {
    let changedValue;

    const onChange = (val: any) => {
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

  it('calls onChange when range slider range changes', () => {
    const onChange = jest.fn();
    wrapper = mount(<Slider onChange={onChange} defaultValue={5} ranged />);

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
      clientX: 80,
      clientY: 0,
    });

    expect(onChange.mock.calls.length).toEqual(1);
  });

  it('does not call onChange with range when ranged is false', () => {
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

    expect(onChange.mock.calls[0][1]).toBeUndefined();
  });

  it('updates the upper value thumb when click to the right side of it', () => {
    let range;
    const onChange = (val: number, sliderRange: [number, number]) => {
      range = sliderRange;
    };

    wrapper = mount(<Slider onChange={onChange} ranged defaultValue={5} />);

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
      clientX: 80,
      clientY: 0,
    });

    expect(range).toEqual([0, 8]);
  });

  it('updates the upper value thumb when click close to it', () => {
    let range;
    const onChange = (val: number, sliderRange: [number, number]) => {
      range = sliderRange;
    };

    wrapper = mount(<Slider onChange={onChange} ranged defaultValue={5} />);

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
      clientX: 40,
      clientY: 0,
    });

    expect(range).toEqual([0, 4]);
  });

  it('updates the lower value thumb when click close to it', () => {
    let range;
    const onChange = (val: number, sliderRange: [number, number]) => {
      range = sliderRange;
    };

    wrapper = mount(<Slider onChange={onChange} ranged defaultValue={5} />);

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
      clientX: 10,
      clientY: 0,
    });

    expect(range).toEqual([1, 5]);
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
      clientX: 10,
      clientY: 0,
    });

    sliderThumb.simulate('mousedown', {
      type: 'mousedown',
      clientX: 20,
      clientY: 0,
    });

    expect(range).toEqual([2, 5]);
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

  it('can provide the current range', () => {
    const slider = React.createRef<ISlider>();

    wrapper = mount(<Slider label="slider" defaultValue={12} min={0} max={100} componentRef={slider} ranged />);
    expect(slider.current!.range).toEqual([0, 12]);
  });

  it('can set id on slider', () => {
    wrapper = mount(<Slider buttonProps={{ id: 'test_id' }} />);

    const sliderSlideBox = wrapper.find('.ms-Slider-slideBox');
    expect(sliderSlideBox.getDOMNode().id).toEqual('test_id');
  });

  it('can set id on range slider', () => {
    wrapper = mount(<Slider ranged />);

    const lowerValueThumb = wrapper.find('.ms-Slider-thumb').at(0);
    expect(lowerValueThumb.getDOMNode().id).toEqual(`${MIN_PREFIX}-Slider0`);

    const upperValueThumb = wrapper.find('.ms-Slider-thumb').at(1);
    expect(upperValueThumb.getDOMNode().id).toEqual(`${MAX_PREFIX}-Slider0`);
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

  it('renders correct aria properties for range slider', () => {
    wrapper = mount(<Slider ranged defaultValue={5} ariaLabel={'range'} />);

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
    const valueFormat = (val: any) => `${val}%`;
    wrapper = mount(<Slider value={value} min={0} max={100} showValue={true} valueFormat={valueFormat} />);

    expect(wrapper.find('label.ms-Label.ms-Slider-value').text()).toEqual(valueFormat(value));
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

    setTimeout(() => {
      expect(onChanged).toHaveBeenCalledTimes(1);
    }, ONKEYDOWN_TIMEOUT_DURATION);

    jest.runOnlyPendingTimers();

    ReactDOM.unmountComponentAtNode(container);
  });

  it('calls onChange with correct range when controlled', () => {
    const slider = React.createRef<ISlider>();
    const onChange = jest.fn();

    wrapper = mount(
      <Slider label="slider" componentRef={slider} value={3} min={0} max={100} onChange={onChange} ranged />,
    );
    const sliderSlideBox = wrapper.find('.ms-Slider-slideBox');

    sliderSlideBox.simulate('keydown', { which: KeyCodes.down });

    expect(slider.current?.value).toEqual(3);

    // Get the second argument passed into the call
    expect(onChange.mock.calls[0][1]).toEqual([0, 2]);
  });
});
