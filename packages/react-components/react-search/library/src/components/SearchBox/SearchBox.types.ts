import * as React from 'react';
import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';
import type { InputOnChangeData, InputProps, InputSlots, InputState } from '@fluentui/react-input';

export type SearchBoxSlots = InputSlots & {
  /** Last element in the input, within the input border */
  dismiss?: Slot<'span'>;
};

/**
 * SearchBox Props
 */
export type SearchBoxProps = Omit<
  ComponentProps<Partial<SearchBoxSlots>, 'input'>,
  // `children` is unsupported. The rest of these native props have customized definitions.
  'children' | 'defaultValue' | 'onChange' | 'size' | 'type' | 'value'
> &
  Omit<InputProps, 'onChange'> & {
    /**
     * Custom onChange callback.
     * Will be traditionally supplied with a React.ChangeEvent<HTMLInputElement> for usual character entry.
     * When the dismiss button is clicked, this will be called with an event of type React.MouseEvent<HTMLSpanElement>
     * and an empty string as the `value` property of the data parameter
     */
    // eslint-disable-next-line @nx/workspace-consistent-callback-type -- can't change type of existing callback
    onChange?: (event: SearchBoxChangeEvent, data: InputOnChangeData) => void;
  };

/**
 * State used in rendering SearchBox
 */
export type SearchBoxState = ComponentState<SearchBoxSlots> &
  InputState &
  Required<Pick<InputState, 'size'>> &
  Required<Pick<SearchBoxProps, 'disabled'>> & {
    focused: boolean;
  };

/** Overloaded onChange event type, used to merge functionality of regular text entry and the dismiss button */
export type SearchBoxChangeEvent = React.ChangeEvent<HTMLInputElement> | React.MouseEvent<HTMLSpanElement>;
