import * as React from 'react';
import { compose, ComposeOptions } from '@fluentui/react-compose';
import { CheckMarkIcon } from '@fluentui/react-icons';
import { CheckboxBase } from './Checkbox.base';
import { useCheckboxClasses } from './useCheckboxClasses';
import { ICheckboxProps } from './Checkbox.types';

const composeOptions: ComposeOptions = {
  displayName: 'Checkbox',
  classes: useCheckboxClasses,
  slots: {
    checkmark: CheckMarkIcon,
  },
};

export const Checkbox: React.FunctionComponent<ICheckboxProps> = compose<'div', ICheckboxProps, {}, ICheckboxProps, {}>(
  CheckboxBase,
  composeOptions,
);
