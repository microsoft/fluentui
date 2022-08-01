import * as React from 'react';
import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';
import { Label } from '@fluentui/react-label';

export type FieldSlots = {
  root: NonNullable<Slot<'div'>>;
  label?: Slot<typeof Label>;
  statusText?: Slot<'span'>;
  statusIcon?: Slot<'span'>;
  helperText?: Slot<'span'>;
};

export type FieldChildProps = Pick<React.InputHTMLAttributes<HTMLInputElement>, 'id' | 'required' | 'aria-labelledby'>;

/**
 * Field Props
 */
export type FieldProps = Omit<ComponentProps<FieldSlots>, 'children'> & {
  children: React.ReactElement<FieldChildProps>;
  size?: 'small' | 'medium' | 'large';
  labelPosition?: 'above' | 'before';
  status?: 'error' | 'warning' | 'success';
  inputId?: string;
  required?: boolean;
};

/**
 * State used in rendering Field
 */
export type FieldState = ComponentState<FieldSlots> & {
  size: NonNullable<FieldProps['size']>;
  labelPosition: NonNullable<FieldProps['labelPosition']>;
  status: FieldProps['status'];
  required: FieldProps['required'];
  inputId: NonNullable<FieldProps['inputId']>;
  labelId: string | undefined;
};

export type FieldContextValue = Readonly<Pick<FieldState, 'status' | 'labelId' | 'inputId' | 'required' | 'size'>>;

export type FieldContextValues = {
  field: FieldContextValue;
};
