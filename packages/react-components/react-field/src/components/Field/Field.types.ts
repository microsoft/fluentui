import { Label } from '@fluentui/react-label';
import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';
import * as React from 'react';

export type FieldSlots = {
  root: NonNullable<Slot<'div'>>;
  label?: Slot<typeof Label>;
  statusText?: Slot<'span'>;
  statusIcon?: Slot<'span'>;
  helperText?: Slot<'span'>;
};

/**
 * Field Props
 */
export type FieldProps = Omit<ComponentProps<Partial<FieldSlots>>, 'children'> & {
  children: React.ReactElement<{ id?: string }>;
  labelPosition?: 'above' | 'before';
  required?: boolean;
  size?: 'small' | 'medium' | 'large';
  status?: 'error' | 'warning' | 'success';
};

/**
 * State used in rendering Field
 */
export type FieldState = ComponentState<Required<FieldSlots>> &
  Pick<FieldProps, 'required' | 'status'> &
  Required<Pick<FieldProps, 'labelPosition' | 'size'>> & {
    childId: string | undefined;
    labelId: string | undefined;
  };

export type FieldContextValue = Readonly<Pick<FieldState, 'childId' | 'labelId' | 'required' | 'size' | 'status'>>;

export type FieldContextValues = {
  field: FieldContextValue;
};
