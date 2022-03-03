import * as React from 'react';
import { resetIds } from '../../Utilities';
import { fireEvent, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Slider } from './Slider';
import { isConformant } from '../../common/isConformant';
import type { ISlider } from './Slider.types';

const MIN_PREFIX = 'min';
const MAX_PREFIX = 'max';
const DOWN = 'arrowdown';
const UP = 'arrowup';

describe('Slider', () => {
  beforeEach(() => {
    resetIds();
  });

  afterEach(() => {
    if ((setTimeout as any).mock) {
      jest.useRealTimers();
    }
  });

  isConformant({
    Component: Slider,
    displayName: 'Slider',
  });

  it('renders correctly', () => {
    const { container } = render(<Slider label="I am a slider" />);
    expect(container).toMatchSnapshot();
  });

  it('renders range slider correctly', () => {
    const { container } = render(<Slider label="I am a ranged slider" ranged defaultValue={5} />);
    expect(container).toMatchSnapshot();
  });

  it('can set aria-labelledby attribute', () => {
    const { getByRole } = render(<Slider aria-labelledby="custom-label" />);
    expect(getByRole('slider').getAttribute('aria-labelledby')).toBe('custom-label');
  });

  it('can provide the current value', () => {
    const slider = React.createRef<ISlider>();

    render(<Slider defaultValue={12} min={0} max={100} componentRef={slider} />);
    expect(slider.current?.value).toEqual(12);
  });

  it('can provide the current range', () => {
    const slider = React.createRef<ISlider>();

    render(<Slider defaultValue={12} min={0} max={100} componentRef={slider} ranged />);
    expect(slider.current?.range).toEqual([0, 12]);
  });

  it('can set id', () => {
    const { container, getByRole } = render(<Slider id="test_id" styles={{ titleLabel: 'test_label' }} />);

    expect(getByRole('slider').id).toEqual('test_id');

    // properly associates label with custom id
    const label = container.getElementsByClassName('test_label')[0];
    expect(label.getAttribute('for')).toBe('test_id');
  });

  it('can set id via buttonProps', () => {
    // Not the recommended way of doing things, but it should work consistently still
    const { container, getByRole } = render(
      <Slider buttonProps={{ id: 'test_id' }} styles={{ titleLabel: 'test_label' }} />,
    );

    expect(getByRole('slider').id).toEqual('test_id');

    // properly associates label with custom id
    const label = container.getElementsByClassName('test_label')[0];
    expect(label.getAttribute('for')).toBe('test_id');
  });

  it('handles zero default value', () => {
    const slider = React.createRef<ISlider>();

    render(<Slider defaultValue={0} min={-100} max={100} componentRef={slider} />);
    expect(slider.current!.value).toEqual(0);
  });

  it('handles zero value', () => {
    const slider = React.createRef<ISlider>();

    render(<Slider value={0} min={-100} max={100} componentRef={slider} />);
    expect(slider.current!.value).toEqual(0);
  });

  it('calls onChange and onChanged when slider value changes with mouse', () => {
    const onChange = jest.fn();
    const onChanged = jest.fn();
    const slider = React.createRef<ISlider>();
    const { container, getByRole } = render(
      <Slider onChange={onChange} defaultValue={5} onChanged={onChanged} componentRef={slider} />,
    );

    const sliderLine = container.getElementsByClassName('ms-Slider-line')[0];
    const sliderThumb = getByRole('slider');

    sliderLine.getBoundingClientRect = () =>
      ({ left: 0, top: 0, right: 100, bottom: 40, width: 100, height: 40 } as DOMRect);

    fireEvent.mouseDown(sliderThumb, { clientX: 0, clientY: 0 });
    // Default min is 0.
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange.mock.calls[0][0]).toEqual(0);
    expect(onChanged).toHaveBeenCalledTimes(0); // not called yet
    expect(slider.current!.value).toBe(0);

    // have to use a real event to trigger onChanged
    fireEvent.mouseUp(sliderThumb);
    expect(onChange).toHaveBeenCalledTimes(1); // not called again
    expect(onChanged).toHaveBeenCalledTimes(1);
    expect(onChanged.mock.calls[0][1]).toEqual(0);
  });

  it('calls onChange and onChanged when range slider range changes with mouse', () => {
    const onChange = jest.fn();
    const onChanged = jest.fn();
    const slider = React.createRef<ISlider>();
    const { container } = render(
      <Slider onChange={onChange} onChanged={onChanged} defaultValue={5} ranged componentRef={slider} />,
    );

    const sliderLine = container.getElementsByClassName('ms-Slider-line')[0];
    const sliderThumb = container.getElementsByClassName('ms-Slider-slideBox')[0];

    sliderLine.getBoundingClientRect = () =>
      ({ left: 0, top: 0, right: 100, bottom: 40, width: 100, height: 40 } as DOMRect);

    fireEvent.mouseDown(sliderThumb, { clientX: 0, clientY: 0 });
    // Default min is 0.
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange.mock.calls[0][1]).toEqual([0, 5]);
    expect(onChanged).toHaveBeenCalledTimes(0);
    expect(slider.current!.range).toEqual([0, 5]);

    fireEvent.mouseUp(sliderThumb);
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChanged).toHaveBeenCalledTimes(1);
    expect(onChanged.mock.calls[0][2]).toEqual([0, 5]);
  });

  it('does not call onChange or onChanged with range when ranged is false', () => {
    const onChange = jest.fn();
    const onChanged = jest.fn();
    const { container } = render(<Slider onChange={onChange} onChanged={onChanged} defaultValue={5} />);

    const sliderLine = container.getElementsByClassName('ms-Slider-line')[0];
    const sliderThumb = container.getElementsByClassName('ms-Slider-slideBox')[0];

    sliderLine.getBoundingClientRect = () =>
      ({ left: 0, top: 0, right: 100, bottom: 40, width: 100, height: 40 } as DOMRect);

    fireEvent.mouseDown(sliderThumb, { clientX: 0, clientY: 0 });
    expect(onChange.mock.calls[0][1]).toBeUndefined();

    fireEvent.mouseUp(sliderThumb);
    expect(onChanged.mock.calls[0][2]).toBeUndefined();
  });

  it('can slide to default min/max and execute onChange', () => {
    const onChange = jest.fn();

    const { container } = render(<Slider onChange={onChange} />);

    const sliderLine = container.getElementsByClassName('ms-Slider-line')[0];
    const sliderThumb = container.getElementsByClassName('ms-Slider-slideBox')[0];

    sliderLine.getBoundingClientRect = () =>
      ({ left: 0, top: 0, right: 100, bottom: 40, width: 100, height: 40 } as DOMRect);

    fireEvent.mouseDown(sliderThumb, { clientX: 100, clientY: 0 });

    // Default max is 10.
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange.mock.calls[0][0]).toEqual(10);

    fireEvent.mouseDown(sliderThumb, { clientX: 0, clientY: 0 });

    // Default min is 0.
    expect(onChange).toHaveBeenCalledTimes(2);
    expect(onChange.mock.calls[1][0]).toEqual(0);
  });

  it('updates the upper value thumb when click to the right side of it', () => {
    const onChange = jest.fn();

    const { container } = render(<Slider onChange={onChange} ranged defaultValue={5} />);

    const sliderLine = container.getElementsByClassName('ms-Slider-line')[0];
    const sliderThumb = container.getElementsByClassName('ms-Slider-slideBox')[0];

    sliderLine.getBoundingClientRect = () =>
      ({ left: 0, top: 0, right: 100, bottom: 40, width: 100, height: 40 } as DOMRect);

    fireEvent.mouseDown(sliderThumb, { clientX: 80, clientY: 0 });

    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange.mock.calls[0][1]).toEqual([0, 8]);
  });

  it('updates the upper value thumb when click close to it', () => {
    const onChange = jest.fn();

    const { container } = render(<Slider onChange={onChange} ranged defaultValue={5} />);

    const sliderLine = container.getElementsByClassName('ms-Slider-line')[0];
    const sliderThumb = container.getElementsByClassName('ms-Slider-slideBox')[0];

    sliderLine.getBoundingClientRect = () =>
      ({ left: 0, top: 0, right: 100, bottom: 40, width: 100, height: 40 } as DOMRect);

    fireEvent.mouseDown(sliderThumb, { clientX: 40, clientY: 0 });

    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange.mock.calls[0][1]).toEqual([0, 4]);
  });

  it('updates the lower value thumb when click close to it', () => {
    const onChange = jest.fn();
    const onChanged = jest.fn();

    const { container } = render(<Slider onChange={onChange} onChanged={onChanged} ranged defaultValue={5} />);

    const sliderLine = container.getElementsByClassName('ms-Slider-line')[0];
    const sliderThumb = container.getElementsByClassName('ms-Slider-slideBox')[0];

    sliderLine.getBoundingClientRect = () =>
      ({ left: 0, top: 0, right: 100, bottom: 40, width: 100, height: 40 } as DOMRect);

    fireEvent.mouseDown(sliderThumb, { clientX: 10, clientY: 0 });

    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange.mock.calls[0][1]).toEqual([1, 5]);

    // test onChanged here too, since the earlier tests don't cover the lower thumb
    fireEvent.mouseUp(sliderThumb);
    expect(onChanged).toHaveBeenCalledTimes(1);
    expect(onChanged.mock.calls[0][2]).toEqual([1, 5]);
  });

  it('updates the lower value thumb when click to the left of it', () => {
    let range;
    const onChange = (val: number, sliderRange: [number, number]) => {
      range = sliderRange;
    };

    const { container } = render(<Slider onChange={onChange} ranged defaultValue={5} />);

    const sliderLine = container.getElementsByClassName('ms-Slider-line')[0];
    const sliderThumb = container.getElementsByClassName('ms-Slider-slideBox')[0];

    sliderLine.getBoundingClientRect = () =>
      ({ left: 0, top: 0, right: 100, bottom: 40, width: 100, height: 40 } as DOMRect);

    fireEvent.mouseDown(sliderThumb, { clientX: 10, clientY: 0 });
    fireEvent.mouseDown(sliderThumb, { clientX: 20, clientY: 0 });

    expect(range).toEqual([2, 5]);
  });

  it('renders correct aria-valuetext', () => {
    const { getByRole, rerender } = render(<Slider value={0} />);

    expect(getByRole('slider').getAttribute('aria-valuetext')).toEqual('0');

    const values = ['small', 'medium', 'large'];
    const selected = 1;
    const getTextValue = (value: number) => values[value];

    rerender(<Slider value={selected} ariaValueText={getTextValue} />);

    expect(getByRole('slider').getAttribute('aria-valuetext')).toEqual(values[selected]);
  });

  it('renders correct aria properties for range slider', () => {
    const { getAllByRole } = render(<Slider ranged defaultValue={5} aria-label={'range'} />);

    const lowerValueThumb = getAllByRole('slider')[0];

    expect(lowerValueThumb.getAttribute('aria-valuemax')).toEqual('5');
    expect(lowerValueThumb.getAttribute('aria-valuemin')).toEqual('0');
    expect(lowerValueThumb.getAttribute('aria-valuenow')).toEqual('0');
    expect(lowerValueThumb.getAttribute('aria-label')).toEqual(`${MIN_PREFIX} range`);

    const upperValueThumb = getAllByRole('slider')[1];

    expect(upperValueThumb.getAttribute('aria-valuemax')).toEqual('10');
    expect(upperValueThumb.getAttribute('aria-valuemin')).toEqual('0');
    expect(upperValueThumb.getAttribute('aria-valuenow')).toEqual('5');
    expect(upperValueThumb.getAttribute('aria-label')).toEqual(`${MAX_PREFIX} range`);
  });

  it('formats the value when a format function is passed', () => {
    const value = 10;
    const valueFormat = (val: number) => `${val}%`;
    const { container } = render(<Slider value={value} min={0} max={100} showValue={true} valueFormat={valueFormat} />);

    expect(container.getElementsByClassName('ms-Slider-value')[0].textContent).toEqual(valueFormat(value));
  });

  it('updates value of upperthumb for range slider correctly when down and up are pressed', () => {
    const slider = React.createRef<ISlider>();
    const onChange = jest.fn();

    render(
      <Slider label="slider" componentRef={slider} defaultValue={12} min={0} max={100} onChange={onChange} ranged />,
    );

    // move keyboard focus to upperthumb of slider
    userEvent.tab({ shift: true });
    //press up and down keys to modify slider value
    userEvent.keyboard(`{${DOWN}}{${DOWN}}{${DOWN}}{${UP}}{${DOWN}}`);

    expect(slider.current?.value).toEqual(9);

    expect(onChange).toHaveBeenCalledTimes(5);
  });

  it('updates value of upperthumb for range slider correctly when down and up are pressed', () => {
    const slider = React.createRef<ISlider>();
    const onChange = jest.fn();

    render(
      <Slider label="slider" componentRef={slider} defaultValue={20} min={12} max={100} onChange={onChange} ranged />,
    );

    // move keyboard focus to upperthumb of slider
    userEvent.tab({ shift: true });
    userEvent.keyboard(`{${DOWN}}{${DOWN}}{${DOWN}}{${UP}}{${DOWN}}`);

    expect(slider.current?.value).toEqual(17);

    expect(onChange).toHaveBeenCalledTimes(5);
  });

  it('calls onChanged after keyboard event', () => {
    jest.useFakeTimers();
    const onChanged = jest.fn();

    const { container } = render(<Slider label="slider" defaultValue={12} min={0} max={100} onChanged={onChanged} />);
    const sliderSlideBox = container.getElementsByClassName('ms-Slider-slideBox')[0];

    userEvent.tab();
    userEvent.keyboard(`{${DOWN}}{${DOWN}}{${DOWN}}{${UP}}{${DOWN}}`);

    expect(sliderSlideBox.getAttribute('aria-valuenow')).toEqual('9');

    // onChanged should only be called after a delay
    expect(onChanged).toHaveBeenCalledTimes(0);
    jest.runOnlyPendingTimers();
    expect(onChanged).toHaveBeenCalledTimes(1);
  });

  it('onChanged returns the correct value', () => {
    jest.useFakeTimers();
    const onChanged = jest.fn();

    render(<Slider label="slider" defaultValue={5} min={0} max={100} onChanged={onChanged} />);

    userEvent.tab();
    userEvent.keyboard(`{${DOWN}}{${DOWN}}{${DOWN}}{${UP}}{${DOWN}}`);

    // onChanged should only be called after a delay
    expect(onChanged).toHaveBeenCalledTimes(0);
    jest.runOnlyPendingTimers();
    expect(onChanged).toHaveBeenCalledTimes(1);
    expect(onChanged.mock.calls[0][1]).toEqual(2);
  });

  it('does not update the value when slider is controlled', () => {
    const slider = React.createRef<ISlider>();
    const onChange = jest.fn();

    render(<Slider label="slider" componentRef={slider} value={3} min={0} max={100} onChange={onChange} />);

    userEvent.tab();
    userEvent.keyboard(`{${DOWN}}`);

    expect(slider.current?.value).toEqual(3);

    expect(onChange).toHaveBeenCalledTimes(1);
  });

  it('calls onChange with correct value when controlled', () => {
    const slider = React.createRef<ISlider>();
    const onChange = jest.fn();

    render(<Slider label="slider" componentRef={slider} value={3} min={0} max={100} onChange={onChange} />);

    userEvent.tab();
    userEvent.keyboard(`{${DOWN}}`);

    expect(slider.current?.value).toEqual(3);

    // Get the first argument passed into the call
    expect(onChange.mock.calls[0][0]).toEqual(2);
  });

  it('calls onChange with correct range when controlled', () => {
    const slider = React.createRef<ISlider>();
    const onChange = jest.fn();

    render(<Slider label="slider" componentRef={slider} value={3} min={0} max={100} onChange={onChange} ranged />);

    // move keyboard focus to upperthumb of slider
    userEvent.tab({ shift: true });
    userEvent.keyboard(`{${DOWN}}`);

    expect(slider.current?.range).toEqual([0, 3]);

    // Get the second argument passed into the call
    expect(onChange.mock.calls[0][1]).toEqual([0, 2]);
  });

  it('calls onChange on multiple calls with correct value when controlled', () => {
    const slider = React.createRef<ISlider>();
    const onChange = jest.fn();

    render(<Slider label="slider" componentRef={slider} value={3} min={0} max={100} onChange={onChange} />);

    userEvent.tab();
    userEvent.keyboard(`{${UP}}{${UP}}{${UP}}`);

    expect(slider.current?.value).toEqual(3);

    // Get the first argument passed into the third call
    expect(onChange.mock.calls[2][0]).toEqual(4);
  });

  it('correctly changes value with negative steps', () => {
    const slider = React.createRef<ISlider>();
    const onChange = jest.fn();

    render(
      <Slider label="slider" defaultValue={10} componentRef={slider} step={-3} min={0} max={100} onChange={onChange} />,
    );

    userEvent.tab();
    userEvent.keyboard(`{${UP}}`);

    expect(slider.current?.value).toEqual(7);
  });

  it('correctly changes value with decimal steps', () => {
    const slider = React.createRef<ISlider>();
    const onChange = jest.fn();
    const step = 0.0000001;
    const defaultValue = 10;

    render(
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

    userEvent.tab();
    userEvent.keyboard(`{${UP}}`);

    expect(slider.current?.value).toEqual(defaultValue + step);
  });
});
