import * as React from 'react';
import { DocsContainer, type DocsContextProps } from '@storybook/addon-docs';
import { webLightTheme } from '@fluentui/react-theme';
import { FluentProvider } from '@fluentui/react-provider';

import { isDocsEnabled } from './utils';

interface FluentDocsContainerProps {
  context: DocsContextProps;
  children: React.ReactNode;
}

/**
 * A container that wraps storybook's native docs container to add extra components to the docs experience
 */
export const FluentDocsContainer: React.FC<FluentDocsContainerProps> = ({ children, context }) => {
  if (isDocsEnabled(context)) {
    return (
      <>
        {/** TODO add table of contents */}
        <FluentProvider className="sb-unstyled" style={{ backgroundColor: 'transparent' }} theme={webLightTheme}>
          <DocsContainer context={context}>{children}</DocsContainer>
        </FluentProvider>
      </>
    );
  }

  // If docs container is not enabled, fall back to Storybook's default DocsContainer
  return <DocsContainer context={context}>{children}</DocsContainer>;
};
