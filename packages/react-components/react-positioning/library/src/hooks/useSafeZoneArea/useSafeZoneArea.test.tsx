import { act, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useSafeZoneArea, type UseSafeZoneOptions } from '@fluentui/react-positioning';
import * as React from 'react';

const Example = ({
  onSafeZoneLeave,
  onSafeZoneEnter,
  onSafeZoneTimeout,
}: Pick<UseSafeZoneOptions, 'onSafeZoneEnter' | 'onSafeZoneLeave' | 'onSafeZoneTimeout'>) => {
  const safeZoneArea = useSafeZoneArea({
    debug: true,
    timeout: 1000,
    onSafeZoneLeave,
    onSafeZoneEnter,
    onSafeZoneTimeout,
  });

  return (
    <>
      <button
        ref={safeZoneArea.targetRef}
        data-testid="trigger"
        style={{
          width: '100px',
          height: '50px',
        }}
      >
        TRIGGER
      </button>

      <div
        data-popper-placement="right-top"
        data-testid="popover"
        ref={safeZoneArea.containerRef}
        style={{
          backgroundColor: 'orange',
          border: '2px solid black',
          padding: '20px',
          width: '100px',
          height: '300px',
        }}
      >
        POPOVER
      </div>

      {safeZoneArea.elementToRender}
    </>
  );
};

jest.useFakeTimers();

describe('useSafeZoneArea', () => {
  describe('onSafeZoneTimeout', () => {
    it('is called if a cursor remains on safe zone', () => {
      const onSafeZoneEnter = jest.fn();
      const onSafeZoneTimeout = jest.fn();

      const { getByTestId, container } = render(
        <Example onSafeZoneEnter={onSafeZoneEnter} onSafeZoneTimeout={onSafeZoneTimeout} />,
      );

      const triggerEl = getByTestId('trigger');
      const safeZoneEl = container.querySelector('[data-safe-zone]');

      expect(safeZoneEl).not.toBeVisible();

      // Hover over the trigger element

      act(() => {
        userEvent.hover(triggerEl);
        jest.advanceTimersByTime(100);
      });

      const svgPathEl = safeZoneEl?.querySelector('svg path') as SVGPathElement;

      expect(safeZoneEl).toBeVisible();
      expect(svgPathEl).toBeInstanceOf(SVGElement);

      // Hover over the SVG path element

      act(() => {
        userEvent.hover(svgPathEl);
      });

      expect(onSafeZoneEnter).toHaveBeenCalledTimes(1);
      expect(onSafeZoneTimeout).not.toHaveBeenCalled();

      // Wait for the timeout to trigger

      act(() => {
        jest.advanceTimersByTime(1000);
      });

      expect(safeZoneEl).not.toBeVisible();
      expect(onSafeZoneTimeout).toHaveBeenCalledTimes(1);
    });

    it('is not called if a cursor was moved back to a trigger', () => {
      const onSafeZoneEnter = jest.fn();
      const onSafeZoneTimeout = jest.fn();

      const { getByTestId, container } = render(
        <Example onSafeZoneEnter={onSafeZoneEnter} onSafeZoneTimeout={onSafeZoneTimeout} />,
      );

      const triggerEl = getByTestId('trigger');
      const safeZoneEl = container.querySelector('[data-safe-zone]');

      expect(safeZoneEl).not.toBeVisible();

      // Hover over the trigger element

      act(() => {
        userEvent.hover(triggerEl);
        jest.advanceTimersByTime(100);
      });

      const svgPathEl = safeZoneEl?.querySelector('svg path') as SVGPathElement;

      expect(safeZoneEl).toBeVisible();
      expect(svgPathEl).toBeInstanceOf(SVGElement);

      // Hover over the SVG path element

      act(() => {
        userEvent.hover(svgPathEl);
      });

      expect(onSafeZoneEnter).toHaveBeenCalledTimes(1);
      expect(onSafeZoneTimeout).not.toHaveBeenCalled();

      // Move back to the trigger element

      act(() => {
        jest.advanceTimersByTime(500);
        userEvent.hover(triggerEl);
      });

      expect(safeZoneEl).toBeVisible();
      expect(onSafeZoneTimeout).not.toHaveBeenCalled();

      // Check again

      jest.advanceTimersByTime(1000);

      expect(onSafeZoneTimeout).not.toHaveBeenCalled();
    });

    it('is not called if a cursor is moved to a container', () => {
      const onSafeZoneEnter = jest.fn();
      const onSafeZoneTimeout = jest.fn();

      const { getByTestId, container } = render(
        <Example onSafeZoneEnter={onSafeZoneEnter} onSafeZoneTimeout={onSafeZoneTimeout} />,
      );

      const triggerEl = getByTestId('trigger');
      const containerEl = getByTestId('popover');
      const safeZoneEl = container.querySelector('[data-safe-zone]');

      expect(safeZoneEl).not.toBeVisible();

      // Hover over the trigger element

      act(() => {
        userEvent.hover(triggerEl);
        jest.advanceTimersByTime(100);
      });

      const svgPathEl = safeZoneEl?.querySelector('svg path') as SVGPathElement;

      expect(safeZoneEl).toBeVisible();
      expect(svgPathEl).toBeInstanceOf(SVGElement);

      // Hover over the SVG path element

      act(() => {
        userEvent.hover(svgPathEl);
      });

      expect(onSafeZoneEnter).toHaveBeenCalledTimes(1);
      expect(onSafeZoneTimeout).not.toHaveBeenCalled();

      // Move to a container element

      act(() => {
        jest.advanceTimersByTime(500);
        userEvent.hover(containerEl);
      });

      expect(safeZoneEl).not.toBeVisible();
      expect(onSafeZoneTimeout).not.toHaveBeenCalled();

      // Check again

      act(() => {
        jest.advanceTimersByTime(1000);
      });

      expect(onSafeZoneTimeout).not.toHaveBeenCalled();
    });
  });
});
