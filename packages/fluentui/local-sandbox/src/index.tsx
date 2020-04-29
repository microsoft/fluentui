import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider, themes, Button } from '@fluentui/react-northstar';

const App = () => (
  <Provider theme={themes.teams}>
    <Button>Click here</Button>
  </Provider>
);

ReactDOM.render(<App />, document.querySelector('#root'));
