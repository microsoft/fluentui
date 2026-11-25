export { createVirtualElementFromClick } from './createVirtualElementFromClick';
export { usePositioningSlideDirection } from './usePositioningSlideDirection';
export { POSITIONING_SLIDE_DIRECTION_VAR_X, POSITIONING_SLIDE_DIRECTION_VAR_Y } from './constants';
export { createArrowHeightStyles, createArrowStyles } from './createArrowStyles';
// eslint-disable-next-line @typescript-eslint/no-deprecated
export { createSlideStyles } from './createSlideStyles';
export type { CreateArrowStylesOptions } from './createArrowStyles';

export { PositioningConfigurationProvider } from './PositioningConfigurationContext';

export { usePositioning } from './usePositioning';
export { usePositioningMouseTarget } from './usePositioningMouseTarget';
export { useSafeZoneArea } from './hooks/useSafeZoneArea/useSafeZoneArea';
export type { UseSafeZoneOptions } from './hooks/useSafeZoneArea/useSafeZoneArea';
export { resolvePositioningShorthand, mergeArrowOffset } from './utils/index';

export type {
  Alignment,
  AutoSize,
  // eslint-disable-next-line @typescript-eslint/no-deprecated
  Boundary,
  Offset,
  OffsetFunction,
  OffsetFunctionParam,
  OffsetObject,
  OffsetShorthand,
  Position,
  PositioningBoundary,
  PositioningImperativeRef,
  PositioningProps,
  PositioningRect,
  PositioningShorthand,
  PositioningShorthandValue,
  PositioningVirtualElement,
  SetVirtualMouseTarget,
  PositioningConfigurationFn,
  PositioningConfigurationFnOptions,
} from './types';
