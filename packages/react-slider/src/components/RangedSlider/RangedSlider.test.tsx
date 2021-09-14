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
      const { container } = render(<RangedSlider defaultValue={{ lowerValue: 5, upperValue: 7 }} min={0} max={10} />);
      expect(container).toMatchSnapshot();
    });

    it('renders vertical RangedSlider correctly', () => {
      const { container } = render(<RangedSlider defaultValue={{ lowerValue: 2, upperValue: 8 }} vertical />);
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
        value: {
          lowerValue: 50,
          upperValue: 100,
        },
      });
      expect(inputRef.current?.value).toEqual('50');
      expect(wrapper.find('.ms-Slider-track').props().style?.width).toEqual('55%');
      expect(wrapper.find('.ms-Slider-track').props().style?.left).toEqual('45%');

      wrapper.simulate('pointerdown', { type: 'pointermove', clientX: 24, clientY: 0 });
      expect(onChange).toBeCalledTimes(2);
      expect(onChange.mock.calls[1][1]).toEqual({
        value: {
          lowerValue: 20,
          upperValue: 100,
        },
      });
      expect(inputRef.current?.value).toEqual('20');
      expect(wrapper.find('.ms-Slider-track').props().style?.width).toEqual('76%');
      expect(wrapper.find('.ms-Slider-track').props().style?.left).toEqual('24%');
    });

    it('calls onChange when pointerDown', () => {
      const onChange = jest.fn();

      render(<RangedSlider defaultValue={{ lowerValue: 5, upperValue: 10 }} onChange={onChange} data-testid="test" />);

      const sliderRoot = screen.getByTestId('test');
      expect(onChange).toBeCalledTimes(0);
      fireEvent.pointerDown(sliderRoot, { clientX: 0, clientY: 0 });
      expect(onChange).toBeCalledTimes(1);
      expect(onChange.mock.calls[0][1]).toEqual({ value: { lowerValue: 0, upperValue: 10 } });
    });

    it('applies the defaultValue prop', () => {
      const lowerInputRef = React.createRef<HTMLInputElement>();
      const upperInputRef = React.createRef<HTMLInputElement>();
      render(
        <RangedSlider
          defaultValue={{
            lowerValue: 50,
            upperValue: 100,
          }}
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
      render(
        <RangedSlider
          value={{
            lowerValue: 20,
            upperValue: 80,
          }}
          inputLower={{ ref: lowerInputRef }}
          inputUpper={{ ref: upperInputRef }}
        />,
      );
      expect(lowerInputRef.current?.value).toEqual('20');
      expect(upperInputRef.current?.value).toEqual('80');
    });

    it('applies the disabled prop', () => {
      const lowerInputRef = React.createRef<HTMLInputElement>();
      const upperInputRef = React.createRef<HTMLInputElement>();
      render(<RangedSlider disabled={true} inputLower={{ ref: lowerInputRef }} inputUpper={{ ref: upperInputRef }} />);
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
        <RangedSlider
          value={{
            lowerValue: -10,
            upperValue: 110,
          }}
          inputLower={{ ref: lowerInputRef }}
          inputUpper={{ ref: upperInputRef }}
        />,
      );
      expect(lowerInputRef.current?.value).toEqual('0');
      expect(upperInputRef.current?.value).toEqual('100');
    });
  });

  it('slides to min/max and executes onChange', () => {
    const lowerInputRef = React.createRef<HTMLInputElement>();
    const upperInputRef = React.createRef<HTMLInputElement>();
    const onChange = jest.fn();

    const wrapper: ReactWrapper = mount(
      <RangedSlider
        defaultValue={{
          lowerValue: 50,
          upperValue: 50,
        }}
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
    expect(onChange.mock.calls[0][1]).toEqual({ value: { lowerValue: 50, upperValue: 100 } });
    expect(lowerInputRef.current?.value).toEqual('50');
    expect(upperInputRef.current?.value).toEqual('100');
    expect(wrapper.find('.ms-Slider-track').props().style?.width).toEqual('50%');
    expect(wrapper.find('.ms-Slider-track').props().style?.left).toEqual('50%');

    activeRail.simulate('pointerdown', { type: 'pointermove', clientX: -10, clientY: 0 });
    expect(onChange).toBeCalledTimes(2);
    expect(onChange.mock.calls[1][1]).toEqual({ value: { lowerValue: 0, upperValue: 100 } });
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
    expect(onChange.mock.calls[0][1]).toEqual({ value: { lowerValue: 50, upperValue: 100 } });
    expect(lowerInputRef.current?.value).toEqual('50');
    expect(upperInputRef.current?.value).toEqual('100');
    expect(wrapper.find('.ms-Slider-track').props().style?.width).toEqual('55%');
    expect(wrapper.find('.ms-Slider-track').props().style?.left).toEqual('45%');

    wrapper.simulate('pointerdown', { type: 'pointermove', clientX: 84, clientY: 0 }, { type: 'pointerup' });
    expect(onChange).toBeCalledTimes(2);
    expect(onChange.mock.calls[1][1]).toEqual({ value: { lowerValue: 50, upperValue: 80 } });
    expect(lowerInputRef.current?.value).toEqual('50');
    expect(upperInputRef.current?.value).toEqual('80');
    expect(wrapper.find('.ms-Slider-track').props().style?.width).toEqual('34%');
    expect(wrapper.find('.ms-Slider-track').props().style?.left).toEqual('50%');
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

  it('switches to the opposite thumb when its value is surpassed', () => {
    const onChange = jest.fn();
    const lowerInputRef = React.createRef<HTMLInputElement>();
    const upperInputRef = React.createRef<HTMLInputElement>();

    render(
      <RangedSlider
        defaultValue={{ lowerValue: 48, upperValue: 50 }}
        onChange={onChange}
        inputLower={{ ref: lowerInputRef }}
        inputUpper={{ ref: upperInputRef }}
      />,
    );

    fireEvent.keyDown(lowerInputRef.current!, { key: 'ArrowUp' });
    expect(onChange.mock.calls[0][1]).toEqual({ value: { lowerValue: 49, upperValue: 50 } });
    expect(document.activeElement).toEqual(lowerInputRef.current);

    fireEvent.keyDown(lowerInputRef.current!, { key: 'ArrowUp' });
    expect(onChange.mock.calls[1][1]).toEqual({ value: { lowerValue: 50, upperValue: 50 } });
    expect(document.activeElement).toEqual(lowerInputRef.current);

    fireEvent.keyDown(lowerInputRef.current!, { key: 'ArrowUp' });
    expect(onChange.mock.calls[2][1]).toEqual({ value: { lowerValue: 50, upperValue: 51 } });
    expect(document.activeElement).toEqual(upperInputRef.current);

    fireEvent.keyDown(upperInputRef.current!, { key: 'ArrowDown' });
    expect(onChange.mock.calls[3][1]).toEqual({ value: { lowerValue: 50, upperValue: 50 } });
    expect(document.activeElement).toEqual(upperInputRef.current);

    fireEvent.keyDown(upperInputRef.current!, { key: 'ArrowDown' });
    expect(onChange.mock.calls[4][1]).toEqual({ value: { lowerValue: 49, upperValue: 50 } });
    expect(document.activeElement).toEqual(lowerInputRef.current);
  });

  // it('handles keydown events', () => {
  //   const inputRef = React.createRef<HTMLInputElement>();
  //   const onChange = jest.fn();

  //   render(
  //     <Slider defaultValue={50} min={0} max={100} onChange={onChange} input={{ ref: inputRef }} data-testid="test" />,
  //   );

  //   const sliderRoot = screen.getByTestId('test');
  //   expect(onChange).toBeCalledTimes(0);

  //   fireEvent.keyDown(sliderRoot, { key: 'ArrowDown' });
  //   expect(onChange.mock.calls[0][1]).toEqual({ value: 49 });
  //   expect(inputRef.current?.value).toEqual('49');

  //   fireEvent.keyDown(sliderRoot, { key: 'ArrowUp' });
  //   expect(onChange.mock.calls[1][1]).toEqual({ value: 50 });
  //   expect(inputRef.current?.value).toEqual('50');

  //   fireEvent.keyDown(sliderRoot, { key: 'ArrowLeft' });
  //   expect(onChange.mock.calls[2][1]).toEqual({ value: 49 });
  //   expect(inputRef.current?.value).toEqual('49');

  //   fireEvent.keyDown(sliderRoot, { key: 'ArrowRight' });
  //   expect(onChange.mock.calls[3][1]).toEqual({ value: 50 });
  //   expect(inputRef.current?.value).toEqual('50');

  //   fireEvent.keyDown(sliderRoot, { key: 'PageUp' });
  //   expect(onChange.mock.calls[4][1]).toEqual({ value: 60 });
  //   expect(inputRef.current?.value).toEqual('60');

  //   fireEvent.keyDown(sliderRoot, { key: 'PageDown' });
  //   expect(onChange.mock.calls[5][1]).toEqual({ value: 50 });
  //   expect(inputRef.current?.value).toEqual('50');

  //   fireEvent.keyDown(sliderRoot, { key: 'Home' });
  //   expect(onChange.mock.calls[6][1]).toEqual({ value: 0 });
  //   expect(inputRef.current?.value).toEqual('0');

  //   fireEvent.keyDown(sliderRoot, { key: 'End' });
  //   expect(onChange.mock.calls[7][1]).toEqual({ value: 100 });
  //   expect(inputRef.current?.value).toEqual('100');

  //   fireEvent.keyDown(sliderRoot, { key: 'ArrowLeft', shiftKey: true });
  //   expect(onChange.mock.calls[8][1]).toEqual({ value: 90 });
  //   expect(inputRef.current?.value).toEqual('90');

  //   fireEvent.keyDown(sliderRoot, { key: 'ArrowRight', shiftKey: true });
  //   expect(onChange.mock.calls[9][1]).toEqual({ value: 100 });
  //   expect(inputRef.current?.value).toEqual('100');

  //   expect(onChange).toBeCalledTimes(10);
  // });
});
