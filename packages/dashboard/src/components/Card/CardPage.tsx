import * as React from 'react';
import { ExampleCard, ComponentPage, PropertiesTableSet } from '@uifabric/example-app-base';
import { SmallCardBasicExample } from './examples/Card.Small.Basic.Example';
import { MediumTallCardBasicExample } from './examples/Card.MediumTall.Basic.Example';
import { MediumWideCardBasicExample } from './examples/Card.MediumWide.Basic.Example';
import { LargeCardBasicExample } from './examples/Card.Large.Basic.Example';
import { DonutChartExample } from './examples/Card.Chart.Donut.Example';
import { LineAndVerticalBarChartExample } from './examples/Card.Chart.LineAndVerticalBar.Example';
import { MultiCountExample } from './examples/Card.MultiCount.Example';
import { StackedBarChartExample } from './examples/Card.Chart.StackedBar.Example';
import { MultiStackedBarChartExample } from './examples/Card.Chart.MultiStackedBar.Example';
import { MultipleLineChartExample } from './examples/Card.Chart.MultipleLineChart.Example';
const SmallCardExampleCode = require('!raw-loader!@uifabric/dashboard/src/components/Card/examples/Card.Small.Basic.Example.tsx') as string;
const MediumTallCardExampleCode = require('!raw-loader!@uifabric/dashboard/src/components/Card/examples/Card.MediumTall.Basic.Example.tsx') as string;
const MediumWideCardExampleCode = require('!raw-loader!@uifabric/dashboard/src/components/Card/examples/Card.MediumWide.Basic.Example.tsx') as string;
const LargeCardExampleCode = require('!raw-loader!@uifabric/dashboard/src/components/Card/examples/Card.Large.Basic.Example.tsx') as string;
const DonutChartExampleCode = require('!raw-loader!@uifabric/dashboard/src/components/Card/examples/Card.Chart.Donut.Example.tsx') as string;
const LineAndVerticalBarChartExampleCode = require('!raw-loader!@uifabric/dashboard/src/components/Card/examples/Card.Chart.LineAndVerticalBar.Example.tsx') as string;
const MultiCountExampleCode = require('!raw-loader!@uifabric/dashboard/src/components/Card/examples/Card.MultiCount.Example.tsx') as string;
const StackedBarChartExampleCode = require('!raw-loader!@uifabric/dashboard/src/components/Card/examples/Card.Chart.StackedBar.Example.tsx') as string;
const MultiStackedBarChartExampleCode = require('!raw-loader!@uifabric/dashboard/src/components/Card/examples/Card.Chart.MultiStackedBar.Example.tsx') as string;
const MultipleLineChartExampleCode = require('!raw-loader!@uifabric/dashboard/src/components/Card/examples/Card.Chart.MultipleLineChart.Example.tsx') as string;

export class CardPage extends React.Component<{}, {}> {
  public render(): JSX.Element {
    return (
      <ComponentPage
        title="DashboardCard"
        componentName="DashboardCardExample"
        exampleCards={
          <div>
            <ExampleCard title="Small Card" code={SmallCardExampleCode}>
              <SmallCardBasicExample />
            </ExampleCard>
            <ExampleCard title="Medium Tall Card" code={MediumTallCardExampleCode}>
              <MediumTallCardBasicExample />
            </ExampleCard>
            <ExampleCard title="Medium Wide Card" code={MediumWideCardExampleCode}>
              <MediumWideCardBasicExample />
            </ExampleCard>
            <ExampleCard title="Large Card" code={LargeCardExampleCode}>
              <LargeCardBasicExample />
            </ExampleCard>
            <ExampleCard title="Large Card" code={DonutChartExampleCode}>
              <DonutChartExample />
            </ExampleCard>
            <ExampleCard title="Line and vertical chart example" code={LineAndVerticalBarChartExampleCode}>
              <LineAndVerticalBarChartExample />
            </ExampleCard>
            <ExampleCard title="Multicount example" code={MultiCountExampleCode}>
              <MultiCountExample />
            </ExampleCard>
            <ExampleCard title="Stacked bar chart example" code={StackedBarChartExampleCode}>
              <StackedBarChartExample />
            </ExampleCard>
            <ExampleCard title="MultiStacked bar chart example" code={MultiStackedBarChartExampleCode}>
              <MultiStackedBarChartExample />
            </ExampleCard>
            <ExampleCard title="Mulitple line chart" code={MultipleLineChartExampleCode}>
              <MultipleLineChartExample />
            </ExampleCard>
          </div>
        }
        propertiesTables={
          <PropertiesTableSet
            sources={[
              require<string>('!raw-loader!@uifabric/dashboard/src/components/Card/Card.types.ts'),
              require<
                string
              >('!raw-loader!@uifabric/dashboard/src/components/Card/ThumbnailList/ThumbnailList.types.ts'),
              require<string>('!raw-loader!@uifabric/dashboard/src/components/Card/GridList/GridList.types.ts'),
              require<string>('!raw-loader!@uifabric/dashboard/src/components/Card/Layout/Layout.types.ts'),
              require<
                string
              >('!raw-loader!@uifabric/dashboard/src/components/Card/CompoundButtonStack/CompoundButtonStack.types.ts'),
              require<string>('!raw-loader!@uifabric/dashboard/src/components/Card/BodyText/BodyText.types.ts'),
              require<string>('!raw-loader!@uifabric/dashboard/src/components/Card/ActionBar/ActionBar.types.ts')
            ]}
            renderOnly={[
              'CardSize',
              'CardContentType',
              'Priority',
              'ICardFrameContent',
              'ICardProps',
              'IThumbnailItemProps',
              'IThumbnailListProps',
              'GridColumnContentType',
              'IGridCellItem',
              'IGridColumn',
              'IGridRow',
              'IGridListProps',
              'ICardContentDetails',
              'ILayoutProps',
              'ICompoundAction',
              'ICompoundButtonStackProps',
              'IBodyTextProps',
              'IAction',
              'IActionBarProps'
            ]}
          />
        }
        overview={
          <div>
            This react card is to be used with React-Grid-Layout(RGL) and will fill the RGL card size automatically.
          </div>
        }
        bestPractices={<div />}
        dos={
          <div>
            <ul>
              <li>
                We support the following card size: small, mediumTall, mediumWide and Large:import CardSize enum from
                Card.types{' '}
              </li>
              <li>
                We support the following components: "BodyText", "ThumbnailList", "Compound Button": import
                CardContentType enum from Card.types
              </li>
              <li>
                We support Priority 1 and Priority 2 to render content in the card. Use Priority 1 to render content in
                small card: import Priority enum from Card.types
              </li>
            </ul>
          </div>
        }
        donts={
          <div>
            <ul>
              <li>
                Do not create your own <i>priority values</i>, use the <b>Priority</b> enum by importing from Card.Types
              </li>
              <li>
                Do not create your own <i>ContentType values</i>, use the <b>ContentType</b> enum by importing from
                Card.Types
              </li>
              <li>
                Do not create your own <i>card size values</i>, use the <b>CardSize</b> enum by importing from
                Card.Types
              </li>
            </ul>
          </div>
        }
      />
    );
  }
}
