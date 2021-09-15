import * as React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { resetIdsForTests } from '@fluentui/react-utilities';
// TODO: Find a way to use pointer events with testing-library and remove enzyme.
import { mount, ReactWrapper } from 'enzyme';
import { RangedSlider } from './RangedSlider';
import { isConformant } from '../../common/isConformant';

describe('RangedSlider', () => {
  isConformant({
    Component: RangedSlider,
    displayName: 'RangedSlider',
    disabledTests: ['kebab-aria-attributes'],
  });

  afterEach(() => {
    resetIdsForTests();
  });

  describe('Snapshot Tests', () => {
    it('renders horizontal RangedSlider correctly', () => {
      const { container } = render(<RangedSlider defaultValue={[5, 7]} min={0} max={10} />);
      expect(container).toMatchSnapshot();
    });

    it('renders vertical RangedSlider correctly', () => {
      const { container } = render(<RangedSlider defaultValue={[2, 8]} vertical />);
      expect(container).toMatchSnapshot();
    });

    it('renders disabled RangedSlider correctly', () => {
      const { container } = render(<RangedSlider disabled min={0} max={10} />);
      expect(container).toMatchSnapshot();
    });

    it('renders RangedSlider with marks correctly', () => {
      const { container } = render(<RangedSlider marks={true} step={3} />);
      expect(container).toMatchSnapshot();
    });

    it('renders horizontal Slider with (custom marks) correctly', () => {
      const { container } = render(<RangedSlider marks={[1, 3, 7, 8]} />);
      expect(container).toMatchSnapshot();
    });

    it('renders vertical Slider with (custom marks) correctly', () => {
      const { container } = render(<RangedSlider marks={[2, 5, 9, 18]} vertical />);
      expect(container).toMatchSnapshot();
    });
  });

  describe('Unit Tests', () => {
    it('handles id prop', () => {
      render(<RangedSlider id="test_id" data-testid="test" />);
      const sliderRoot = screen.getByTestId('test');
      expect(sliderRoot.getAttribute('id')).toEqual('test_id');
    });

    it('slides to the correct position when dragged in-between steps', () => {
      const inputRef = React.createRef<HTMLInputElement>();
      const onChange = jest.fn();

      const wrapper: ReactWrapper = mount(
        <RangedSlider
          step={10}
          activeRail={{ className: 'active-rail' }}
          onChange={onChange}
          inputLower={{ ref: inputRef }}
        />,
      );

      const activeRail = wrapper.find('.active-rail');

      activeRail.getDOMNode().getBoundingClientRect = () =>
        ({ left: 0, top: 0, right: 100, bottom: 40, width: 100, height: 40 } as DOMRect);

      wrapper.simulate('pointerdown', { type: 'pointermove', clientX: 45, clientY: 0 });
      expect(onChange).toBeCalledTimes(1);
      expect(onChange.mock.calls[0][1]).toEqual({
        value: [50, 100],
      });
      expect(inputRef.current?.value).toEqual('50');
      expect(wrapper.find('.ms-Slider-track').props().style?.width).toEqual('55%');
      expect(wrapper.find('.ms-Slider-track').props().style?.left).toEqual('45%');

      wrapper.simulate('pointerdown', { type: 'pointermove', clientX: 24, clientY: 0 });
      expect(onChange).toBeCalledTimes(2);
      expect(onChange.mock.calls[1][1]).toEqual({
        value: [20, 100],
      });
      expect(inputRef.current?.value).toEqual('20');
      expect(wrapper.find('.ms-Slider-track').props().style?.width).toEqual('76%');
      expect(wrapper.find('.ms-Slider-track').props().style?.left).toEqual('24%');
    });

    it('calls onChange when pointerDown', () => {
      const onChange = jest.fn();

      render(<RangedSlider defaultValue={[5, 10]} onChange={onChange} data-testid="test" />);

      const sliderRoot = screen.getByTestId('test');
      expect(onChange).toBeCalledTimes(0);
      fireEvent.pointerDown(sliderRoot, { clientX: 0, clientY: 0 });
      expect(onChange).toBeCalledTimes(1);
      expect(onChange.mock.calls[0][1]).toEqual({ value: [0, 10] });
    });

    it('applies the defaultValue prop', () => {
      const lowerInputRef = React.createRef<HTMLInputElement>();
      const upperInputRef = React.createRef<HTMLInputElement>();
      render(
        <RangedSlider
          defaultValue={[50, 100]}
          inputLower={{ ref: lowerInputRef }}
          inputUpper={{ ref: upperInputRef }}
        />,
      );
      expect(lowerInputRef.current?.value).toEqual('50');
      expect(upperInputRef.current?.value).toEqual('100');
    });

    it('applies the value prop', () => {
      const lowerInputRef = React.createRef<HTMLInputElement>();
      const upperInputRef = React.createRef<HTMLInputElement>();
      render(<RangedSlider value={[20, 80]} inputLower={{ ref: lowerInputRef }} inputUpper={{ ref: upperInputRef }} />);
      expect(lowerInputRef.current?.value).toEqual('20');
      expect(upperInputRef.current?.value).toEqual('80');
    });

    it('applies the disabled prop', () => {
      const lowerInputRef = React.createRef<HTMLInputElement>();
      const upperInputRef = React.createRef<HTMLInputElement>();
      render(<RangedSlider disabled inputLower={{ ref: lowerInputRef }} inputUpper={{ ref: upperInputRef }} />);
      expect(lowerInputRef.current?.disabled).toEqual(true);
      expect(upperInputRef.current?.disabled).toEqual(true);
    });

    it('applies the min prop', () => {
      const lowerInputRef = React.createRef<HTMLInputElement>();
      const upperInputRef = React.createRef<HTMLInputElement>();
      render(<RangedSlider min={11} inputLower={{ ref: lowerInputRef }} inputUpper={{ ref: upperInputRef }} />);
      expect(lowerInputRef.current?.min).toEqual('11');
      expect(upperInputRef.current?.min).toEqual('11');
    });

    it('applies the max prop', () => {
      const lowerInputRef = React.createRef<HTMLInputElement>();
      const upperInputRef = React.createRef<HTMLInputElement>();
      render(<RangedSlider max={11} inputLower={{ ref: lowerInputRef }} inputUpper={{ ref: upperInputRef }} />);
      expect(lowerInputRef.current?.max).toEqual('11');
      expect(upperInputRef.current?.max).toEqual('11');
    });

    it('applies the step prop', () => {
      const lowerInputRef = React.createRef<HTMLInputElement>();
      const upperInputRef = React.createRef<HTMLInputElement>();
      render(<RangedSlider step={11} inputLower={{ ref: lowerInputRef }} inputUpper={{ ref: upperInputRef }} />);
      expect(lowerInputRef.current?.step).toEqual('11');
      expect(upperInputRef.current?.step).toEqual('11');
    });

    it('clamps an initial defaultValue that is out of bounds', () => {
      const lowerInputRef = React.createRef<HTMLInputElement>();
      const upperInputRef = React.createRef<HTMLInputElement>();
      render(
        <RangedSlider value={[-10, 110]} inputLower={{ ref: lowerInputRef }} inputUpper={{ ref: upperInputRef }} />,
      );
      expect(lowerInputRef.current?.value).toEqual('0');
      expect(upperInputRef.current?.value).toEqual('100');
    });
  });

  it('handles role prop', () => {
    render(<RangedSlider role="test" data-testid="test" />);
    const sliderRoot = screen.getByTestId('test');
    expect(sliderRoot.getAttribute('role')).toEqual('test');
  });

  it('applies ariaValueText', () => {
    const lowerInputRef = React.createRef<HTMLInputElement>();
    const upperInputRef = React.createRef<HTMLInputElement>();

    const values = ['small', 'medium', 'large'];
    const defaultValue: [number, number] = [1, 2];
    const getTextValue = (value: number) => values[value];

    render(
      <RangedSlider
        defaultValue={defaultValue}
        ariaValueText={getTextValue}
        inputLower={{ ref: lowerInputRef }}
        inputUpper={{ ref: upperInputRef }}
        min={1}
        max={3}
      />,
    );

    expect(lowerInputRef?.current?.getAttribute('aria-valuetext')).toEqual(values[defaultValue[0]]);
    expect(upperInputRef?.current?.getAttribute('aria-valuetext')).toEqual(values[defaultValue[1]]);
  });

  it('slides to min/max and executes onChange', () => {
    const lowerInputRef = React.createRef<HTMLInputElement>();
    const upperInputRef = React.createRef<HTMLInputElement>();
    const onChange = jest.fn();

    const wrapper: ReactWrapper = mount(
      <RangedSlider
        defaultValue={[50, 50]}
        onChange={onChange}
        activeRail={{ className: 'active-rail' }}
        inputLower={{ ref: lowerInputRef }}
        inputUpper={{ ref: upperInputRef }}
      />,
    );

    const activeRail = wrapper.find('.active-rail');

    activeRail.getDOMNode().getBoundingClientRect = () =>
      ({ left: 0, top: 0, right: 100, bottom: 40, width: 100, height: 40 } as DOMRect);

    expect(onChange).toBeCalledTimes(0);

    activeRail.simulate('pointerdown', { type: 'pointermove', clientX: 110, clientY: 0 });
    expect(onChange).toBeCalledTimes(1);
    expect(onChange.mock.calls[0][1]).toEqual({ value: [50, 100] });
    expect(lowerInputRef.current?.value).toEqual('50');
    expect(upperInputRef.current?.value).toEqual('100');
    expect(wrapper.find('.ms-Slider-track').props().style?.width).toEqual('50%');
    expect(wrapper.find('.ms-Slider-track').props().style?.left).toEqual('50%');

    activeRail.simulate('pointerdown', { type: 'pointermove', clientX: -10, clientY: 0 });
    expect(onChange).toBeCalledTimes(2);
    expect(onChange.mock.calls[1][1]).toEqual({ value: [0, 100] });
    expect(lowerInputRef.current?.value).toEqual('0');
    expect(upperInputRef.current?.value).toEqual('100');
    expect(wrapper.find('.ms-Slider-track').props().style?.width).toEqual('100%');
    expect(wrapper.find('.ms-Slider-track').props().style?.left).toEqual('0%');

    wrapper.unmount();
  });

  it('clamps to the correct value when dragged in-between steps', () => {
    const lowerInputRef = React.createRef<HTMLInputElement>();
    const upperInputRef = React.createRef<HTMLInputElement>();
    const onChange = jest.fn();

    const wrapper: ReactWrapper = mount(
      <RangedSlider
        step={10}
        activeRail={{ className: 'active-rail' }}
        inputLower={{ ref: lowerInputRef }}
        inputUpper={{ ref: upperInputRef }}
        onChange={onChange}
      />,
    );

    const activeRail = wrapper.find('.active-rail');

    activeRail.getDOMNode().getBoundingClientRect = () =>
      ({ left: 0, top: 0, right: 100, bottom: 40, width: 100, height: 40 } as DOMRect);

    wrapper.simulate('pointerdown', { type: 'pointermove', clientX: 45, clientY: 0 }, { type: 'pointerup' });
    expect(onChange).toBeCalledTimes(1);
    expect(onChange.mock.calls[0][1]).toEqual({ value: [50, 100] });
    expect(lowerInputRef.current?.value).toEqual('50');
    expect(upperInputRef.current?.value).toEqual('100');
    expect(wrapper.find('.ms-Slider-track').props().style?.width).toEqual('55%');
    expect(wrapper.find('.ms-Slider-track').props().style?.left).toEqual('45%');

    wrapper.simulate('pointerdown', { type: 'pointermove', clientX: 84, clientY: 0 }, { type: 'pointerup' });
    expect(onChange).toBeCalledTimes(2);
    expect(onChange.mock.calls[1][1]).toEqual({ value: [50, 80] });
    expect(lowerInputRef.current?.value).toEqual('50');
    expect(upperInputRef.current?.value).toEqual('80');
    expect(wrapper.find('.ms-Slider-track').props().style?.width).toEqual('34%');
    expect(wrapper.find('.ms-Slider-track').props().style?.left).toEqual('50%');
  });

  it('handles a keyboardStep prop', () => {
    const lowerInputRef = React.createRef<HTMLInputElement>();
    const upperInputRef = React.createRef<HTMLInputElement>();
    const onChange = jest.fn();

    render(
      <RangedSlider
        defaultValue={[20, 20]}
        step={3}
        keyboardStep={5}
        onChange={onChange}
        inputLower={{ ref: lowerInputRef }}
        inputUpper={{ ref: upperInputRef }}
      />,
    );

    fireEvent.keyDown(upperInputRef.current!, { key: 'ArrowUp' });
    expect(onChange.mock.calls[0][1]).toEqual({ value: [20, 25] });
    expect(lowerInputRef.current?.value).toBe('20');
    expect(upperInputRef.current?.value).toBe('25');

    fireEvent.keyDown(upperInputRef.current!, { key: 'ArrowDown' });
    fireEvent.keyDown(upperInputRef.current!, { key: 'ArrowDown' });
    expect(onChange.mock.calls[2][1]).toEqual({ value: [15, 20] });
    expect(lowerInputRef.current?.value).toBe('15');
    expect(upperInputRef.current?.value).toBe('20');
  });

  it('handles a negative step prop', () => {
    const lowerInputRef = React.createRef<HTMLInputElement>();
    const upperInputRef = React.createRef<HTMLInputElement>();
    const onChange = jest.fn();

    render(
      <RangedSlider
        defaultValue={[20, 20]}
        step={-3}
        onChange={onChange}
        inputLower={{ ref: lowerInputRef }}
        inputUpper={{ ref: upperInputRef }}
      />,
    );

    fireEvent.keyDown(lowerInputRef.current!, { key: 'ArrowUp' });
    expect(onChange.mock.calls[0][1]).toEqual({ value: [17, 20] });
    expect(lowerInputRef.current?.value).toBe('17');
    expect(upperInputRef.current?.value).toBe('20');

    fireEvent.keyDown(upperInputRef.current!, { key: 'ArrowUp' });
    fireEvent.keyDown(upperInputRef.current!, { key: 'ArrowUp' });
    expect(onChange.mock.calls[2][1]).toEqual({ value: [14, 17] });
    expect(lowerInputRef.current?.value).toBe('14');
    expect(upperInputRef.current?.value).toBe('17');
  });

  it('handles a decimal step prop', () => {
    const lowerInputRef = React.createRef<HTMLInputElement>();
    const upperInputRef = React.createRef<HTMLInputElement>();
    const onChange = jest.fn();

    render(
      <RangedSlider
        defaultValue={[20, 20]}
        step={0.0001}
        onChange={onChange}
        inputLower={{ ref: lowerInputRef }}
        inputUpper={{ ref: upperInputRef }}
      />,
    );

    fireEvent.keyDown(upperInputRef.current!, { key: 'ArrowUp' });
    expect(onChange.mock.calls[0][1]).toEqual({ value: [20, 20.0001] });
    expect(lowerInputRef.current?.value).toBe('20');
    expect(upperInputRef.current?.value).toBe('20.0001');

    fireEvent.keyDown(upperInputRef.current!, { key: 'ArrowDown' });
    fireEvent.keyDown(upperInputRef.current!, { key: 'ArrowDown' });
    expect(onChange.mock.calls[2][1]).toEqual({ value: [19.9999, 20] });
    expect(lowerInputRef.current?.value).toBe('19.9999');
    expect(upperInputRef.current?.value).toBe('20');
  });

  it('applies focus to inputLower', () => {
    const inputRef = React.createRef<HTMLInputElement>();
    render(<RangedSlider inputLower={{ ref: inputRef }} />);
    inputRef?.current?.focus();
    expect(document.activeElement).toEqual(inputRef.current);
  });

  it('applies focus to inputUpper', () => {
    const inputRef = React.createRef<HTMLInputElement>();
    render(<RangedSlider inputUpper={{ ref: inputRef }} />);
    inputRef?.current?.focus();
    expect(document.activeElement).toEqual(inputRef.current);
  });

  it('does not allow focus on disabled RangedSlider', () => {
    const sliderRef = React.createRef<HTMLInputElement>();

    render(<RangedSlider ref={sliderRef} disabled />);

    expect(document.activeElement).toEqual(document.body);
    sliderRef?.current?.focus();
    expect(document.activeElement).toEqual(document.body);
  });

  it('switches to the opposite thumb when its value is surpassed', () => {
    const onChange = jest.fn();
    const lowerInputRef = React.createRef<HTMLInputElement>();
    const upperInputRef = React.createRef<HTMLInputElement>();

    render(
      <RangedSlider
        defaultValue={[48, 50]}
        onChange={onChange}
        inputLower={{ ref: lowerInputRef }}
        inputUpper={{ ref: upperInputRef }}
      />,
    );

    fireEvent.keyDown(lowerInputRef.current!, { key: 'ArrowUp' });
    expect(onChange.mock.calls[0][1]).toEqual({ value: [49, 50] });
    expect(document.activeElement).toEqual(lowerInputRef.current);

    fireEvent.keyDown(lowerInputRef.current!, { key: 'ArrowUp' });
    expect(onChange.mock.calls[1][1]).toEqual({ value: [50, 50] });
    expect(document.activeElement).toEqual(lowerInputRef.current);

    fireEvent.keyDown(lowerInputRef.current!, { key: 'ArrowUp' });
    expect(onChange.mock.calls[2][1]).toEqual({ value: [50, 51] });
    expect(document.activeElement).toEqual(upperInputRef.current);

    fireEvent.keyDown(upperInputRef.current!, { key: 'ArrowDown' });
    expect(onChange.mock.calls[3][1]).toEqual({ value: [50, 50] });
    expect(document.activeElement).toEqual(upperInputRef.current);

    fireEvent.keyDown(upperInputRef.current!, { key: 'ArrowDown' });
    expect(onChange.mock.calls[4][1]).toEqual({ value: [49, 50] });
    expect(document.activeElement).toEqual(lowerInputRef.current);
  });

  it('handles keydown events', () => {
    const onChange = jest.fn();
    const lowerInputRef = React.createRef<HTMLInputElement>();
    const upperInputRef = React.createRef<HTMLInputElement>();

    render(
      <RangedSlider
        defaultValue={[50, 50]}
        min={0}
        max={100}
        onChange={onChange}
        inputLower={{ ref: lowerInputRef }}
        inputUpper={{ ref: upperInputRef }}
      />,
    );

    expect(onChange).toBeCalledTimes(0);

    fireEvent.keyDown(lowerInputRef.current!, { key: 'ArrowDown' });
    expect(onChange.mock.calls[0][1]).toEqual({ value: [49, 50] });
    expect(lowerInputRef.current?.value).toEqual('49');
    expect(upperInputRef.current?.value).toEqual('50');

    fireEvent.keyDown(lowerInputRef.current!, { key: 'ArrowUp' });
    expect(onChange.mock.calls[1][1]).toEqual({ value: [50, 50] });
    expect(lowerInputRef.current?.value).toEqual('50');
    expect(upperInputRef.current?.value).toEqual('50');

    fireEvent.keyDown(lowerInputRef.current!, { key: 'ArrowLeft' });
    expect(onChange.mock.calls[2][1]).toEqual({ value: [49, 50] });
    expect(lowerInputRef.current?.value).toEqual('49');
    expect(upperInputRef.current?.value).toEqual('50');

    fireEvent.keyDown(lowerInputRef.current!, { key: 'ArrowRight' });
    expect(onChange.mock.calls[3][1]).toEqual({ value: [50, 50] });
    expect(lowerInputRef.current?.value).toEqual('50');
    expect(upperInputRef.current?.value).toEqual('50');

    fireEvent.keyDown(lowerInputRef.current!, { key: 'PageUp' });
    expect(onChange.mock.calls[4][1]).toEqual({ value: [50, 60] });
    expect(lowerInputRef.current?.value).toEqual('50');
    expect(upperInputRef.current?.value).toEqual('60');

    fireEvent.keyDown(lowerInputRef.current!, { key: 'PageDown' });
    expect(onChange.mock.calls[5][1]).toEqual({ value: [40, 60] });
    expect(lowerInputRef.current?.value).toEqual('40');
    expect(upperInputRef.current?.value).toEqual('60');

    fireEvent.keyDown(lowerInputRef.current!, { key: 'Home' });
    expect(onChange.mock.calls[6][1]).toEqual({ value: [0, 60] });
    expect(lowerInputRef.current?.value).toEqual('0');
    expect(upperInputRef.current?.value).toEqual('60');

    fireEvent.keyDown(lowerInputRef.current!, { key: 'End' });
    expect(onChange.mock.calls[7][1]).toEqual({ value: [0, 100] });
    expect(lowerInputRef.current?.value).toEqual('0');
    expect(upperInputRef.current?.value).toEqual('100');

    fireEvent.keyDown(upperInputRef.current!, { key: 'ArrowLeft', shiftKey: true });
    expect(onChange.mock.calls[8][1]).toEqual({ value: [0, 90] });
    expect(lowerInputRef.current?.value).toEqual('0');
    expect(upperInputRef.current?.value).toEqual('90');

    fireEvent.keyDown(lowerInputRef.current!, { key: 'ArrowRight', shiftKey: true });
    expect(onChange.mock.calls[9][1]).toEqual({ value: [10, 90] });
    expect(lowerInputRef.current?.value).toEqual('10');
    expect(upperInputRef.current?.value).toEqual('90');

    expect(onChange).toBeCalledTimes(10);
  });

  it('does not allow change on disabled Slider', () => {
    const onChange = jest.fn();
    const lowerInputRef = React.createRef<HTMLInputElement>();
    const upperInputRef = React.createRef<HTMLInputElement>();

    render(
      <RangedSlider
        onChange={onChange}
        data-testid="test"
        inputLower={{ ref: lowerInputRef }}
        inputUpper={{ ref: upperInputRef }}
        disabled
      />,
    );

    expect(onChange).toBeCalledTimes(0);

    fireEvent.keyDown(lowerInputRef.current!, { key: 'ArrowUp' });
    expect(onChange).toBeCalledTimes(0);

    fireEvent.keyDown(upperInputRef.current!, { key: 'ArrowUp' });
    expect(onChange).toBeCalledTimes(0);
  });

  it('handles onKeyDown callback', () => {
    const onKeyDown = jest.fn();
    const lowerInputRef = React.createRef<HTMLInputElement>();
    const upperInputRef = React.createRef<HTMLInputElement>();

    render(
      <RangedSlider onKeyDown={onKeyDown} inputLower={{ ref: lowerInputRef }} inputUpper={{ ref: upperInputRef }} />,
    );

    expect(onKeyDown).toBeCalledTimes(0);

    fireEvent.keyDown(lowerInputRef.current!, { key: 'ArrowUp' });
    expect(onKeyDown).toBeCalledTimes(1);

    fireEvent.keyDown(upperInputRef.current!, { key: 'ArrowUp' });
    expect(onKeyDown).toBeCalledTimes(2);
  });

  it('handles onPointerDown callback', () => {
    const onPointerDown = jest.fn();

    const wrapper: ReactWrapper = mount(<RangedSlider onPointerDown={onPointerDown} />);
    const sliderRoot = wrapper.first();

    expect(onPointerDown).toBeCalledTimes(0);

    sliderRoot.simulate('pointerdown', { type: 'pointerMove', clientX: 87, clientY: 32 });
    expect(onPointerDown).toBeCalledTimes(1);

    wrapper.unmount();
  });
});
