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

  // it('slides to (min/max) and executes onChange', () => {
  //   const onChange = jest.fn();

  //   const wrapper: ReactWrapper = mount(<Slider onChange={onChange} sliderWrapper={{ role: 'test' }} />);
  //   const sliderWrapper = screen.findByRole('test');

  //   expect(onChange).toBeCalledTimes(0);

  //   sliderWrapper.getDOMNode().getBoundingClientRect = () =>
  //     ({ left: 0, top: 0, right: 100, bottom: 40, width: 100, height: 40 } as DOMRect);

  //   sliderWrapper.simulate('pointerdown', { type: 'pointermove', clientX: 110, clientY: 0 });
  //   expect(onChange).toBeCalledTimes(1);
  //   expect(onChange.mock.calls[0][1]).toEqual({ value: 100 });

  //   sliderWrapper.simulate('pointerdown', { type: 'pointermove', clientX: -10, clientY: 0 });
  //   expect(onChange).toBeCalledTimes(2);
  //   expect(onChange.mock.calls[1][1]).toEqual({ value: 0 });

  //   wrapper.unmount();
  // });

  it('handles (keydown) events', () => {
    const onChange = jest.fn();

    render(<Slider defaultValue={50} min={0} max={100} onChange={onChange} sliderWrapper={{ role: 'test' }} />);

    const sliderWrapper = screen.getByRole('test');
    expect(onChange).toBeCalledTimes(0);

    fireEvent.keyDown(sliderWrapper, { key: 'ArrowDown' });
    expect(onChange.mock.calls[0][1]).toEqual({ value: 49 });

    fireEvent.keyDown(sliderWrapper, { key: 'ArrowUp' });
    expect(onChange.mock.calls[1][1]).toEqual({ value: 50 });

    fireEvent.keyDown(sliderWrapper, { key: 'ArrowLeft' });
    expect(onChange.mock.calls[2][1]).toEqual({ value: 49 });

    fireEvent.keyDown(sliderWrapper, { key: 'ArrowRight' });
    expect(onChange.mock.calls[3][1]).toEqual({ value: 50 });

    fireEvent.keyDown(sliderWrapper, { key: 'PageUp' });
    expect(onChange.mock.calls[4][1]).toEqual({ value: 60 });

    fireEvent.keyDown(sliderWrapper, { key: 'PageDown' });
    expect(onChange.mock.calls[5][1]).toEqual({ value: 50 });

    fireEvent.keyDown(sliderWrapper, { key: 'Home' });
    expect(onChange.mock.calls[6][1]).toEqual({ value: 0 });

    fireEvent.keyDown(sliderWrapper, { key: 'End' });
    expect(onChange.mock.calls[7][1]).toEqual({ value: 100 });

    fireEvent.keyDown(sliderWrapper, { key: 'ArrowLeft', shiftKey: true });
    expect(onChange.mock.calls[8][1]).toEqual({ value: 90 });

    fireEvent.keyDown(sliderWrapper, { key: 'ArrowRight', shiftKey: true });
    expect(onChange.mock.calls[9][1]).toEqual({ value: 100 });

    expect(onChange).toBeCalledTimes(10);
  });

  it('does not update when the controlled (value) prop is provided', () => {
    const inputRef = React.createRef<HTMLInputElement>();
    const { container } = render(
      <Slider value={50} min={0} max={100} sliderWrapper={{ className: 'test' }} input={{ ref: inputRef }} />,
    );

    const sliderWrapper = container.querySelector('test')!;

    fireEvent.keyDown(sliderWrapper, { key: 'ArrowUp' });
    expect(inputRef.current?.value).toBe('50');
  });

  it('calls (onChange) with the correct value', () => {
    const onChange = jest.fn();

    const { container } = render(
      <Slider value={50} min={0} max={100} onChange={onChange} sliderWrapper={{ className: 'test' }} />,
    );

    const sliderWrapper = container.querySelector('.test')!;

    fireEvent.keyDown(sliderWrapper, { key: 'ArrowUp' });
    fireEvent.keyDown(sliderWrapper, { key: 'ArrowUp' });
    fireEvent.keyDown(sliderWrapper, { key: 'ArrowUp' });

    expect(onChange.mock.calls[2][1]).toEqual({ value: 51 });
  });

  it('handles a negative (step) prop', () => {
    const onChange = jest.fn();

    const { container } = render(
      <Slider value={50} min={0} max={100} step={-3} onChange={onChange} sliderWrapper={{ className: 'test' }} />,
    );

    const sliderWrapper = container.querySelector('.test')!;

    fireEvent.keyDown(sliderWrapper, { key: 'ArrowUp' });
    expect(onChange.mock.calls[0][1]).toEqual({ value: 47 });
  });

  it('handles a decimal (step) prop', () => {
    const onChange = jest.fn();
    // expect(container.querySelector('.test')?.getAttribute('aria-valuetext')).toEqual(values[defaultValue]);

    render(
      <Slider defaultValue={50} min={0} max={100} step={0.001} onChange={onChange} sliderWrapper={{ role: 'test' }} />,
    );

    const sliderWrapper = screen.getByRole('.test');

    fireEvent.keyDown(sliderWrapper, { key: 'ArrowUp' });
    expect(onChange.mock.calls[0][1]).toEqual({ value: 50.001 });
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

    const { container } = render(
      <Slider defaultValue={defaultValue} ariaValueText={getTextValue} input={{ className: 'test' }} />,
    );

    expect(container.querySelector('.test')?.getAttribute('aria-valuetext')).toEqual(values[defaultValue]);
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

    render(<Slider onChange={eventHandler} data-testid="test" disabled />);

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
