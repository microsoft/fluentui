export const DATA_POSITIONING_INTERSECTING = 'data-popper-is-intersecting';
export const DATA_POSITIONING_ESCAPED = 'data-popper-escaped';
export const DATA_POSITIONING_HIDDEN = 'data-popper-reference-hidden';
export const DATA_POSITIONING_PLACEMENT = 'data-popper-placement';
export const POSITIONING_END_EVENT = 'fui-positioningend';

/**
 * CSS custom properties used to encode the slide direction for positioning-aware enter animations.
 * Set at runtime by `usePositioningSlideDirection` and registered via the CSS
 * `registerProperty()` API so browsers can interpolate them as `<length>` values.
 */
export const POSITIONING_SLIDE_DIRECTION_VAR_X = '--fui-positioning-slide-direction-x';
export const POSITIONING_SLIDE_DIRECTION_VAR_Y = '--fui-positioning-slide-direction-y';
