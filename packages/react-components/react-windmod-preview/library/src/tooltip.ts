export { Tooltip, tooltipClassNames, useTooltipStyles } from './components/Tooltip';
export type {
  OnVisibleChangeData,
  TooltipAppearance,
  TooltipProps,
  TooltipSlots,
  TooltipState,
  TooltipTriggerProps,
} from './components/Tooltip';

/** Headless building blocks, re-exported for consumers composing their own Tooltip. */
export { renderTooltip, useTooltip } from '@fluentui/react-headless-components-preview/tooltip';
