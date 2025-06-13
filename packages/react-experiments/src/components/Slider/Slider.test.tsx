import '@testing-library/jest-dom';
import * as React from 'react';
import * as renderer from 'react-test-renderer';
import { render, fireEvent, act } from '@testing-library/react';

import { Slider } from './Slider';
import { ONKEYDOWN_TIMEOUT_DURATION } from './Slider.base';
import { KeyCodes } from '../../Utilities';
import type { ISlider } from './Slider.types';

/* eslint-disable @typescript-eslint/no-deprecated */

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

    const { container } = render(<Slider onChange={onChange} />);

    const sliderLine = container.querySelector('.ms-Slider-line') as HTMLElement;
    const sliderThumb = container.querySelector('.ms-Slider-slideBox') as HTMLElement;

    // Mock getBoundingClientRect
    const originalGetBoundingClientRect = sliderLine.getBoundingClientRect;
    sliderLine.getBoundingClientRect = () =>
      ({
        left: 0,
        top: 0,
        right: 100,
        bottom: 40,
        width: 100,
        height: 40,
      } as DOMRect);

    // Simulate mousedown at max position
    fireEvent.mouseDown(sliderThumb, {
      clientX: 100,
      clientY: 0,
    });

    // Default max is 10.
    expect(changedValue).toEqual(10);

    // Simulate mousedown at min position
    fireEvent.mouseDown(sliderThumb, {
      clientX: 0,
      clientY: 0,
    });

    // Default min is 0.
    expect(changedValue).toEqual(0);

    // Restore original function
    sliderLine.getBoundingClientRect = originalGetBoundingClientRect;
  });

  it('has type=button on all buttons', () => {
    const { container } = render(<Slider />);
    const buttons = container.querySelectorAll('button');

    buttons.forEach(button => {
      expect(button).toHaveAttribute('type', 'button');
    });
  });

  it('can provide the current value', () => {
    const slider = React.createRef<ISlider>();

    render(<Slider label="slider" defaultValue={12} min={0} max={100} componentRef={slider} />);
    expect(slider.current!.value).toEqual(12);
  });

  it('should be able to handler zero default value', () => {
    const slider = React.createRef<ISlider>();

    render(<Slider label="slider" defaultValue={0} min={-100} max={100} componentRef={slider} />);
    expect(slider.current!.value).toEqual(0);
  });

  it('should be able to handle zero value', () => {
    const slider = React.createRef<ISlider>();

    render(<Slider label="slider" value={0} min={-100} max={100} componentRef={slider} />);
    expect(slider.current!.value).toEqual(0);
  });

  it('renders correct aria-valuetext', () => {
    // First test with default slider
    let { container } = render(<Slider />);
    let slideBox = container.querySelector('.ms-Slider-slideBox');
    expect(slideBox).not.toHaveAttribute('aria-valuetext');

    // Then test with custom aria value text
    const values = ['small', 'medium', 'large'];
    const selected = 1;
    const getTextValue = (value: number) => values[value];

    ({ container } = render(<Slider value={selected} ariaValueText={getTextValue} />));
    slideBox = container.querySelector('.ms-Slider-slideBox');
    expect(slideBox).toHaveAttribute('aria-valuetext', values[selected]);
  });

  it('formats the value when a format function is passed', () => {
    const value = 10;
    const valueFormat = (val: any) => `${val}%`;
    const { container } = render(<Slider value={value} min={0} max={100} showValue={true} valueFormat={valueFormat} />);

    const valueLabel = container.querySelector('label.ms-Label.ms-Slider-value');
    expect(valueLabel).toHaveTextContent(valueFormat(value));
  });

  it('calls onChanged after keyboard event', () => {
    jest.useFakeTimers();
    const onChanged = jest.fn();

    const { container } = render(<Slider label="slider" defaultValue={12} min={0} max={100} onChanged={onChanged} />);
    const sliderSlideBox = container.querySelector('.ms-Slider-slideBox') as HTMLElement;

    // Need to use keyCode for React Testing Library instead of which
    fireEvent.keyDown(sliderSlideBox, { keyCode: KeyCodes.down });
    fireEvent.keyDown(sliderSlideBox, { keyCode: KeyCodes.down });
    fireEvent.keyDown(sliderSlideBox, { keyCode: KeyCodes.down });
    fireEvent.keyDown(sliderSlideBox, { keyCode: KeyCodes.up });
    fireEvent.keyDown(sliderSlideBox, { keyCode: KeyCodes.down });

    expect(sliderSlideBox).toHaveAttribute('aria-valuenow', '9');

    // onChanged should only be called after a delay
    expect(onChanged).toHaveBeenCalledTimes(0);

    act(() => {
      jest.advanceTimersByTime(ONKEYDOWN_TIMEOUT_DURATION);
    });

    expect(onChanged).toHaveBeenCalledTimes(1);
  });

  it('should be able to display the correct custom labels & tickmarks at the correct positions', () => {
    const labelsArray = [
      { label: '20°C', value: 20 },
      { label: '80°C', value: 80 },
      { label: '100°C', value: 100 },
    ];
    const expectedValuesArray = [20, 80, 100];
    const { container } = render(<Slider marks={labelsArray} min={0} max={100} showValue={true} step={10} />);

    const labels = container.querySelectorAll('.ms-Slider-regularLabel');
    const ticks = container.querySelectorAll('.ms-Slider-regularTick');

    expect(labels.length).toEqual(3);
    expect(ticks.length).toEqual(11);

    for (let i = 0; i < labelsArray.length; i++) {
      const label = labels[i] as HTMLElement;
      expect(label.textContent).toEqual(`${expectedValuesArray[i]}°C`);
      expect(label.style.left).toEqual(`${expectedValuesArray[i]}%`);
    }
  });

  it('custom labels should be able to handle values that are out of bounds', () => {
    const labelsArray = [
      { label: '-20°C', value: -20 },
      { label: '1000°C', value: 1000 },
    ];
    const { container } = render(<Slider marks={labelsArray} min={0} max={100} showValue={true} step={10} />);
    const expectedLabelsArray = [-20, 1000];
    const expectedValuesArray = [0, 100];

    const labels = container.querySelectorAll('.ms-Slider-regularLabel');
    const ticks = container.querySelectorAll('.ms-Slider-regularTick');

    expect(labels.length).toEqual(2);
    expect(ticks.length).toEqual(11);

    for (let i = 0; i < labelsArray.length; i++) {
      const label = labels[i] as HTMLElement;
      expect(label.textContent).toBe(`${expectedLabelsArray[i]}°C`);
      expect(label.style.left).toBe(`${expectedValuesArray[i]}%`);
    }
  });
});
