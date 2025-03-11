import * as React from 'react';
import { DocsContainer, type DocsContextProps } from '@storybook/addon-docs';
import { type FluentStoryContext } from '@fluentui/react-storybook-addon';
import { webLightTheme } from '@fluentui/react-theme';
import { FluentProvider } from '@fluentui/react-provider';

interface FluentDocsContainerProps {
  context: FluentStoryContext & DocsContextProps;
}

/**
 * A container that wraps storybook's native docs container to add extra components to the docs experience
 */
export const FluentDocsContainer: React.FC<FluentDocsContainerProps> = ({ children, context }) => {
  return (
    <>
      {/** TODO add table of contents */}
      <FluentProvider className="sb-unstyled" style={{ backgroundColor: 'transparent' }} theme={webLightTheme}>
        <DocsContainer context={context}>{children}</DocsContainer>
      </FluentProvider>
    </>
  );
};
