export { Stagger } from './Stagger';
export type { StaggerProps } from './stagger-types';

// Export the main hook
export { useStaggerItemsVisibility } from './useStaggerItemsVisibility';
export type { UseStaggerItemsVisibilityParams } from './useStaggerItemsVisibility';

// Export utilities for advanced usage
export {
  DEFAULT_ITEM_DELAY,
  DEFAULT_ITEM_DURATION,
  toElementArray,
  isFragment,
  childrenOrFragmentToArray,
  getStaggerTotalDuration,
  staggerItemsVisibilityAtTime,
  acceptsVisibleProp,
} from './utils';
export type { StaggerItemsVisibilityAtTimeParams } from './utils';
