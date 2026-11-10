import * as React from 'react';
import { render } from '@testing-library/react';
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
