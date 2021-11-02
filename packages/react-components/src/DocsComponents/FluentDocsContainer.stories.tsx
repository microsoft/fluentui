import * as React from 'react';
import { DocsContainer, DocsContextProps } from '@storybook/addon-docs';
import { FluentStoryContext } from '@fluentui/react-storybook-addon';
import { FluentDocsHeader } from './FluentDocsHeader.stories';
import { FluentProvider, webLightTheme } from '../index';

interface FluentDocsContainerProps {
  context: FluentStoryContext & DocsContextProps;
}

/**
 * A container that wraps storybook's native docs container to add extra components to the docs experience
 */
export const FluentDocsContainer: React.FC<FluentDocsContainerProps> = ({ children, context }) => {
  return (
    <>
      <FluentProvider theme={webLightTheme}>
        <FluentDocsHeader storybookGlobals={context.globals} />
      </FluentProvider>
      {/** TODO add table of contents */}
      <DocsContainer context={context}>{children}</DocsContainer>
    </>
  );
};
