import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';

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
   * A label supports semibold/strong fontweight.
   * @default false
   */
  strong?: boolean;
};

export type LabelSlots = {
  root: Slot<'label'>;
  required?: Slot<'span'>;
};

/**
 * State used in rendering Label
 */
export type LabelState = ComponentState<LabelSlots> & Required<Pick<LabelProps, 'disabled' | 'size' | 'strong'>>;
