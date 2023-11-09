import * as React from 'react';
import {
  ComponentPage,
  ExampleCard,
  IComponentDemoPageProps,
  PropertiesTableSet,
  Markdown,
} from '@fluentui/react-docsite-components';

import { MultiStackedBarChartBasicExample } from './MultiStackedBarChart.Example';
import { MultiStackedBarChartWithPlaceholderExample } from './MultiStackedBarChartWithPlaceHolder.Example';
import { MultiStackedBarChartVariantExample } from './MultiStackedBarChart.Variant.Example';

const MultiStackedBarChartExampleCode =
  require('!raw-loader?esModule=false!@fluentui/react-examples/src/react-charting/MultiStackedBarChart/MultiStackedBarChart.Example.tsx') as string;
const MultiStackedBarChartWithPlaceholderExampleCode =
  require('!raw-loader?esModule=false!@fluentui/react-examples/src/react-charting/MultiStackedBarChart/MultiStackedBarChartWithPlaceHolder.Example.tsx') as string;
const MultiStackedBarChartVariantExampleCode =
  require('!raw-loader?esModule=false!@fluentui/react-examples/src/react-charting/MultiStackedBarChart/MultiStackedBarChart.Variant.Example.tsx') as string;

export class MultiStackedBarChartPage extends React.Component<IComponentDemoPageProps, {}> {
  public render(): JSX.Element {
    return (
      <ComponentPage
        title="Multiple Stacked Bar Chart"
        componentName="MultiStackedBarChart"
        exampleCards={
          <>
            <ExampleCard title="Multi Stacked Bar Chart" code={MultiStackedBarChartExampleCode}>
              <MultiStackedBarChartBasicExample />
            </ExampleCard>
            <ExampleCard
              title="Multi Stacked Bar Chart With Placeholder"
              code={MultiStackedBarChartWithPlaceholderExampleCode}
            >
              <MultiStackedBarChartWithPlaceholderExample />
            </ExampleCard>
            <ExampleCard title="MultiStackedBarChart Variant" code={MultiStackedBarChartVariantExampleCode}>
              <MultiStackedBarChartVariantExample />
            </ExampleCard>
          </>
        }
        propertiesTables={
          <PropertiesTableSet
            sources={[
              require<string>('!raw-loader?esModule=false!@fluentui/react-charting/src/components/StackedBarChart/MultiStackedBarChart.types.ts'),
            ]}
          />
        }
        isHeaderVisible={this.props.isHeaderVisible}
        overview={
          <Markdown>
            {require<string>('!raw-loader?esModule=false!@fluentui/react-examples/src/react-charting/MultiStackedBarChart/docs/MultiStackedBarChartOverview.md')}
          </Markdown>
        }
        bestPractices={
          <Markdown>
            {require<string>('!raw-loader?esModule=false!@fluentui/react-examples/src/react-charting/MultiStackedBarChart/docs/MultiStackedBarChartBestPractices.md')}
          </Markdown>
        }
        dos={
          <Markdown>
            {require<string>('!raw-loader?esModule=false!@fluentui/react-examples/src/react-charting/MultiStackedBarChart/docs/MultiStackedBarChartDos.md')}
          </Markdown>
        }
        donts={
          <Markdown>
            {require<string>('!raw-loader?esModule=false!@fluentui/react-examples/src/react-charting/MultiStackedBarChart/docs/MultiStackedBarChartDonts.md')}
          </Markdown>
        }
      />
    );
  }
}
