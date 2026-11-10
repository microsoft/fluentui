import * as React from 'react';
import { act, render, renderHook, screen, fireEvent } from '@testing-library/react';
import { Field } from '@fluentui/react-field';
import { Provider_unstable as Provider } from '@fluentui/react-shared-contexts';
import { resetIdsForTests } from '@fluentui/react-utilities';
import { isConformant } from '../../testing/isConformant';
import { RangeSlider } from './RangeSlider';
import { useRangeSlider_unstable, useRangeSliderBase_unstable } from './useRangeSlider';
import type { RangeSliderProps } from './RangeSlider.types';

describe('RangeSlider', () => {
  isConformant({
    Component: RangeSlider,
    displayName: 'RangeSlider',
    // RangeSlider has two primary input slots (startInput/endInput), so the standard
    // primary-slot conformance test does not apply. The ref goes to the root <div>.
    disabledTests: ['primary-slot-gets-native-props'],
  });

  afterEach(() => {
    resetIdsForTests();
  });

  // Snapshot tests
  it('renders horizontal RangeSlider correctly', () => {
    const { container } = render(<RangeSlider defaultValue={{ start: 20, end: 80 }} min={0} max={100} />);
    expect(container).toMatchSnapshot();
  });

  it('renders vertical RangeSlider correctly', () => {
    const { container } = render(<RangeSlider defaultValue={{ start: 20, end: 80 }} vertical min={0} max={100} />);
    expect(container).toMatchSnapshot();
  });

  it('renders disabled RangeSlider correctly', () => {
    const { container } = render(<RangeSlider defaultValue={{ start: 20, end: 80 }} disabled min={0} max={100} />);
    expect(container).toMatchSnapshot();
  });

  // Unit tests
  it('renders two slider inputs', () => {
    render(<RangeSlider defaultValue={{ start: 20, end: 80 }} />);
    const sliders = screen.getAllByRole('slider');
    expect(sliders).toHaveLength(2);
  });

  it('applies the defaultValue prop', () => {
    render(<RangeSlider defaultValue={{ start: 20, end: 80 }} />);
    const sliders = screen.getAllByRole('slider');
    expect(sliders[0].getAttribute('value')).toEqual('20');
    expect(sliders[1].getAttribute('value')).toEqual('80');
  });

  it('applies the value prop', () => {
    render(<RangeSlider value={{ start: 30, end: 70 }} />);
    const sliders = screen.getAllByRole('slider');
    expect(sliders[0].getAttribute('value')).toEqual('30');
    expect(sliders[1].getAttribute('value')).toEqual('70');
  });

  it('clamps values when start is below min', () => {
    render(<RangeSlider defaultValue={{ start: -10, end: 50 }} min={0} max={100} />);
    const sliders = screen.getAllByRole('slider');
    expect(sliders[0].getAttribute('value')).toEqual('0');
  });

  it('clamps values when end is above max', () => {
    render(<RangeSlider defaultValue={{ start: 20, end: 200 }} min={0} max={100} />);
    const sliders = screen.getAllByRole('slider');
    expect(sliders[1].getAttribute('value')).toEqual('100');
  });

  it('applies the disabled prop', () => {
    render(<RangeSlider disabled defaultValue={{ start: 20, end: 80 }} />);
    const sliders = screen.getAllByRole('slider');
    expect(sliders[0].getAttribute('disabled')).toBeDefined();
    expect(sliders[1].getAttribute('disabled')).toBeDefined();
  });

  it('applies the min prop', () => {
    render(<RangeSlider min={10} defaultValue={{ start: 20, end: 80 }} />);
    const sliders = screen.getAllByRole('slider');
    expect(sliders[0].getAttribute('min')).toEqual('10');
  });

  it('applies the max prop', () => {
    render(<RangeSlider max={90} defaultValue={{ start: 20, end: 80 }} />);
    const sliders = screen.getAllByRole('slider');
    expect(sliders[1].getAttribute('max')).toEqual('90');
  });

  it('applies the step prop', () => {
    render(<RangeSlider step={5} defaultValue={{ start: 20, end: 80 }} />);
    const sliders = screen.getAllByRole('slider');
    expect(sliders[0].getAttribute('step')).toEqual('5');
    expect(sliders[1].getAttribute('step')).toEqual('5');
  });

  it('constrains startInput max to the end value', () => {
    render(<RangeSlider defaultValue={{ start: 20, end: 60 }} min={0} max={100} />);
    const sliders = screen.getAllByRole('slider');
    expect(sliders[0].getAttribute('max')).toEqual('60');
  });

  it('constrains endInput min to the start value', () => {
    render(<RangeSlider defaultValue={{ start: 20, end: 60 }} min={0} max={100} />);
    const sliders = screen.getAllByRole('slider');
    expect(sliders[1].getAttribute('min')).toEqual('20');
  });

  it('snaps off-step values to the step grid, as the native input does', () => {
    const { container } = render(<RangeSlider value={{ start: 3, end: 52 }} step={5} min={0} max={100} />);
    const sliders = screen.getAllByRole('slider');
    const root = container.firstElementChild as HTMLElement;

    expect(sliders[0].getAttribute('value')).toEqual('5');
    expect(sliders[1].getAttribute('value')).toEqual('50');
    expect(sliders[1].getAttribute('min')).toEqual('5');
    expect(root.style.getPropertyValue('--fui-RangeSlider--start-progress')).toEqual('5%');
    expect(root.style.getPropertyValue('--fui-RangeSlider--end-progress')).toEqual('50%');
  });

  it('ends the default range on the last step value when step does not divide the range', () => {
    render(<RangeSlider min={0} max={10} step={3} />);
    const end = screen.getAllByRole('slider')[1];
    expect(end.getAttribute('value')).toEqual('9');
    expect(end.getAttribute('max')).toEqual('9');
  });

  it('selects the full range when uncontrolled without a defaultValue', () => {
    render(<RangeSlider min={1000} max={5000} step={500} />);
    const sliders = screen.getAllByRole('slider');
    expect(sliders[0].getAttribute('value')).toEqual('1000');
    expect(sliders[1].getAttribute('value')).toEqual('5000');
  });

  it('orders values correctly when start > end', () => {
    render(<RangeSlider defaultValue={{ start: 80, end: 20 }} min={0} max={100} />);
    const sliders = screen.getAllByRole('slider');
    // Values should be sorted: start=20, end=80
    expect(sliders[0].getAttribute('value')).toEqual('20');
    expect(sliders[1].getAttribute('value')).toEqual('80');
  });

  // Focus tests
  it('applies focus to the start input', () => {
    render(<RangeSlider defaultValue={{ start: 20, end: 80 }} />);
    const sliders = screen.getAllByRole('slider');
    act(() => sliders[0].focus());
    expect(document.activeElement).toEqual(sliders[0]);
  });

  it('applies focus to the end input', () => {
    render(<RangeSlider defaultValue={{ start: 20, end: 80 }} />);
    const sliders = screen.getAllByRole('slider');
    act(() => sliders[1].focus());
    expect(document.activeElement).toEqual(sliders[1]);
  });

  it('does not allow focus on disabled RangeSlider', () => {
    render(<RangeSlider disabled defaultValue={{ start: 20, end: 80 }} />);
    const sliders = screen.getAllByRole('slider');
    expect(document.activeElement).toEqual(document.body);
    act(() => sliders[0].focus());
    expect(document.activeElement).toEqual(document.body);
  });

  // Accessibility tests
  it('allows aria-label to be set on each input via slots', () => {
    render(
      <RangeSlider
        defaultValue={{ start: 20, end: 80 }}
        startInput={{ 'aria-label': 'Minimum value' }}
        endInput={{ 'aria-label': 'Maximum value' }}
      />,
    );
    const sliders = screen.getAllByRole('slider');
    expect(sliders[0].getAttribute('aria-label')).toEqual('Minimum value');
    expect(sliders[1].getAttribute('aria-label')).toEqual('Maximum value');
  });

  it('applies aria-labelledby to the root group and both inputs', () => {
    render(<RangeSlider aria-labelledby="test-label" defaultValue={{ start: 20, end: 80 }} />);
    expect(screen.getByRole('group').getAttribute('aria-labelledby')).toEqual('test-label');
    const sliders = screen.getAllByRole('slider');
    expect(sliders[0].getAttribute('aria-labelledby')).toEqual('test-label');
    expect(sliders[1].getAttribute('aria-labelledby')).toEqual('test-label');
  });

  it('prefers a per-thumb label from the slot over the shared label', () => {
    render(
      <RangeSlider
        aria-labelledby="test-label"
        defaultValue={{ start: 20, end: 80 }}
        startInput={{ 'aria-label': 'Minimum price' }}
        endInput={{ 'aria-label': 'Maximum price' }}
      />,
    );
    const sliders = screen.getAllByRole('slider');
    expect(sliders[0].getAttribute('aria-labelledby')).toBeNull();
    expect(sliders[0].getAttribute('aria-label')).toEqual('Minimum price');
    expect(sliders[1].getAttribute('aria-labelledby')).toBeNull();
    expect(sliders[1].getAttribute('aria-label')).toEqual('Maximum price');
  });

  it('applies aria-valuetext per thumb via slots, not from the root props', () => {
    render(
      <RangeSlider
        aria-valuetext="ignored"
        defaultValue={{ start: 20, end: 80 }}
        startInput={{ 'aria-valuetext': '$20' }}
        endInput={{ 'aria-valuetext': '$80' }}
      />,
    );
    const sliders = screen.getAllByRole('slider');
    expect(sliders[0].getAttribute('aria-valuetext')).toEqual('$20');
    expect(sliders[1].getAttribute('aria-valuetext')).toEqual('$80');
    expect(screen.getByRole('group').getAttribute('aria-valuetext')).toBeNull();
  });

  it('applies form props to both inputs and other native props to the root', () => {
    const onPointerDown = jest.fn();
    render(
      <RangeSlider
        name="price"
        required
        data-testid="range"
        onPointerDown={onPointerDown}
        defaultValue={{ start: 20, end: 80 }}
      />,
    );
    const sliders = screen.getAllByRole('slider');
    expect(sliders.map(slider => slider.getAttribute('name'))).toEqual(['price', 'price']);
    expect(sliders.map(slider => slider.hasAttribute('required'))).toEqual([true, true]);

    const root = screen.getByTestId('range');
    expect(root.getAttribute('role')).toEqual('group');
    expect(root.getAttribute('name')).toBeNull();
    fireEvent.pointerDown(root);
    expect(onPointerDown).toHaveBeenCalledTimes(1);
  });

  it('provides each input with type range', () => {
    render(<RangeSlider defaultValue={{ start: 20, end: 80 }} />);
    const sliders = screen.getAllByRole('slider');
    expect(sliders[0].getAttribute('type')).toEqual('range');
    expect(sliders[1].getAttribute('type')).toEqual('range');
  });

  it('generates unique ids for each input', () => {
    render(<RangeSlider defaultValue={{ start: 20, end: 80 }} />);
    const sliders = screen.getAllByRole('slider');
    expect(sliders[0].id).not.toEqual(sliders[1].id);
    expect(sliders[0].id).toContain('rangeslider-start-');
    expect(sliders[1].id).toContain('rangeslider-end-');
  });

  it('applies a provided id to the root and derives unique input ids from it', () => {
    render(<RangeSlider id="price" defaultValue={{ start: 20, end: 80 }} />);
    expect(screen.getByRole('group').id).toEqual('price');
    const sliders = screen.getAllByRole('slider');
    expect(sliders.map(slider => slider.id)).toEqual(['price-start', 'price-end']);
  });

  it('labels the group and both inputs with the Field label, keeping ids unique', () => {
    render(
      <Field label="Price" hint="In dollars">
        <RangeSlider defaultValue={{ start: 20, end: 80 }} />
      </Field>,
    );
    const group = screen.getByRole('group', { name: 'Price' });
    const sliders = screen.getAllByRole('slider', { name: 'Price' });
    expect(new Set([group.id, sliders[0].id, sliders[1].id]).size).toBe(3);
    expect(sliders[0].getAttribute('aria-describedby')).toBeTruthy();
    expect(sliders[1].getAttribute('aria-describedby')).toEqual(sliders[0].getAttribute('aria-describedby'));
  });

  describe('disabling a single thumb', () => {
    it('keeps a slot-disabled thumb focusable with aria-disabled and leaves the other thumb enabled', () => {
      render(<RangeSlider defaultValue={{ start: 20, end: 80 }} name="price" startInput={{ disabled: true }} />);
      const [start, end] = screen.getAllByRole('slider') as HTMLInputElement[];

      expect(start.disabled).toBe(false);
      expect(start.getAttribute('aria-disabled')).toEqual('true');
      expect(end.disabled).toBe(false);
      expect(end.hasAttribute('aria-disabled')).toBe(false);

      act(() => start.focus());
      expect(document.activeElement).toBe(start);
    });

    it('ignores input changes on a slot-disabled thumb', () => {
      const onChange = jest.fn();
      render(<RangeSlider defaultValue={{ start: 20, end: 80 }} endInput={{ disabled: true }} onChange={onChange} />);
      const [start, end] = screen.getAllByRole('slider');

      fireEvent.change(end, { target: { value: '90' } });
      expect(onChange).not.toHaveBeenCalled();

      fireEvent.change(start, { target: { value: '30' } });
      expect(onChange.mock.calls[0][1].value).toEqual({ start: 30, end: 80 });
    });

    it('submits the value of a slot-disabled thumb with the form', () => {
      const { container } = render(
        <form>
          <RangeSlider defaultValue={{ start: 20, end: 80 }} name="price" startInput={{ disabled: true }} />
        </form>,
      );
      const formData = new FormData(container.querySelector('form')!);
      expect(formData.getAll('price')).toEqual(['20', '80']);
    });

    it('lets the whole-slider disabled win over a slot that is not disabled', () => {
      render(<RangeSlider disabled defaultValue={{ start: 20, end: 80 }} startInput={{ disabled: false }} />);
      const sliders = screen.getAllByRole('slider') as HTMLInputElement[];

      expect(sliders.map(slider => slider.disabled)).toEqual([true, true]);
      expect(sliders.map(slider => slider.hasAttribute('aria-disabled'))).toEqual([false, false]);
    });

    it('puts the enabled thumb on top when overlapping thumbs include a disabled one', () => {
      const { result } = renderHook(() =>
        useRangeSlider_unstable(
          { defaultValue: { start: 50, end: 50 }, startInput: { disabled: true } },
          React.createRef(),
        ),
      );

      // Focusing the disabled start thumb must not bring it on top
      act(() => result.current.startInput.onFocus?.({} as React.FocusEvent<HTMLInputElement>));

      expect(result.current.activeThumb).toBe('end');
      expect(result.current.startDisabled).toBe(true);
      expect(result.current.endDisabled).toBe(false);
    });
  });

  describe('base hook', () => {
    it('returns state without design props such as size', () => {
      const { result } = renderHook(() =>
        useRangeSliderBase_unstable({ defaultValue: { start: 20, end: 80 } }, React.createRef()),
      );

      expect(result.current).not.toHaveProperty('size');
      expect(result.current.value).toEqual({ start: 20, end: 80 });
    });

    it('adds size in the styled hook', () => {
      const { result } = renderHook(() => useRangeSlider_unstable({ size: 'small' }, React.createRef()));

      expect(result.current.size).toBe('small');
    });
  });

  describe('types', () => {
    it('does not accept single-thumb value props in the props type', () => {
      // @ts-expect-error -- aria-valuetext describes a single thumb; set it on a slot instead
      const props: RangeSliderProps = { 'aria-valuetext': 'ignored' };
      expect(props).toBeDefined();
    });
  });

  // Keyboard (native input change) tests
  describe('input changes', () => {
    it('calls onChange when the start input changes', () => {
      const onChange = jest.fn();
      render(<RangeSlider defaultValue={{ start: 20, end: 80 }} onChange={onChange} />);
      fireEvent.change(screen.getAllByRole('slider')[0], { target: { value: '25' } });

      expect(onChange).toHaveBeenCalledTimes(1);
      expect(onChange.mock.calls[0][1]).toEqual(
        expect.objectContaining({ type: 'change', value: { start: 25, end: 80 } }),
      );
    });

    it('clamps the end input to the start value', () => {
      const onChange = jest.fn();
      render(<RangeSlider defaultValue={{ start: 10, end: 50 }} step={5} onChange={onChange} />);
      fireEvent.change(screen.getAllByRole('slider')[1], { target: { value: '0' } });

      expect(onChange.mock.calls[0][1].value).toEqual({ start: 10, end: 10 });
    });

    it('does not call onChange when the clamped value is unchanged', () => {
      const onChange = jest.fn();
      render(<RangeSlider defaultValue={{ start: 50, end: 50 }} onChange={onChange} />);
      fireEvent.change(screen.getAllByRole('slider')[0], { target: { value: '60' } });

      expect(onChange).not.toHaveBeenCalled();
    });
  });

  // Pointer event tests
  // Note: jsdom lacks PointerEvent, setPointerCapture, and getBoundingClientRect support,
  // so these tests mock the missing DOM APIs to validate the pointer handler logic.
  describe('pointer interactions', () => {
    const originalGetBoundingClientRect = window.HTMLElement.prototype.getBoundingClientRect;

    // jsdom lacks PointerEvent, so fireEvent.pointerDown creates a MouseEvent whose
    // clientX/clientY default to 0. Dispatching via MouseEvent constructor preserves coordinates.
    const dispatchPointer = (
      element: HTMLElement,
      type: string,
      init: { clientX?: number; clientY?: number; button?: number; pointerId?: number },
    ) => {
      const { pointerId, ...mouseInit } = init;
      const event = new MouseEvent(type, { bubbles: true, cancelable: true, ...mouseInit });
      // jsdom has no PointerEvent, so set pointerId on the MouseEvent directly
      Object.defineProperty(event, 'pointerId', { value: pointerId ?? 1 });
      act(() => {
        element.dispatchEvent(event);
      });
    };

    beforeEach(() => {
      // Mock a 100px-wide rail starting at x=0 so clientX maps directly to slider value (0–100)
      window.HTMLElement.prototype.getBoundingClientRect = jest.fn().mockReturnValue({
        bottom: 20,
        height: 10,
        left: 0,
        right: 100,
        top: 10,
        width: 100,
        x: 0,
        y: 10,
      } as DOMRect);

      // jsdom does not implement pointer capture methods
      window.HTMLElement.prototype.setPointerCapture = jest.fn();
      window.HTMLElement.prototype.releasePointerCapture = jest.fn();
      window.HTMLElement.prototype.hasPointerCapture = jest.fn().mockReturnValue(true);
    });

    afterEach(() => {
      window.HTMLElement.prototype.getBoundingClientRect = originalGetBoundingClientRect;
    });

    it('calls onChange on pointerDown', () => {
      const onChange = jest.fn();
      const { container } = render(
        <RangeSlider defaultValue={{ start: 20, end: 80 }} min={0} max={100} onChange={onChange} />,
      );
      const root = container.firstElementChild as HTMLElement;

      dispatchPointer(root, 'pointerdown', { clientX: 30, clientY: 15 });

      expect(onChange).toHaveBeenCalledTimes(1);
      expect(onChange.mock.calls[0][1].value).toEqual({ start: 30, end: 80 });
    });

    it('updates values on pointerMove during drag', () => {
      const onChange = jest.fn();
      const { container } = render(
        <RangeSlider defaultValue={{ start: 20, end: 80 }} min={0} max={100} onChange={onChange} />,
      );
      const root = container.firstElementChild as HTMLElement;

      // Start drag near the start thumb
      dispatchPointer(root, 'pointerdown', { clientX: 20, clientY: 15 });
      onChange.mockClear();

      // Drag to new position
      dispatchPointer(root, 'pointermove', { clientX: 40, clientY: 15 });

      expect(onChange).toHaveBeenCalledTimes(1);
      expect(onChange.mock.calls[0][1].value).toEqual({ start: 40, end: 80 });
    });

    it('stops updating on pointerUp', () => {
      const onChange = jest.fn();
      const { container } = render(
        <RangeSlider defaultValue={{ start: 20, end: 80 }} min={0} max={100} onChange={onChange} />,
      );
      const root = container.firstElementChild as HTMLElement;

      dispatchPointer(root, 'pointerdown', { clientX: 20, clientY: 15 });
      dispatchPointer(root, 'pointerup', { clientX: 20, clientY: 15 });
      onChange.mockClear();

      // Move after pointerUp should not trigger onChange
      dispatchPointer(root, 'pointermove', { clientX: 50, clientY: 15 });

      expect(onChange).not.toHaveBeenCalled();
    });

    it('does not respond to pointer events when disabled', () => {
      const onChange = jest.fn();
      const { container } = render(
        <RangeSlider defaultValue={{ start: 20, end: 80 }} min={0} max={100} disabled onChange={onChange} />,
      );
      const root = container.firstElementChild as HTMLElement;

      dispatchPointer(root, 'pointerdown', { clientX: 30, clientY: 15 });

      expect(onChange).not.toHaveBeenCalled();
    });

    it('moves the closest thumb on pointerDown', () => {
      const onChange = jest.fn();
      const { container } = render(
        <RangeSlider defaultValue={{ start: 20, end: 80 }} min={0} max={100} onChange={onChange} />,
      );
      const root = container.firstElementChild as HTMLElement;

      // Click near end thumb (value 75 is closer to end=80 than start=20)
      dispatchPointer(root, 'pointerdown', { clientX: 75, clientY: 15 });

      expect(onChange).toHaveBeenCalledTimes(1);
      expect(onChange.mock.calls[0][1].value).toEqual({ start: 20, end: 75 });
    });

    it('moves the thumb on the pressed side when thumbs overlap', () => {
      const onChange = jest.fn();
      const { container } = render(
        <RangeSlider defaultValue={{ start: 50, end: 50 }} min={0} max={100} onChange={onChange} />,
      );
      const root = container.firstElementChild as HTMLElement;
      const sliders = screen.getAllByRole('slider');

      // The end thumb is the last-used one, but the press is below both thumbs
      fireEvent.focus(sliders[1]);
      dispatchPointer(root, 'pointerdown', { clientX: 20, clientY: 15 });
      expect(onChange.mock.calls[0][1].value).toEqual({ start: 20, end: 50 });
    });

    it('moves the end thumb when thumbs overlap at min and the press is above them', () => {
      const onChange = jest.fn();
      const { container } = render(
        <RangeSlider defaultValue={{ start: 0, end: 0 }} min={0} max={100} onChange={onChange} />,
      );
      const root = container.firstElementChild as HTMLElement;

      dispatchPointer(root, 'pointerdown', { clientX: 70, clientY: 15 });
      expect(onChange.mock.calls[0][1].value).toEqual({ start: 0, end: 70 });
    });

    it('does not call onChange when a pointer move keeps the same snapped value', () => {
      const onChange = jest.fn();
      const { container } = render(
        <RangeSlider defaultValue={{ start: 20, end: 80 }} min={0} max={100} step={10} onChange={onChange} />,
      );
      const root = container.firstElementChild as HTMLElement;

      dispatchPointer(root, 'pointerdown', { clientX: 21, clientY: 15 });
      dispatchPointer(root, 'pointermove', { clientX: 23, clientY: 15 });

      expect(onChange).not.toHaveBeenCalled();
    });

    it('ignores non-primary buttons', () => {
      const onChange = jest.fn();
      const { container } = render(
        <RangeSlider defaultValue={{ start: 20, end: 80 }} min={0} max={100} onChange={onChange} />,
      );
      const root = container.firstElementChild as HTMLElement;

      dispatchPointer(root, 'pointerdown', { clientX: 40, clientY: 15, button: 2 });

      expect(onChange).not.toHaveBeenCalled();
    });

    it('ignores presses when the rail has no size', () => {
      window.HTMLElement.prototype.getBoundingClientRect = jest
        .fn()
        .mockReturnValue({ bottom: 0, height: 0, left: 0, right: 0, top: 0, width: 0, x: 0, y: 0 } as DOMRect);
      const onChange = jest.fn();
      const { container } = render(
        <RangeSlider defaultValue={{ start: 20, end: 80 }} min={0} max={100} onChange={onChange} />,
      );

      dispatchPointer(container.firstElementChild as HTMLElement, 'pointerdown', { clientX: 40, clientY: 15 });

      expect(onChange).not.toHaveBeenCalled();
    });

    it('maps the pointer from the right in RTL', () => {
      const onChange = jest.fn();
      const { container } = render(
        <Provider value={{ dir: 'rtl' }}>
          <RangeSlider defaultValue={{ start: 20, end: 80 }} min={0} max={100} onChange={onChange} />
        </Provider>,
      );
      const root = container.querySelector('[role="group"]') as HTMLElement;

      dispatchPointer(root, 'pointerdown', { clientX: 70, clientY: 15 });

      expect(onChange.mock.calls[0][1].value).toEqual({ start: 30, end: 80 });
    });

    it('moves the enabled thumb, stopped at the disabled one, when pressing near a disabled thumb', () => {
      const onChange = jest.fn();
      const { container } = render(
        <RangeSlider
          defaultValue={{ start: 20, end: 80 }}
          min={0}
          max={100}
          startInput={{ disabled: true }}
          onChange={onChange}
        />,
      );
      const root = container.firstElementChild as HTMLElement;

      dispatchPointer(root, 'pointerdown', { clientX: 10, clientY: 15 });

      expect(onChange.mock.calls[0][1].value).toEqual({ start: 20, end: 20 });
      expect(document.activeElement).toBe(screen.getAllByRole('slider')[1]);
    });

    it('does not move when both thumbs are disabled through their slots', () => {
      const onChange = jest.fn();
      const { container } = render(
        <RangeSlider
          defaultValue={{ start: 20, end: 80 }}
          min={0}
          max={100}
          startInput={{ disabled: true }}
          endInput={{ disabled: true }}
          onChange={onChange}
        />,
      );

      dispatchPointer(container.firstElementChild as HTMLElement, 'pointerdown', { clientX: 30, clientY: 15 });

      expect(onChange).not.toHaveBeenCalled();
    });

    it('reports decimal-step values without floating-point noise', () => {
      const onChange = jest.fn();
      const { container } = render(
        <RangeSlider min={0} max={1} step={0.1} defaultValue={{ start: 0, end: 1 }} onChange={onChange} />,
      );
      const root = container.firstElementChild as HTMLElement;

      dispatchPointer(root, 'pointerdown', { clientX: 70, clientY: 15 });
      dispatchPointer(root, 'pointerup', { clientX: 70, clientY: 15 });
      dispatchPointer(root, 'pointerdown', { clientX: 30, clientY: 15 });

      expect(onChange.mock.calls.map(call => call[1].value)).toEqual([
        { start: 0, end: 0.7 },
        { start: 0.3, end: 0.7 },
      ]);
      expect(screen.getAllByRole('slider')[1].getAttribute('min')).toEqual('0.3');
    });

    it('stops at the last value on the step grid when step does not divide the range', () => {
      const onChange = jest.fn();
      const { container } = render(
        <RangeSlider min={0} max={10} step={4} defaultValue={{ start: 0, end: 4 }} onChange={onChange} />,
      );

      dispatchPointer(container.firstElementChild as HTMLElement, 'pointerdown', { clientX: 100, clientY: 15 });

      expect(onChange.mock.calls[0][1].value).toEqual({ start: 0, end: 8 });
    });

    it('ignores another pointer while a drag is in progress', () => {
      const onChange = jest.fn();
      const { container } = render(
        <RangeSlider defaultValue={{ start: 20, end: 80 }} min={0} max={100} onChange={onChange} />,
      );
      const root = container.firstElementChild as HTMLElement;

      dispatchPointer(root, 'pointerdown', { clientX: 25, clientY: 15, pointerId: 1 });
      // A second contact presses and lifts while the first one keeps dragging
      dispatchPointer(root, 'pointerdown', { clientX: 70, clientY: 15, pointerId: 2 });
      dispatchPointer(root, 'pointerup', { clientX: 70, clientY: 15, pointerId: 2 });
      dispatchPointer(root, 'pointermove', { clientX: 40, clientY: 15, pointerId: 1 });

      expect(onChange.mock.calls.map(call => call[1].value)).toEqual([
        { start: 25, end: 80 },
        { start: 40, end: 80 },
      ]);
    });

    it('stops updating when the pointer capture is lost', () => {
      const onChange = jest.fn();
      const { container } = render(
        <RangeSlider defaultValue={{ start: 20, end: 80 }} min={0} max={100} onChange={onChange} />,
      );
      const root = container.firstElementChild as HTMLElement;

      dispatchPointer(root, 'pointerdown', { clientX: 20, clientY: 15 });
      dispatchPointer(root, 'lostpointercapture', {});
      dispatchPointer(root, 'pointermove', { clientX: 50, clientY: 15 });

      expect(onChange).not.toHaveBeenCalled();
    });

    it('stops dragging a thumb that becomes disabled during the drag', () => {
      const onChange = jest.fn();
      const { container, rerender } = render(
        <RangeSlider defaultValue={{ start: 20, end: 80 }} min={0} max={100} onChange={onChange} />,
      );
      const root = container.firstElementChild as HTMLElement;

      dispatchPointer(root, 'pointerdown', { clientX: 20, clientY: 15 });
      rerender(
        <RangeSlider
          defaultValue={{ start: 20, end: 80 }}
          min={0}
          max={100}
          onChange={onChange}
          startInput={{ disabled: true }}
        />,
      );
      dispatchPointer(root, 'pointermove', { clientX: 50, clientY: 15 });

      expect(onChange).not.toHaveBeenCalled();
    });

    it('grabs a pressed thumb without changing its value, then drags it by the pointer movement', () => {
      const onChange = jest.fn();
      const { container } = render(
        <RangeSlider defaultValue={{ start: 20, end: 80 }} min={0} max={100} onChange={onChange} />,
      );
      const root = container.firstElementChild as HTMLElement;
      const startThumb = container.querySelector('.fui-RangeSlider__startThumb') as HTMLElement;

      // Off-center press on the start thumb (value 20)
      dispatchPointer(startThumb, 'pointerdown', { clientX: 26, clientY: 15 });
      expect(onChange).not.toHaveBeenCalled();
      expect(document.activeElement).toBe(screen.getAllByRole('slider')[0]);

      dispatchPointer(root, 'pointermove', { clientX: 36, clientY: 15 });
      expect(onChange.mock.calls[0][1].value).toEqual({ start: 30, end: 80 });
    });

    it('reaches max after an off-center grab of the end thumb', () => {
      const onChange = jest.fn();
      const { container } = render(
        <RangeSlider defaultValue={{ start: 20, end: 80 }} min={0} max={100} onChange={onChange} />,
      );
      const root = container.firstElementChild as HTMLElement;
      const endThumb = container.querySelector('.fui-RangeSlider__endThumb') as HTMLElement;

      // Grab the end thumb (value 80) 6px right of its center, then drag past the rail end
      dispatchPointer(endThumb, 'pointerdown', { clientX: 86, clientY: 15 });
      dispatchPointer(root, 'pointermove', { clientX: 120, clientY: 15 });

      expect(onChange.mock.lastCall[1].value).toEqual({ start: 20, end: 100 });
    });

    it('reaches min after an off-center grab of the start thumb', () => {
      const onChange = jest.fn();
      const { container } = render(
        <RangeSlider defaultValue={{ start: 20, end: 80 }} min={0} max={100} onChange={onChange} />,
      );
      const root = container.firstElementChild as HTMLElement;
      const startThumb = container.querySelector('.fui-RangeSlider__startThumb') as HTMLElement;

      // Grab the start thumb (value 20) 6px left of its center, then drag past the rail start
      dispatchPointer(startThumb, 'pointerdown', { clientX: 14, clientY: 15 });
      dispatchPointer(root, 'pointermove', { clientX: -20, clientY: 15 });

      expect(onChange.mock.lastCall[1].value).toEqual({ start: 0, end: 80 });
    });

    it('does not move a thumb at the edge when it is pressed', () => {
      const onChange = jest.fn();
      const { container } = render(
        <RangeSlider defaultValue={{ start: 0, end: 80 }} min={0} max={100} onChange={onChange} />,
      );
      const startThumb = container.querySelector('.fui-RangeSlider__startThumb') as HTMLElement;

      // The thumb at value 0 is drawn a few pixels inside the rail
      dispatchPointer(startThumb, 'pointerdown', { clientX: 6, clientY: 15 });

      expect(onChange).not.toHaveBeenCalled();
    });

    it('picks the thumb from the first move direction when overlapping thumbs are pressed', () => {
      const onChange = jest.fn();
      const { container } = render(
        <RangeSlider defaultValue={{ start: 50, end: 50 }} min={0} max={100} onChange={onChange} />,
      );
      const root = container.firstElementChild as HTMLElement;
      const endThumb = container.querySelector('.fui-RangeSlider__endThumb') as HTMLElement;

      dispatchPointer(endThumb, 'pointerdown', { clientX: 50, clientY: 15 });
      dispatchPointer(root, 'pointermove', { clientX: 40, clientY: 15 });
      dispatchPointer(root, 'pointerup', { clientX: 40, clientY: 15 });
      expect(onChange.mock.calls[0][1].value).toEqual({ start: 40, end: 50 });

      dispatchPointer(endThumb, 'pointerdown', { clientX: 50, clientY: 15 });
      dispatchPointer(root, 'pointermove', { clientX: 65, clientY: 15 });
      expect(onChange.mock.calls[1][1].value).toEqual({ start: 40, end: 65 });
    });

    it('moves the enabled thumb when a disabled thumb is pressed', () => {
      const onChange = jest.fn();
      const { container } = render(
        <RangeSlider
          defaultValue={{ start: 20, end: 80 }}
          min={0}
          max={100}
          onChange={onChange}
          startInput={{ disabled: true }}
        />,
      );
      const startThumb = container.querySelector('.fui-RangeSlider__startThumb') as HTMLElement;

      dispatchPointer(startThumb, 'pointerdown', { clientX: 20, clientY: 15 });

      expect(onChange.mock.calls[0][1].value).toEqual({ start: 20, end: 20 });
    });

    it('stops updating on pointerCancel', () => {
      const onChange = jest.fn();
      const { container } = render(
        <RangeSlider defaultValue={{ start: 20, end: 80 }} min={0} max={100} onChange={onChange} />,
      );
      const root = container.firstElementChild as HTMLElement;

      dispatchPointer(root, 'pointerdown', { clientX: 20, clientY: 15 });
      dispatchPointer(root, 'pointercancel', { clientX: 20, clientY: 15 });
      onChange.mockClear();

      dispatchPointer(root, 'pointermove', { clientX: 50, clientY: 15 });

      expect(onChange).not.toHaveBeenCalled();
    });
  });

  // Overlapping thumbs – last-used thumb tracking
  // fireEvent.focus is used because the inputs have pointer-events: none,
  // so userEvent.click cannot target them, and native .focus() doesn't
  // reliably trigger React's synthetic onFocus in jsdom.
  describe('overlapping thumbs', () => {
    it('elevates the end thumb when it receives focus while overlapping', () => {
      const { container } = render(<RangeSlider defaultValue={{ start: 50, end: 50 }} min={0} max={100} />);
      const sliders = screen.getAllByRole('slider');

      // Capture baseline classes before any interaction
      const endThumb = container.querySelectorAll('[class*="RangeSlider__endThumb"]')[0] as HTMLElement;
      const baselineClasses = endThumb.className;

      // Focus the end input so it becomes the last-active thumb
      fireEvent.focus(sliders[1]);

      // The end thumb should gain an additional elevated class
      expect(endThumb.className).not.toBe(baselineClasses);
      expect(endThumb.className.split(' ').length).toBeGreaterThan(baselineClasses.split(' ').length);
    });

    it('elevates the start thumb when it receives focus while overlapping', () => {
      const { container } = render(<RangeSlider defaultValue={{ start: 50, end: 50 }} min={0} max={100} />);
      const sliders = screen.getAllByRole('slider');

      // Focus end then start so start is the last-active thumb
      fireEvent.focus(sliders[1]);
      fireEvent.focus(sliders[0]);

      const startThumb = container.querySelectorAll('[class*="RangeSlider__startThumb"]')[0] as HTMLElement;
      const endThumb = container.querySelectorAll('[class*="RangeSlider__endThumb"]')[0] as HTMLElement;

      // Only start thumb should have the extra elevated class
      expect(startThumb.className.split(' ').length).toBeGreaterThan(endThumb.className.split(' ').length);
    });

    it('does not add elevated class when thumbs do not overlap', () => {
      const { container } = render(<RangeSlider defaultValue={{ start: 20, end: 80 }} min={0} max={100} />);

      const startThumb = container.querySelectorAll('[class*="RangeSlider__startThumb"]')[0] as HTMLElement;
      const endThumb = container.querySelectorAll('[class*="RangeSlider__endThumb"]')[0] as HTMLElement;

      // Both thumbs should have the same number of classes (no elevation applied)
      expect(startThumb.className.split(' ').length).toBe(endThumb.className.split(' ').length);
    });
  });
});
