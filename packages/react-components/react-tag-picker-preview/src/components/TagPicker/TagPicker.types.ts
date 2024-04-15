import type * as React from 'react';
import type { ComponentProps, ComponentState, EventData, EventHandler } from '@fluentui/react-utilities';
import type { ComboboxProps, ComboboxState, ListboxContextValue } from '@fluentui/react-combobox';
import type { TagPickerContextValue } from '../../contexts/TagPickerContext';
import type { ActiveDescendantContextValue } from '@fluentui/react-aria';

export type TagPickerSlots = {};

export type TagPickerSize = 'medium' | 'large' | 'extra-large';

/*
 * Data for the onOptionSelect callback.
 * `optionValue` and `optionText` will be undefined if multiple options are modified at once.
 */
export type TagPickerOnOptionSelectData = {
  optionValue: string | undefined;
  optionText: string | undefined;
  selectedOptions: string[];
} & (
  | EventData<'click', React.MouseEvent<HTMLDivElement>>
  | EventData<'change', React.ChangeEvent<HTMLDivElement>>
  | EventData<'keydown', React.KeyboardEvent<HTMLDivElement>>
);

export type TagPickerOnOpenChangeData = { open: boolean } & (
  | EventData<'click', React.MouseEvent<HTMLDivElement>>
  | EventData<'change', React.ChangeEvent<HTMLDivElement>>
  | EventData<'keydown', React.KeyboardEvent<HTMLDivElement>>
);

/**
 * Picker Props
 */
export type TagPickerProps = ComponentProps<TagPickerSlots> &
  Pick<
    ComboboxProps,
    'positioning' | 'disabled' | 'defaultOpen' | 'selectedOptions' | 'defaultSelectedOptions' | 'open' | 'freeform'
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
    | 'multiselect'
    | 'value'
    | 'setValue'
    | 'setOpen'
    | 'setHasFocus'
    | 'appearance'
    | 'clearSelection'
    | 'getOptionById'
    | 'freeform'
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
