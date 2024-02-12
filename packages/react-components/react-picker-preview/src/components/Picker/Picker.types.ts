import type { ComponentProps, ComponentState } from '@fluentui/react-utilities';
import type { ComboboxProps, ComboboxState, ListboxContextValue } from '@fluentui/react-combobox';
import type { PositioningShorthand } from '@fluentui/react-positioning';
import * as React from 'react';
import type { PickerContextValue } from '../../contexts/PickerContext';
import type { ActiveDescendantContextValue } from '@fluentui/react-aria';

export type PickerSlots = {};

/**
 * Picker Props
 * TODO: pick only necessary props form combobox
 */
export type PickerProps = ComponentProps<PickerSlots> &
  ComboboxProps & {
    /**
     * Can contain two children including a trigger and a popover
     */
    children: [JSX.Element, JSX.Element] | JSX.Element;
  };

/**
 * State used in rendering Picker
 * TODO: only pick from ComboboxState
 */
export type PickerState = ComponentState<PickerSlots> &
  Omit<ComboboxState, 'listbox' | 'root' | 'input' | 'expandIcon' | 'clearIcon' | 'components'> &
  Pick<PickerContextValue, 'triggerRef' | 'popoverId' | 'popoverRef' | 'targetRef'> & {
    /**
     * Configures the positioned menu
     */
    positioning?: PositioningShorthand;

    trigger: React.ReactNode;

    popover: React.ReactNode;
  };

export type PickerContextValues = {
  picker: PickerContextValue;
  activeDescendant: ActiveDescendantContextValue;
  listbox: ListboxContextValue;
};
