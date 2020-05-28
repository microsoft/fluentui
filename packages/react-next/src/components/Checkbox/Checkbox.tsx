import * as React from 'react';
import { css, memoizeFunction, styled } from '../../Utilities';
import { CheckboxBase } from './Checkbox.base';
import { ICheckboxProps, ICheckboxStyleProps, ICheckboxStyles } from './Checkbox.types';
import * as classes from './Checkbox.scss';
import { getGlobalClassNames, ITheme } from '../../Styling';

const GlobalClassNames = {
  root: 'ms-Checkbox',
  label: 'ms-Checkbox-label',
  checkbox: 'ms-Checkbox-checkbox',
  checkmark: 'ms-Checkbox-checkmark',
  text: 'ms-Checkbox-text',
};

const getStaticStylesMemoized = memoizeFunction(
  (
    theme: ITheme,
    className: string | undefined,
    disabled: boolean | undefined,
    reversed: boolean | undefined,
    checked: boolean | undefined,
    indeterminate: boolean | undefined,
    isUsingCustomLabelRender: boolean | undefined,
  ) => {
    const globalClassNames = getGlobalClassNames(GlobalClassNames, theme);

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
      label: css(classes.label, globalClassNames.label, ...propControlledClasses),
      checkbox: css(classes.checkbox, globalClassNames.checkbox, ...propControlledClasses),
      checkmark: css(classes.checkmark, globalClassNames.checkmark, ...propControlledClasses),
      text: css(classes.text, globalClassNames.text, ...propControlledClasses),
      input: css(classes.input, ...propControlledClasses),
    };
  },
);

const getStaticStyles = (props: ICheckboxStyleProps): Required<ICheckboxStyles> => {
  const { className, disabled, isUsingCustomLabelRender, reversed, checked, indeterminate, theme } = props;

  return getStaticStylesMemoized(
    theme!,
    className,
    disabled,
    reversed,
    checked,
    indeterminate,
    isUsingCustomLabelRender,
  );
};

export const Checkbox: React.FunctionComponent<ICheckboxProps> = styled<
  ICheckboxProps,
  ICheckboxStyleProps,
  ICheckboxStyles
>(CheckboxBase, getStaticStyles, undefined, { scope: 'Checkbox' });
