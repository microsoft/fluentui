import * as React from 'react';
import { render } from '@testing-library/react';
import { isConformant } from '../../testing/isConformant';
import { TagPickerControl } from './TagPickerControl';
import { tagPickerControlAsideWidthToken } from './useTagPickerControlStyles.styles';

/**
 * Collects animation frames instead of running them and makes ResizeObserver report a size as soon as an element is
 * observed, i.e. during the React commit and before passive effects run.
 */
const mockAsideMeasurement = (width: number, firstFrameId = 1) => {
  const frames = new Map<number, FrameRequestCallback>();
  let nextFrameId = firstFrameId;
  let measure: (nextWidth: number) => void;
  const originalResizeObserver = window.ResizeObserver;

  jest.spyOn(window, 'requestAnimationFrame').mockImplementation(callback => {
    frames.set(nextFrameId, callback);
    return nextFrameId++;
  });
  const cancelAnimationFrame = jest.spyOn(window, 'cancelAnimationFrame').mockImplementation(id => {
    frames.delete(id);
  });
  window.ResizeObserver = class {
    constructor(private callback: ResizeObserverCallback) {}
    public observe() {
      measure = nextWidth => {
        this.callback(
          [{ contentRect: { width: nextWidth } } as ResizeObserverEntry],
          this as unknown as ResizeObserver,
        );
      };
      measure(width);
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
    cancelAnimationFrame,
    measure: (nextWidth: number) => measure(nextWidth),
    flush: () => {
      frames.forEach((callback, id) => {
        frames.delete(id);
        callback(0);
      });
    },
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

  it('applies an aside width measured before effects run', () => {
    const { flush, restore } = mockAsideMeasurement(24);

    try {
      const { container } = render(<TagPickerControl secondaryAction="secondary action" />);
      flush();

      expect((container.firstChild as HTMLElement).style.getPropertyValue(tagPickerControlAsideWidthToken)).toBe(
        '24px',
      );
    } finally {
      restore();
    }
  });

  it('preserves the initial aside width update in StrictMode', () => {
    const { frames, flush, restore } = mockAsideMeasurement(24);

    try {
      const { container } = render(
        <React.StrictMode>
          <TagPickerControl secondaryAction="secondary action" />
        </React.StrictMode>,
      );
      expect(frames.size).toBe(1);
      flush();

      expect((container.firstChild as HTMLElement).style.getPropertyValue(tagPickerControlAsideWidthToken)).toBe(
        '24px',
      );
    } finally {
      restore();
    }
  });

  it('cancels a pending aside width update with handle zero on unmount', () => {
    const { frames, cancelAnimationFrame, restore } = mockAsideMeasurement(24, 0);

    try {
      const { unmount } = render(<TagPickerControl secondaryAction="secondary action" />);
      expect(frames.size).toBe(1);

      unmount();
      expect(cancelAnimationFrame).toHaveBeenCalledWith(0);
      expect(frames.size).toBe(0);
    } finally {
      restore();
    }
  });

  it('keeps only the latest pending aside measurement', () => {
    const { frames, measure, flush, restore } = mockAsideMeasurement(24);

    try {
      const { container, unmount } = render(<TagPickerControl secondaryAction="secondary action" />);
      measure(48);
      expect(frames.size).toBe(1);
      flush();
      expect((container.firstChild as HTMLElement).style.getPropertyValue(tagPickerControlAsideWidthToken)).toBe(
        '48px',
      );

      measure(64);
      measure(80);
      unmount();
      expect(frames.size).toBe(0);
    } finally {
      restore();
    }
  });

  it('cancels pending measurement when only the aside is removed', () => {
    const { frames, restore } = mockAsideMeasurement(24);

    try {
      const { rerender } = render(<TagPickerControl expandIcon={null} secondaryAction="secondary action" />);
      expect(frames.size).toBe(1);

      rerender(<TagPickerControl expandIcon={null} secondaryAction={null} />);
      expect(frames.size).toBe(0);
    } finally {
      restore();
    }
  });

  it('does not cancel a completed frame on unmount', () => {
    const { flush, cancelAnimationFrame, restore } = mockAsideMeasurement(24);

    try {
      const { unmount } = render(<TagPickerControl secondaryAction="secondary action" />);
      flush();
      cancelAnimationFrame.mockClear();

      unmount();
      expect(cancelAnimationFrame).not.toHaveBeenCalled();
    } finally {
      restore();
    }
  });
});
