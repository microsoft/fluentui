/* eslint-disable @typescript-eslint/no-explicit-any */
import { tokensToStyleObject } from './tokensToStyleObject';
import { Variants, Theme } from '@fluentui/theme';
import { IStyle } from '@uifabric/merge-styles';
import { StyleRenderer, useTheme, useStyleRenderer } from './index';
import { useWindow } from '@fluentui/react-window-provider';
import { replaceCSSVariables } from './replaceCSSVariables';

// type VariantClassesHook = <TState>(state: TState) =>

/**
 * Calls a function with the argument, or returns the given object.
 * @param objOrFunc - Function or object.
 * @param argument - Argument to pass if a function is provided.
 */
const callOrReturn = (objOrFunc: any, argument: any) =>
  typeof objOrFunc === 'function' ? objOrFunc(argument) : objOrFunc;

/**
 * Options for makeVariantClasses.
 */
export type MakeVariantClassesOptions = {
  /**
   * Name of the component to use for fetching variants from the theme.
   */
  name?: string;

  /** */
  extends?: Make;

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
  const { styles: styleOrFunction, variants, name, prefix } = options;

  return (state: TState, theme?: Theme, renderer?: StyleRenderer) => {
    const win = useWindow();
    const contextualTheme = useTheme();
    const contextualRenderer = useStyleRenderer();

    theme = theme || contextualTheme || {};
    renderer = (renderer || contextualRenderer) as StyleRenderer;

    const isStyleFunction = typeof styleOrFunction === 'function';
    const styles = isStyleFunction ? (styleOrFunction as (theme: Theme) => any)(theme!) : styleOrFunction;

    // Flatten and merge the variants from the definition and theme overrides.
    const themeVariants = name ? theme?.components?.[name]?.variants : undefined;

    const variables1 = [
      callOrReturn(variants, theme),
      callOrReturn(themeVariants, theme),
      { root: callOrReturn(state.tokens, theme) },
    ];
    const variables = tokensToStyleObject(theme.tokens);

    for (const set of variables1) {
      if (set) {
        for (const variantName of Object.keys(set)) {
          if (variantName === 'root' || state[variantName] || state.variant === variantName) {
            Object.assign(variables, tokensToStyleObject(set[variantName], prefix));
          } else {
            const nameParts = variantName.split('_');
            if (nameParts.length === 2 && state[nameParts[0]] === nameParts[1]) {
              Object.assign(variables, tokensToStyleObject(set[variantName], prefix));
            }
          }
        }
      }
    }

    console.log(variables);
    const resolvedStyles = replaceCSSVariables(styles, variables);
    const classes = renderer.renderStyles(resolvedStyles, { targetWindow: win, rtl: !!theme!.rtl });

    for (let slot of Object.keys(classes)) {
      _setClass(state, classes[slot], slot !== 'root' && slot);
    }
  };
};

function _setClass(state: Record<string, any>, className: string, slot?: string) {
  const currentSlot = slot ? (state[slot] = state[slot] || {}) : state;

  if (currentSlot.className) {
    currentSlot.className += ' ' + className;
  } else {
    currentSlot.className = className;
  }
}
