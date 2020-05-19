import * as React from 'react';
import { CustomizerContext, Customizations, IStyleFunctionOrObject, classNamesFunction } from '../../Utilities';
import { concatStyleSetsWithProps, IStyleSet } from '../../Styling';

const StylesCustomizationField = ['theme', 'styles'];

export interface IUseClassesOptions<TStylesProp, TStyleProps, TStyleSet> {
  customizationScopeName: string;
  useStaticStyles: boolean;
  styles: TStylesProp;
  styleProps: Omit<TStyleProps, 'theme'>;
  baseStyles: IStyleFunctionOrObject<TStyleProps, TStyleSet>;
}

type StyleFunction<TStyleProps, TStyleSet> = IStyleFunctionOrObject<TStyleProps, TStyleSet> & {
  /** True if no styles prop or styles from Customizer is passed to wrapped component. */
  __noStyleOverride__: boolean;
};

export function useClasses<TStylesProp, TStyleProps extends {}, TStyleSet extends IStyleSet<TStyleSet>>(
  options: IUseClassesOptions<TStylesProp, TStyleProps, TStyleSet>,
): { [key in keyof TStyleSet]: string } {
  const { customizationScopeName, useStaticStyles, baseStyles, styles, styleProps } = options;
  const customizerContext = React.useContext(CustomizerContext);

  const settings = Customizations.getSettings(
    StylesCustomizationField,
    customizationScopeName,
    customizerContext.customizations,
  );

  const { theme, styles: customizedStyles } = settings;

  const stylesFunction: IStyleFunctionOrObject<TStyleProps, TStyleSet> = React.useCallback(
    p => concatStyleSetsWithProps(p, baseStyles, customizedStyles, p.styles),
    [customizedStyles, styles],
  );

  (stylesFunction as StyleFunction<TStyleProps, TStyleSet>).__noStyleOverride__ = !customizedStyles && !styles;

  const getClassNames = React.useMemo(
    () =>
      classNamesFunction({
        useStaticStyles,
      }),
    [useStaticStyles],
  );

  const classNames = getClassNames(stylesFunction, { theme, ...styleProps }) as { [key in keyof TStyleSet]: string };

  return classNames;
}
