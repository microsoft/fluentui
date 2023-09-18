import * as React from 'react';
import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';
import type { InputProps, InputSlots, InputState } from '@fluentui/react-input';

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
  InputProps & {
    /**
     * Callback for when the clear/dismiss button is clicked. *Should* be handled when `value` is controlled by the
     * consumer so that the consumer may reset `value` respectively.
     * */
    onDismiss?: (event: React.MouseEvent<HTMLSpanElement>, data: SearchBoxDismissData) => void;
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

type SearchBoxDismissData = {};
