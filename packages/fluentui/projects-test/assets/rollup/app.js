import React from 'react';
import ReactDOM from 'react-dom';
import { Button, Provider, teamsTheme } from '@fluentui/react-northstar';

ReactDOM.render(
  React.createElement(Provider, { theme: teamsTheme }, React.createElement(Button, { content: 'Theming' })),
  document.getElementById('root'),
);
