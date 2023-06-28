import * as React from 'react';
import * as ReactDOM from 'react-dom';
//import { render } from 'react-dom';
// import App from './App';
import { ThemeProvider } from '@fluentui/react/lib/utilities/ThemeProvider/ThemeProvider';
import { LineChartBasicExample } from '../PerformanceDataSet1/LineChart.Basic.Example';
//import ReactDOM = require('react-dom');

// const rootElement = document.getElementById('root');
// render(<App />, rootElement);

// const LineChartPageWrapper = () => (
//   <ThemeProvider>
//     <LineChartBasicExample />
//   </ThemeProvider>
// );
// render(<LineChartPageWrapper />, document.getElementById('content'));
let rootElement: HTMLElement | null;

function _onLoad(): void {
  const LineChartPageWrapper = () => (
    <ThemeProvider>
      <LineChartBasicExample />
    </ThemeProvider>
  );
  ReactDOM.render(<LineChartPageWrapper />, document.getElementById('content'));
  rootElement = rootElement || document.getElementById('content');
}

function _onUnload(): void {
  if (rootElement) {
    ReactDOM.unmountComponentAtNode(rootElement);
  }
}

const isReady = document.readyState === 'interactive' || document.readyState === 'complete';

if (isReady) {
  _onLoad();
} else {
  window.onload = _onLoad;
}

window.onunload = _onUnload;
