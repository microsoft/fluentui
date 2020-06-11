import * as React from 'react';
import { mergeStyles, mergeComponentVariables, ThemePrepared } from '@fluentui/styles';
import { useStyles, UseStylesResult } from '@fluentui/react-bindings';
// @ts-ignore
import { ThemeContext } from 'react-fela';

type ComposedComponent<P> = React.ForwardRefExoticComponent<P> & {
  displayNames?: string[];
  tokenMappings?: Function[];
};

const resolveTokensVariables = (Component, tokensMapping, props) => {
  let stylingTokensOverrides = {};

  if (Component.tokenMappings) {
    const overrides = Component.tokenMappings.reduce((acc, mapping) => {
      return { ...acc, ...mapping(props) };
    }, {});
    stylingTokensOverrides = { ...overrides, ...stylingTokensOverrides };
  }

  stylingTokensOverrides = {
    ...stylingTokensOverrides,
    ...tokensMapping(props),
  };

  return stylingTokensOverrides;
};

const inlineStyledCache = new WeakMap<ThemePrepared, Record<string, UseStylesResult['classes']>>();

function inlineStyled<P = {}, SP = {}, PP = {}>(
  Component: React.ForwardRefExoticComponent<PP> & {
    tokenMappings: any[];
    stylingTokensResolver: (props: object, stylingTokens: object) => Record<string, string | number | boolean>;
  },
  { styles, variables, design, tokensMapping, overrideStyles = false, displayName }: any,
) {
  const tokenMappings = [...(Component.tokenMappings ? Component.tokenMappings : []), tokensMapping];
  const baseDisplayName = (Component as any).baseDisplayName || Component.displayName;
  const baseStylingTokensResolver = (Component as any).baseStylingTokensResolver || Component.stylingTokensResolver;
  const stylesArr = (Component as any).styles ? [...(Component as any).styles, styles] : [styles];
  const variablesArr = (Component as any).variables ? [...(Component as any).variables, variables] : [variables];

  console.log(displayName);
  console.log(stylesArr);
  console.log(variablesArr);
  // add styles and variables
  const ComposedComponent = (React.forwardRef((props, ref) => {
    const { theme, rtl } = React.useContext(ThemeContext);
    if (!inlineStyledCache.has(theme)) {
      inlineStyledCache.set(theme, {});
    }

    const inlineStylingTokens = (tokensMapping && tokensMapping(props)) || {};

    const cachePerTheme = inlineStyledCache.get(theme);
    const cacheKey = `${displayName}${JSON.stringify(baseStylingTokensResolver(props, inlineStylingTokens))}`;

    console.log(cacheKey);
    let classes = null;

    const stylingTokensOverrides = resolveTokensVariables(Component, tokensMapping, props);

    if (cachePerTheme[cacheKey]) {
      classes = cachePerTheme[cacheKey];
    }

    const { classes: resultClasses } = useStyles(baseDisplayName, {
      className: 'ui-button',
      classes: classes || props.classes,
      mapPropsToStyles: () => baseStylingTokensResolver(props, (tokensMapping && tokensMapping(props)) || {}),
      mapPropsToInlineStyles: () => ({
        className: (props as any).className,
        design, // No inline overrides allowed...
        styles: mergeStyles(...stylesArr), // No inline overrides allowed...
        variables: mergeComponentVariables(...variablesArr), // No inline overrides allowed...
      }),
      rtl,
      composeOptions: {
        overrideStyles: overrideStyles,
        // TODO: remove these once the useStyles signature is updated
        displayName: baseDisplayName,
        displayNames: [baseDisplayName],
        render: () => null,
        handledProps: [],
        className: '',
        classes: [],
        mapPropsToStylesPropsChain: [props => baseStylingTokensResolver(props, stylingTokensOverrides)],
        slots: { __self: null },
        slotProps: [],
        resolveSlotProps: () => ({}),
        shorthandConfig: {},
      },
    });

    cachePerTheme[cacheKey] = resultClasses;
    inlineStyledCache.set(theme, cachePerTheme);

    const parentProps = { ...props, classes: resultClasses };

    return (Component as any).render(parentProps, ref);
  }) as unknown) as ComposedComponent<P> & {
    tokensMapping: any[];
    baseDisplayName: string;
    baseStylingTokensResolver: () => any;
    styles: any[];
    variables: any[];
  };

  ComposedComponent.tokenMappings = tokenMappings;
  ComposedComponent.baseDisplayName = baseDisplayName;
  ComposedComponent.baseStylingTokensResolver = baseStylingTokensResolver;
  ComposedComponent.styles = stylesArr;
  ComposedComponent.variables = variablesArr;
  return ComposedComponent;
}

export default inlineStyled;
