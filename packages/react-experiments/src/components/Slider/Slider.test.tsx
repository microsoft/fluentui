import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as renderer from 'react-test-renderer';
import * as ReactTestUtils from 'react-dom/test-utils';

import { mount } from 'enzyme';
import { Slider } from './Slider';
import { ONKEYDOWN_TIMEOUT_DURATION } from './Slider.base';
import { KeyCodes } from '../../Utilities';
import type { ISlider } from './Slider.types';

/* eslint-disable deprecation/deprecation */

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

  it('should be able to handle zero value', () => {
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

  it('formats the value when a format function is passed', () => {
    const value = 10;
    const valueFormat = (val: any) => `${val}%`;
    const component = mount(<Slider value={value} min={0} max={100} showValue={true} valueFormat={valueFormat} />);
    expect(component.find('label.ms-Label.ms-Slider-value').text()).toEqual(valueFormat(value));
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

  it('should be able to display the correct custom labels & tickmarks at the correct positions', () => {
    const labelsArray = [
      { label: '20°C', value: 20 },
      { label: '80°C', value: 80 },
      { label: '100°C', value: 100 },
    ];
    const expectedValuesArray = [20, 80, 100];
    const component = mount(<Slider marks={labelsArray} min={0} max={100} showValue={true} step={10} />);

    const allLabels = component.find('.ms-Slider-regularLabel');
    const labels = allLabels.getElements();
    const labelNumber = component.find('.ms-Slider-regularLabel').length;
    const tickNumber = component.find('.ms-Slider-regularTick').length;

    expect(labelNumber).toEqual(3);
    expect(tickNumber).toEqual(11);

    for (let i = 0; i < labelsArray.length; i++) {
      expect(labels[i].props.children).toEqual(`${expectedValuesArray[i]}°C`);
      expect(labels[i].props.style.left).toEqual(`${expectedValuesArray[i]}%`);
    }
  });

  it('custom labels should be able to handle values that are out of bounds', () => {
    const labelsArray = [
      { label: '-20°C', value: -20 },
      { label: '1000°C', value: 1000 },
    ];
    const component = mount(<Slider marks={labelsArray} min={0} max={100} showValue={true} step={10} />);
    const expectedLabelsArray = [-20, 1000];
    const expectedValuesArray = [0, 100];

    const allLabels = component.find('.ms-Slider-regularLabel');
    const labels = allLabels.getElements();
    const labelNumber = component.find('.ms-Slider-regularLabel').length;
    const tickNumber = component.find('.ms-Slider-regularTick').length;

    expect(labelNumber).toEqual(2);
    expect(tickNumber).toEqual(11);

    for (let i = 0; i < labelsArray.length; i++) {
      expect(labels[i].props.children).toBe(`${expectedLabelsArray[i]}°C`);
      expect(labels[i].props.style.left).toBe(`${expectedValuesArray[i]}%`);
    }
  });
});
