/* eslint-disable @typescript-eslint/no-explicit-any */
import { tokensToStyleObject } from './tokensToStyleObject';
import { Variants, Theme } from '@fluentui/theme';
import { IStyle } from '@uifabric/merge-styles';
import { makeClasses } from './makeClasses';

/**
 * Calls a function with the argument, or returns the given object.
 * @param objOrFunc - Function or object.
 * @param argument - Argument to pass if a function is provided.
 */
const callOrReturn = (objOrFunc: any, argument: any) =>
  typeof objOrFunc === 'function' ? objOrFunc(argument) : objOrFunc;

const processVariants = (options: MakeVariantClassesOptions | undefined, theme: Theme) => {
  const results: Record<string, IStyle>[] = [];
  const { name, prefix } = options || {};
  const variantSet = [options?.variants, theme?.components?.[name!]?.variants];

  for (let variants of variantSet) {
    if (variants) {
      variants = callOrReturn(variants, theme);
      const result = {};

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

      results.push(result);
    }
  }

  return results;
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
   * Extend from another variant class hook.
   */
  extends?: VariantClassHook;

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

export type VariantClassHook = ReturnType<typeof makeClasses> & { _options: MakeVariantClassesOptions };

/**
 * Hook factory for creating a class hooks that support variants. Variants represent a configuration of
 * token values mapped to modifiers on the component. A variant can also be referenced using
 * a variant string prop. Variants can be overridden through the theme of the component.
 */
export const makeVariantClasses = <TState = {}>(options: MakeVariantClassesOptions): VariantClassHook => {
  const { styles } = options;
  const parentOptions = (options.extends || {})._options;

  // This function will only be called when styles have not been evaluated for this set for
  // the particular theme/window/direction combo.
  const styleFunction: (theme: Theme) => IStyle = (theme: Theme) => {
    return [
      callOrReturn(parentOptions?.styles, theme),
      callOrReturn(styles, theme),
      ...processVariants(parentOptions, theme),
      ...processVariants(
        {
          ...options,
          prefix: options.prefix || parentOptions?.prefix,
          name: options.name || parentOptions?.name,
        },
        theme,
      ),
    ];
  };

  const useClasses = makeClasses<TState>(styleFunction as any) as VariantClassHook;

  useClasses._options = options;

  return useClasses;
};
