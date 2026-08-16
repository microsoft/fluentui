import type {
  ComboboxSlots as ComboboxBaseSlots,
  BaseComboboxState,
  BaseComboboxProps,
} from '@fluentui/react-combobox';
import type { ComponentState, ComponentProps, Slot } from '@fluentui/react-utilities';

export type { ComboboxContextValues, ComboboxOpenChangeData, ComboboxOpenEvents } from '@fluentui/react-combobox';

export type ComboboxSlots = ComboboxBaseSlots & {
  /**
   * Optional icon slot rendered before the input field.
   */
  icon?: Slot<'span'>;
};

export type ComboboxProps = Omit<BaseComboboxProps, 'inlinePopup' | 'mountNode'> &
  ComponentProps<Pick<ComboboxSlots, 'icon'>>;

export type ComboboxState = BaseComboboxState &
  ComponentState<Pick<ComboboxSlots, 'icon'>> & {
    root: {
      /**
       * Whether the dropdown is currently open.
       */
      'data-open'?: string;
      /**
       * Whether the trigger element is currently disabled.
       */
      'data-disabled'?: string;
      /**
       * Whether the trigger element is currently displaying a placeholder.
       */
      'data-placeholder'?: string;
      /**
       * Whether the trigger element is currently invalid.
       */
      'data-invalid'?: string;
      /**
       * Wether the clear icon is visible.
       */
      'data-clearable'?: string;
    };
  };
