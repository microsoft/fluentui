/* eslint-disable @typescript-eslint/no-explicit-any */
import { tokensToStyleObject } from './tokensToStyleObject';
import { Variants, Theme } from '@fluentui/theme';
import { IStyle } from '@fluentui/merge-styles';
import { makeClasses } from './makeClasses';
import { isIE11 } from '@fluentui/utilities';
import { StyleRenderer } from './styleRenderers/types';
import { useVariantClassesIE11Override } from './useVariantClassesIE11Override';
import { callOrReturn } from './callOrReturn';

// Track if we're using IE11 to use later in the hot codepath.
const useIE11 = isIE11();

const processVariants = (variants: Variants | undefined, theme: Theme, name?: string, prefix?: string) => {
  const result: Record<string, IStyle> = {};

  if (variants) {
    variants = callOrReturn(variants, theme);

    for (const variantName of Object.keys(variants!)) {
      const modifierName = variantName === 'root' ? variantName : '_' + variantName;

      const rule: any = (result[modifierName] = tokensToStyleObject(variants![variantName], prefix) as IStyle);

      // The display name should be tied to the unique theme object, causing the
      // renderer to treat scoped themes as sandboxed css scopes.
      if (name) {
        rule.displayName = `${name}${theme.id || ''}`;
        if (variantName !== 'root') {
          rule.displayName += `--${variantName}`;
        }
      }
    }
  }

  return result;
};

/**
 * Options for makeVariantClasses.
 */
export type MakeVariantClassesOptions<TVariants = Variants> = {
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
  variants?: TVariants | ((theme: Theme) => TVariants);
};

export type UseVariantClassesOverride = (
  state: any,
  theme?: Theme,
  renderer?: StyleRenderer,
  options?: MakeVariantClassesOptions,
  cache?: Map<any, any>,
) => void;

export const UseVariantClassesOverrideKey = 'useVariantClassesOverride';
/**
 * Hook factory for creating a `use*Variants` helper. Variants represent a configuration of
 * token values mapped to modifiers on the component. A variant can also be referenced using
 * a variant string. Variants can be overridden through the theme of the component.
 */
export const makeVariantClasses = <TState = {}, TVariants = Variants>(
  options: MakeVariantClassesOptions<TVariants>,
) => {
  const cache = new Map();
  const { styles, variants, name, prefix } = options;

  // This function will only be called when styles have not been evaluated for this set for
  // the particular theme/window/direction combo.
  const styleFunction: (theme: Theme) => IStyle = (theme: Theme) => {
    const themeVariants = name ? theme?.components?.[name]?.variants : undefined;

    return [
      callOrReturn(styles, theme),
      processVariants(variants, theme, name, prefix),
      processVariants(themeVariants, theme, name, prefix),
    ];
  };

  // This will create a default cached implementation of the hook.
  const defaultUseVariantClasses = makeClasses<TState>(styleFunction as any, cache);

  // This function is what will execute on every render. Within it, we will determine whether to call
  // the default implementation, or an override for the IE11 case.
  const useVariantClasses = (state: TState, theme?: Theme, renderer?: StyleRenderer) => {
    // If a global override is defined, use that. Otherwise use the default behavior.
    return useIE11
      ? // eslint-disable-next-line react-hooks/rules-of-hooks
        useVariantClassesIE11Override(state, theme, renderer, options, cache)
      : defaultUseVariantClasses(state, theme, renderer);
  };

  return useVariantClasses;
};
