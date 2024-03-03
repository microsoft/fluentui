import type * as React from 'react';
import type { ComponentProps, ComponentState } from '@fluentui/react-utilities';
import type { ComboboxProps, ComboboxState, ListboxContextValue } from '@fluentui/react-combobox';
import type { PositioningShorthand } from '@fluentui/react-positioning';
import type { TagPickerContextValue } from '../../contexts/TagPickerContext';
import type { ActiveDescendantContextValue } from '@fluentui/react-aria';

export type TagPickerSlots = {};

/**
 * Picker Props
 * TODO: pick only necessary props form combobox
 */
export type TagPickerProps = ComponentProps<TagPickerSlots> &
  Omit<ComboboxProps, 'size' | 'value'> &
  Pick<Partial<TagPickerContextValue>, 'size'> & {
    /**
     * Can contain two children including a trigger and a popover
     */
    children: [JSX.Element, JSX.Element] | JSX.Element;
  };

/**
 * State used in rendering Picker
 * TODO: only pick from ComboboxState
 */
export type TagPickerState = ComponentState<TagPickerSlots> &
  Omit<ComboboxState, 'listbox' | 'root' | 'input' | 'expandIcon' | 'clearIcon' | 'components' | 'size'> &
  Pick<TagPickerContextValue, 'triggerRef' | 'popoverId' | 'popoverRef' | 'targetRef' | 'size'> & {
    /**
     * Configures the positioned menu
     */
    positioning?: PositioningShorthand;

    trigger: React.ReactNode;

    popover: React.ReactNode;
  };

export type TagPickerContextValues = {
  picker: TagPickerContextValue;
  activeDescendant: ActiveDescendantContextValue;
  listbox: ListboxContextValue;
};
