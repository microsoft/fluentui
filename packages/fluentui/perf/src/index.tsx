import '@babel/polyfill';

import { Provider, teamsTheme } from '@fluentui/react-northstar';
import * as _ from 'lodash';
import * as minimatch from 'minimatch';
import * as React from 'react';
import * as ReactDOM from 'react-dom';

import type { ProfilerMeasure, ProfilerMeasureCycle } from './globals';

const mountNode = document.querySelector('#root');
const performanceExamplesContext = require.context('@fluentui/docs/src/examples/', true, /.perf.tsx$/);

// Heads up!
// We want to randomize examples to avoid any notable issues with always first example
const performanceExampleNames: string[] = _.shuffle(performanceExamplesContext.keys());

const asyncRender = (element: React.ReactElement, container: Element) =>
  new Promise<void>(resolve => {
    ReactDOM.render(element, container, () => {
      ReactDOM.unmountComponentAtNode(container);
      resolve();
    });
  });

const renderCycle = async (
  exampleName: string,
  Component: React.ComponentType,
  exampleIndex: number,
): Promise<ProfilerMeasure> => {
  let profilerMeasure: ProfilerMeasure;

  await asyncRender(
    <Provider theme={teamsTheme}>
      <React.Profiler
        id={exampleName}
        onRender={(id: string, phase: string, actualTime: number, startTime: number, commitTime: number) => {
          profilerMeasure = {
            actualTime,
            exampleIndex,
            phase,
            commitTime,
            startTime,
          };
        }}
      >
        <Component />
      </React.Profiler>
    </Provider>,
    mountNode,
  );

  return profilerMeasure;
};

const satisfiesFilter = (componentFilePath: string, filter: string) =>
  minimatch(componentFilePath, filter || '*', {
    matchBase: true,
  });

window.runMeasures = async (filter: string = '') => {
  const performanceMeasures: ProfilerMeasureCycle = {};

  for (const exampleName of performanceExampleNames) {
    // ./components/Button/Performance/Button.perf.tsx => Button.perf.tsx
    const componentName = _.last(exampleName.split('/'));

    if (!satisfiesFilter(componentName, filter)) continue;

    const Component = performanceExamplesContext(exampleName).default;

    performanceMeasures[componentName] = await renderCycle(
      componentName,
      Component,
      performanceExampleNames.indexOf(exampleName),
    );
  }

  return performanceMeasures;
};

//
// Control tools
//
const Control: React.FunctionComponent = () => {
  const [filter, setFilter] = React.useState('');

  return (
    // Heads up! On first run, this Provider increases measured time due to style DOM elements being
    // rendered to the browser. Subsequent rerenders, in contrast, are not rendering these style DOM
    // elements again.
    <Provider theme={teamsTheme}>
      <label htmlFor="filter">
        Filter (use <code>minimatch</code>):
      </label>
      <input onChange={e => setFilter(e.target.value)} type="text" value={filter} />

      <pre>
        {_.filter(performanceExamplesContext.keys(), exampleName => satisfiesFilter(exampleName, filter)).join('\n')}
      </pre>

      <button
        onClick={async () => {
          console.table(await window.runMeasures(filter));
        }}
      >
        Run!
      </button>
    </Provider>
  );
};

ReactDOM.render(<Control />, document.querySelector('#tools-panel'));
