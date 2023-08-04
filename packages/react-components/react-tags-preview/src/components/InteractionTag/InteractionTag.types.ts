import * as React from 'react';
import { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';
import { InteractionTagContextValue } from '../../contexts/interactionTagContext';
import { TagAppearance, TagShape, TagSize } from '../../utils/types';

export type InteractionTagContextValues = {
  interactionTag: InteractionTagContextValue;
};

export type InteractionTagSlots = {
  root: NonNullable<Slot<'div'>>;
};

/**
 * InteractionTag Props
 */
export type InteractionTagProps<Value = string> = ComponentProps<Partial<InteractionTagSlots>> & {
  appearance?: TagAppearance;
  disabled?: boolean;
  shape?: TagShape;
  size?: TagSize;
  value?: Value;
};

/**
 * State used in rendering InteractionTag
 */
export type InteractionTagState<Value = string> = ComponentState<InteractionTagSlots> &
  Required<Pick<InteractionTagProps, 'appearance' | 'disabled' | 'shape' | 'size' | 'value'>> & {
    hasSecondary: boolean;
    handleTagDismiss: (e: React.MouseEvent | React.KeyboardEvent, value: Value) => void;
  };
