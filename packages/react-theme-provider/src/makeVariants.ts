import { useTheme } from './useTheme';
import { tokensToStyleObject } from './tokensToStyleObject';
import { TokenSetType, Variants, Theme } from '@fluentui/theme';
import { mergeStyles, IStyle } from '@uifabric/merge-styles';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type GenericDictionary = Record<string, any>;

/**
 * Parses a given set of variants, and updates keys/objects with matches that should
 * be provided.
 */
const parseVariants = (
  variants: Variants | undefined,
  state: GenericDictionary,
  variantKeys: string[],
  variantObjects: TokenSetType[],
) => {
  if (variants) {
    for (const variantName of Object.keys(variants)) {
      if (variants[variantName] && (variantName === 'base' || state[variantName])) {
        variantKeys.push(variantName);
        variantObjects.push(variants[variantName]!);
      }
    }
  }
};

/**
 * Hook factory for creating a `use*Variants` helper. Variants represent a configuration of
 * token values mapped to modifiers on the component. A variant can also be referenced using
 * a variant string. Variants can be overridden through the theme of the component.
 */
export const makeVariants = <TTokenSetType extends TokenSetType>(
  componentName: string,
  prefix: string,
  variants: Variants | ((theme: Theme) => Variants),
) => {
  // Guarantee uniqueness of class name map.
  // const id = getId('variant_' + componentName);
  const variantToClassName: Record<string, string> = {}; // useThemeSettings(id);

  return (state: GenericDictionary) => {
    // Grab the theme.
    const theme = useTheme();
    const variantKeys: string[] = [];
    const variantObjects: TokenSetType[] = [];
    const themeVariants = theme?.variants?.[componentName];
    const defaultVariants = typeof variants === 'function' ? variants(theme) : variants;

    parseVariants(defaultVariants, state, variantKeys, variantObjects);
    parseVariants(themeVariants, state, variantKeys, variantObjects);

    const key = `${componentName}-${variantKeys.join('-')}`;
    let className = variantToClassName[key];

    if (!className) {
      const tokens = variantObjects.map(obj => {
        if (typeof obj === 'object') {
          const newObj = tokensToStyleObject(obj, prefix);
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (newObj as any).displayName = key;

          return newObj;
        }
        return obj;
      });

      // TODO: call theme.mergeStyles(tokens as IStyle);
      className = variantToClassName[key] = mergeStyles(tokens as IStyle[]);
    }

    state.className = `${state.className || ''} ${className}`;
  };
};
