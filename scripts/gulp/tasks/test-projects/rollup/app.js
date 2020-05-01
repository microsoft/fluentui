import React from 'react';
import ReactDOM from 'react-dom';
import { Button, Provider, themes } from '@fluentui/react-northstar';

ReactDOM.render(
  React.createElement(Provider, { theme: themes.teams }, React.createElement(Button, { content: 'Theming' })),
  document.getElementById('root'),
);
