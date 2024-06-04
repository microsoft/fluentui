import * as React from 'react';
import { DocsContainer, DocsContextProps } from '@storybook/addon-docs';
import { FluentStoryContext } from '@fluentui/react-storybook-addon';
import { webLightTheme, FluentProvider } from '@fluentui/react-components';

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
      <FluentProvider style={{ backgroundColor: 'transparent' }} theme={webLightTheme}>
        <DocsContainer context={context}>{children}</DocsContainer>
      </FluentProvider>
    </>
  );
};
