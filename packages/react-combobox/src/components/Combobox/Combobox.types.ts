import * as React from 'react';
import type { PositioningShorthand } from '@fluentui/react-positioning';
import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';
import type { OptionValue, OptionCollectionState } from '../../utils/OptionCollection.types';
import { SelectionProps, SelectionState } from '../../utils/Selection.types';
import type { ComboboxContextValue } from '../../contexts/ComboboxContext';

export type ComboboxSlots = {
  /* The root combobox slot */
  root: NonNullable<Slot<'div'>>;
};

/**
 * Combobox Props
 */
export type ComboboxProps = ComponentProps<Partial<ComboboxSlots>> &
  SelectionProps & {
    /**
     * The default open state when open is uncontrolled
     */
    defaultOpen?: boolean;

    /**
     * The default value when the combobox's value is uncontrolled
     */
    defaultValue?: string;

    /**
     * Render the combobox dropdown inline in the DOM.
     * This has accessibility benefits, particularly for touch screen readers.
     */
    inline?: boolean;

    /**
     * Callback when the open/closed state of the dropdown changes
     */
    onOpenChange?: (e: ComboboxOpenEvents, data: ComboboxOpenChangeData) => void;

    /**
     * Sets the open/closed state of the dropdown.
     * Use together with onOpenChange to fully control the dropdown's visibility
     */
    open?: boolean;

    /**
     * Configure the positioning of the combobox dropdown
     *
     * @defaultvalue below
     */
    positioning?: PositioningShorthand;

    /**
     * The value displayed by the Combobox.
     * Use this with `onSelect` to directly control the displayed value string
     */
    value?: string;
  };

/**
 * State used in rendering Combobox
 */
export type ComboboxState = ComponentState<ComboboxSlots> &
  Required<Pick<ComboboxProps, 'open' | 'inline'>> &
  Pick<ComboboxProps, 'value'> &
  OptionCollectionState &
  SelectionState & {
    /* Option data for the currently highlighted option (not the selected option) */
    activeOption?: OptionValue;

    /* Unique id string that can be used as a base for default option ids */
    idBase: string;

    /* The listbox child node */
    listbox: React.ReactNode;

    /* Ref to be used by the popup listbox */
    popperContainerRef: React.MutableRefObject<HTMLDivElement>;

    /* Ref to be used by the trigger */
    triggerRef: React.RefObject<HTMLButtonElement>;

    /* Callback when a the listbox is clicked, for internal use */
    onListboxClick(): void;

    /* Callback for the listbox mousedown event, for internal use */
    onListboxMouseDown(): void;

    /* Callback when an option is clicked, for internal use */
    onOptionClick(event: React.MouseEvent, option: OptionValue): void;

    /* Callback when the trigger is blurred, for internal use */
    onTriggerBlur(event: React.FocusEvent<HTMLButtonElement>): void;

    /* Callback when the trigger is clicked, for internal use */
    onTriggerClick(event: React.MouseEvent<HTMLButtonElement>): void;

    /* Callback for the trigger keydown event, for internal use */
    onTriggerKeyDown(event: React.KeyboardEvent<HTMLButtonElement>): void;
  };

export type ComboboxContextValues = {
  combobox: ComboboxContextValue;
};

/**
 * Data for the Combobox onOpenChange event.
 */
export type ComboboxOpenChangeData = {
  open: boolean;
};

/* Possible event types for onOpen */
export type ComboboxOpenEvents =
  | React.MouseEvent<HTMLElement>
  | React.KeyboardEvent<HTMLElement>
  | React.FocusEvent<HTMLElement>;
