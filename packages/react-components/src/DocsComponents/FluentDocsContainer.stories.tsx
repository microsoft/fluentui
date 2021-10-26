import * as React from 'react';
import { DocsContainer, DocsContainerProps } from '@storybook/addon-docs';
import { FluentDocsHeader } from './FluentDocsHeader.stories';

/**
 * A container that wraps storybook's native docs container to add extra components to the docs experience
 */
export const FluentDocsContainer = ({ children, context }: DocsContainerProps & { children: React.ReactNode }) => {
  return (
    <>
      <FluentDocsHeader />
      {/** TODO add table of contents */}
      <DocsContainer context={context}>{children}</DocsContainer>
    </>
  );
};
