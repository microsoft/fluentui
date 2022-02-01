import type { ComponentProps, ComponentState, IntrinsicShorthandProps } from '@fluentui/react-utilities';

export type OptionSlots = {
  root: IntrinsicShorthandProps<'div'>;

  check: IntrinsicShorthandProps<'span'>;
};

export type OptionCommons = {
  /**
   * Disabled options cannot be selected, but are still navigable
   */
  disabled?: boolean;
};

/**
 * Option Props
 */
export type OptionProps = ComponentProps<OptionSlots> &
  OptionCommons & {
    /* define a string value if the children are not a string */
    value?: string;
  };

/**
 * State used in rendering Option
 */
export type OptionState = ComponentState<OptionSlots> &
  OptionCommons & {
    isActive: boolean;
    selected: boolean;
  };
