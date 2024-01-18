import * as React from 'react';

import {
  ComponentPage,
  ExampleCard,
  IComponentDemoPageProps,
  PropertiesTableSet,
  Markdown,
} from '@fluentui/react-docsite-components';

import { LegendOverflowExample } from './Legends.Overflow.Example';
import { LegendBasicExample } from './Legends.Basic.Example';
import { LegendWrapLinesExample } from './Legends.WrapLines.Example';
import { LegendStyledExample } from './Legends.Styled.Example';
import { LegendsOnChangeExample } from './Legends.OnChange.Example';

const LegendsOverflowExampleCode =
  require('!raw-loader?esModule=false!@fluentui/react-examples/src/react-charting/Legends/Legends.Overflow.Example.tsx') as string;
const LegendsWrapLinesExampleCode =
  require('!raw-loader?esModule=false!@fluentui/react-examples/src/react-charting/Legends/Legends.WrapLines.Example.tsx') as string;
const LegendsBasicExampleCode =
  require('!raw-loader?esModule=false!@fluentui/react-examples/src/react-charting/Legends/Legends.Basic.Example.tsx') as string;
const LegendsStyledExampleCode =
  require('!raw-loader?esModule=false!@fluentui/react-examples/src/react-charting/Legends/Legends.Styled.Example.tsx') as string;
const LegendsOnChangeExampleCode =
  require('!raw-loader?esModule=false!@fluentui/react-examples/src/react-charting/Legends/Legends.OnChange.Example.tsx') as string;

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

            <ExampleCard title="Legend styled" code={LegendsStyledExampleCode}>
              <LegendStyledExample />
            </ExampleCard>

            <ExampleCard title="Legends onChange" code={LegendsOnChangeExampleCode}>
              <LegendsOnChangeExample />
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
          <Markdown>
            {require<string>('!raw-loader?esModule=false!@fluentui/react-examples/src/react-charting/Legends/docs/LegendsOverview.md')}
          </Markdown>
        }
        bestPractices={
          <Markdown>
            {require<string>('!raw-loader?esModule=false!@fluentui/react-examples/src/react-charting/Legends/docs/LegendsBestPractices.md')}
          </Markdown>
        }
      />
    );
  }
}
