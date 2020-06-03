import { ICheckboxState, ICheckboxSlots } from './Checkbox.types';
import { useGlobalClassNames } from '../../Styling/useGlobalClassNames';
import * as classes from './Checkbox.scss';
import { ClassFunction } from '@fluentui/react-compose';
import { css, memoizeFunction } from '../../Utilities';
import { GlobalClassNames as GlobalClassNamesType } from '../../Styling';

const GlobalClassNames: GlobalClassNamesType<Omit<ICheckboxSlots, 'input'>> = {
  root: 'ms-Checkbox',
  container: 'ms-Checkbox-label',
  checkbox: 'ms-Checkbox-checkbox',
  checkmark: 'ms-Checkbox-checkmark',
  text: 'ms-Checkbox-text',
};

const getStaticStylesMemoized = memoizeFunction(
  (
    // tslint:disable-next-line:no-any
    globalClassNames: any,
    className: string | undefined,
    disabled: boolean | undefined,
    reversed: boolean | undefined,
    checked: boolean | undefined,
    indeterminate: boolean | undefined,
    isUsingCustomLabelRender: boolean | undefined,
  ) => {
    const propControlledClasses = [
      disabled && classes.disabled,
      reversed && classes.reversed,
      checked && classes.checked,
      indeterminate && classes.indeterminate,
      isUsingCustomLabelRender && classes.isUsingCustomLabelRender,
    ];

    const rootStaticClasses = [
      reversed && 'reversed',
      checked && 'is-checked',
      !disabled && 'is-enabled',
      disabled && 'is-disabled',
    ];

    return {
      root: css(className, classes.root, globalClassNames.root, ...rootStaticClasses, ...propControlledClasses),
      container: css(classes.container, globalClassNames.container, ...propControlledClasses),
      checkbox: css(classes.checkbox, globalClassNames.checkbox, ...propControlledClasses),
      checkmark: css(classes.checkmark, globalClassNames.checkmark, ...propControlledClasses),
      text: css(classes.text, globalClassNames.text, ...propControlledClasses),
      input: css(classes.input, ...propControlledClasses),
    };
  },
);

export const useCheckboxClasses: ClassFunction = (state: ICheckboxState) => {
  const globalClassNames = useGlobalClassNames(GlobalClassNames);
  const { className, disabled, isUsingCustomLabelRender, reversed, checked, indeterminate } = state;

  return getStaticStylesMemoized(
    globalClassNames,
    className,
    disabled,
    reversed,
    checked,
    indeterminate,
    isUsingCustomLabelRender,
  );
};
