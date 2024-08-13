import * as React from 'react';
import type { PositioningShorthand } from '@fluentui/react-positioning';
import type { ComponentProps, ComponentState, Slot, TriggerProps } from '@fluentui/react-utilities';
import type { PortalProps } from '@fluentui/react-portal';

/**
 * Slot properties for Tooltip
 */
export type TooltipSlots = {
  /**
   * The text or JSX content of the tooltip.
   */
  content: NonNullable<Slot<'div'>>;
};

/**
 * The properties that are added to the child of the Tooltip
 */
export type TooltipChildProps = {
  ref?: React.Ref<unknown>;
} & Pick<
  React.HTMLAttributes<HTMLElement>,
  'aria-describedby' | 'aria-label' | 'aria-labelledby' | 'onBlur' | 'onFocus' | 'onPointerEnter' | 'onPointerLeave'
>;

/**
 * Data for the Tooltip's onVisibleChange event.
 */
export type OnVisibleChangeData = {
  visible: boolean;

  /**
   * The event object, if this visibility change was triggered by a keyboard event on the document element
   * (such as Escape to hide the visible tooltip). Otherwise undefined.
   */
  documentKeyboardEvent?: KeyboardEvent;
};

/**
 * Properties for Tooltip
 */
export type TooltipProps = ComponentProps<TooltipSlots> &
  TriggerProps<TooltipChildProps> &
  Pick<PortalProps, 'mountNode'> & {
    /**
     * The tooltip's visual appearance.
     * * `normal` - Uses the theme's background and text colors.
     * * `inverted` - Higher contrast variant that uses the theme's inverted colors.
     *
     * @default normal
     */
    appearance?: 'normal' | 'inverted';
    /**
     * Delay before the tooltip is hidden, in milliseconds.
     *
     * @default 250
     */
    hideDelay?: number;

    /**
     * Notification when the visibility of the tooltip is changing.
     *
     * **Note**: for backwards compatibility, `event` will be undefined if this was triggered by a keyboard event on
     * the document element. Use `data.documentKeyboardEvent` if the keyboard event object is needed.
     */
    // eslint-disable-next-line @nx/workspace-consistent-callback-type -- can't change type of existing callback
    onVisibleChange?: (
      event: React.PointerEvent<HTMLElement> | React.FocusEvent<HTMLElement> | undefined,
      data: OnVisibleChangeData,
    ) => void;

    /**
     * Configure the positioning of the tooltip
     *
     * @default above
     */
    positioning?: PositioningShorthand;

    /**
     * (Required) Specifies whether this tooltip is acting as the description or label of its trigger element.
     *
     * * `label` - The tooltip sets the trigger's aria-label or aria-labelledby attribute. This is useful for buttons
     *    displaying only an icon, for example.
     * * `description` - The tooltip sets the trigger's aria-description or aria-describedby attribute.
     * * `inaccessible` - No aria attributes are set on the trigger. This makes the tooltip's content inaccessible to
     *   screen readers, and should only be used if the tooltip's text is available by some other means.
     */
    relationship: 'label' | 'description' | 'inaccessible';

    /**
     * Delay before the tooltip is shown, in milliseconds.
     *
     * @default 250
     */
    showDelay?: number;

    /**
     * Control the tooltip's visibility programatically.
     *
     * This can be used in conjunction with onVisibleChange to modify the tooltip's show and hide behavior.
     *
     * If not provided, the visibility will be controlled by the tooltip itself, based on hover and focus events on the
     * trigger (child) element.
     *
     * @default false
     */
    visible?: boolean;

    /**
     * Render an arrow pointing to the target element
     *
     * @default false
     */
    withArrow?: boolean;
  };

/**
 * State used in rendering Tooltip
 */
export type TooltipState = ComponentState<TooltipSlots> &
  Pick<TooltipProps, 'mountNode' | 'relationship'> &
  Required<Pick<TooltipProps, 'appearance' | 'hideDelay' | 'positioning' | 'showDelay' | 'visible' | 'withArrow'>> & {
    children?: React.ReactElement | null;

    /**
     * Whether the tooltip should be rendered to the DOM.
     */
    shouldRenderTooltip?: boolean;

    /**
     * Ref to the arrow element
     */
    arrowRef?: React.Ref<HTMLDivElement>;

    /**
     * CSS class for the arrow element
     */
    arrowClassName?: string;
  };
