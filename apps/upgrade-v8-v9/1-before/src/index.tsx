import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './App';
import { mergeStyles } from '@fluentui/react';
import { initializeIcons as v8InitializeIcons } from '@fluentui/font-icons-mdl2';

v8InitializeIcons();

// Inject some global styles
mergeStyles({
  ':global(body,html,#root)': {
    margin: 0,
    padding: 0,
    height: '100vh',
  },
});

ReactDOM.render(<App />, document.getElementById('root'));
