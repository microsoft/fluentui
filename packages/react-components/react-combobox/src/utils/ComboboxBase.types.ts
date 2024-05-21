import * as React from 'react';
import type { ActiveDescendantChangeEvent, ActiveDescendantContextValue } from '@fluentui/react-aria';
import type { PositioningShorthand } from '@fluentui/react-positioning';
import { EventData, EventHandler } from '@fluentui/react-utilities';
import type { ComboboxContextValue } from '../contexts/ComboboxContext';
import type { OptionValue, OptionCollectionState } from '../utils/OptionCollection.types';
import { SelectionProps, SelectionState } from '../utils/Selection.types';
import { PortalProps } from '@fluentui/react-portal';
import { ListboxContextValue } from '../contexts/ListboxContext';

/**
 * ComboboxBase Props
 * Shared types between Combobox and Dropdown components
 */
export type ComboboxBaseProps = SelectionProps &
  HighlightedOptionProps &
  Pick<PortalProps, 'mountNode'> & {
    /**
     * Controls the colors and borders of the combobox trigger.
     * @default 'outline'
     */
    appearance?: 'filled-darker' | 'filled-lighter' | 'outline' | 'underline';

    /**
     * If set, the combobox will show an icon to clear the current value.
     */
    clearable?: boolean;

    /**
     * The default open state when open is uncontrolled
     */
    defaultOpen?: boolean;

    /**
     * The default value displayed in the trigger input or button when the combobox's value is uncontrolled
     */
    defaultValue?: string;

    /**
     * Render the combobox's popup inline in the DOM.
     * This has accessibility benefits, particularly for touch screen readers.
     */
    inlinePopup?: boolean;

    /**
     * Callback when the open/closed state of the dropdown changes
     */
    // eslint-disable-next-line @nx/workspace-consistent-callback-type -- can't change type of existing callback
    onOpenChange?: (e: ComboboxBaseOpenEvents, data: ComboboxBaseOpenChangeData) => void;

    /**
     * Sets the open/closed state of the dropdown.
     * Use together with onOpenChange to fully control the dropdown's visibility
     */
    open?: boolean;

    /**
     * If set, the placeholder will show when no value is selected
     */
    placeholder?: string;

    /**
     * Configure the positioning of the combobox dropdown
     *
     * @defaultvalue below
     */
    positioning?: PositioningShorthand;

    /**
     * Controls the size of the combobox faceplate
     * @default 'medium'
     */
    size?: 'small' | 'medium' | 'large';

    /**
     * The value displayed by the Combobox.
     * Use this with `onOptionSelect` to directly control the displayed value string
     */
    value?: string;
  };

/**
 * State used in rendering Combobox
 */
export type ComboboxBaseState = Required<
  Pick<ComboboxBaseProps, 'appearance' | 'open' | 'clearable' | 'inlinePopup' | 'size'>
> &
  Pick<ComboboxBaseProps, 'mountNode' | 'placeholder' | 'value' | 'multiselect'> &
  OptionCollectionState &
  SelectionState & {
    /**
     * @deprecated - no longer used internally
     */
    activeOption?: OptionValue;

    /**
     * @deprecated - no longer used internally and handled automatically be activedescendant utilities
     * @see ACTIVEDESCENDANT_FOCUSVISIBLE_ATTRIBUTE for writing styles involving focusVisible
     */
    focusVisible: boolean;

    /**
     * @deprecated - no longer used internally
     * Whether the next blur event should be ignored, and the combobox/dropdown will not close.
     */
    ignoreNextBlur: React.MutableRefObject<boolean>;

    /**
     * @deprecated - no longer used internally
     */
    setActiveOption: React.Dispatch<React.SetStateAction<OptionValue | undefined>>;

    /**
     * @deprecated - no longer used internally and handled automatically be activedescendant utilities
     * @see useSetKeyboardNavigation for imperatively setting focus visible state
     */
    setFocusVisible(focusVisible: boolean): void;

    /**
     * whether the combobox/dropdown currently has focus
     */
    hasFocus: boolean;

    setHasFocus(hasFocus: boolean): void;

    setOpen(event: ComboboxBaseOpenEvents, newState: boolean): void;

    setValue(newValue: string | undefined): void;

    onOptionClick: (e: React.MouseEvent<HTMLElement>) => void;
    disabled: boolean;
    freeform: boolean;

    onActiveDescendantChange: (event: ActiveDescendantChangeEvent) => void;
  };

/**
 * Data for the Combobox onOpenChange event.
 */
export type ComboboxBaseOpenChangeData = {
  open: boolean;
};

/** Possible event types for onOpen */
export type ComboboxBaseOpenEvents =
  | React.MouseEvent<HTMLElement>
  | React.KeyboardEvent<HTMLElement>
  | React.FocusEvent<HTMLElement>;

export type ComboboxBaseContextValues = {
  combobox: ComboboxContextValue;
  activeDescendant: ActiveDescendantContextValue;
  listbox: ListboxContextValue;
};

export type ActiveOptionChangeData = EventData<'change', ActiveDescendantChangeEvent> & {
  previousOption: OptionValue | null | undefined;
  nextOption: OptionValue | null | undefined;
};

export type HighlightedOptionProps = {
  onActiveOptionChange?: EventHandler<ActiveOptionChangeData>;
};
