import * as React from 'react';
import * as renderer from 'react-test-renderer';
import { mount } from 'enzyme';
import { Slider } from './Slider';
import { ISlider } from './Slider.types';

describe('Slider', () => {
  it('renders correctly', () => {
    const component = renderer.create(<Slider label="I am a slider" />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('can slide to default min/max and execute onChange', () => {
    let changedValue;

    const onChange = (val: any) => {
      changedValue = val;
    };

    const wrapper = mount(<Slider onChange={onChange} />);

    const sliderLine = wrapper.find('.ms-Slider-line');
    const sliderThumb = wrapper.find('.ms-Slider-slideBox');

    sliderLine.getDOMNode().getBoundingClientRect = () => ({
      left: 0,
      top: 0,
      right: 100,
      bottom: 40,
      width: 100,
      height: 40
    });

    sliderThumb.simulate('mousedown', {
      type: 'mousedown',
      clientX: 100,
      clientY: 0
    });

    // Default max is 10.
    expect(changedValue).toEqual(10);

    sliderThumb.simulate('mousedown', {
      type: 'mousedown',
      clientX: 0,
      clientY: 0
    });

    // Default min is 0.
    expect(changedValue).toEqual(0);
  });

  it('has type=button on all buttons', () => {
    const component = mount(<Slider />);

    component.find('button').forEach(button => {
      expect(button.prop('type')).toEqual('button');
    });
  });

  it('can provide the current value', () => {
    const slider = React.createRef<ISlider>();

    mount(<Slider label="slider" defaultValue={12} min={0} max={100} componentRef={slider} />);
    expect(slider.current!.value).toEqual(12);
  });

  it('should be able to handler zero default value', () => {
    const slider = React.createRef<ISlider>();

    mount(<Slider label="slider" defaultValue={0} min={-100} max={100} componentRef={slider} />);
    expect(slider.current!.value).toEqual(0);
  });

  it('should be able to handler zero value', () => {
    const slider = React.createRef<ISlider>();

    mount(<Slider label="slider" value={0} min={-100} max={100} componentRef={slider} />);
    expect(slider.current!.value).toEqual(0);
  });

  it('renders correct aria-valuetext', () => {
    let component = mount(<Slider />);

    expect(component.find('.ms-Slider-slideBox').prop('aria-valuetext')).toBeUndefined();

    const values = ['small', 'medium', 'large'];
    const selected = 1;
    const getTextValue = (value: number) => values[value];

    component = mount(<Slider value={selected} ariaValueText={getTextValue} />);

    expect(component.find('.ms-Slider-slideBox').prop('aria-valuetext')).toEqual(values[selected]);
  });
});
