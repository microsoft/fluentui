import * as React from 'react';
import { concatStyleSets } from '@uifabric/merge-styles/lib/index';
import { ComboBoxBase } from './ComboBox.base';
import {
  getStyles as getComboBoxStyles,
  getCaretDownButtonStyles as getComboBoxCaretDownButtonStyles,
  getOptionStyles as getComboBoxOptionStyles
} from './ComboBox.styles';
import { IComboBoxProps, IComboBoxStyleProps, IComboBoxCaretStyleProps, IComboBoxOptionStyleProps, IComboBoxStyles } from './ComboBox.types';

const styledComboBox = (
  getBaseStyles: (props: IComboBoxStyleProps) => Partial<IComboBoxStyles>,
  getBaseCaretDownButtonStyles: (props: IComboBoxCaretStyleProps) => Partial<IComboBoxStyles>,
  getBaseOptionStyles: (props: IComboBoxOptionStyleProps) => Partial<IComboBoxStyles>,
): (props: IComboBoxProps) => JSX.Element => {

  return (componentProps: IComboBoxProps) => {
    const getStyles = (
      styleProps: IComboBoxStyleProps
    ) => concatStyleSets(
      getBaseStyles && getBaseStyles(styleProps),
      componentProps && componentProps.getStyles && componentProps.getStyles(styleProps)
    );

    const getCaretDownButtonStyles = (
      styleProps: IComboBoxCaretStyleProps
    ) => concatStyleSets(
      getBaseCaretDownButtonStyles && getBaseCaretDownButtonStyles(styleProps),
      componentProps && componentProps.getCaretDownButtonStyles && componentProps.getCaretDownButtonStyles(styleProps)
    );

    const getOptionStyles = (
      styleProps: IComboBoxOptionStyleProps
    ) => concatStyleSets(
      getBaseOptionStyles && getBaseOptionStyles(styleProps),
      componentProps && componentProps.getOptionStyles && componentProps.getOptionStyles(styleProps)
    );

    return (
      <ComboBoxBase
        { ...componentProps }
        getStyles={ getStyles }
        getCaretDownButtonStyles={ getCaretDownButtonStyles }
        getOptionStyles={ getOptionStyles }
      />
    );
  };
};

export const ComboBox = styledComboBox(
  getComboBoxStyles,
  getComboBoxCaretDownButtonStyles,
  getComboBoxOptionStyles
);