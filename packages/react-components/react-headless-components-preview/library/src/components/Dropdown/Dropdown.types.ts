import type { DropdownBaseHookState, DropdownBaseHookProps } from '@fluentui/react-combobox';
import type { PositioningShorthand } from '../../positioning';

export type {
  DropdownSlots,
  DropdownContextValues,
  DropdownOpenChangeData,
  DropdownOpenEvents,
} from '@fluentui/react-combobox';

export type DropdownProps = Omit<DropdownBaseHookProps, 'inlinePopup' | 'mountNode' | 'positioning'> & {
  positioning?: PositioningShorthand;
};

export type DropdownState = DropdownBaseHookState & {
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
