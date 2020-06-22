import { CheckboxBase } from './Checkbox.base';
import { compose, ComposeOptions } from '@fluentui/react-compose';
import { useCheckboxClasses } from './useCheckboxClasses';
import { ICheckboxProps } from './Checkbox.types';
import { Icon } from '../../Icon';

const composeOptions: ComposeOptions = {
  displayName: 'Checkbox',
  classes: useCheckboxClasses,
  slots: {
    checkmark: Icon,
  },
  state: (parentState: ICheckboxProps) => {
    return {
      ...parentState,
      checkmark: {
        iconName: 'CheckMark',
        ...parentState.checkmarkIconProps,
      },
    };
  },
};

export const Checkbox = compose<'div', ICheckboxProps, {}, ICheckboxProps, {}>(CheckboxBase, composeOptions);
