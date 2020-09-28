/* eslint-disable @typescript-eslint/no-explicit-any */
// import { useTheme } from './useTheme';
import { tokensToStyleObject } from './tokensToStyleObject';
import { Variants, Theme } from '@fluentui/theme';
import { IStyle } from '@uifabric/merge-styles';
// import { useStyleRenderer } from './styleRenderers/useStyleRenderer';
// import { useWindow } from '@fluentui/react-window-provider';
// import { assign } from '@uifabric/utilities';
import { makeClasses } from './makeClasses';

/**
 * Calls a function with the argument, or returns the given object.
 * @param objOrFunc - Function or object.
 * @param argument - Argument to pass if a function is provided.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const callOrReturn = (objOrFunc: any, argument: any) =>
  typeof objOrFunc === 'function' ? objOrFunc(argument) : objOrFunc;

const processVariants = (variants: Variants, theme: Theme, prefix: string) => {
  const result: Record<string, IStyle> = {};

  if (variants) {
    variants = callOrReturn(variants, theme);

    for (const variantName of Object.keys(variants)) {
      const modifierName = variantName === 'root' ? variantName : '_' + variantName;

      result[modifierName] = tokensToStyleObject(variants[variantName], prefix) as IStyle;
    }
  }

  return result;
};

/**
 * Options for makeVariantClasses.
 */
export type MakeVariantClassesOptions = {
  /**
   * Name of the component to use for fetching variants from the theme.
   */
  name?: string;

  /**
   * Prefix for css variables within the variants.
   */
  prefix?: string;

  /**
   * Styles for the component.
   */
  styles?: Record<string, IStyle> | ((theme: Theme) => Record<string, IStyle>);

  /**
   * Variants for the styles. A variant defines token values when a particular prop is present, or the
   * variant prop matches.
   */
  variants?: Variants | ((theme: Theme) => Variants);
};

/**
 * Hook factory for creating a `use*Variants` helper. Variants represent a configuration of
 * token values mapped to modifiers on the component. A variant can also be referenced using
 * a variant string. Variants can be overridden through the theme of the component.
 */
export const makeVariantClasses = <TState = {}>(options: MakeVariantClassesOptions) => {
  const { styles, variants, name, prefix } = options;

  // This function will only be called when styles have not been evaluated for this set for
  // the particular theme/window/direction combo.
  const styleFunction: (theme: Theme) => IStyle = (theme: Theme) => {
    const themeVariants = name ? theme?.variants?.[name] : undefined;

    return [
      callOrReturn(styles, theme),
      processVariants(variants!, theme, prefix!),
      processVariants(themeVariants, theme, prefix!),
    ];
  };

  return makeClasses<TState>(styleFunction as any);
};
