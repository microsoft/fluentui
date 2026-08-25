import * as React from 'react';
import { act, fireEvent, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Tooltip } from './Tooltip';
import { resetIdsForTests } from '@fluentui/react-utilities';

// Regression coverage for https://github.com/microsoft/fluentui/issues/36604.
//
// JSDOM doesn't run a real layout engine, so every element reports a zero-size
// `getBoundingClientRect` by default. Floating UI's `hide` middleware treats a
// zero-size reference/floating rect as fully clipped, which would make this test
// "pass" for the wrong reason (tooltip always hidden, regardless of the fix).
// To exercise the actual regression, we give the DOM nodes involved
// browser-realistic, non-zero rects that reproduce the reported layout:
// a trigger sitting in a tightly-fitted `overflow: hidden` wrapper, itself
// nested inside a real scrollable ancestor.
function mockRect(rect: Partial<DOMRect>): DOMRect {
  return {
    x: rect.left ?? 0,
    y: rect.top ?? 0,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: (rect.right ?? 0) - (rect.left ?? 0),
    height: (rect.bottom ?? 0) - (rect.top ?? 0),
    toJSON: () => ({}),
    ...rect,
  } as DOMRect;
}

describe('Tooltip overflow:hidden regression (#36604)', () => {
  let spies: jest.SpyInstance[];

  afterEach(() => {
    spies.forEach(spy => spy.mockRestore());
    resetIdsForTests();
  });

  it('still shows the tooltip when its trigger sits in a tightly-fitted, static overflow:hidden container nested inside a real scroll parent', async () => {
    const result = render(
      <div
        data-testid="scroll-ancestor"
        style={{ height: '600px', width: '800px', overflow: 'auto', position: 'relative' }}
      >
        <div data-testid="static-hidden" style={{ overflow: 'hidden', display: 'flex' }}>
          <Tooltip content="I should still appear" relationship="label" showDelay={0} hideDelay={0}>
            <button data-testid="trigger">Hover me</button>
          </Tooltip>
        </div>
      </div>,
    );

    const scrollAncestor = result.getByTestId('scroll-ancestor');
    const staticHidden = result.getByTestId('static-hidden');
    const trigger = result.getByTestId('trigger');

    // A tight box around the trigger - the static `overflow: hidden` wrapper hugs it exactly,
    // matching the "tightly-fitted toolbar/card" repro from the issue.
    const triggerRect = { top: 300, left: 300, right: 380, bottom: 332 };
    const scrollAncestorRect = { top: 0, left: 0, right: 800, bottom: 600 };
    const viewportRect = { top: 0, left: 0, right: 1024, bottom: 768 };
    const tooltipContentRect = { top: 0, left: 0, right: 100, bottom: 32 };

    function rectFor(element: Element) {
      if (element === scrollAncestor) {
        return scrollAncestorRect;
      }
      if (element === staticHidden || element === trigger) {
        return triggerRect;
      }
      if (element === document.documentElement || element === document.body) {
        return viewportRect;
      }
      // The tooltip bubble itself (and anything else, e.g. the arrow): give it a modest,
      // non-zero size so Floating UI's placement math has something realistic to work with.
      return tooltipContentRect;
    }

    // JSDOM has no real layout engine: `getBoundingClientRect` always returns a zero rect, and
    // `offsetWidth`/`offsetHeight` (which Floating UI's dimension measurement actually reads via
    // `getCssDimensions`) are always 0 too. Both need mocking in lockstep, or Floating UI falls
    // back to treating every element as zero-size regardless of the rects above.
    spies = [
      jest.spyOn(HTMLElement.prototype, 'getBoundingClientRect').mockImplementation(function (this: HTMLElement) {
        return mockRect(rectFor(this));
      }),
      jest.spyOn(HTMLElement.prototype, 'offsetWidth', 'get').mockImplementation(function (this: HTMLElement) {
        const rect = rectFor(this);
        return rect.right - rect.left;
      }),
      jest.spyOn(HTMLElement.prototype, 'offsetHeight', 'get').mockImplementation(function (this: HTMLElement) {
        const rect = rectFor(this);
        return rect.bottom - rect.top;
      }),
      // Floating UI's viewport/clipping-ancestor rects (`getViewportRect`, `getInnerBoundingClientRect`) read
      // `clientWidth`/`clientHeight`, not `getBoundingClientRect` - these need mocking too, or the resolved
      // boundary (however correctly it resolves) collapses to a zero-size rect regardless.
      jest.spyOn(HTMLElement.prototype, 'clientWidth', 'get').mockImplementation(function (this: HTMLElement) {
        const rect = rectFor(this);
        return rect.right - rect.left;
      }),
      jest.spyOn(HTMLElement.prototype, 'clientHeight', 'get').mockImplementation(function (this: HTMLElement) {
        const rect = rectFor(this);
        return rect.bottom - rect.top;
      }),
    ];

    await userEvent.hover(trigger);

    // Let Floating UI's async `computePosition` (and our positioning-end event) settle.
    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 50));
    });

    const tooltip = result.baseElement.querySelector('[role="tooltip"]') as HTMLElement;
    expect(tooltip).not.toBeNull();
    expect(tooltip.textContent).toBe('I should still appear');
    expect(getComputedStyle(tooltip).visibility).not.toBe('hidden');

    await act(async () => {
      fireEvent.pointerLeave(trigger);
      await new Promise(resolve => setTimeout(resolve, 50));
    });
  });
});
