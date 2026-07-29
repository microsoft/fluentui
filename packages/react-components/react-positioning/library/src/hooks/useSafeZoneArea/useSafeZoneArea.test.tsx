import { act, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useSafeZoneArea, type UseSafeZoneOptions } from '@fluentui/react-positioning';
import * as React from 'react';

import styles from './SafeZoneArea.module.css';

/*
 * Griffel → Tailwind + CSS Modules migration (migration/griffel-to-tailwind).
 *
 * These tests used to assert `toBeVisible()` / `not.toBeVisible()` on the safe-zone wrapper.
 * That worked only because Griffel injected its atomic CSS into jsdom at RUNTIME, so
 * `display: none` was a resolvable computed style. A converted component ships static CSS
 * compiled at BUILD time and jest maps `*.module.css` to a class-name proxy
 * (jest.config.js) — no stylesheet reaches jsdom, `getComputedStyle` has nothing to resolve,
 * and every element is unconditionally "visible".
 *
 * The contract splits in two and both halves stay covered:
 *   - WHICH class the component applies for the active/inactive state → asserted here,
 *     against the same `SafeZoneArea.module.css` key `SafeZoneArea.styles.ts` reads, so a
 *     renamed or dropped slice fails.
 *   - WHAT `.wrapper` / `.wrapper-active` declare (`display: none` vs `display: block`) →
 *     covered by `useSafeZoneArea.cy.tsx`, which runs in a real browser against the built
 *     stylesheet and already asserts the computed `display` on `[data-safe-zone]`.
 *
 * Same split, same reasoning as `react-portal`'s `Portal.test.tsx`.
 */

/** The safe zone is shown when the wrapper carries the `wrapper-active` slice. */
function expectSafeZoneShown(element: Element | null | undefined) {
  expect(element).toBeInTheDocument();
  expect(element).toHaveClass(styles['wrapper-active']);
}

/** …and hidden when it does not — `.wrapper` alone is `display: none`. */
function expectSafeZoneHidden(element: Element | null | undefined) {
  expect(element).toBeInTheDocument();
  expect(element).toHaveClass(styles.wrapper);
  expect(element).not.toHaveClass(styles['wrapper-active']);
}

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

      expectSafeZoneHidden(safeZoneEl);

      // Hover over the trigger element

      act(() => {
        userEvent.hover(triggerEl);
        jest.advanceTimersByTime(100);
      });

      const svgPathEl = safeZoneEl?.querySelector('svg path') as SVGPathElement;

      expectSafeZoneShown(safeZoneEl);
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

      expectSafeZoneHidden(safeZoneEl);
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

      expectSafeZoneHidden(safeZoneEl);

      // Hover over the trigger element

      act(() => {
        userEvent.hover(triggerEl);
        jest.advanceTimersByTime(100);
      });

      const svgPathEl = safeZoneEl?.querySelector('svg path') as SVGPathElement;

      expectSafeZoneShown(safeZoneEl);
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

      expectSafeZoneShown(safeZoneEl);
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

      expectSafeZoneHidden(safeZoneEl);

      // Hover over the trigger element

      act(() => {
        userEvent.hover(triggerEl);
        jest.advanceTimersByTime(100);
      });

      const svgPathEl = safeZoneEl?.querySelector('svg path') as SVGPathElement;

      expectSafeZoneShown(safeZoneEl);
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

      expectSafeZoneHidden(safeZoneEl);
      expect(onSafeZoneTimeout).not.toHaveBeenCalled();

      // Check again

      act(() => {
        jest.advanceTimersByTime(1000);
      });

      expect(onSafeZoneTimeout).not.toHaveBeenCalled();
    });
  });
});
