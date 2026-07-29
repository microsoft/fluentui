import type {
  OptionSlots as OptionBaseSlots,
  OptionProps as OptionBaseProps,
  OptionState as OptionBaseState,
} from '@fluentui/react-combobox';

export type OptionSlots = OptionBaseSlots;

/**
 * Option Props
 */
export type OptionProps = OptionBaseProps;

/**
 * State used in rendering Option
 */
export type OptionState = OptionBaseState & {
  root: {
    /**
     * Whether the option is currently disabled.
     */
    'data-disabled'?: string;
    /**
     * Whether the option is currently selected.
     */
    'data-selected'?: string;
  };
};
