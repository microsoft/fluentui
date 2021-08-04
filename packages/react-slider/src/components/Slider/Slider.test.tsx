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

  // TODO: Find why focus is null.
  // it('renders (focus) correctly', () => {
  //   let sliderRef: any;

  //   const SliderTestComponent = () => {
  //     sliderRef = React.useRef(null);

  //     return <Slider defaultValue={3} ref={sliderRef} />;
  //   };

  //   safeCreate(<SliderTestComponent />, component => {
  //     sliderRef.current.focus();

  //     const tree = component.toJSON();
  //     expect(tree).toMatchSnapshot();
  //   });
  // });

  it('handles (id) prop', () => {
    render(<Slider id="test_id" data-testid="test" />);
    const sliderRoot = screen.getByTestId('test');
    expect(sliderRoot.getAttribute('id')).toEqual('test_id');
  });

  it('applies the (defaultValue) prop', () => {
    let sliderRef: any;

    const SliderTestComponent = () => {
      sliderRef = React.useRef(null);

      return <Slider defaultValue={0} min={0} max={100} ref={sliderRef} />;
    };

    render(<SliderTestComponent />);
    expect(sliderRef.current!.value).toEqual(0);
  });

  it('applies the (value) prop', () => {
    let sliderRef: any;

    const SliderTestComponent = () => {
      sliderRef = React.useRef(null);

      return <Slider value={0} min={0} max={100} ref={sliderRef} />;
    };

    render(<SliderTestComponent />);
    expect(sliderRef.current!.value).toEqual(0);
  });

  it('clamps an initial (defaultValue) that is out of bounds', () => {
    let sliderRef: any;

    const SliderTestComponent = () => {
      sliderRef = React.useRef(null);

      return <Slider defaultValue={-10} min={0} max={100} ref={sliderRef} />;
    };

    render(<SliderTestComponent />);
    expect(sliderRef.current.value).toEqual(0);
  });

  it('clamps an initial (value) that is out of bounds', () => {
    let sliderRef: any;

    const SliderTestComponent = () => {
      sliderRef = React.useRef(null);

      return <Slider value={-10} min={0} max={100} ref={sliderRef} />;
    };

    render(<SliderTestComponent />);
    expect(sliderRef.current.value).toEqual(0);
  });

  it('calls (onChange) when dragged', () => {
    let sliderRef: any;
    const onChange = jest.fn();

    const SliderTestComponent = () => {
      sliderRef = React.useRef(null);
      return <Slider defaultValue={5} onChange={onChange} ref={sliderRef} data-testid="test" />;
    };

    render(<SliderTestComponent />);

    const sliderRoot = screen.getByTestId('test');
    expect(onChange).toHaveBeenCalledTimes(0);

    fireEvent.pointerDown(sliderRoot, { clientX: 0, clientY: 0 });

    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange.mock.calls[0][0]).toEqual(0);
    expect(sliderRef.current!.value).toBe(0);
  });

  it('slides to (min/max) and executes onChange', () => {
    let sliderRef: any;
    const onChange = jest.fn();

    const SliderTestComponent = () => {
      sliderRef = React.useRef(null);
      return <Slider defaultValue={2} onChange={onChange} ref={sliderRef} />;
    };

    const wrapper: ReactWrapper = mount(<SliderTestComponent />);
    const sliderRoot = wrapper.first();

    expect(onChange).toHaveBeenCalledTimes(0);

    sliderRoot.getDOMNode().getBoundingClientRect = () =>
      ({ left: 0, top: 0, right: 100, bottom: 40, width: 100, height: 40 } as DOMRect);

    sliderRoot.simulate('pointerdown', { type: 'pointermove', clientX: 110, clientY: 0 });

    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange.mock.calls[0][0]).toEqual(10);
    expect(sliderRef.current!.value).toBe(10);

    sliderRoot.simulate('pointerdown', { type: 'pointermove', clientX: -10, clientY: 0 });

    expect(onChange).toHaveBeenCalledTimes(2);
    expect(onChange.mock.calls[1][0]).toEqual(0);
    expect(sliderRef.current!.value).toBe(0);

    wrapper.unmount();
  });

  it('handles (keydown) events', () => {
    let sliderRef: any;
    const onChange = jest.fn();

    const SliderTestComponent = () => {
      sliderRef = React.useRef(null);

      return <Slider defaultValue={50} min={0} max={100} onChange={onChange} ref={sliderRef} data-testid="test" />;
    };

    render(<SliderTestComponent />);

    const sliderRoot = screen.getByTestId('test');
    expect(onChange).toHaveBeenCalledTimes(0);

    fireEvent.keyDown(sliderRoot, { key: 'ArrowDown' });
    expect(sliderRef.current!.value).toBe(49);

    fireEvent.keyDown(sliderRoot, { key: 'ArrowUp' });
    expect(sliderRef.current!.value).toBe(50);

    fireEvent.keyDown(sliderRoot, { key: 'ArrowLeft' });
    expect(sliderRef.current!.value).toBe(49);

    fireEvent.keyDown(sliderRoot, { key: 'ArrowRight' });
    expect(sliderRef.current!.value).toBe(50);

    fireEvent.keyDown(sliderRoot, { key: 'PageUp' });
    expect(sliderRef.current!.value).toBe(60);

    fireEvent.keyDown(sliderRoot, { key: 'PageDown' });
    expect(sliderRef.current!.value).toBe(50);

    fireEvent.keyDown(sliderRoot, { key: 'Home' });
    expect(sliderRef.current!.value).toBe(0);

    fireEvent.keyDown(sliderRoot, { key: 'End' });
    expect(sliderRef.current!.value).toBe(100);

    fireEvent.keyDown(sliderRoot, { key: 'ArrowLeft', shiftKey: true });
    expect(sliderRef.current!.value).toBe(90);

    fireEvent.keyDown(sliderRoot, { key: 'ArrowRight', shiftKey: true });
    expect(sliderRef.current!.value).toBe(100);

    expect(onChange).toHaveBeenCalledTimes(10);
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
    expect(sliderRef.current!.value).toBe(50);
  });

  it('calls (onChange) with the correct value', () => {
    const onChange = jest.fn();
    let sliderRef: any;

    const SliderTestComponent = () => {
      sliderRef = React.useRef(null);

      return <Slider value={50} min={0} max={100} onChange={onChange} ref={sliderRef} data-testid="test" />;
    };

    render(<SliderTestComponent />);

    const sliderRoot = screen.getByTestId('test');

    fireEvent.keyDown(sliderRoot, { key: 'ArrowUp' });
    fireEvent.keyDown(sliderRoot, { key: 'ArrowUp' });
    fireEvent.keyDown(sliderRoot, { key: 'ArrowUp' });

    expect(sliderRef.current.value).toEqual(50);
    expect(onChange.mock.calls[2][0]).toEqual(51);
  });

  it('handles a negative (step) prop', () => {
    let sliderRef: any;

    const SliderTestComponent = () => {
      sliderRef = React.useRef(null);

      return <Slider defaultValue={50} min={0} max={100} step={-3} ref={sliderRef} data-testid="test" />;
    };

    render(<SliderTestComponent />);

    const sliderRoot = screen.getByTestId('test');

    fireEvent.keyDown(sliderRoot, { key: 'ArrowUp' });
    expect(sliderRef.current?.value).toEqual(47);
  });

  it('handles a decimal (step) prop', () => {
    let sliderRef: any;

    const SliderTestComponent = () => {
      sliderRef = React.useRef(null);

      return <Slider defaultValue={50} min={0} max={100} step={0.001} ref={sliderRef} data-testid="test" />;
    };

    render(<SliderTestComponent />);

    const sliderRoot = screen.getByTestId('test');

    fireEvent.keyDown(sliderRoot, { key: 'ArrowUp' });
    expect(sliderRef.current?.value).toEqual(50.001);
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
