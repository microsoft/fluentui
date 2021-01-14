import { css } from '@fluentui/utilities';
import { insertStyles } from './insertStyles';
import { tokensToStyleObject } from './tokensToStyleObject';

import {
  makeStyles as makeNonReactStyles,
  MakeStylesDefinition,
  MakeStylesOptions as MakeNonReactStylesOptions,
  MakeStylesRenderer,
  MakeStylesStyleRule,
} from '@fluentui/make-styles';
import { Theme } from './types';
import { useTheme } from './useTheme';

export type MakeStylesOptions<Tokens> = Omit<MakeNonReactStylesOptions<Tokens>, 'renderer'> & {
  componentNames?: string | string[];
  prefix?: string;
};

const renderer: MakeStylesRenderer = {
  id: 'renderer',
  insertDefinitions: insertStyles,
};

export function makeStyles<Selectors, Tokens>(definitions: MakeStylesDefinition<Selectors, Tokens>[]) {
  // const computeClasses = makeNonReactStyles(definitions);

  const resolvedStyles = makeNonReactStyles<Selectors, Tokens | Theme>(definitions);

  return function useClasses(
    selectors: Selectors,
    options: MakeStylesOptions<Tokens | Theme>,
    ...classNames: (string | undefined)[]
  ) {
    const { components = {}, effects, fonts, palette, rtl, semanticColors, tokens } = useTheme();
    const { prefix } = options;
    let { componentNames = [] } = options;

    const variantStyles: MakeStylesDefinition<Selectors, Tokens | Theme>[] = [];
    let resolvedVariantStyles;

    // Evaluate variants if they exist for the current component
    if (!Array.isArray(componentNames)) {
      componentNames = [componentNames];
    }
    for (const componentName of componentNames) {
      if (components[componentName]) {
        const { variants } = components[componentName];
        if (variants) {
          const resolvedPrefix = '--' + (prefix || componentName.toLowerCase());

          for (const variant in variants) {
            // Account for changing default variant
            if (variant === 'root') {
              variantStyles.push([
                null,
                tokensToStyleObject(variants[variant], resolvedPrefix) as MakeStylesStyleRule<Tokens>,
              ]);
            } else {
              variantStyles.push([
                (variantSelectors: Selectors & { variant: string }) => variantSelectors.variant === variant,
                tokensToStyleObject(variants[variant], resolvedPrefix) as MakeStylesStyleRule<Tokens>,
              ]);
              variantStyles.push([
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                (variantSelectors: Selectors) => (variantSelectors as any)[variant],
                tokensToStyleObject(variants[variant], resolvedPrefix) as MakeStylesStyleRule<Tokens>,
              ]);
            }
          }
        }
      }

      if (variantStyles.length > 0) {
        resolvedVariantStyles = makeNonReactStyles(variantStyles);
      }
    }

    const result = css(
      resolvedStyles(
        selectors,
        {
          renderer,
          rtl: options.rtl || rtl,
          tokens: { effects, fonts, palette, semanticColors, ...tokens, ...options.tokens } as Theme,
        },
        ...(classNames || []),
      ),
      resolvedVariantStyles &&
        resolvedVariantStyles(selectors, {
          renderer,
          rtl: options.rtl || rtl,
          tokens: { effects, fonts, palette, semanticColors, ...tokens, ...options.tokens } as Theme,
        }),
    );

    return result;
  };
}
