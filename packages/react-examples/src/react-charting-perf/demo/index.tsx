import * as React from 'react';
import { render } from 'react-dom';
// import App from './App';
import { ThemeProvider } from '@fluentui/react/lib/utilities/ThemeProvider/ThemeProvider';
import { LineChartBasicExample } from '../PerformanceDataSet1/LineChart.Basic.Example';

// const rootElement = document.getElementById('root');
// render(<App />, rootElement);

const LineChartPageWrapper = () => (
  <ThemeProvider>
    <LineChartBasicExample />
  </ThemeProvider>
);
render(<LineChartPageWrapper />, document.getElementById('content'));
