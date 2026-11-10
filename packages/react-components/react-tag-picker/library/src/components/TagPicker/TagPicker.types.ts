import type * as React from 'react';
import type {
  ComponentProps,
  ComponentState,
  DistributiveOmit,
  EventData,
  EventHandler,
  JSXElement,
} from '@fluentui/react-utilities';
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
    | 'positioning'
    | 'disabled'
    | 'defaultOpen'
    | 'selectedOptions'
    | 'defaultSelectedOptions'
    | 'open'
    | 'disableAutoFocus'
  > &
  Pick<Partial<TagPickerContextValue>, 'size' | 'appearance'> & {
    /**
     * By default, when a single children is provided, the TagPicker will assume that the children
     * is a popover. By setting this prop to true, the children will be treated as a trigger instead.
     *
     * @default false
     */
    noPopover?: boolean;
    onOpenChange?: EventHandler<TagPickerOnOpenChangeData>;
    onOptionSelect?: EventHandler<TagPickerOnOptionSelectData>;

    /**
     * Can contain two children including a trigger and a popover
     */
    children: [JSXElement, JSXElement | undefined | false] | JSXElement;
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
    | 'triggerRef'
    | 'secondaryActionRef'
    | 'popoverId'
    | 'popoverRef'
    | 'targetRef'
    | 'tagPickerGroupRef'
    | 'size'
    | 'noPopover'
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

/**
 * TagPicker Base Props - omits the presentation-related props that the base hook does not handle:
 * the floating-ui `positioning` prop (the styled {@link TagPickerProps} re-introduces it via
 * `usePositioning`) as well as `size`, `appearance` and `inline` (layered on by the styled
 * {@link useTagPicker_unstable} hook).
 */
export type TagPickerBaseProps = DistributiveOmit<TagPickerProps, 'positioning' | 'size' | 'appearance' | 'inline'>;

/**
 * TagPicker Base State - the state produced by the base hook, which does not interact with the
 * `size`, `appearance` and `inline` props. These are layered on by the styled
 * {@link useTagPicker_unstable} hook.
 */
export type TagPickerBaseState = Omit<TagPickerState, 'size' | 'appearance' | 'inline'>;
