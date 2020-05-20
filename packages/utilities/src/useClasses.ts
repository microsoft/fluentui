import * as React from 'react';
import { IStyleSet, IStyleFunctionOrObject, concatStyleSetsWithProps } from '@uifabric/merge-styles';
import { CustomizerContext } from './customizations/CustomizerContext';
import { useCustomizationSettings } from './customizations/useCustomizationSettings';
import { classNamesFunction } from './classNamesFunction';
import { StyleFunction } from './styled';

const StylesCustomizationField = ['theme', 'styles'];

const getClassNames = classNamesFunction();
const getClassNamesWithStaticStyles = classNamesFunction({
  useStaticStyles: true,
});

export interface IUseClassesOptions<TStylesProp, TStyleProps, TStyleSet> {
  customizationScopeName: string;
  useStaticStyles: boolean;
  stylesProp: TStylesProp;
  styleProps: Omit<TStyleProps, 'theme'>;
  baseStyles: IStyleFunctionOrObject<TStyleProps, TStyleSet>;
}

export function useClasses<TStylesProp, TStyleProps extends {}, TStyleSet extends IStyleSet<TStyleSet>>(
  options: IUseClassesOptions<TStylesProp, TStyleProps, TStyleSet>,
): { [key in keyof TStyleSet]: string } {
  const { customizationScopeName, useStaticStyles, baseStyles, stylesProp, styleProps } = options;
  const customizerContext = React.useContext(CustomizerContext);

  const settings = useCustomizationSettings(
    StylesCustomizationField,
    customizationScopeName,
    customizerContext.customizations,
  );

  const { theme, styles: customizedStyles } = settings;

  const stylesFunction: IStyleFunctionOrObject<TStyleProps, TStyleSet> = React.useCallback(
    props => concatStyleSetsWithProps(props, baseStyles, customizedStyles, stylesProp),
    [baseStyles, customizedStyles, stylesProp],
  );

  (stylesFunction as StyleFunction<TStyleProps, TStyleSet>).__noStyleOverride__ = !customizedStyles && !stylesProp;
  (stylesFunction as StyleFunction<TStyleProps, TStyleSet>).__cachedInputs__ = [
    baseStyles,
    customizedStyles,
    stylesProp,
  ];

  const getClasses = useStaticStyles ? getClassNamesWithStaticStyles : getClassNames;

  const classNames = getClasses(stylesFunction, { theme, ...styleProps }) as { [key in keyof TStyleSet]: string };

  return classNames;
}
