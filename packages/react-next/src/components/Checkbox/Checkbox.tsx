import { CheckboxBase } from './Checkbox.base';
import { compose, ComposeOptions } from '@fluentui/react-compose';
import { useCheckboxClasses } from './useCheckboxClasses';

const composeOptions: ComposeOptions = {
  classes: useCheckboxClasses,
};

export const Checkbox = compose(CheckboxBase, composeOptions);
