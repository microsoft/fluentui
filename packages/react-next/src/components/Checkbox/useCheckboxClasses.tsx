import * as classes from './Checkbox.scss';
import { createClassResolver } from '@fluentui/react-compose';
import { useGlobalClassNames } from '../../Styling/useGlobalClassNames';
import { css } from '../../Utilities';
import { ICheckboxState, ICheckboxClasses } from './Checkbox.types';

const GlobalClassNames: Omit<ICheckboxClasses, 'input'> = {
  root: 'ms-Checkbox',
  container: 'ms-Checkbox-label',
  checkbox: 'ms-Checkbox-checkbox',
  checkmark: 'ms-Checkbox-checkmark',
  text: 'ms-Checkbox-text',
};

const resolveClasses = createClassResolver(classes);

export const useCheckboxClasses = (state: ICheckboxState) => {
  const { reversed, checked, disabled } = state;

  const globalClassNames = useGlobalClassNames(GlobalClassNames);
  const resolvedClasses = resolveClasses(state, globalClassNames);
  resolvedClasses.root += ` ${css(
    reversed && 'reversed',
    checked && 'is-checked',
    disabled ? 'is-disabled' : 'is-enabled',
  )}`;

  return resolvedClasses;
};
