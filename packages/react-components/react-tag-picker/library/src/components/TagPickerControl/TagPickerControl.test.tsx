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
    // ResizeObserver callback, and cancels that frame when the observer's callback ref
    // receives null (element unmount), alongside ResizeObserver.disconnect() -- not from a
    // passive effect's cleanup. That keeps the frame's lifecycle tied to the same event that
    // owns it (the ref attach/detach that starts and stops the observation) instead of an
    // effect whose cleanup timing is independent of it. A ResizeObserver whose `observe()`
    // invokes its callback synchronously reproduces, deterministically, a frame already being
    // in flight by the time the ref detaches -- without depending on real async timing, which
    // jsdom cannot reproduce.
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

    it('writes the property after mount inside React.StrictMode', () => {
      // Regression test for https://github.com/microsoft/fluentui/pull/36667#discussion_r3925809333:
      // StrictMode mounts, simulates an unmount/remount of the render output (detaching and
      // reattaching refs, and replaying effects), then settles. Cancelling the pending frame
      // from a passive effect's cleanup -- rather than from the observer ref's own detach path
      // -- risked cancelling the frame during that replay with nothing left to reschedule it,
      // since callback refs are not necessarily re-invoked the same way effects are replayed.
      // Asserting the property IS set after the dust settles pins the fix: the frame's
      // cancellation now lives on the same ref-detach path as ResizeObserver.disconnect(), so
      // it only ever cancels a frame that its own detach actually orphaned, and any reattach
      // schedules its own fresh frame that survives.
      const result = render(
        <React.StrictMode>
          <TagPickerControl>Default PickerControl</TagPickerControl>
        </React.StrictMode>,
      );

      act(() => {
        frames.forEach(frame => frame.callback(0));
      });

      const control = result.container.querySelector('.fui-TagPickerControl') as HTMLElement;
      expect(control.style.getPropertyValue('--fui-TagPickerControl-aside-width')).toBe(`${ASIDE_WIDTH}px`);
    });
  });
});
