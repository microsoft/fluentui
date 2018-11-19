import * as React from 'react';
import { ExampleCard, IComponentDemoPageProps, ComponentPage, PropertiesTableSet } from '@uifabric/example-app-base';
import { DashboardGridLayoutExample } from './examples/DashboardGridLayout.Example';
import { DashboardGridLayoutCardExample } from './examples/DashboardGridLayout.Card.Example';
import { DashboardGridLayoutSectionsExample } from './examples/DashboardGridLayout.Sections.Example';
import { DashboardGridLayoutSectionsNoncollapsibleExample } from './examples/DashboardGridLayout.SectionsNonCollapse.Example';
import { DashboardGridLayoutSectionsWithCardNodesExample } from './examples/DashboardGridLayout.Sections.WithCardNodes.Example';
import { DashboardGridLayoutDragApiExample } from './examples/DashboardGridLayout.DragApi.Example';
const DashboardGridLayoutExampleCode = require('!raw-loader!@uifabric/dashboard/src/components/DashboardGridLayout/examples/DashboardGridLayout.Example.tsx') as string;
const DashboardGridLayoutCardExampleCode = require('!raw-loader!@uifabric/dashboard/src/components/DashboardGridLayout/examples/DashboardGridLayout.Card.Example.tsx') as string;
const DashboardGridLayoutSectionsExampleCode = require('!raw-loader!@uifabric/dashboard/src/components/DashboardGridLayout/examples/DashboardGridLayout.Sections.Example.tsx') as string;
const DashboardGridLayoutSectionsNoncollapsibleExampleCode = require('!raw-loader!@uifabric/dashboard/src/components/DashboardGridLayout/examples/DashboardGridLayout.SectionsNonCollapse.Example.tsx') as string;
const DashboardGridLayoutSectionsWithCardNodesExampleCode = require('!raw-loader!@uifabric/dashboard/src/components/DashboardGridLayout/examples/DashboardGridLayout.Sections.WithCardNodes.Example.tsx') as string;
const DashboardGridLayoutDragApiExampleCode = require('!raw-loader!@uifabric/dashboard/src/components/DashboardGridLayout/examples/DashboardGridLayout.DragApi.Example.tsx') as string;

export class DashboardGridLayoutPage extends React.Component<IComponentDemoPageProps, {}> {
  public render(): JSX.Element {
    return (
      <ComponentPage
        title="DashboardGridLayout"
        componentName="DashboardGridLayout"
        exampleCards={
          <div>
            <ExampleCard title="DashboardGridLayout" isScrollable={true} isOptIn={true} code={DashboardGridLayoutExampleCode}>
              <DashboardGridLayoutExample />
            </ExampleCard>
            <ExampleCard
              title="DashboardGridLayout with cards"
              isScrollable={true}
              isOptIn={true}
              code={DashboardGridLayoutCardExampleCode}
            >
              <DashboardGridLayoutCardExample />
            </ExampleCard>
            <ExampleCard
              title="DashboardGridLayout with non-collapsible sections and cards as JSX elements "
              isScrollable={true}
              isOptIn={true}
              code={DashboardGridLayoutSectionsWithCardNodesExampleCode}
            >
              <DashboardGridLayoutSectionsWithCardNodesExample />
            </ExampleCard>
            <ExampleCard
              title="DashboardGridLayout with non-collapsible sections"
              isScrollable={true}
              isOptIn={true}
              code={DashboardGridLayoutSectionsNoncollapsibleExampleCode}
            >
              <DashboardGridLayoutSectionsNoncollapsibleExample />
            </ExampleCard>
            <ExampleCard
              title="DashboardGridLayout with collapsible sections (work in progress)"
              isScrollable={true}
              isOptIn={true}
              code={DashboardGridLayoutSectionsExampleCode}
            >
              <DashboardGridLayoutSectionsExample />
            </ExampleCard>
            <ExampleCard
              title="DashboardGridLayout with drag api"
              isScrollable={true}
              isOptIn={true}
              code={DashboardGridLayoutDragApiExampleCode}
            >
              <DashboardGridLayoutDragApiExample />
            </ExampleCard>
          </div>
        }
        propertiesTables={
          <PropertiesTableSet
            sources={[require<string>('!raw-loader!@uifabric/dashboard/src/components/DashboardGridLayout/DashboardGridLayout.types.ts')]}
          />
        }
        overview={
          <div>
            This component is built using <a href="https://github.com/STRML/react-grid-layout">react-grid-layout</a> with a specific layout
            and breakpoint constraint for dashboard with cards.
          </div>
        }
        bestPractices={<div />}
        dos={
          <div>
            <ul>
              <li>Use the layout property to define how cards should load for the first time</li>
              <li>Use the optional draggable property to define whether or not items in dashboard are draggable or not</li>
              <li>
                Use the fabric cards inside of this dashboard since breakpoints and column constraints work best with a card component
              </li>
            </ul>
          </div>
        }
        donts={
          <div>
            <ul>
              <li>Use this grid layout in a single column, or with invalid layout property which will cause it to render in one column</li>
            </ul>
          </div>
        }
        isHeaderVisible={this.props.isHeaderVisible}
      />
    );
  }
}
