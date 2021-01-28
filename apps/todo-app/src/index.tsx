import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { ThemeProvider, initializeIcons } from '@fluentui/react';
import { TodoApp } from './components/TodoApp';
import { DataProvider } from './DataProvider';

// IE 11 polyfills
import 'react-app-polyfill/ie11';

initializeIcons();

const dataProvider = new DataProvider([
  {
    id: '61b59681-2a82-4a51-b221-8c35e333ae89',
    title: 'Finish sample todo app code',
    isComplete: false,
  },
  {
    id: '94a844ae-0c6a-4820-8042-dbc386bdf930',
    title: 'Write tests for todo app',
    isComplete: false,
  },
  {
    id: '2ae54c74-1395-4a49-8dd2-4857efdd0e5e',
    title: 'Fix bug in Pivot',
    isComplete: true,
  },
]);

const rootDiv = document.createElement('div');
document.body.appendChild(rootDiv);

// Start the application.
ReactDOM.render(
  <ThemeProvider>
    <TodoApp dataProvider={dataProvider} />
  </ThemeProvider>,
  rootDiv,
);
