'use client';

import * as React from 'react';
import { useField as useFieldBase } from '@fluentui/react-headless-components-preview/field';
import { slot } from '@fluentui/react-utilities';
import { Label } from '../Label';
import { ErrorValidationIcon, SuccessValidationIcon, WarningValidationIcon } from './DefaultValidationIcons';
import type { FieldProps, FieldState } from './Field.types';

const validationMessageIcons = {
  error: React.createElement(ErrorValidationIcon),
  warning: React.createElement(WarningValidationIcon),
  success: React.createElement(SuccessValidationIcon),
  none: undefined,
} as const;

/**
 * Create the state required to render Field.
 */
export const useField = (props: FieldProps, ref: React.Ref<HTMLDivElement>): FieldState => {
  const { orientation = 'vertical', size = 'medium', ...rest } = props;
  const baseState = useFieldBase(rest, ref);
  const label = slot.optional(props.label, {
    defaultProps: { size, ...baseState.label },
    elementType: Label,
  });
  const defaultValidationIcon = validationMessageIcons[baseState.validationState];
  const validationMessageIcon = slot.optional(baseState.validationMessageIcon ?? props.validationMessageIcon, {
    renderByDefault: !!baseState.validationMessage && !!defaultValidationIcon,
    defaultProps: { children: defaultValidationIcon },
    elementType: 'span',
  });

  return {
    ...baseState,
    components: {
      // eslint-disable-next-line @typescript-eslint/no-deprecated
      ...baseState.components,
      label: Label,
    },
    label,
    orientation,
    root: {
      ...baseState.root,
      'data-has-label': label ? '' : undefined,
      'data-has-validation-icon': validationMessageIcon ? '' : undefined,
      'data-orientation': orientation,
      'data-size': size,
    },
    size,
    validationMessageIcon,
  };
};
