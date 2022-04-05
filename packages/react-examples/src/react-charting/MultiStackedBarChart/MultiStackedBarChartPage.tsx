import * as React from 'react';
import { ComponentPage, ExampleCard } from '@fluentui/react-docsite-components';

import { MultiStackedBarChartExample } from './MultiStackedBarChart.Example';
import { MultiStackedBarChartWithPlaceholderExample } from './MultiStackedBarChartWithPlaceHolder.Example';

const MultiStackedBarChartExampleCode = require('!raw-loader?esModule=false!./MultiStackedBarChart.Example.tsx') as string;
const MultiStackedBarChartWithPlaceholderExampleCode = require('!raw-loader?esModule=false!./MultiStackedBarChartWithPlaceHolder.Example.tsx') as string;

export const MultiStackedBarChartPage: React.FunctionComponent = () => {
  return (
    <ComponentPage
      title="Multiple Stacked Bar Chart"
      componentName="MultiStackedBarChart"
      exampleCards={
        <>
          <ExampleCard title="Multi Stacked Bar Chart" code={MultiStackedBarChartExampleCode}>
            <MultiStackedBarChartExample />
          </ExampleCard>
          <ExampleCard
            title="Multi Stacked Bar Chart With Placeholder"
            code={MultiStackedBarChartWithPlaceholderExampleCode}
          >
            <MultiStackedBarChartWithPlaceholderExample />
          </ExampleCard>
        </>
      }
      overview={<div />}
    />
  );
};
