import type {
  TooltipProps as TooltipHeadlessProps,
  TooltipState as TooltipHeadlessState,
} from '@fluentui/react-headless-components-preview/tooltip';

export type {
  OnVisibleChangeData,
  TooltipSlots,
  TooltipTriggerProps,
} from '@fluentui/react-headless-components-preview/tooltip';

/** The tooltip's visual appearance. `'inverted'` is the static high-contrast surface. */
export type TooltipAppearance = 'normal' | 'inverted';

/**
 * Windmod Tooltip props: the headless tooltip plus the look prop the headless surface
 * deliberately omits.
 */
export type TooltipProps = TooltipHeadlessProps & {
  /** @default 'normal' */
  appearance?: TooltipAppearance;
};

/** Windmod Tooltip state: headless state plus the resolved look prop. */
export type TooltipState = TooltipHeadlessState & {
  appearance: TooltipAppearance;
};
