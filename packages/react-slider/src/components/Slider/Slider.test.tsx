import * as React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { resetIdsForTests } from '@fluentui/react-utilities';
import { ArrowLeft, ArrowRight, ArrowDown, PageDown, PageUp, ArrowUp, Home, End } from '@fluentui/keyboard-keys';
import { Slider } from './Slider';
import { isConformant } from '../../common/isConformant';

/* eslint-disable @typescript-eslint/no-explicit-any */

describe('Slider', () => {
  isConformant({
    Component: Slider,
    displayName: 'Slider',
    primarySlot: 'input',
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
  });

  describe('Unit Tests', () => {
    it('handles id prop', () => {
      render(<Slider id="test_id" input={{ 'data-testid': 'test' } as any} />);
      const sliderRoot = screen.getByTestId('test');
      expect(sliderRoot.getAttribute('id')).toEqual('test_id');
    });

    it.skip('calls onChange when pointerDown', () => {
      const onChange = jest.fn();

      const { getByTestId } = render(
        <Slider defaultValue={5} onChange={onChange} input={{ 'data-testid': 'test' } as any} />,
      );

      expect(onChange).toHaveBeenCalledTimes(0);
      fireEvent.pointerDown(getByTestId('test'), { clientX: 0, clientY: 0 });
      expect(onChange).toHaveBeenCalledTimes(1);
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

    it.skip('handles keydown events', () => {
      const inputRef = React.createRef<HTMLInputElement>();
      const onChange = jest.fn();

      render(
        <Slider
          defaultValue={50}
          min={0}
          max={100}
          onChange={onChange}
          input={{ ref: inputRef, 'data-testid': 'test' } as any}
        />,
      );

      const sliderInput = screen.getByTestId('test');
      expect(onChange).toBeCalledTimes(0);

      fireEvent.keyDown(sliderInput, { key: ArrowDown });
      expect(onChange.mock.calls[0][1]).toEqual({ value: 49 });
      expect(inputRef.current?.value).toEqual('49');

      fireEvent.keyDown(sliderInput, { key: ArrowUp });
      expect(onChange.mock.calls[1][1]).toEqual({ value: 50 });
      expect(inputRef.current?.value).toEqual('50');

      fireEvent.keyDown(sliderInput, { key: ArrowLeft });
      expect(onChange.mock.calls[2][1]).toEqual({ value: 49 });
      expect(inputRef.current?.value).toEqual('49');

      fireEvent.keyDown(sliderInput, { key: ArrowRight });
      expect(onChange.mock.calls[3][1]).toEqual({ value: 50 });
      expect(inputRef.current?.value).toEqual('50');

      fireEvent.keyDown(sliderInput, { key: PageUp });
      expect(onChange.mock.calls[4][1]).toEqual({ value: 60 });
      expect(inputRef.current?.value).toEqual('60');

      fireEvent.keyDown(sliderInput, { key: PageDown });
      expect(onChange.mock.calls[5][1]).toEqual({ value: 50 });
      expect(inputRef.current?.value).toEqual('50');

      fireEvent.keyDown(sliderInput, { key: Home });
      expect(onChange.mock.calls[6][1]).toEqual({ value: 0 });
      expect(inputRef.current?.value).toEqual('0');

      fireEvent.keyDown(sliderInput, { key: End });
      expect(onChange.mock.calls[7][1]).toEqual({ value: 100 });
      expect(inputRef.current?.value).toEqual('100');

      fireEvent.keyDown(sliderInput, { key: ArrowLeft, shiftKey: true });
      expect(onChange.mock.calls[8][1]).toEqual({ value: 90 });
      expect(inputRef.current?.value).toEqual('90');

      fireEvent.keyDown(sliderInput, { key: ArrowRight, shiftKey: true });
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

    it.skip('calls onChange with the correct value', () => {
      const onChange = jest.fn();

      render(<Slider value={50} min={0} max={100} onChange={onChange} data-testid="test" />);

      const sliderRoot = screen.getByTestId('test');

      fireEvent.keyDown(sliderRoot, { key: 'ArrowUp' });
      fireEvent.keyDown(sliderRoot, { key: 'ArrowUp' });
      fireEvent.keyDown(sliderRoot, { key: 'ArrowUp' });

      expect(onChange.mock.calls[2][1]).toEqual({ value: 51 });
    });

    it('applies focus to the hidden input', () => {
      const inputRef = React.createRef<HTMLInputElement>();
      render(<Slider defaultValue={3} input={{ ref: inputRef }} />);
      inputRef?.current?.focus();
      expect(document.activeElement).toEqual(inputRef.current);
    });

    it('does not allow focus on disabled Slider', () => {
      const sliderRef = React.createRef<HTMLInputElement>();
      const inputRef = React.createRef<HTMLInputElement>();

      render(<Slider ref={sliderRef} disabled input={{ ref: inputRef }} />);

      expect(document.activeElement).toEqual(document.body);
      sliderRef?.current?.focus();
      expect(document.activeElement).toEqual(document.body);
      inputRef?.current?.focus();
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
  });

  describe('Accessibility Tests', () => {
    it('handles role prop', () => {
      render(<Slider role="test" data-testid="test" />);
      const sliderRoot = screen.getByTestId('test');
      expect(sliderRoot.getAttribute('role')).toEqual('test');
    });

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
