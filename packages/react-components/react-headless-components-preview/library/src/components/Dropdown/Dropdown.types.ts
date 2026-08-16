import type {
  DropdownSlots as DropdownBaseSlots,
  DropdownBaseHookState,
  DropdownBaseHookProps,
} from '@fluentui/react-combobox';
import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';

export type { DropdownContextValues, DropdownOpenChangeData, DropdownOpenEvents } from '@fluentui/react-combobox';

export type DropdownSlots = DropdownBaseSlots & {
  /**
   * Optional icon slot rendered before the trigger element.
   */
  icon?: Slot<'span'>;
};

export type DropdownProps = Omit<DropdownBaseHookProps, 'inlinePopup' | 'mountNode'> &
  ComponentProps<Pick<DropdownSlots, 'icon'>>;

export type DropdownState = DropdownBaseHookState &
  ComponentState<Pick<DropdownSlots, 'icon'>> & {
    root: DropdownBaseHookState['root'] & {
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
