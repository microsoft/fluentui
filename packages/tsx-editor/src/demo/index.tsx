import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './App';
import { mergeStyles, initializeIcons, Fabric } from 'office-ui-fabric-react';

initializeIcons();

// Inject some global styles
mergeStyles({
  selectors: {
    ':global(body), :global(html), :global(#app)': {
      margin: 0,
      padding: 0,
      height: '100vh'
    }
  }
});

ReactDOM.render(
  <Fabric>
    <App />
  </Fabric>,
  document.getElementById('content')
);
