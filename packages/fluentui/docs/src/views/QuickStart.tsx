import { CodeSnippet } from '@fluentui/docs-components';
import { Header } from '@fluentui/react-northstar';
import * as React from 'react';

import DocPage from '../components/DocPage';
import GuidesNavigationFooter from '../components/GuidesNavigationFooter';
import { OpenOutsideIcon } from '@fluentui/react-icons-northstar';

export default () => (
  <DocPage title="Quick Start">
    <Header as="h2">Install</Header>
    <p>
      Fluent UI should be installed as a <code>dependency</code> of your app.
    </p>
    <CodeSnippet mode="bash" value="yarn add @fluentui/react-northstar" />
    <Header as="h2">Setup</Header>
    <p>
      Fluent UI components are styled using CSS in JS. This technique requires a style renderer to render JavaScript
      objects to CSS.{' '}
      <a href="https://reactjs.org/docs/context.html" target="_blank" rel="noopener nofollow">
        React Context <OpenOutsideIcon size="small" />
      </a>{' '}
      is used to provide the style renderer and theme to components.
    </p>
    <p>
      Place a <code>{'<Provider />'}</code> at the root of your app and pass theme as props.
    </p>
    <CodeSnippet
      label="index.jsx"
      value={`
        import React from 'react'
        import ReactDOM from 'react-dom'
        import { Provider, teamsTheme } from '@fluentui/react-northstar'

        import App from './App'

        ReactDOM.render(
          <Provider theme={teamsTheme}>
            <App />
          </Provider>,
          document.getElementById('root'),
        )
      `}
    />
    <Header as="h2">Usage</Header>
    <p>That's it. You can now use Fluent UI components in your app.</p>
    <CodeSnippet
      label="App.jsx"
      value={`
        import React from 'react'
        import { Button } from '@fluentui/react-northstar'

        export default () => <Button content="Get started" icon="play" iconPosition="after" primary />
      `}
    />

    <GuidesNavigationFooter next={{ name: 'FAQ', url: 'faq' }} />
  </DocPage>
);
