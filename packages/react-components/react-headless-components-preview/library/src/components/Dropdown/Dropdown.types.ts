import type { DropdownBaseHookState, DropdownBaseHookProps } from '@fluentui/react-combobox';

export type {
  DropdownSlots,
  DropdownContextValues,
  DropdownOpenChangeData,
  DropdownOpenEvents,
} from '@fluentui/react-combobox';

export type DropdownProps = Omit<DropdownBaseHookProps, 'inlinePopup' | 'mountNode'>;

export type DropdownState = DropdownBaseHookState & {
  root: DropdownBaseHookState['root'] & {
    /**
     * Whether the dropdown is currently open.
     */
    'data-open'?: string;
    /**
     * Present when the trigger is disabled; omitted otherwise.
     */
    'data-disabled'?: string;
    /**
     * Present when a placeholder is displayed; omitted when a value is present.
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
