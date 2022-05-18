import * as React from 'react';
import type { PositioningShorthand } from '@fluentui/react-positioning';
import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';
import type { OptionValue, OptionCollectionState } from '../../utils/OptionCollection.types';
import { SelectionProps, SelectionState } from '../../utils/Selection.types';
import type { ComboboxContextValue } from '../../contexts/ComboboxContext';
import { Listbox } from '../Listbox/Listbox';
import { ComboButton } from '../ComboButton/ComboButton';

export type ComboboxSlots = {
  /* The root combobox slot */
  root: NonNullable<Slot<'div'>>;

  /* The dropdown listbox slot */
  listbox: NonNullable<Slot<typeof Listbox>>;

  /* The primary slot, the element with role="combobox" */
  trigger: NonNullable<Slot<typeof ComboButton>>;
};

/**
 * Combobox Props
 */
export type ComboboxProps = ComponentProps<Partial<ComboboxSlots>, 'trigger'> &
  SelectionProps & {
    /**
     * Controls the colors and borders of the combobox.
     * @default 'outline'
     */
    appearance?: 'filledDarker' | 'filledLighter' | 'outline' | 'underline';

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
     * Use this with `onSelect` to directly control the displayed value string
     */
    value?: string;
  };

/**
 * State used in rendering Combobox
 */
export type ComboboxState = ComponentState<ComboboxSlots> &
  Required<Pick<ComboboxProps, 'appearance' | 'inline' | 'open' | 'size'>> &
  Pick<ComboboxProps, 'placeholder' | 'value'> &
  OptionCollectionState &
  SelectionState & {
    /* Option data for the currently highlighted option (not the selected option) */
    activeOption?: OptionValue;

    /* Callback when an option is clicked, for internal use */
    onOptionClick(event: React.MouseEvent, option: OptionValue): void;
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
  | React.FocusEvent<HTMLElement>
  | React.KeyboardEvent<HTMLElement>
  | React.MouseEvent<HTMLElement>;
