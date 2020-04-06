import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider, themes, Header, Text } from '@fluentui/react-northstar';

const App = () => (
  <Provider theme={themes.teams}>
    <Header>@fluentui/local-sandbox</Header>
    <Text>Sandbox to test Fluent UI with production React.</Text>
  </Provider>
);

ReactDOM.render(<App />, document.querySelector('#root'));
