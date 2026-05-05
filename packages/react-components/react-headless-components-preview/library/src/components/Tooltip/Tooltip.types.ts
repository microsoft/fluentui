import type { TooltipBaseProps, TooltipBaseState } from '@fluentui/react-tooltip';

export type { OnVisibleChangeData, TooltipSlots, TooltipTriggerProps } from '@fluentui/react-tooltip';

/**
 * Props for the Tooltip component.
 *
 * Reuses Tooltip base props while omitting `mountNode` for the headless preview API surface.
 * Positioning is handled by the Tooltip base implementation via `usePositioning` from
 * `@fluentui/react-positioning`.
 */
export type TooltipProps = Omit<TooltipBaseProps, 'mountNode'>;

/**
 * State used in rendering Tooltip.
 *
 * Extends Tooltip base state with headless-specific data attributes used for styling hooks.
 */
export type TooltipState = Omit<TooltipBaseState, 'mountNode'>;
