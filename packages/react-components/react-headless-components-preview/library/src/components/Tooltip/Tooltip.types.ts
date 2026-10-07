import type * as React from 'react';
import type {
  TooltipBaseProps,
  TooltipBaseState,
  TooltipTriggerProps as BaseTooltipTriggerProps,
} from '@fluentui/react-tooltip';
import type { TriggerProps } from '@fluentui/react-utilities';
import type { PositioningShorthand } from '../../positioning';

export type { OnVisibleChangeData, TooltipSlots } from '@fluentui/react-tooltip';

export type TooltipTriggerProps = BaseTooltipTriggerProps & Pick<React.HTMLAttributes<HTMLElement>, 'onPointerUp'>;

/**
 * Props for the Tooltip component.
 *
 * Reuses Tooltip base props while omitting `mountNode` for the headless preview API surface.
 * Positioning is handled by headless usePositioning hook.
 */
export type TooltipProps = Omit<TooltipBaseProps, 'children' | 'mountNode' | 'positioning'> &
  TriggerProps<TooltipTriggerProps> & {
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
