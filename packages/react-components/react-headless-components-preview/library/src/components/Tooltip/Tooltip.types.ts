import type { TooltipBaseProps, TooltipBaseState } from '@fluentui/react-tooltip';
import type { PositioningShorthand } from '../../positioning';

export type { OnVisibleChangeData, TooltipSlots, TooltipTriggerProps } from '@fluentui/react-tooltip';

/**
 * Props for the Tooltip component.
 *
 * Reuses Tooltip base props while omitting `mountNode` for the headless preview API surface.
 * Positioning is handled by headless usePositioning hook.
 */
export type TooltipProps = Omit<TooltipBaseProps, 'mountNode' | 'positioning'> & {
  positioning?: PositioningShorthand;
};

/**
 * State used in rendering Tooltip.
 *
 * Extends Tooltip base state with headless-specific data attributes used for styling hooks.
 */
export type TooltipState = Omit<TooltipBaseState, 'mountNode' | 'hidden'> & {
  content: {
    'data-open'?: string;
  };
};
