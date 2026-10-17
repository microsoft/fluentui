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

    function flushFrames() {
      const queuedFrames = frames;
      frames = [];
      for (const { id, callback } of queuedFrames) {
        if (!cancelledIds.includes(id)) {
          callback(0);
        }
      }
    }

    beforeEach(() => {
      frames = [];
      cancelledIds = [];
      // Zero is a valid animation-frame handle, not the absence of a pending frame.
      let nextId = 0;
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

      act(flushFrames);

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
      // React 18 replays effects without replaying callback refs. Effect cleanup would cancel
      // the initial frame with no ref reattachment to schedule a replacement. React 19 also
      // replays refs, so run this with the React 18 integration target as well as the default
      // tests. Only uncancelled frames may run: executing cancelled callbacks hides the bug.
      const result = render(
        <React.StrictMode>
          <TagPickerControl>Default PickerControl</TagPickerControl>
        </React.StrictMode>,
      );

      act(flushFrames);

      const control = result.container.querySelector('.fui-TagPickerControl') as HTMLElement;
      expect(control.style.getPropertyValue('--fui-TagPickerControl-aside-width')).toBe(`${ASIDE_WIDTH}px`);
    });
  });
});
