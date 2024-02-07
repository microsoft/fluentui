export type CollisionEdge = 'top' | 'right' | 'bottom' | 'left';

export const PositioningShorthand = {
  aboveStart: 'above-start',
  aboveCenter: 'above-center',
  aboveEnd: 'above-end',
  endTop: 'end-top',
  endMiddle: 'end-middle',
  endBottom: 'end-bottom',
  belowStart: 'below-start',
  belowCenter: 'below-center',
  belowEnd: 'below-end',
  startTop: 'start-top',
  startMiddle: 'start-middle',
  startBottom: 'start-bottom',
} as const;

export type PositioningShorthand = typeof PositioningShorthand[keyof typeof PositioningShorthand];

export interface HTMLPopoverElement extends HTMLElement {
  showPopover: () => void;
  hidePopover: () => void;
  togglePopover: () => void;
}
