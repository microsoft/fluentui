import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider, teamsTheme, Button } from '@fluentui/react-northstar';

const App = () => (
  <Provider theme={teamsTheme}>
    <Button>Click here</Button>
  </Provider>
);

ReactDOM.render(<App />, document.querySelector('#root'));
