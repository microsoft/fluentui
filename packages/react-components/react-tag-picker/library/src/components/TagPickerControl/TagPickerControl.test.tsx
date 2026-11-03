import * as React from 'react';
import { act, render } from '@testing-library/react';
import { isConformant } from '../../testing/isConformant';
import { TagPickerControl } from './TagPickerControl';
import { tagPickerControlAsideWidthToken } from './useTagPickerControlStyles.styles';

/**
 * Collects animation frames instead of running them and makes ResizeObserver report a size as soon as an element is
 * observed, i.e. during the React commit and before passive effects run.
 */
const mockAsideMeasurement = (width: number) => {
  const frames = new Map<number, FrameRequestCallback>();
  let nextFrameId = 1;
  const originalResizeObserver = window.ResizeObserver;

  jest.spyOn(window, 'requestAnimationFrame').mockImplementation(callback => {
    frames.set(nextFrameId, callback);
    return nextFrameId++;
  });
  jest.spyOn(window, 'cancelAnimationFrame').mockImplementation(id => {
    frames.delete(id);
  });
  window.ResizeObserver = class {
    constructor(private callback: ResizeObserverCallback) {}
    public observe() {
      this.callback([{ contentRect: { width } } as ResizeObserverEntry], this as unknown as ResizeObserver);
    }
    public unobserve() {
      /* noop */
    }
    public disconnect() {
      /* noop */
    }
  } as unknown as typeof ResizeObserver;

  return {
    frames,
    restore: () => {
      window.ResizeObserver = originalResizeObserver;
      jest.restoreAllMocks();
    },
  };
};

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

  it('applies an aside width measured before effects run', () => {
    const { frames, restore } = mockAsideMeasurement(24);

    try {
      const { container } = render(<TagPickerControl secondaryAction="secondary action" />);
      frames.forEach(callback => callback(0));

      expect((container.firstChild as HTMLElement).style.getPropertyValue(tagPickerControlAsideWidthToken)).toBe(
        '24px',
      );
    } finally {
      restore();
    }
  });

  it('cancels a pending aside width update on unmount', () => {
    const { frames, restore } = mockAsideMeasurement(24);

    try {
      const { unmount } = render(<TagPickerControl secondaryAction="secondary action" />);
      expect(frames.size).toBe(1);

      unmount();
      expect(frames.size).toBe(0);
    } finally {
      restore();
    }
  });
});
