import * as React from 'react';
import { DocsContainer, type DocsContextProps } from '@storybook/addon-docs/blocks';
import { webLightTheme } from '@fluentui/react-theme';
import { FluentProvider } from '@fluentui/react-provider';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { create, Global, type ThemeVars } from 'storybook/theming';

import { isDocsEnabled } from './utils';

interface FluentDocsContainerProps {
  context: DocsContextProps;
  children: React.ReactNode;
  theme?: ThemeVars;
}

const docsTheme = create({
  base: 'light',
  colorSecondary: webLightTheme.colorBrandForegroundLink,
  barSelectedColor: webLightTheme.colorBrandForegroundLink,
  barTextColor: webLightTheme.colorNeutralForeground2,
  barHoverColor: webLightTheme.colorNeutralForeground2Hover,
});

const sourceStyles = {
  '#storybook-docs .docblock-source .token.attr-name': {
    color: webLightTheme.colorPaletteRedForeground1,
  },
};

/**
 * A container that wraps storybook's native docs container to add extra components to the docs experience
 */
export const FluentDocsContainer: ForwardRefComponent<FluentDocsContainerProps> = React.forwardRef(
  ({ children, context, theme }, ref) => {
    const docs = (
      <>
        {!theme && <Global styles={sourceStyles} />}
        <DocsContainer context={context} theme={theme ?? docsTheme}>
          {children}
        </DocsContainer>
      </>
    );

    if (isDocsEnabled(context)) {
      return (
        <>
          {/** TODO add table of contents */}
          <FluentProvider
            ref={ref}
            className="sb-unstyled"
            style={{ backgroundColor: 'transparent' }}
            theme={webLightTheme}
          >
            {docs}
          </FluentProvider>
        </>
      );
    }

    // If docs container is not enabled, fall back to Storybook's default DocsContainer
    return docs;
  },
);

FluentDocsContainer.displayName = 'FluentDocsContainer';
