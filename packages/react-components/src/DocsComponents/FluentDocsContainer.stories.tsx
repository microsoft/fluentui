import * as React from 'react';
import { DocsContainer, DocsContextProps } from '@storybook/addon-docs';
import { FluentStoryContext, THEME_ID, themes } from '@fluentui/react-storybook-addon';
import { FluentDocsHeader } from './FluentDocsHeader.stories';
import { FluentProvider, webLightTheme } from '../index';
import { isHosted } from './isHosted';

interface FluentDocsContainerProps {
  context: FluentStoryContext & DocsContextProps;
}

/**
 * A container that wraps storybook's native docs container to add extra components to the docs experience
 */
export const FluentDocsContainer: React.FC<FluentDocsContainerProps> = ({ children, context }) => {
  // eslint-disable-next-line deprecation/deprecation
  const selectedTheme = themes.find(theme => theme.id === context.globals[THEME_ID]);
  const hosted = isHosted();
  return (
    <>
      {!hosted && (
        <FluentProvider theme={selectedTheme?.theme ?? webLightTheme}>
          <FluentDocsHeader
            // eslint-disable-next-line deprecation/deprecation
            storybookGlobals={context.globals}
          />
        </FluentProvider>
      )}

      {/** TODO add table of contents */}
      <DocsContainer context={context}>{children}</DocsContainer>
    </>
  );
};
