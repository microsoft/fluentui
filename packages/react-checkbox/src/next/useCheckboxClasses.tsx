import { createClassResolver, ClassFunction } from '@fluentui/react-compose';
import { css } from '@uifabric/utilities';
import { ICheckboxClasses } from './Checkbox.types';
import * as classes from './Checkbox.scss';

const GlobalClassNames: Omit<ICheckboxClasses, 'input'> = {
  root: 'ms-Checkbox',
  container: 'ms-Checkbox-label',
  checkbox: 'ms-Checkbox-checkbox',
  checkmark: 'ms-Checkbox-checkmark',
  label: 'ms-Checkbox-text',
};

const defaultClassResolver = createClassResolver(classes);

export const useCheckboxClasses: ClassFunction[] = [
  defaultClassResolver,
  () => GlobalClassNames,
  state => {
    const { boxSide, checked, disabled } = state;
    return {
      root: css(boxSide === 'end' && 'reversed', checked && 'is-checked', disabled ? 'is-disabled' : 'is-enabled'),
    };
  },
];
