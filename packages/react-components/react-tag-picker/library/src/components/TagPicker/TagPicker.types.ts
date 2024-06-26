import type * as React from 'react';
import type { ComponentProps, ComponentState, EventData, EventHandler } from '@fluentui/react-utilities';
import type { ComboboxProps, ComboboxState, ListboxContextValue } from '@fluentui/react-combobox';
import type { TagPickerContextValue } from '../../contexts/TagPickerContext';
import type { ActiveDescendantContextValue } from '@fluentui/react-aria';

export type TagPickerSlots = {};

export type TagPickerSize = 'medium' | 'large' | 'extra-large';

/**
 * Event data for the `onOptionSelect` event.
 *
 * * value - The value of the selected option that triggered the event
 * * selectedOptions - The list of selected options
 */
export type TagPickerOnOptionSelectData = {
  value: string;
  selectedOptions: string[];
} & (EventData<'click', React.MouseEvent<HTMLDivElement>> | EventData<'keydown', React.KeyboardEvent<HTMLDivElement>>);

export type TagPickerOnOpenChangeData = { open: boolean } & (
  | EventData<'click', React.MouseEvent<HTMLDivElement>>
  | EventData<'keydown', React.KeyboardEvent<HTMLDivElement>>
);

/**
 * Picker Props
 */
export type TagPickerProps = ComponentProps<TagPickerSlots> &
  Pick<
    ComboboxProps,
    'positioning' | 'disabled' | 'defaultOpen' | 'selectedOptions' | 'defaultSelectedOptions' | 'open'
  > &
  Pick<Partial<TagPickerContextValue>, 'size' | 'appearance'> & {
    onOpenChange?: EventHandler<TagPickerOnOpenChangeData>;
    onOptionSelect?: EventHandler<TagPickerOnOptionSelectData>;

    /**
     * Can contain two children including a trigger and a popover
     */
    children: [JSX.Element, JSX.Element] | JSX.Element;
    /**
     * TagPickers are rendered out of DOM order on `document.body` by default,
     * use this to render the popover in DOM order
     *
     * @default false
     */
    inline?: boolean;
  };

/**
 * State used in rendering Picker
 */
export type TagPickerState = ComponentState<TagPickerSlots> &
  Pick<
    ComboboxState,
    | 'open'
    | 'activeDescendantController'
    | 'mountNode'
    | 'onOptionClick'
    | 'registerOption'
    | 'selectedOptions'
    | 'selectOption'
    | 'value'
    | 'setValue'
    | 'setOpen'
    | 'setHasFocus'
    | 'appearance'
    | 'clearSelection'
    | 'getOptionById'
    | 'getOptionsMatchingValue'
    | 'disabled'
  > &
  Pick<
    TagPickerContextValue,
    'triggerRef' | 'secondaryActionRef' | 'popoverId' | 'popoverRef' | 'targetRef' | 'tagPickerGroupRef' | 'size'
  > & {
    trigger: React.ReactNode;
    popover?: React.ReactNode;
    inline: boolean;
  };

export type TagPickerContextValues = {
  picker: TagPickerContextValue;
  activeDescendant: ActiveDescendantContextValue;
  listbox: ListboxContextValue;
};
