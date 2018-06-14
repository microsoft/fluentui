import * as React from 'react';
import { ExampleCard, IComponentDemoPageProps, ComponentPage, PropertiesTableSet } from '@uifabric/example-app-base';
import { DashboardGridLayoutExample } from './examples/DashboardGridLayout.example';
const DashboardGridLayoutExampleCode = require('!raw-loader!@uifabric/experiments/src/components/DashboardGridLayout/examples/DashboardGridLayout.Example.tsx') as string;

export class DashboardGridLayoutPage extends React.Component<IComponentDemoPageProps, {}> {
  public render(): JSX.Element {
    return (
      <ComponentPage
        title="Basic"
        componentName="DashboardGridLayout"
        exampleCards={
          <div>
            <ExampleCard title="DashboardGridLayout" isOptIn={true} code={DashboardGridLayoutExampleCode}>
              <DashboardGridLayoutExample />
            </ExampleCard>
          </div>
        }
        propertiesTables={
          <PropertiesTableSet
            sources={[
              require<
                string
              >('!raw-loader!@uifabric/experiments/src/components/DashboardGridLayout/DashboardGridLayout.types.ts')
            ]}
            renderOnly={['IDashboardGridLayoutProps', 'DashboardGridBreakpointLayouts', 'IDashboardCardLayout']}
          />
        }
        overview={
          <div>
            This component is built using <a href="https://github.com/STRML/react-grid-layout">react-grid-layout</a>{' '}
            with a specific layout and breakpoint constraint for dashboard with cards.
          </div>
        }
        bestPractices={<div />}
        dos={
          <div>
            <ul>
              <li>Use the layout property to define how cards should load for the first time</li>
              <li>
                Use the optional draggable property to define whether or not items in dashboard are draggable or not
              </li>
              <li>
                Use the fabric cards inside of this dashboard since breakpoints and column constraints work best with a
                card component
              </li>
            </ul>
          </div>
        }
        donts={
          <div>
            <ul>
              <li>
                Use this grid layout for a list format (if no layout is specific as property, it will show all children
                in one column
              </li>
            </ul>
          </div>
        }
        isHeaderVisible={this.props.isHeaderVisible}
      />
    );
  }
}
