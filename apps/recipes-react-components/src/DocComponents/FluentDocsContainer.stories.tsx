import * as React from 'react';
import { DocsContainer, DocsContextProps } from '@storybook/addon-docs';
import { FluentStoryContext } from '@fluentui/react-storybook-addon';
import { webLightTheme, FluentProvider } from '@fluentui/react-components';

type FluentDocsContainerProps = {
  context: FluentStoryContext & DocsContextProps;
};

export const FluentDocsContainer: React.FC<FluentDocsContainerProps> = ({ children, context }) => {
  return (
    <FluentProvider theme={webLightTheme}>
      <DocsContainer context={context}>{children}</DocsContainer>
    </FluentProvider>
  );
};
