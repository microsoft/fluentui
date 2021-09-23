import * as React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
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

  describe('Snapshot Tests', () => {
    it('renders horizontal Slider correctly', () => {
      const { container } = render(<Slider defaultValue={5} min={0} max={10} />);
      expect(container).toMatchSnapshot();
    });

    it('renders vertical Slider correctly', () => {
      const { container } = render(<Slider defaultValue={5} vertical min={0} max={10} />);
      expect(container).toMatchSnapshot();
    });

    it('renders disabled Slider correctly', () => {
      const { container } = render(<Slider defaultValue={5} disabled min={0} max={10} />);
      expect(container).toMatchSnapshot();
    });

    it('renders horizontal origin Slider correctly', () => {
      const { container } = render(<Slider defaultValue={5} origin={2} min={0} max={10} />);
      expect(container).toMatchSnapshot();
    });

    it('renders vertical origin Slider correctly', () => {
      const { container } = render(<Slider defaultValue={5} origin={2} vertical min={0} max={10} />);
      expect(container).toMatchSnapshot();
    });

    it('renders Slider with marks correctly', () => {
      const { container } = render(<Slider defaultValue={5} marks={true} step={3} />);
      expect(container).toMatchSnapshot();
    });

    it('renders horizontal Slider with unique mark values correctly', () => {
      const { container } = render(<Slider defaultValue={5} marks={[1, 3, 7, 8]} />);
      expect(container).toMatchSnapshot();
    });

    it('renders vertical Slider with unique mark values correctly', () => {
      const { container } = render(<Slider defaultValue={5} marks={[2, 5, 9, 18]} vertical />);
      expect(container).toMatchSnapshot();
    });

    it('renders horizontal Slider with mark labels correctly', () => {
      const { container } = render(
        <Slider defaultValue={5} marks={[10, { value: 30, label: 'hello' }, { value: 40, label: 'world' }, 80]} />,
      );
      expect(container).toMatchSnapshot();
    });

    it('renders vertical Slider with mark labels correctly', () => {
      const { container } = render(
        <Slider
          defaultValue={5}
          marks={[10, { value: 30, label: 'hello' }, { value: 40, label: 'world' }, 80]}
          vertical
        />,
      );
      expect(container).toMatchSnapshot();
    });

    it('renders disabled Slider with mark labels correctly', () => {
      const { container } = render(
        <Slider
          defaultValue={5}
          marks={[10, { value: 30, label: 'hello' }, { value: 40, label: 'world' }, 80]}
          disabled
        />,
      );
      expect(container).toMatchSnapshot();
    });

    it('renders Slider with custom mark labels correctly', () => {
      const { container } = render(
        <Slider
          defaultValue={5}
          marks={[
            10,
            { value: 30, label: <div style={{ width: '10px', height: '10px', background: 'green' }} /> },
            { value: 40, label: 'world' },
            80,
          ]}
        />,
      );
      expect(container).toMatchSnapshot();
    });

    it('renders Slider with custom marks correctly', () => {
      const { container } = render(
        <Slider
          defaultValue={5}
          marks={[
            10,
            {
              value: 30,
              label: <div style={{ width: '10px', height: '10px', background: 'green' }} />,
              mark: (
                <div
                  style={{
                    width: '2px',
                    height: '8px',
                    background: 'red',
                    marginTop: '-2px',
                  }}
                />
              ),
            },
            { value: 40, label: 'world' },
            80,
          ]}
        />,
      );
      expect(container).toMatchSnapshot();
    });
  });

  describe('Unit Tests', () => {
    it('handles id prop', () => {
      render(<Slider id="test_id" data-testid="test" />);
      const sliderRoot = screen.getByTestId('test');
      expect(sliderRoot.getAttribute('id')).toEqual('test_id');
    });

    it('slides to the correct position when dragged in-between steps', () => {
      const inputRef = React.createRef<HTMLInputElement>();
      const onChange = jest.fn();

      const wrapper: ReactWrapper = mount(
        <Slider step={10} activeRail={{ className: 'active-rail' }} onChange={onChange} input={{ ref: inputRef }} />,
      );

      const activeRail = wrapper.find('.active-rail');

      activeRail.getDOMNode().getBoundingClientRect = () =>
        ({ left: 0, top: 0, right: 100, bottom: 40, width: 100, height: 40 } as DOMRect);

      wrapper.simulate('pointerdown', { type: 'pointermove', clientX: 45, clientY: 0 });
      expect(onChange).toBeCalledTimes(1);
      expect(onChange.mock.calls[0][1]).toEqual({ value: 50 });
      expect(inputRef.current?.value).toEqual('50');
      expect(wrapper.find('.ms-Slider-track').props().style?.width).toEqual('45%');

      wrapper.simulate('pointerdown', { type: 'pointermove', clientX: 24, clientY: 0 });
      expect(onChange).toBeCalledTimes(2);
      expect(onChange.mock.calls[1][1]).toEqual({ value: 20 });
      expect(inputRef.current?.value).toEqual('20');
      expect(wrapper.find('.ms-Slider-track').props().style?.width).toEqual('24%');
    });

    it('calls onChange when pointerDown', () => {
      const onChange = jest.fn();

      render(<Slider defaultValue={5} onChange={onChange} data-testid="test" />);

      const sliderRoot = screen.getByTestId('test');
      expect(onChange).toBeCalledTimes(0);
      fireEvent.pointerDown(sliderRoot, { clientX: 0, clientY: 0 });
      expect(onChange).toBeCalledTimes(1);
      expect(onChange.mock.calls[0][1]).toEqual({ value: 0 });
    });

    it('applies the defaultValue prop', () => {
      const inputRef = React.createRef<HTMLInputElement>();
      render(<Slider defaultValue={10} input={{ ref: inputRef }} />);
      expect(inputRef.current?.value).toEqual('10');
    });

    it('applies the value prop', () => {
      const inputRef = React.createRef<HTMLInputElement>();
      render(<Slider value={10} input={{ ref: inputRef }} />);
      expect(inputRef.current?.value).toEqual('10');
    });

    it('applies the disabled prop', () => {
      const inputRef = React.createRef<HTMLInputElement>();
      render(<Slider disabled={true} input={{ ref: inputRef }} />);
      expect(inputRef.current?.disabled).toEqual(true);
    });

    it('applies the min prop', () => {
      const inputRef = React.createRef<HTMLInputElement>();
      render(<Slider min={11} disabled={true} input={{ ref: inputRef }} />);
      expect(inputRef.current?.min).toEqual('11');
    });

    it('applies the max prop', () => {
      const inputRef = React.createRef<HTMLInputElement>();
      render(<Slider max={11} disabled={true} input={{ ref: inputRef }} />);
      expect(inputRef.current?.max).toEqual('11');
    });

    it('applies the step prop', () => {
      const inputRef = React.createRef<HTMLInputElement>();
      render(<Slider step={11} disabled={true} input={{ ref: inputRef }} />);
      expect(inputRef.current?.step).toEqual('11');
    });

    it('clamps an initial defaultValue that is out of bounds', () => {
      const inputRef = React.createRef<HTMLInputElement>();
      render(<Slider defaultValue={-10} min={0} max={100} input={{ ref: inputRef }} />);
      expect(inputRef.current?.value).toEqual('0');
    });

    it('slides to min/max and executes onChange', () => {
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
      expect(wrapper.find('.ms-Slider-track').props().style?.width).toEqual('100%');

      sliderRoot.simulate('pointerdown', { type: 'pointermove', clientX: -10, clientY: 0 });
      expect(onChange).toBeCalledTimes(2);
      expect(onChange.mock.calls[1][1]).toEqual({ value: 0 });
      expect(inputRef.current?.value).toEqual('0');
      expect(wrapper.find('.ms-Slider-track').props().style?.width).toEqual('0%');

      wrapper.unmount();
    });

    it('clamps to the correct value when dragged in-between steps', () => {
      const inputRef = React.createRef<HTMLInputElement>();
      const onChange = jest.fn();
      const wrapper: ReactWrapper = mount(
        <Slider step={10} activeRail={{ className: 'active-rail' }} input={{ ref: inputRef }} onChange={onChange} />,
      );

      const activeRail = wrapper.find('.active-rail');

      activeRail.getDOMNode().getBoundingClientRect = () =>
        ({ left: 0, top: 0, right: 100, bottom: 40, width: 100, height: 40 } as DOMRect);

      wrapper.simulate('pointerdown', { type: 'pointermove', clientX: 45, clientY: 0 }, { type: 'pointerup' });
      expect(onChange).toBeCalledTimes(1);
      expect(onChange.mock.calls[0][1]).toEqual({ value: 50 });
      expect(inputRef.current?.value).toEqual('50');
      expect(wrapper.find('.ms-Slider-track').props().style?.width).toEqual('45%');

      wrapper.simulate('pointerdown', { type: 'pointermove', clientX: 24, clientY: 0 }, { type: 'pointerup' });
      expect(onChange).toBeCalledTimes(2);
      expect(onChange.mock.calls[1][1]).toEqual({ value: 20 });
      expect(inputRef.current?.value).toEqual('20');
      expect(wrapper.find('.ms-Slider-track').props().style?.width).toEqual('24%');
    });

    it('handles keydown events', () => {
      const inputRef = React.createRef<HTMLInputElement>();
      const onChange = jest.fn();

      render(
        <Slider defaultValue={50} min={0} max={100} onChange={onChange} input={{ ref: inputRef }} data-testid="test" />,
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

    it('does not update when the controlled value prop is provided', () => {
      const inputRef = React.createRef<HTMLInputElement>();
      render(<Slider value={50} min={0} max={100} data-testid="test" input={{ ref: inputRef }} />);
      const sliderRoot = screen.getByTestId('test');

      fireEvent.keyDown(sliderRoot, { key: 'ArrowUp' });
      expect(inputRef.current?.value).toBe('50');
    });

    it('calls onChange with the correct value', () => {
      const onChange = jest.fn();

      render(<Slider value={50} min={0} max={100} onChange={onChange} data-testid="test" />);

      const sliderRoot = screen.getByTestId('test');

      fireEvent.keyDown(sliderRoot, { key: 'ArrowUp' });
      fireEvent.keyDown(sliderRoot, { key: 'ArrowUp' });
      fireEvent.keyDown(sliderRoot, { key: 'ArrowUp' });

      expect(onChange.mock.calls[2][1]).toEqual({ value: 51 });
    });

    it('correctly calculates the horizontal origin border-radius', () => {
      const { container } = render(<Slider defaultValue={50} max={100} origin={50} data-testid="test" />);

      const sliderRoot = screen.getByTestId('test');
      const sliderTrack = container.querySelector('.ms-Slider-track');

      fireEvent.keyDown(sliderRoot, { key: 'ArrowUp' });
      expect(sliderTrack?.getAttribute('style')).toContain('0px 99px 99px 0px');
      fireEvent.keyDown(sliderRoot, { key: 'ArrowDown' });
      fireEvent.keyDown(sliderRoot, { key: 'ArrowDown' });
      expect(sliderTrack?.getAttribute('style')).toContain('99px 0px 0px 99px');
    });

    it('correctly calculates the vertical origin border-radius', () => {
      const { container } = render(<Slider defaultValue={50} vertical max={100} origin={50} data-testid="test" />);

      const sliderRoot = screen.getByTestId('test');
      const sliderTrack = container.querySelector('.ms-Slider-track');

      fireEvent.keyDown(sliderRoot, { key: 'ArrowUp' });
      expect(sliderTrack?.getAttribute('style')).toContain('0px 0px 99px 99px');
      fireEvent.keyDown(sliderRoot, { key: 'ArrowDown' });
      fireEvent.keyDown(sliderRoot, { key: 'ArrowDown' });
      expect(sliderTrack?.getAttribute('style')).toContain('99px 99px 0px 0px');
    });

    it('correctly calculates marks for each step', () => {
      const { container } = render(
        <Slider step={2} max={10} marks={true} marksWrapper={{ className: 'test-class' }} />,
      );
      const sliderWrapper = container.querySelector('.test-class');
      expect(sliderWrapper?.getAttribute('style')).toContain('grid-template-columns: 0% 20% 20% 20% 20% 20%');
    });

    it('correctly calculates marks for custom values', () => {
      const { container } = render(
        <Slider step={2} max={10} marks={[1, 4, 7, 9]} marksWrapper={{ className: 'test-class' }} />,
      );
      const sliderWrapper = container.querySelector('.test-class');
      expect(sliderWrapper?.getAttribute('style')).toContain('grid-template-columns: 10% 30% 30% 20%');
    });

    it('correctly calculates marks position at a single custom value', () => {
      const { container } = render(<Slider step={2} max={10} marks={[4]} marksWrapper={{ className: 'test-class' }} />);
      const sliderWrapper = container.querySelector('.test-class');
      expect(sliderWrapper?.getAttribute('style')).toContain('grid-template-columns: 40%');
    });

    it('correctly defines the first and last marks', () => {
      const { container } = render(<Slider max={10} marks={[0, 10]} marksWrapper={{ className: 'test-class' }} />);
      const sliderWrapper = container.querySelector('.test-class');
      expect(sliderWrapper?.getAttribute('style')).toContain('grid-template-columns: 0% 100%');
      expect(container.querySelector('.ms-Slider-firstMark')).toBeTruthy();
      expect(container.querySelector('.ms-Slider-lastMark')).toBeTruthy;
    });

    it('correctly calculates the origin border-radius when given min as the origin', () => {
      const { container } = render(<Slider origin={0} min={0} vertical />);
      const sliderTrack = container.querySelector('.ms-Slider-track');
      expect(sliderTrack?.getAttribute('style')).toContain('99px');
    });

    it('correctly calculates the origin border-radius when given max as the origin', () => {
      const { container } = render(<Slider origin={100} max={100} vertical />);
      const sliderTrack = container.querySelector('.ms-Slider-track');
      expect(sliderTrack?.getAttribute('style')).toContain('99px');
    });

    it('handles a negative step prop', () => {
      const inputRef = React.createRef<HTMLInputElement>();
      const onChange = jest.fn();

      render(<Slider defaultValue={20} step={-3} onChange={onChange} data-testid="test" input={{ ref: inputRef }} />);
      const sliderRoot = screen.getByTestId('test');

      fireEvent.keyDown(sliderRoot, { key: 'ArrowUp' });
      expect(onChange.mock.calls[0][1]).toEqual({ value: 17 });
      expect(inputRef.current?.value).toBe('17');
    });

    it('handles a decimal step prop', () => {
      const inputRef = React.createRef<HTMLInputElement>();
      const onChange = jest.fn();

      render(<Slider step={0.001} onChange={onChange} data-testid="test" input={{ ref: inputRef }} />);
      const sliderRoot = screen.getByTestId('test');

      fireEvent.keyDown(sliderRoot, { key: 'ArrowUp' });
      expect(onChange.mock.calls[0][1]).toEqual({ value: 0.001 });
      expect(inputRef.current?.value).toBe('0.001');
    });

    it('handles role prop', () => {
      render(<Slider role="test" data-testid="test" />);
      const sliderRoot = screen.getByTestId('test');
      expect(sliderRoot.getAttribute('role')).toEqual('test');
    });

    it('applies focus to the hidden input', () => {
      const inputRef = React.createRef<HTMLInputElement>();
      render(<Slider defaultValue={3} input={{ ref: inputRef }} />);
      inputRef?.current?.focus();
      expect(document.activeElement).toEqual(inputRef.current);
    });

    it('does not allow focus on disabled Slider', () => {
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

    it('does not allow change on disabled Slider', () => {
      const eventHandler = jest.fn();

      render(<Slider onChange={eventHandler} data-testid="test" disabled />);

      const sliderRoot = screen.getByTestId('test');

      expect(eventHandler).toBeCalledTimes(0);

      fireEvent.keyDown(sliderRoot, { key: 'ArrowUp' });
      expect(eventHandler).toBeCalledTimes(0);
    });

    it('handles onKeyDown callback', () => {
      const eventHandler = jest.fn();

      render(<Slider onKeyDown={eventHandler} data-testid="test" />);
      const sliderRoot = screen.getByTestId('test');

      expect(eventHandler).toBeCalledTimes(0);

      fireEvent.keyDown(sliderRoot, { key: 'ArrowUp' });
      expect(eventHandler).toBeCalledTimes(1);
    });

    it('handles onPointerDown callback', () => {
      const eventHandler = jest.fn();

      const wrapper: ReactWrapper = mount(<Slider onPointerDown={eventHandler} />);
      const sliderRoot = wrapper.first();

      expect(eventHandler).toBeCalledTimes(0);
      sliderRoot.simulate('pointerdown', { type: 'pointerMove', clientX: 87, clientY: 32 });
      expect(eventHandler).toBeCalledTimes(1);

      wrapper.unmount();
    });
  });

  describe('Accessibility Tests', () => {
    it('renders the input slot as input', () => {
      const { container } = render(<Slider input={{ className: 'test' }} />);
      const inputElement = container.querySelector('.test');
      expect(inputElement?.tagName).toEqual('INPUT');
    });

    it('provides the input slot with a type of range', () => {
      const { container } = render(<Slider input={{ className: 'test' }} />);
      const inputElement = container.querySelector('.test');
      expect(inputElement?.getAttribute('type')).toEqual('range');
    });

    it('applies ariaValueText', () => {
      const values = ['small', 'medium', 'large'];
      const defaultValue = 1;
      const getTextValue = (value: number) => values[value];

      render(<Slider defaultValue={defaultValue} ariaValueText={getTextValue} />);
      const sliderInput = screen.getByRole('slider');

      expect(sliderInput.getAttribute('aria-valuetext')).toEqual(values[defaultValue]);
    });
  });
});
