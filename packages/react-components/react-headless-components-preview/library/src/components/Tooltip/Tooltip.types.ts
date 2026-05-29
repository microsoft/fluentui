import type { TooltipProps as TooltipV9Props, TooltipState as TooltipV9State } from '@fluentui/react-tooltip';

export type { OnVisibleChangeData, TooltipSlots, TooltipTriggerProps } from '@fluentui/react-tooltip';

/**
 * Props for the Tooltip component.
 *
 * Reuses the v9 Tooltip props while omitting `appearance` (v9 styling) and `mountNode`
 * for the headless preview API surface.
 */
export type TooltipProps = Omit<TooltipV9Props, 'appearance' | 'mountNode'>;

/**
 * State used in rendering Tooltip.
 *
 * Reuses the v9 Tooltip state while omitting `appearance` (v9 styling) and `mountNode`.
 */
export type TooltipState = Omit<TooltipV9State, 'appearance' | 'mountNode'>;
