import { Anchor, Description, DocsStoryProps, Subheading } from '@storybook/addon-docs';
import * as React from 'react';
import {
  githubLightTheme,
  SandpackCodeEditor,
  SandpackPreview,
  SandpackProvider,
  SandpackThemeProvider,
} from '@codesandbox/sandpack-react';
import '@codesandbox/sandpack-react/dist/index.css';
import * as dedent from 'dedent';

// Most of this file is copied from Storybook's addons/docs/src/blocks/DocsStory.tsx
export const FluentDocsDocsStory: React.FunctionComponent<DocsStoryProps> = ({
  id,
  name,
  expanded = true,
  withToolbar = false,
  parameters = {},
}) => {
  const { docs } = parameters;

  if (!name) {
    return null;
  }

  return (
    <Anchor storyId={id ?? ''}>
      {expanded && name && <Subheading>{name}</Subheading>}
      {expanded && docs && docs.description?.story && <Description markdown={docs.description?.story} />}
      <div className="sbdocs sbdocs-preview">
        <SandpackProvider
          css={{ width: 'fit-content' }}
          template="react"
          bundlerURL="https://sandpack-bundler.pages.dev"
          openPaths={['/example.tsx']}
          customSetup={{
            environment: 'create-react-app',
            entry: '/index.tsx',
            main: '/example.tsx',
            files: {
              '/example.tsx': parameters.fullSource,
              '/index.html': '<div id="root"></div>',
              '/index.tsx': {
                // use originalStoryFn because users can override the `storyName` property.
                // We need the name of the exported function, not the actual story
                // https://github.com/microsoft/fluentui-storybook-addons/issues/12
                code: dedent`
            import * as ReactDOM from 'react-dom';
            import { FluentProvider, webLightTheme } from '@fluentui/react-components';
            import { STORY_NAME as Example } from './example';
            //
            // You can edit this example in "example.tsx".
            //
            ReactDOM.render(
                <FluentProvider theme={webLightTheme}>
                    <Example />
                </FluentProvider>,
                document.getElementById('root'),
            );`.replace('STORY_NAME', name.replace(new RegExp(' ', 'g'), '')),
              },
            },
            dependencies: {
              react: '^17.0.0',
              'react-dom': '^17.0.0',
              'react-scripts': '^4.0.0',
              '@fluentui/react-components': '^9.0.0-beta', // necessary for FluentProvider
            },
          }}
        >
          <SandpackThemeProvider
            theme={{
              ...githubLightTheme,
              palette: {
                activeBackground: '#fafafa',
              },
            }}
          >
            <SandpackPreview
              actionsChildren={
                <>
                  <button
                    type="button"
                    className="sp-button"
                    style={{ padding: 'var(--sp-space-1) var(--sp-space-3)' }}
                    onClick={() => window.alert('Bug reported!')}
                  >
                    Report bug
                  </button>
                </>
              }
            />
            <SandpackCodeEditor wrapContent={true} initMode={'lazy'} showInlineErrors={true} />
          </SandpackThemeProvider>
        </SandpackProvider>
      </div>
    </Anchor>
  );
};
