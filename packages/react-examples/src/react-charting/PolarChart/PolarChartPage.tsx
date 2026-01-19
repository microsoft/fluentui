import * as React from 'react';

import {
  ComponentPage,
  ExampleCard,
  IComponentDemoPageProps,
  PropertiesTableSet,
  Markdown,
} from '@fluentui/react-docsite-components';

import { PolarChartBasicExample } from './PolarChart.Basic.Example';
import type { JSXElement } from '@fluentui/utilities';

const PolarChartBasicExampleCode =
  require('!raw-loader?esModule=false!@fluentui/react-examples/src/react-charting/PolarChart/PolarChart.Basic.Example.tsx') as string;

export class PolarChartPage extends React.Component<IComponentDemoPageProps, {}> {
  public render(): JSXElement {
    return (
      <ComponentPage
        title="Polar Chart"
        componentName="PolarChart"
        exampleCards={
          <div>
            <ExampleCard title="PolarChart basic" code={PolarChartBasicExampleCode}>
              <PolarChartBasicExample />
            </ExampleCard>
          </div>
        }
        propertiesTables={
          <PropertiesTableSet
            sources={[
              require<string>('!raw-loader?esModule=false!@fluentui/react-charting/src/components/PolarChart/PolarChart.types.ts'),
            ]}
          />
        }
        isHeaderVisible={this.props.isHeaderVisible}
        overview={
          <Markdown>
            {require<string>('!raw-loader?esModule=false!@fluentui/react-examples/src/react-charting/PolarChart/docs/PolarChartOverview.md')}
          </Markdown>
        }
        bestPractices={
          <Markdown>
            {require<string>('!raw-loader?esModule=false!@fluentui/react-examples/src/react-charting/PolarChart/docs/PolarChartBestPractices.md')}
          </Markdown>
        }
        dos={
          <Markdown>
            {require<string>('!raw-loader?esModule=false!@fluentui/react-examples/src/react-charting/PolarChart/docs/PolarChartDos.md')}
          </Markdown>
        }
        donts={
          <Markdown>
            {require<string>('!raw-loader?esModule=false!@fluentui/react-examples/src/react-charting/PolarChart/docs/PolarChartDonts.md')}
          </Markdown>
        }
      />
    );
  }
}
