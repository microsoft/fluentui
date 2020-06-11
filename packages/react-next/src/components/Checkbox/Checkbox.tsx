import { CheckboxBase } from './Checkbox.base';
import { compose, ComposeOptions } from '@fluentui/react-compose';
import { useCheckboxClasses } from './useCheckboxClasses';
import { ICheckboxProps } from './Checkbox.types';

const composeOptions: ComposeOptions = {
  classes: useCheckboxClasses,
  displayName: 'Checkbox',
};

export const Checkbox = compose<'div', ICheckboxProps, {}, ICheckboxProps, {}>(CheckboxBase, composeOptions);
