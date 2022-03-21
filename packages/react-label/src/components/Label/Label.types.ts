import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';

type LabelCommons = {
  /**
   * Renders the label as disabled
   * @defaultvalue false
   */
  disabled: boolean;

  /**
   * A label supports different sizes.
   * @defaultvalue 'medium'
   */
  size: 'small' | 'medium' | 'large';

  /**
   * A label supports semibold/strong fontweight.
   * @defaultvalue false
   */
  strong: boolean;
};

export type LabelSlots = {
  root: Slot<'label'>;
  required?: Slot<'span'>;
};

/**
 * State used in rendering Label
 */
export type LabelState = ComponentState<LabelSlots> & LabelCommons;

/**
 * Label Props
 */
export type LabelProps = Omit<ComponentProps<LabelSlots>, 'required'> &
  Partial<LabelCommons> & {
    /**
     * Displays and indicator that the label is for a required field. The required prop can be set to true to display
     * an asterisk (*). Or it can be set to a string or jsx content to display a different indicator.
     * @defaultvalue false
     */
    required?: boolean | Slot<'span'>;
  };
