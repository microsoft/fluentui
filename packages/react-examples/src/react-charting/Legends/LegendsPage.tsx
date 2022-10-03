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
import { LegendStyledExample } from './Legends.Styled.Example';

const LegendsOverflowExampleCode = require('!raw-loader?esModule=false!@fluentui/react-examples/src/react-charting/Legends/Legends.Overflow.Example.tsx') as string;
const LegendsWrapLinesExampleCode = require('!raw-loader?esModule=false!@fluentui/react-examples/src/react-charting/Legends/Legends.WrapLines.Example.tsx') as string;
const LegendsBasicExampleCode = require('!raw-loader?esModule=false!@fluentui/react-examples/src/react-charting/Legends/Legends.Basic.Example.tsx') as string;
const LegendsStyledExampleCode = require('!raw-loader?esModule=false!@fluentui/react-examples/src/react-charting/Legends/Legends.Styled.Example.tsx') as string;

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
              A legend describes each of the component of the chart. The legends wrap based upon the space available for
              them. If there is not enough space to show all legends on a single line, the legends fall into an overflow
              menu. A button is shown to open the overflow menu and indicating the number of legends in it.
            </p>
            <h4>Legend Actions</h4>
            <p>
              The legends are selectable. Action to be performed upon clicking a certain legend can be customized. Refer
              to the <code>action, hoverAction and onMouseOutAction</code> properties to customize these actions.
            </p>
            <h4>Legend shapes and colors</h4>
            <p>
              Use <code>shape</code> to customize the legend shape. Legend support different shapes like rectangle,
              triangle, diamond, circle, pyramid, hexagon etc. Use <code>stripePattern</code> to have stripe pattern
              applied to the legend shape. If <code>isLineLegendInBarChart</code> is set, the legend will have the shape
              of a line with height 4px. All other legend shapes have a height of 12px
            </p>
            <h4>Legend overflow</h4>
            <p>
              <code>overflowText</code> describes the overflow text. <code>overflowProps</code> can be used to set
              properties like overflow layout direction to be stacked/vertical, overflow side to be start/end, overflow
              styling and more.
            </p>
          </div>
        }
      />
    );
  }
}
