import * as React from 'react';

export const SPLIT_MIN_PERCENT = 20;
export const SPLIT_MAX_PERCENT = 80;
export const SPLIT_DEFAULT_PERCENT = 50;
const SPLIT_KEYBOARD_STEP = 5;

export interface SplitPaneSeparatorProps {
  role: 'separator';
  'aria-orientation': 'vertical';
  'aria-valuemin': number;
  'aria-valuemax': number;
  'aria-valuenow': number;
  tabIndex: 0;
  onPointerDown: React.PointerEventHandler<HTMLElement>;
  onKeyDown: React.KeyboardEventHandler<HTMLElement>;
  onDoubleClick: React.MouseEventHandler<HTMLElement>;
}

export interface SplitPaneState {
  /** Width of the first pane in percent of the container. */
  percent: number;
  /** `true` while the separator is being dragged. */
  dragging: boolean;
  separatorProps: SplitPaneSeparatorProps;
}

function clamp(value: number): number {
  return Math.min(SPLIT_MAX_PERCENT, Math.max(SPLIT_MIN_PERCENT, value));
}

/**
 * Horizontal split between two panes, resizable by dragging the separator (pointer capture, so no document listeners
 * are needed) or with the keyboard (arrow keys, Home/End, Enter resets). Double-click resets the split as well.
 */
export function useSplitPane(containerRef: React.RefObject<HTMLElement | null>): SplitPaneState {
  const [percent, setPercent] = React.useState(SPLIT_DEFAULT_PERCENT);
  const [dragging, setDragging] = React.useState(false);

  const onPointerDown = React.useCallback(
    (event: React.PointerEvent<HTMLElement>) => {
      const container = containerRef.current;
      if (!container || event.button !== 0) {
        return;
      }

      event.preventDefault();
      const separator = event.currentTarget;
      const { left, width } = container.getBoundingClientRect();
      separator.setPointerCapture(event.pointerId);
      setDragging(true);

      const onMove = (moveEvent: PointerEvent) => {
        setPercent(clamp(((moveEvent.clientX - left) / width) * 100));
      };
      const onEnd = () => {
        separator.removeEventListener('pointermove', onMove);
        separator.removeEventListener('pointerup', onEnd);
        separator.removeEventListener('pointercancel', onEnd);
        setDragging(false);
      };

      separator.addEventListener('pointermove', onMove);
      separator.addEventListener('pointerup', onEnd);
      separator.addEventListener('pointercancel', onEnd);
    },
    [containerRef],
  );

  const onKeyDown = React.useCallback((event: React.KeyboardEvent<HTMLElement>) => {
    switch (event.key) {
      case 'ArrowLeft':
        setPercent(current => clamp(current - SPLIT_KEYBOARD_STEP));
        break;
      case 'ArrowRight':
        setPercent(current => clamp(current + SPLIT_KEYBOARD_STEP));
        break;
      case 'Home':
        setPercent(SPLIT_MIN_PERCENT);
        break;
      case 'End':
        setPercent(SPLIT_MAX_PERCENT);
        break;
      case 'Enter':
        setPercent(SPLIT_DEFAULT_PERCENT);
        break;
      default:
        return;
    }
    event.preventDefault();
  }, []);

  const onDoubleClick = React.useCallback(() => setPercent(SPLIT_DEFAULT_PERCENT), []);

  return {
    percent,
    dragging,
    separatorProps: {
      role: 'separator',
      'aria-orientation': 'vertical',
      'aria-valuemin': SPLIT_MIN_PERCENT,
      'aria-valuemax': SPLIT_MAX_PERCENT,
      'aria-valuenow': Math.round(percent),
      tabIndex: 0,
      onPointerDown,
      onKeyDown,
      onDoubleClick,
    },
  };
}
