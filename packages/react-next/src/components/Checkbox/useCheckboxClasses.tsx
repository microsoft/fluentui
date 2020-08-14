import * as classes from './Checkbox.scss';
import { createClassResolver, ClassFunction } from '@fluentui/react-compose';
import { useGlobalClassNames } from '@fluentui/react-theme-provider/lib/useGlobalClassNames';
import { css } from '../../Utilities';
import { ICheckboxClasses } from './Checkbox.types';

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
  () => useGlobalClassNames(GlobalClassNames),
  state => {
    const { boxSide, checked, disabled } = state;
    return {
      root: css(boxSide === 'end' && 'reversed', checked && 'is-checked', disabled ? 'is-disabled' : 'is-enabled'),
    };
  },
];
