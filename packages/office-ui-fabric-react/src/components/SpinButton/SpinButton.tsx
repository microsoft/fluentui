import * as React from 'react';
import { ISpinButtonProps, ISpinButtonStyleProps, ISpinButtonStyles, ISpinButtonArrowStyleProps } from './SpinButton.types';
import {
  getStyles as getSpinButtonStyles,
  getUpArrowButtonStyles as getUpArrowSpinButtonStyles,
  getDownArrowButtonStyles as getDownArrowSpinButtonStyles
} from './SpinButton.styles';
import { IButtonStyles } from '../../Button';
import { SpinButtonBase } from './SpinButton.base';
import { concatStyleSets } from '@uifabric/merge-styles/lib/index';

const styledSpinButton = (
  getBaseStyles: (props: ISpinButtonStyleProps) => Partial<ISpinButtonStyles>,
  getBaseUpArrowButtonStyles: (props: ISpinButtonArrowStyleProps) => IButtonStyles,
  getBaseDownArrowButtonStyles: (props: ISpinButtonArrowStyleProps) => IButtonStyles,
): (props: ISpinButtonProps) => JSX.Element => {

  return (componentProps: ISpinButtonProps) => {
    const getStyles = (
      styleProps: ISpinButtonStyleProps
    ) => concatStyleSets(
      getBaseStyles && getBaseStyles(styleProps),
      componentProps && componentProps.getStyles && componentProps.getStyles(styleProps)
    );

    const getUpArrowButtonStyles = (
      styleProps: ISpinButtonArrowStyleProps
    ) => concatStyleSets(
      getBaseUpArrowButtonStyles && getBaseUpArrowButtonStyles(styleProps),
      componentProps && componentProps.getUpArrowButtonStyles && componentProps.getUpArrowButtonStyles(styleProps)
    );

    const getDownArrowButtonStyles = (
      styleProps: ISpinButtonArrowStyleProps
    ) => concatStyleSets(
      getBaseDownArrowButtonStyles && getBaseDownArrowButtonStyles(styleProps),
      componentProps && componentProps.getDownArrowButtonStyles && componentProps.getDownArrowButtonStyles(styleProps)
    );

    return (
      <SpinButtonBase
        { ...componentProps }
        getStyles={ getStyles }
        getUpArrowButtonStyles={ getUpArrowButtonStyles }
        getDownArrowButtonStyles={ getDownArrowButtonStyles }
      />
    );
  };
};

export const SpinButton = styledSpinButton(
  getSpinButtonStyles,
  getUpArrowSpinButtonStyles,
  getDownArrowSpinButtonStyles
);