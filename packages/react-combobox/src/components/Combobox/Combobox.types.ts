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

type ComboboxCommons = {
  /**
   * Controls the colors and borders of the combobox.
   * @default 'outline'
   */
  appearance?: 'outline' | 'underline' | 'filledDarker' | 'filledLighter';

  /**
   * Render the combobox dropdown inline in the DOM.
   * This has accessibility benefits, particularly for touch screen readers.
   */
  inline?: boolean;

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
   * The value displayed by the Combobox.
   * Use this with `onSelect` to directly control the displayed value string
   */
  value?: string;
};

/**
 * Combobox Props
 */
export type ComboboxProps = ComponentProps<Partial<ComboboxSlots>, 'trigger'> &
  ComboboxCommons &
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
     * Callback when the open/closed state of the dropdown changes
     */
    onOpenChange?: (e: ComboboxOpenEvents, data: ComboboxOpenChangeData) => void;

    /**
     * Configure the positioning of the combobox dropdown
     *
     * @defaultvalue below
     */
    positioning?: PositioningShorthand;
  };

/**
 * State used in rendering Combobox
 */
export type ComboboxState = ComponentState<ComboboxSlots> &
  Required<Pick<ComboboxCommons, 'open' | 'inline'>> &
  Pick<ComboboxCommons, 'placeholder' | 'value'> &
  OptionCollectionState &
  SelectionState & {
    /* Option data for the currently highlighted option (not the selected option) */
    activeOption?: OptionValue;

    /* Unique id string that can be used as a base for default option ids */
    idBase: string;

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
export type ComboboxOpenEvents = React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLElement>;
