import type { PositioningBoundary, PositioningOptions, PositioningPlacement } from '../types';

export type { PositioningPlacement as Placement, PositioningRect as Rect } from '../types';
export type Side = Exclude<PositioningPlacement, `${string}-${string}`>;
export type SideObject = Record<Side, number>;
export type Strategy = NonNullable<PositioningOptions['strategy']>;

/** After resolving Fluent's named boundaries relative to the positioned element. */
export type ClippingBoundary = Exclude<PositioningBoundary, string> | 'clippingAncestors';
