import type { PositioningPlacement, PositioningShorthandValue } from '@fluentui/react-positioning';

const SIDE_TO_POSITION = {
  top: 'above',
  bottom: 'below',
  left: 'before',
  right: 'after',
} as const;

/**
 * Maps a physical Floating UI placement (as reported by `onPositioningEnd`) to the logical
 * `data-placement` vocabulary headless components use, so consumer styling keyed on placement works
 * regardless of the engine.
 */
export function toHeadlessPlacement(placement: PositioningPlacement, isRtl: boolean): PositioningShorthandValue {
  const [side, alignment] = placement.split('-') as [keyof typeof SIDE_TO_POSITION, 'start' | 'end' | undefined];

  let position = SIDE_TO_POSITION[side];
  if (isRtl && (position === 'before' || position === 'after')) {
    position = position === 'before' ? 'after' : 'before';
  }

  if (!alignment) {
    return position;
  }

  if (position === 'before' || position === 'after') {
    return `${position}-${alignment === 'start' ? 'top' : 'bottom'}`;
  }

  return `${position}-${alignment}`;
}
