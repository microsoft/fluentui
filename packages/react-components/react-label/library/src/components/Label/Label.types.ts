import type { ComponentProps, ComponentState, DistributiveOmit, Slot } from '@fluentui/react-utilities';

/**
 * Label Props
 */
export type LabelProps = Omit<ComponentProps<LabelSlots>, 'required'> & {
  /**
   * Renders the label as disabled
   * @default false
   */
  disabled?: boolean;

  /**
   * Displays an indicator that the label is for a required field. The required prop can be set to true to display
   * an asterisk (*). Or it can be set to a string or jsx content to display a different indicator.
   * @default false
   */
  required?: boolean | Slot<'span'>;

  /**
   * A label supports different sizes.
   * @default 'medium'
   */
  size?: 'small' | 'medium' | 'large';

  /**
   * A label supports regular and semibold fontweight.
   * @default regular
   */
  weight?: 'regular' | 'semibold';
};

export type LabelSlots = {
  root: Slot<'label'>;
  required?: Slot<'span'>;
};

/**
 * State used in rendering Label
 */
export type LabelState = ComponentState<LabelSlots> & Required<Pick<LabelProps, 'disabled' | 'size' | 'weight'>>;

/**
 * Label props without design-specific props (size, weight).
 * Use this when building a label that is unstyled or uses a custom design system.
 */
export type LabelBaseProps = DistributiveOmit<LabelProps, 'size' | 'weight'>;

/**
 * Label state without design-specific state (size, weight).
 */
export type LabelBaseState = DistributiveOmit<LabelState, 'size' | 'weight'>;
