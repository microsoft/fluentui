import { useTheme } from './useTheme';
import { tokensToStyleObject } from './tokensToStyleObject';
import { TokenSetType, Variants, Theme } from '@fluentui/theme';
import { IStyle } from '@uifabric/merge-styles';
import { useStyleRenderer } from './styleRenderers/useStyleRenderer';
import { useWindow } from '@fluentui/react-window-provider';
import { assign } from '@uifabric/utilities';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type GenericDictionary = Record<string, any>;

/**
 * Parses a given set of variants, and updates keys/objects with matches that should
 * be provided.
 */
const parseVariants = (
  componentName: string,
  variants: Variants | undefined,
  state: GenericDictionary,
  variantKeys: string[],
  variantObjects: TokenSetType[],
) => {
  if (variants) {
    for (const variantName of Object.keys(variants)) {
      const isBase = variantName === 'base';
      if (variants[variantName] && (isBase || state[variantName] || state.variant === variantName)) {
        variantKeys.push(isBase ? componentName : variantName);
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
  const variantToClassName: Record<string, string> = {}; // useThemeSettings(id);

  return (state: GenericDictionary) => {
    // Grab the theme.
    const renderer = useStyleRenderer();
    const theme = useTheme() || {};
    const win = useWindow();
    const variantKeys: string[] = [];
    const variantObjects: TokenSetType[] = [];
    const themeVariants = theme?.variants?.[componentName];
    const defaultVariants = typeof variants === 'function' ? variants(theme) : variants;

    parseVariants(componentName, defaultVariants, state, variantKeys, variantObjects);
    parseVariants(componentName, themeVariants, state, variantKeys, variantObjects);

    const key = variantKeys.join('-');
    let className = variantToClassName[key];

    if (!className) {
      const tokens: IStyle = {};

      for (const variantObj of variantObjects) {
        assign(tokens, tokensToStyleObject(variantObj, prefix));
      }

      tokens.displayName = key;

      className = variantToClassName[key] = renderer.renderStyles(
        { root: tokens },
        { targetWindow: win, rtl: theme.rtl },
      ).root;
    }

    state.className = `${state.className || ''} ${className}`;
  };
};
