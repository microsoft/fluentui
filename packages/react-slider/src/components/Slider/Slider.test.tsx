import * as React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { create } from 'react-test-renderer';
import { resetIdsForTests } from '@fluentui/react-utilities';
// TODO: Find a way to use pointer events with testing-library and remove enzyme.
import { mount, ReactWrapper } from 'enzyme';
import { Slider } from './Slider';
import { isConformant } from '../../common/isConformant';

/* eslint-disable @typescript-eslint/no-explicit-any */

describe('Slider', () => {
  isConformant({
    Component: Slider,
    displayName: 'Slider',
    disabledTests: ['kebab-aria-attributes'],
  });

  afterEach(() => {
    resetIdsForTests();
  });

  it('renders Slider correctly', () => {
    const component = create(<Slider defaultValue={5} min={0} max={10} />);
    expect(component.toJSON()).toMatchSnapshot();
  });

  it('renders (disabled) Slider correctly', () => {
    const component = create(<Slider defaultValue={5} disabled min={0} max={10} />);
    expect(component.toJSON()).toMatchSnapshot();
  });

  it('renders vertical Slider correctly', () => {
    const component = create(<Slider defaultValue={5} vertical min={0} max={10} />);
    expect(component.toJSON()).toMatchSnapshot();
  });

  it('renders Slider with origin correctly', () => {
    const component = create(
      <>
        <Slider defaultValue={5} origin={2} min={0} max={10} />
        <Slider defaultValue={5} origin={2} vertical min={0} max={10} />
      </>,
    );
    expect(component.toJSON()).toMatchSnapshot();
  });

  it('handles (id) prop', () => {
    render(<Slider id="test_id" data-testid="test" />);
    const sliderRoot = screen.getByTestId('test');
    expect(sliderRoot.getAttribute('id')).toEqual('test_id');
  });

  it('applies the (defaultValue) prop', () => {
    const inputRef = React.createRef<HTMLInputElement>();
    render(<Slider defaultValue={10} min={0} max={100} input={{ ref: inputRef }} />);
    expect(inputRef.current?.value).toEqual('10');
  });

  it('applies the (value) prop', () => {
    const inputRef = React.createRef<HTMLInputElement>();
    render(<Slider value={10} min={0} max={100} input={{ ref: inputRef }} />);
    expect(inputRef.current?.value).toEqual('10');
  });

  it('clamps an initial (defaultValue) that is out of bounds', () => {
    const inputRef = React.createRef<HTMLInputElement>();
    render(<Slider defaultValue={-10} min={0} max={100} input={{ ref: inputRef }} />);
    expect(inputRef.current?.value).toEqual('0');
  });

  it('calls (onChange) when pointerDown', () => {
    const onChange = jest.fn();

    render(<Slider defaultValue={5} onChange={onChange} data-testid="test" />);

    const sliderRoot = screen.getByTestId('test');

    expect(onChange).toBeCalledTimes(0);

    fireEvent.pointerDown(sliderRoot, { clientX: 0, clientY: 0 });
    expect(onChange).toBeCalledTimes(1);
    expect(onChange.mock.calls[0][1]).toEqual({ value: 0 });
  });

  it('slides to (min/max) and executes onChange', () => {
    const inputRef = React.createRef<HTMLInputElement>();
    const onChange = jest.fn();

    const wrapper: ReactWrapper = mount(<Slider onChange={onChange} input={{ ref: inputRef }} />);
    const sliderRoot = wrapper.first();

    expect(onChange).toBeCalledTimes(0);

    sliderRoot.getDOMNode().getBoundingClientRect = () =>
      ({ left: 0, top: 0, right: 100, bottom: 40, width: 100, height: 40 } as DOMRect);

    sliderRoot.simulate('pointerdown', { type: 'pointermove', clientX: 110, clientY: 0 });
    expect(onChange).toBeCalledTimes(1);
    expect(onChange.mock.calls[0][1]).toEqual({ value: 100 });
    expect(inputRef.current?.value).toEqual('100');

    sliderRoot.simulate('pointerdown', { type: 'pointermove', clientX: -10, clientY: 0 });
    expect(onChange).toBeCalledTimes(2);
    expect(onChange.mock.calls[1][1]).toEqual({ value: 0 });
    expect(inputRef.current?.value).toEqual('0');

    wrapper.unmount();
  });

  it('handles (keydown) events', () => {
    const inputRef = React.createRef<HTMLInputElement>();
    const onChange = jest.fn();

    render(
      <Slider defaultValue={50} min={0} max={100} onChange={onChange} data-testid="test" input={{ ref: inputRef }} />,
    );

    const sliderRoot = screen.getByTestId('test');
    expect(onChange).toBeCalledTimes(0);

    fireEvent.keyDown(sliderRoot, { key: 'ArrowDown' });
    expect(onChange.mock.calls[0][1]).toEqual({ value: 49 });
    expect(inputRef.current?.value).toEqual('49');

    fireEvent.keyDown(sliderRoot, { key: 'ArrowUp' });
    expect(onChange.mock.calls[1][1]).toEqual({ value: 50 });
    expect(inputRef.current?.value).toEqual('50');

    fireEvent.keyDown(sliderRoot, { key: 'ArrowLeft' });
    expect(onChange.mock.calls[2][1]).toEqual({ value: 49 });
    expect(inputRef.current?.value).toEqual('49');

    fireEvent.keyDown(sliderRoot, { key: 'ArrowRight' });
    expect(onChange.mock.calls[3][1]).toEqual({ value: 50 });
    expect(inputRef.current?.value).toEqual('50');

    fireEvent.keyDown(sliderRoot, { key: 'PageUp' });
    expect(onChange.mock.calls[4][1]).toEqual({ value: 60 });
    expect(inputRef.current?.value).toEqual('60');

    fireEvent.keyDown(sliderRoot, { key: 'PageDown' });
    expect(onChange.mock.calls[5][1]).toEqual({ value: 50 });
    expect(inputRef.current?.value).toEqual('50');

    fireEvent.keyDown(sliderRoot, { key: 'Home' });
    expect(onChange.mock.calls[6][1]).toEqual({ value: 0 });
    expect(inputRef.current?.value).toEqual('0');

    fireEvent.keyDown(sliderRoot, { key: 'End' });
    expect(onChange.mock.calls[7][1]).toEqual({ value: 100 });
    expect(inputRef.current?.value).toEqual('100');

    fireEvent.keyDown(sliderRoot, { key: 'ArrowLeft', shiftKey: true });
    expect(onChange.mock.calls[8][1]).toEqual({ value: 90 });
    expect(inputRef.current?.value).toEqual('90');

    fireEvent.keyDown(sliderRoot, { key: 'ArrowRight', shiftKey: true });
    expect(onChange.mock.calls[9][1]).toEqual({ value: 100 });
    expect(inputRef.current?.value).toEqual('100');

    expect(onChange).toBeCalledTimes(10);
  });

  it('does not update when the controlled (value) prop is provided', () => {
    const inputRef = React.createRef<HTMLInputElement>();
    render(<Slider value={50} min={0} max={100} data-testid="test" input={{ ref: inputRef }} />);
    const sliderRoot = screen.getByTestId('test');

    fireEvent.keyDown(sliderRoot, { key: 'ArrowUp' });
    expect(inputRef.current?.value).toBe('50');
  });

  it('calls (onChange) with the correct value', () => {
    const onChange = jest.fn();

    render(<Slider value={50} min={0} max={100} onChange={onChange} data-testid="test" />);
    const sliderRoot = screen.getByTestId('test');

    fireEvent.keyDown(sliderRoot, { key: 'ArrowUp' });
    fireEvent.keyDown(sliderRoot, { key: 'ArrowUp' });
    fireEvent.keyDown(sliderRoot, { key: 'ArrowUp' });

    expect(onChange.mock.calls[2][1]).toEqual({ value: 51 });
  });

  it('correctly calculates the (horizontal) origin (border-radius)', () => {
    const { container } = render(<Slider defaultValue={50} max={100} origin={50} data-testid="test" />);

    const sliderRoot = screen.getByTestId('test');
    const sliderTrack = container.querySelector('.ms-Slider-track');

    fireEvent.keyDown(sliderRoot, { key: 'ArrowUp' });
    expect(sliderTrack?.getAttribute('style')).toContain('0px 99px 99px 0px');
    fireEvent.keyDown(sliderRoot, { key: 'ArrowDown' });
    fireEvent.keyDown(sliderRoot, { key: 'ArrowDown' });
    expect(sliderTrack?.getAttribute('style')).toContain('99px 0px 0px 99px');
  });

  it('correctly calculates the (vertical) origin (border-radius)', () => {
    const { container } = render(<Slider defaultValue={50} vertical max={100} origin={50} data-testid="test" />);

    const sliderRoot = screen.getByTestId('test');
    const sliderTrack = container.querySelector('.ms-Slider-track');

    fireEvent.keyDown(sliderRoot, { key: 'ArrowUp' });
    expect(sliderTrack?.getAttribute('style')).toContain('0px 0px 99px 99px');
    fireEvent.keyDown(sliderRoot, { key: 'ArrowDown' });
    fireEvent.keyDown(sliderRoot, { key: 'ArrowDown' });
    expect(sliderTrack?.getAttribute('style')).toContain('99px 99px 0px 0px');
  });

  it('correctly calculates the origin (border-radius) when given (min) as the origin', () => {
    const { container } = render(<Slider origin={0} min={0} vertical />);
    const sliderTrack = container.querySelector('.ms-Slider-track');
    expect(sliderTrack?.getAttribute('style')).toContain('99px');
  });

  it('correctly calculates the origin (border-radius) when given (max) as the origin', () => {
    const { container } = render(<Slider origin={100} max={100} vertical />);
    const sliderTrack = container.querySelector('.ms-Slider-track');
    expect(sliderTrack?.getAttribute('style')).toContain('99px');
  });

  it('handles a decimal (step) prop', () => {
    const inputRef = React.createRef<HTMLInputElement>();
    const onChange = jest.fn();

    render(<Slider step={0.001} onChange={onChange} data-testid="test" input={{ ref: inputRef }} />);
    const sliderRoot = screen.getByTestId('test');

    fireEvent.keyDown(sliderRoot, { key: 'ArrowUp' });
    expect(onChange.mock.calls[0][1]).toEqual({ value: 0.001 });
    expect(inputRef.current?.value).toBe('0.001');
  });

  it('handles a negative (step) prop', () => {
    const inputRef = React.createRef<HTMLInputElement>();
    const onChange = jest.fn();

    render(<Slider defaultValue={20} step={-3} onChange={onChange} data-testid="test" input={{ ref: inputRef }} />);
    const sliderRoot = screen.getByTestId('test');

    fireEvent.keyDown(sliderRoot, { key: 'ArrowUp' });
    expect(onChange.mock.calls[0][1]).toEqual({ value: 17 });
    expect(inputRef.current?.value).toBe('17');
  });

  it('handles (role) prop', () => {
    render(<Slider role="test" data-testid="test" />);
    const sliderRoot = screen.getByTestId('test');
    expect(sliderRoot.getAttribute('role')).toEqual('test');
  });

  it('applies (ariaValueText)', () => {
    const values = ['small', 'medium', 'large'];
    const defaultValue = 1;
    const getTextValue = (value: number) => values[value];

    render(<Slider defaultValue={defaultValue} ariaValueText={getTextValue} />);
    const sliderInput = screen.getByRole('slider');

    expect(sliderInput.getAttribute('aria-valuetext')).toEqual(values[defaultValue]);
  });

  it('applies (focus) to the hidden input', () => {
    const inputRef = React.createRef<HTMLInputElement>();
    render(<Slider defaultValue={3} input={{ ref: inputRef }} />);
    inputRef?.current?.focus();
    expect(document.activeElement).toEqual(inputRef.current);
  });

  it('does not allow (focus) on disabled Slider', () => {
    let sliderRef: any;

    const SliderTestComponent = () => {
      sliderRef = React.useRef(null);

      return <Slider defaultValue={3} ref={sliderRef} data-testid="test" disabled />;
    };

    render(<SliderTestComponent />);

    expect(document.activeElement).toEqual(document.body);

    sliderRef.current.focus();
    expect(document.activeElement).toEqual(document.body);
  });

  it('does not allow (change) on disabled Slider', () => {
    const eventHandler = jest.fn();

    render(<Slider onChange={eventHandler} disabled data-testid="test" />);

    const sliderRoot = screen.getByTestId('test');

    expect(eventHandler).toBeCalledTimes(0);

    fireEvent.keyDown(sliderRoot, { key: 'ArrowUp' });
    expect(eventHandler).toBeCalledTimes(0);
  });

  it('handles (onKeyDown) callback', () => {
    const eventHandler = jest.fn();

    render(<Slider onKeyDown={eventHandler} data-testid="test" />);
    const sliderRoot = screen.getByTestId('test');

    expect(eventHandler).toBeCalledTimes(0);

    fireEvent.keyDown(sliderRoot, { key: 'ArrowUp' });
    expect(eventHandler).toBeCalledTimes(1);
  });

  it('handles (onPointerDown) callback', () => {
    const eventHandler = jest.fn();

    const wrapper: ReactWrapper = mount(<Slider onPointerDown={eventHandler} />);
    const sliderRoot = wrapper.first();

    expect(eventHandler).toBeCalledTimes(0);
    sliderRoot.simulate('pointerdown', { type: 'pointerMove', clientX: 87, clientY: 32 });
    expect(eventHandler).toBeCalledTimes(1);

    wrapper.unmount();
  });
});
