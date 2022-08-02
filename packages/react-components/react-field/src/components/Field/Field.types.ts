import { Label } from '@fluentui/react-label';
import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';
import * as React from 'react';

export type FieldSlots = {
  root: NonNullable<Slot<'div'>>;
  // wrapper: NonNullable<Slot<'div'>>;
  label?: Slot<typeof Label>;
  statusText?: Slot<'span'>;
  statusIcon?: Slot<'span'>;
  helperText?: Slot<'span'>;
};

/**
 * Field Props
 */
export type FieldProps = Omit<ComponentProps<Partial<FieldSlots>>, 'children'> & {
  children: React.ReactElement<{ id?: string; required?: boolean }>;
  labelFor?: string;
  labelId?: string;
  labelPosition?: 'above' | 'before';
  required?: boolean;
  size?: 'small' | 'medium' | 'large';
  status?: 'error' | 'warning' | 'success';
};

/**
 * State used in rendering Field
 */
export type FieldState = ComponentState<Required<FieldSlots>> &
  Pick<FieldProps, 'labelFor' | 'labelId' | 'required' | 'status'> &
  Required<Pick<FieldProps, 'labelPosition' | 'size'>>;

export type FieldContextValue = Readonly<Pick<FieldState, 'labelFor' | 'labelId' | 'required' | 'size' | 'status'>>;

export type FieldContextValues = {
  field: FieldContextValue;
};
