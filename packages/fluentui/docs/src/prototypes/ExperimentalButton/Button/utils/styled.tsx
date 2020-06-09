import * as React from 'react';

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

type ComposedComponent<P> = React.ForwardRefExoticComponent<P> & {
  displayNames?: string[];
  tokenMappings?: Function[];
};

function styled<P = {}, SP = {}, PP = {}>(
  Component: React.ForwardRefExoticComponent<PP> & { displayNames?: string[]; tokenMappings?: Function[] },
  displayName: string,
  { tokensMapping, overrideStyles = false }: any, //TODO: fix this
) {
  const displayNames = [...(Component.displayNames ? Component.displayNames : [Component.displayName]), displayName];

  const tokenMappings = [...(Component.tokenMappings ? Component.tokenMappings : []), tokensMapping];

  const ComposedComponent = React.forwardRef((props, ref) => {
    const stylingTokensOverrides = resolveTokensVariables(Component, tokensMapping, props);

    const parentProps = {
      ...props,
      fluentOverrideConfig: {
        displayName,
        overrides: {
          stylingTokens: stylingTokensOverrides,
        },
        options: {
          overrideStyles,
          ...(!overrideStyles && {
            displayNames,
          }),
        },
      },
    };

    return (Component as any).render(parentProps, ref);
  }) as ComposedComponent<P>;

  ComposedComponent.displayNames = displayNames;
  ComposedComponent.tokenMappings = tokenMappings;

  return ComposedComponent;
}

export default styled;
