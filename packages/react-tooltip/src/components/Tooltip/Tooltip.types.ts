import * as React from 'react';
import type { PositioningShorthand } from '@fluentui/react-positioning';
import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';
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
 * Properties and state for Tooltip
 */
type TooltipCommons = Pick<PortalProps, 'mountNode'> & {
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
   * The tooltip's visual appearance.
   * * `normal` - Uses the theme's background and text colors.
   * * `inverted` - Higher contrast variant that uses the theme's inverted colors.
   *
   * @defaultvalue normal
   */
  appearance?: 'normal' | 'inverted';

  /**
   * Render an arrow pointing to the target element
   *
   * @defaultvalue false
   */
  withArrow?: boolean;

  /**
   * Configure the positioning of the tooltip
   *
   * @defaultvalue above
   */
  positioning?: PositioningShorthand;

  /**
   * Control the tooltip's visibility programatically.
   *
   * This can be used in conjunction with onVisibleChange to modify the tooltip's show and hide behavior.
   *
   * If not provided, the visibility will be controlled by the tooltip itself, based on hover and focus events on the
   * trigger (child) element.
   */
  visible?: boolean;

  /**
   * Notification when the visibility of the tooltip is changing
   */
  onVisibleChange?: (
    event: React.PointerEvent<HTMLElement> | React.FocusEvent<HTMLElement> | undefined,
    data: OnVisibleChangeData,
  ) => void;

  /**
   * Delay before the tooltip is shown, in milliseconds.
   *
   * @defaultvalue 250
   */
  showDelay: number;

  /**
   * Delay before the tooltip is hidden, in milliseconds.
   *
   * @defaultvalue 250
   */
  hideDelay: number;
};

/**
 * The properties that are added to the trigger of the Tooltip
 */
export type TooltipTriggerProps = {
  ref?: React.Ref<never>;
} & Pick<
  React.HTMLAttributes<HTMLElement>,
  'onPointerEnter' | 'onPointerLeave' | 'onFocus' | 'onBlur' | 'aria-describedby' | 'aria-labelledby' | 'aria-label'
>;

/**
 * Data for the Tooltip's onVisibleChange event.
 */
export type OnVisibleChangeData = {
  visible: boolean;
};

/**
 * Properties for Tooltip
 */
export type TooltipProps = ComponentProps<TooltipSlots> &
  Partial<Omit<TooltipCommons, 'relationship'>> &
  Pick<TooltipCommons, 'relationship'> & {
    /**
     * The tooltip can have a single JSX child, or a render function that accepts TooltipTriggerProps.
     *
     * If no child is provided, the tooltip's target must be set with the `positioning` prop, and its
     * visibility must be controlled with the `visible` prop.
     */
    children?:
      | (React.ReactElement & { ref?: React.Ref<unknown> })
      | ((props: TooltipTriggerProps) => React.ReactElement | null)
      | null;
  };

/**
 * State used in rendering Tooltip
 */
export type TooltipState = ComponentState<TooltipSlots> &
  TooltipCommons & {
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
