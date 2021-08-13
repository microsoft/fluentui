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
    const component = create(<Slider defaultValue={5} />);
    expect(component.toJSON()).toMatchSnapshot();
  });

  it('renders (disabled) Slider correctly', () => {
    const component = create(<Slider defaultValue={5} disabled />);
    expect(component.toJSON()).toMatchSnapshot();
  });

  it('renders vertical Slider correctly', () => {
    const component = create(<Slider defaultValue={5} vertical />);
    expect(component.toJSON()).toMatchSnapshot();
  });

  it('renders Slider with origin correctly', () => {
    const component = create(
      <>
        <Slider defaultValue={5} origin={2} />
        <Slider defaultValue={5} origin={2} vertical />
      </>,
    );
    expect(component.toJSON()).toMatchSnapshot();
  });

  it('handles (id) prop', () => {
    render(<Slider id="test_id" data-testid="test" />);
    const sliderRoot = screen.getByTestId('test');
    expect(sliderRoot.getAttribute('id')).toEqual('test_id');
  });

  it('applies the (value) prop', () => {
    let sliderRef: any;

    const SliderTestComponent = () => {
      sliderRef = React.useRef(null);
      const [currentValue] = React.useState(10);

      React.useImperativeHandle(
        sliderRef,
        () => ({
          getValue() {
            return currentValue;
          },
        }),
        [currentValue],
      );

      return <Slider value={currentValue} min={0} max={100} />;
    };

    render(<SliderTestComponent />);

    expect(sliderRef.current.getValue()).toEqual(10);
  });

  it('clamps an initial (defaultValue) that is out of bounds', () => {
    render(<Slider defaultValue={-10} min={0} max={100} />);
    expect(screen.getByRole('slider').getAttribute('aria-valuetext')).toEqual('0');
  });

  it('clamps an initial (value) that is out of bounds', () => {
    render(<Slider value={-10} min={0} max={100} />);
    expect(screen.getByRole('slider').getAttribute('aria-valuetext')).toEqual('0');
  });

  it('calls (onChange) when pointerDown', () => {
    let totalCalls = 0;

    const SliderTestComponent = () => {
      const onChange = (incomingValue: number) => {
        totalCalls++;
      };

      return <Slider defaultValue={5} onChange={onChange} data-testid="test" />;
    };

    render(<SliderTestComponent />);
    const sliderRoot = screen.getByTestId('test');

    expect(totalCalls).toBe(0);

    fireEvent.pointerDown(sliderRoot, { clientX: 0, clientY: 0 });

    expect(totalCalls).toBe(1);

    fireEvent.pointerDown(sliderRoot, { clientX: 10, clientY: 0 });

    expect(totalCalls).toBe(2);
  });

  it('slides to (min/max) and executes onChange', () => {
    let sliderRef: any;
    let totalCalls = 0;

    const SliderTestComponent = () => {
      const [currentValue, setCurrentValue] = React.useState(50);
      sliderRef = React.useRef(null);

      const onChange = (incomingValue: number) => {
        setCurrentValue(incomingValue);
        totalCalls++;
      };

      React.useImperativeHandle(
        sliderRef,
        () => ({
          getValue() {
            return currentValue;
          },
        }),
        [currentValue],
      );

      return <Slider value={currentValue} onChange={onChange} ref={sliderRef} />;
    };

    const wrapper: ReactWrapper = mount(<SliderTestComponent />);
    const sliderRoot = wrapper.first();

    expect(totalCalls).toBe(0);

    sliderRoot.getDOMNode().getBoundingClientRect = () =>
      ({ left: 0, top: 0, right: 100, bottom: 40, width: 100, height: 40 } as DOMRect);

    sliderRoot.simulate('pointerdown', { type: 'pointermove', clientX: 110, clientY: 0 });

    expect(totalCalls).toBe(1);
    expect(sliderRef.current.getValue()).toBe(10);

    sliderRoot.simulate('pointerdown', { type: 'pointermove', clientX: -10, clientY: 0 });

    expect(totalCalls).toBe(2);
    expect(sliderRef.current.getValue()).toBe(0);

    wrapper.unmount();
  });

  it('handles (keydown) events', () => {
    let sliderRef: any;
    let totalCalls = 0;

    const SliderTestComponent = () => {
      const [currentValue, setCurrentValue] = React.useState(50);
      sliderRef = React.useRef(null);

      const onChange = (incomingValue: number) => {
        setCurrentValue(incomingValue);
        totalCalls++;
      };

      React.useImperativeHandle(
        sliderRef,
        () => ({
          getValue() {
            return currentValue;
          },
        }),
        [currentValue],
      );

      return <Slider value={currentValue} min={0} max={100} onChange={onChange} data-testid="test" />;
    };

    render(<SliderTestComponent />);

    const sliderRoot = screen.getByTestId('test');
    expect(totalCalls).toBe(0);

    fireEvent.keyDown(sliderRoot, { key: 'ArrowDown' });
    expect(sliderRef.current.getValue()).toBe(49);

    fireEvent.keyDown(sliderRoot, { key: 'ArrowUp' });
    expect(sliderRef.current.getValue()).toBe(50);

    fireEvent.keyDown(sliderRoot, { key: 'ArrowLeft' });
    expect(sliderRef.current.getValue()).toBe(49);

    fireEvent.keyDown(sliderRoot, { key: 'ArrowRight' });
    expect(sliderRef.current.getValue()).toBe(50);

    fireEvent.keyDown(sliderRoot, { key: 'PageUp' });
    expect(sliderRef.current.getValue()).toBe(60);

    fireEvent.keyDown(sliderRoot, { key: 'PageDown' });
    expect(sliderRef.current.getValue()).toBe(50);

    fireEvent.keyDown(sliderRoot, { key: 'Home' });
    expect(sliderRef.current.getValue()).toBe(0);

    fireEvent.keyDown(sliderRoot, { key: 'End' });
    expect(sliderRef.current.getValue()).toBe(100);

    fireEvent.keyDown(sliderRoot, { key: 'ArrowLeft', shiftKey: true });
    expect(sliderRef.current.getValue()).toBe(90);

    fireEvent.keyDown(sliderRoot, { key: 'ArrowRight', shiftKey: true });
    expect(sliderRef.current.getValue()).toBe(100);

    expect(totalCalls).toBe(10);
  });

  it('does not update when the controlled (value) prop is provided', () => {
    let sliderRef: any;

    const SliderTestComponent = () => {
      sliderRef = React.useRef(null);

      return <Slider value={50} min={0} max={100} ref={sliderRef} data-testid="test" />;
    };

    render(<SliderTestComponent />);

    const sliderRoot = screen.getByTestId('test');

    fireEvent.keyDown(sliderRoot, { key: 'ArrowUp' });
    expect(screen.getByRole('slider').getAttribute('aria-valuetext')).toEqual('50');
  });

  it('calls (onChange) with the correct value', () => {
    const onChange = jest.fn();

    render(<Slider value={50} min={0} max={100} onChange={onChange} data-testid="test" />);

    const sliderRoot = screen.getByTestId('test');

    fireEvent.keyDown(sliderRoot, { key: 'ArrowUp' });
    fireEvent.keyDown(sliderRoot, { key: 'ArrowUp' });
    fireEvent.keyDown(sliderRoot, { key: 'ArrowUp' });

    expect(onChange.mock.calls[2][0]).toEqual(51);
  });

  it('handles a negative (step) prop', () => {
    let sliderRef: any;

    const SliderTestComponent = () => {
      const [currentValue, setCurrentValue] = React.useState(50);
      sliderRef = React.useRef(null);

      const onChange = (incomingValue: number) => {
        setCurrentValue(incomingValue);
      };

      React.useImperativeHandle(
        sliderRef,
        () => ({
          getValue() {
            return currentValue;
          },
        }),
        [currentValue],
      );

      return <Slider value={currentValue} min={0} max={100} step={-3} onChange={onChange} data-testid="test" />;
    };

    render(<SliderTestComponent />);

    const sliderRoot = screen.getByTestId('test');

    fireEvent.keyDown(sliderRoot, { key: 'ArrowUp' });
    expect(sliderRef.current.getValue()).toEqual(47);
  });

  it('handles a decimal (step) prop', () => {
    let sliderRef: any;

    const SliderTestComponent = () => {
      const [currentValue, setCurrentValue] = React.useState(50);
      sliderRef = React.useRef(null);

      const onChange = (incomingValue: number) => {
        setCurrentValue(incomingValue);
      };

      React.useImperativeHandle(
        sliderRef,
        () => ({
          getValue() {
            return currentValue;
          },
        }),
        [currentValue],
      );

      return <Slider value={currentValue} min={0} max={100} step={0.001} onChange={onChange} data-testid="test" />;
    };

    render(<SliderTestComponent />);

    const sliderRoot = screen.getByTestId('test');

    fireEvent.keyDown(sliderRoot, { key: 'ArrowUp' });
    expect(sliderRef.current?.getValue()).toEqual(50.001);
  });

  it('handles (role) prop', () => {
    render(<Slider role="test" data-testid="test" />);
    const sliderRoot = screen.getByTestId('test');
    expect(sliderRoot.getAttribute('role')).toEqual('test');
  });

  it('applies Slider (role) to thumb', () => {
    render(<Slider />);
    expect(screen.getByRole('slider')).toBeTruthy();
  });

  it('applies (aria-valuetext) correctly', () => {
    render(<Slider defaultValue={3} />);
    expect(screen.getByRole('slider').getAttribute('aria-valuetext')).toEqual('3');
  });

  it('applies (aria-valuetext) to the thumb', () => {
    const values = ['small', 'medium', 'large'];
    const selected = 1;
    const getTextValue = (value: number) => values[value];

    render(<Slider value={selected} ariaValueText={getTextValue} />);
    expect(screen.getByRole('slider').getAttribute('aria-valuetext')).toEqual(values[selected]);
  });

  it('applies (aria-valuenow) to the thumb', () => {
    const wrapper: ReactWrapper = mount(<Slider defaultValue={3} />);
    const sliderRoot = wrapper.first();

    sliderRoot.simulate('keydown', { key: 'ArrowRight' });

    expect(wrapper.find({ role: 'slider' }).prop('aria-valuenow')).toEqual(4);

    sliderRoot.getDOMNode().getBoundingClientRect = () =>
      ({ left: 0, top: 0, right: 100, bottom: 40, width: 100, height: 40 } as DOMRect);

    sliderRoot.simulate('pointerdown', { type: 'pointerMove', clientX: 87, clientY: 32 });

    expect(wrapper.find({ role: 'slider' }).prop('aria-valuenow')).toEqual(10);
    wrapper.unmount();
  });

  it('applies (aria-valuemax) to the thumb', () => {
    render(<Slider max={3} />);
    expect(screen.getByRole('slider').getAttribute('aria-valuemax')).toEqual('3');
  });

  it('applies (aria-valuemin) to the thumb', () => {
    render(<Slider min={-1} />);
    expect(screen.getByRole('slider').getAttribute('aria-valuemin')).toEqual('-1');
  });

  it('applies (focus) to the thumb', () => {
    let sliderRef: any;

    const SliderTestComponent = () => {
      sliderRef = React.useRef(null);

      return <Slider defaultValue={3} ref={sliderRef} />;
    };

    render(<SliderTestComponent />);
    const sliderThumb = screen.getByRole('slider');
    sliderRef.current.focus();
    expect(document.activeElement).toEqual(sliderThumb);
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
