import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';
import type { GenericListbox } from '../GenericListbox/GenericListbox';
import { ComboboxBaseProps } from '../../utils/ComboboxBase.types';
import * as React from 'react';
import { ActiveDescendantImperativeRef } from '@fluentui/react-aria';
import { PromptInputProps as FAIPromptInputProps } from '@fluentui-copilot/react-prompt-input';
import { GenericComboboxState } from '../../utils/useGenericComboboxBaseState';

export type PromptInputSlots = {
  root: NonNullable<Slot<FAIPromptInputProps>>;
  listbox?: Slot<typeof GenericListbox>;
};

/**
 * PromptInput Props
 */
export type PromptInputProps = ComponentProps<Partial<PromptInputSlots>> &
  Omit<ComboboxBaseProps, 'size'> & {
    children?: React.ReactNode;
  };

/**
 * State used in rendering PromptInput
 */
export type PromptInputState = ComponentState<PromptInputSlots> &
  GenericComboboxState & {
    activeDescendantController: ActiveDescendantImperativeRef;
  };
