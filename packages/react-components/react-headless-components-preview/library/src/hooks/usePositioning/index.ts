export { resolvePositioningShorthand } from './resolvePositioningShorthand';
export { usePositioning } from './usePositioning';
export { getPlacementString } from './utils';
export { POSITIONS, ALIGNMENTS } from './constants';
export { arrowPlugin, autoSizePlugin, boundaryPlugin, hidePlugin, offsetPlugin } from './plugins';
export type { FallbackInput, FallbackPlacement, FallbackRect } from './fallback/computeFallbackPosition';
export type {
  ExtendedPositioningProps,
  ExtendedPositioningReturn,
  PositioningProps,
  PositioningShorthand,
  PositioningReturn,
  PositioningTarget,
} from './types';
export type { PositioningPlugin, PositioningPluginContext, PositioningPluginUpdate } from './plugins';

export type {
  Alignment,
  Position,
  PositioningImperativeRef,
  PositioningShorthandValue,
} from '@fluentui/react-positioning';
