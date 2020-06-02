import { ICheckboxState, ICheckboxSlots } from './Checkbox.types';
import { useGlobalClassNames } from '../../Styling/useGlobalClassNames';
import * as classes from './Checkbox.scss';
import { createClassResolver, ClassFunction } from '@fluentui/react-compose';
import { css } from '../../Utilities';
import { GlobalClassNames as GlobalClassNamesType } from '../../Styling';

const GlobalClassNames: GlobalClassNamesType<Omit<ICheckboxSlots, 'input'>> = {
  root: 'ms-Checkbox',
  container: 'ms-Checkbox-label',
  checkbox: 'ms-Checkbox-checkbox',
  checkmark: 'ms-Checkbox-checkmark',
  text: 'ms-Checkbox-text',
};

export const useCheckboxClasses: ClassFunction = (state: ICheckboxState, slots: ICheckboxSlots) => {
  const globalClassNames = useGlobalClassNames(GlobalClassNames);
  const { reversed, checked, disabled } = state;
  const additionalClassNames = {
    root: css(reversed && 'reversed', checked && 'is-checked', disabled ? 'is-disabled' : 'is-enabled'),
  };

  return createClassResolver(classes, globalClassNames, additionalClassNames)(state, slots);
};
