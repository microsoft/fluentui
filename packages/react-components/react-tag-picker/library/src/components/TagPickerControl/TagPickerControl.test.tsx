import * as React from 'react';
import { act, render } from '@testing-library/react';
import { isConformant } from '../../testing/isConformant';
import { TagPickerControl } from './TagPickerControl';

describe('TagPickerControl', () => {
  isConformant({
    Component: TagPickerControl,
    displayName: 'TagPickerControl',
    requiredProps: {
      secondaryAction: 'secondary action',
    },
  });

  it('renders a default state', () => {
    const result = render(<TagPickerControl>Default PickerControl</TagPickerControl>);
    expect(result.container).toMatchSnapshot();
  });

  describe('the aside width custom property', () => {
    // useTagPickerControl schedules the write of --fui-TagPickerControl-aside-width from the
    // ResizeObserver callback, and cancels that frame from an effect. The observer is attached by
    // a ref callback, so `observe()` runs in the COMMIT phase -- before React flushes the passive
    // effect. A ResizeObserver whose `observe()` invokes its callback synchronously therefore
    // reproduces, deterministically, the ordering that the production race lands on 8-11 times out
    // of 12: a frame is already pending by the time the effect runs. If the cancel sits in the
    // effect BODY it kills that frame and the property is never written; in the effect's CLEANUP
    // it only runs on unmount, which is what these two tests pin.
    const realRaf = window.requestAnimationFrame;
    const realCaf = window.cancelAnimationFrame;
    const realResizeObserver = window.ResizeObserver;

    const ASIDE_WIDTH = 18;
    let frames: { id: number; callback: FrameRequestCallback }[] = [];
    let cancelledIds: number[] = [];

    beforeEach(() => {
      frames = [];
      cancelledIds = [];
      let nextId = 1;
      window.requestAnimationFrame = (callback: FrameRequestCallback) => {
        const id = nextId++;
        frames.push({ id, callback });
        return id;
      };
      window.cancelAnimationFrame = (id: number) => {
        cancelledIds.push(id);
      };
      window.ResizeObserver = class implements ResizeObserver {
        constructor(private callback: ResizeObserverCallback) {}
        public observe(element: Element) {
          this.callback([{ target: element, contentRect: { width: ASIDE_WIDTH } }] as never, this);
        }
        public unobserve() {
          /* no-op */
        }
        public disconnect() {
          /* no-op */
        }
      };
    });

    afterEach(() => {
      window.requestAnimationFrame = realRaf;
      window.cancelAnimationFrame = realCaf;
      window.ResizeObserver = realResizeObserver;
    });

    it('does not cancel the pending frame on mount, so the property is written', () => {
      const result = render(<TagPickerControl>Default PickerControl</TagPickerControl>);

      expect(frames).toHaveLength(1);
      expect(cancelledIds).not.toContain(frames[0].id);

      act(() => {
        frames[0].callback(0);
      });

      const control = result.container.querySelector('.fui-TagPickerControl') as HTMLElement;
      expect(control.style.getPropertyValue('--fui-TagPickerControl-aside-width')).toBe(`${ASIDE_WIDTH}px`);
    });

    it('cancels a still-pending frame on unmount', () => {
      const result = render(<TagPickerControl>Default PickerControl</TagPickerControl>);

      expect(frames).toHaveLength(1);

      // Snapshot before unmounting: a cancel that already happened on mount would make the
      // assertion below pass vacuously, which is exactly what the defective form did.
      const cancelledBeforeUnmount = [...cancelledIds];
      result.unmount();

      expect(cancelledBeforeUnmount).not.toContain(frames[0].id);
      expect(cancelledIds).toContain(frames[0].id);
    });
  });
});
