import * as React from 'react';

import {
  ComponentPage,
  ExampleCard,
  IComponentDemoPageProps,
  PropertiesTableSet,
} from '@fluentui/react-docsite-components';

import { LegendOverflowExample } from './Legends.Overflow.Example';
import { LegendBasicExample } from './Legends.Basic.Example';
import { LegendWrapLinesExample } from './Legends.WrapLines.Example';

const LegendsOverflowExampleCode = require('!raw-loader?esModule=false!@fluentui/react-examples/src/react-charting/Legends/Legends.Overflow.Example.tsx') as string;
const LegendsWrapLinesExampleCode = require('!raw-loader?esModule=false!@fluentui/react-examples/src/react-charting/Legends/Legends.WrapLines.Example.tsx') as string;
const LegendsBasicExampleCode = require('!raw-loader?esModule=false!@fluentui/react-examples/src/react-charting/Legends/Legends.Basic.Example.tsx') as string;

export class LegendsPage extends React.Component<IComponentDemoPageProps, {}> {
  public render(): JSX.Element {
    return (
      <ComponentPage
        title="Legends"
        componentName="Legends"
        exampleCards={
          <div>
            <ExampleCard title="Legends with overflow" code={LegendsOverflowExampleCode}>
              <LegendOverflowExample />
            </ExampleCard>

            <ExampleCard title="Legends with wrap lines" code={LegendsWrapLinesExampleCode}>
              <LegendWrapLinesExample />
            </ExampleCard>

            <ExampleCard title="Legends with no overflow" code={LegendsBasicExampleCode}>
              <LegendBasicExample />
            </ExampleCard>
          </div>
        }
        propertiesTables={
          <PropertiesTableSet
            sources={[
              require<string>('!raw-loader?esModule=false!@fluentui/react-charting/src/components/Legends/Legends.types.ts'),
            ]}
            renderOnly={['ILegendsProps', 'ILegend', 'ILegendsStyles']}
          />
        }
        overview={
          <div>
            <p>
              The legends wrap based upon the space available for them. If there is not enough space to show all legends
              on a single line, the legends fall into an overflow menu. Text appears indicating the number of legends in
              the overflow menu. The legends are selectable and action to be performed upon clicking a certain legend
              can be passed.
            </p>
          </div>
        }
      />
    );
  }
}
