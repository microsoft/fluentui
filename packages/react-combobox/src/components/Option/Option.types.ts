import type { ComponentProps, ComponentState, IntrinsicShorthandProps } from '@fluentui/react-utilities';

export type OptionSlots = {
  // TODO Add slots here and to optionShorthandProps in useOption.ts
  root: IntrinsicShorthandProps<'div'>;
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
export type OptionProps = ComponentProps<OptionSlots> & OptionCommons;

/**
 * State used in rendering Option
 */
export type OptionState = ComponentState<OptionSlots> &
  OptionCommons & {
    isActive: boolean;
    selected: boolean;
  };
