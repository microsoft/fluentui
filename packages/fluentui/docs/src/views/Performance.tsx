import * as React from 'react';
import DocPage from '../components/DocPage/DocPage';
import GuidesNavigationFooter from '../components/GuidesNavigationFooter';
import { link, code } from '../utils/helpers';
import ExampleSnippet from '../components/ExampleSnippet';

export default () => (
  <DocPage title="Performance">
    <p>
      In general, to make your application that is using Fluent UI performant, it is important to follow all{' '}
      {link('React performance best practices', 'https://reactjs.org/docs/optimizing-performance.html')}.
    </p>
    <p>
      To avoid unnecessary re-rendering of components that use {link('Shorthand API', '/shorthand-prop')}, always gather
      the required data before rendering of the component, potentially by{' '}
      {link('lifting the state up', 'https://reactjs.org/docs/lifting-state-up.html')}.
    </p>
    <p>
      For container components, especially if rendering of the items might be an expensive operation, memoization (for
      example {code('React.memo')}) of items can be used:
      <ExampleSnippet
        value={`
        const MenuItem = React.memo(Menu.Item, (prevProps, nextProps) => {
          // Application logic
          // update only on 'active' prop change
          return prevProps.active === nextProps.active;
        });

        // Replaces original Menu.Item with React.memo(Menu.Item)
        // Simplified - pass 'Component' to memoized props as well and use it to render.
        const renderBlocker = (Component, props) => <MenuItem {...props} />;

        // Is static and created once
        const items = [
          { content: 'One', key: 'one', children: renderBlocker },
          { content: 'Two', key: 'two', children: renderBlocker },
          { content: 'Three', key: 'three', children: renderBlocker },
        ];

        function App() {
          return (
            <Provider theme={teamsTheme}>
              <h1>Fluent UI Menu with blocked rendering</h1>
              <hr />
              <Menu defaultActiveIndex={0} items={items} primary vertical />
            </Provider>
          );
        }
      `}
      />
    </p>
    <p>
      To improve the performance you need to understand where the time is spent in your application.{' '}
      {link('Debugging', '/debugging')} section documents the tools you can use to understand FluentUI performance.
    </p>

    <GuidesNavigationFooter
      previous={{ name: 'Integrate custom components', url: 'integrate-custom-components' }}
      next={{ name: 'Debugging', url: 'debugging' }}
    />
  </DocPage>
);
