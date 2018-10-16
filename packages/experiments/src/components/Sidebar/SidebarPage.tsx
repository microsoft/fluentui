import * as React from 'react';
import { ExampleCard, ComponentPage, IComponentDemoPageProps, PropertiesTableSet } from '@uifabric/example-app-base';
import { SidebarBasicExample } from './examples/Sidebar.Basic.Example';
import { SidebarCollapsibleExample } from './examples/Sidebar.Collapsed.Example';

// tslint:disable-next-line:no-var-requires
const SidebarBasicExampleCode = require('!raw-loader!@uifabric/experiments/src/components/Sidebar/examples/Sidebar.Basic.Example.tsx') as string;
// tslint:disable-next-line:no-var-requires
const SidebarCollpasibleExampleCode = require('!raw-loader!@uifabric/experiments/src/components/Sidebar/examples/Sidebar.Collapsed.Example.tsx') as string;

export class SidebarPage extends React.Component<IComponentDemoPageProps, {}> {
  public render(): JSX.Element {
    return (
      <ComponentPage
        title={'Sidebar'}
        componentName="SidebarExample"
        exampleCards={
          <div>
            <div className="sidebar-basic-example">
              <ExampleCard title="Sidebar Basic, not Collapsible" code={SidebarBasicExampleCode}>
                <SidebarBasicExample />
              </ExampleCard>
            </div>
            <div className="sidebar-collapsed-example">
              <ExampleCard title="Sidebar Collapsible" code={SidebarCollpasibleExampleCode}>
                <SidebarCollapsibleExample />
              </ExampleCard>
            </div>
          </div>
        }
        propertiesTables={
          <PropertiesTableSet sources={[require<string>('!raw-loader!@uifabric/experiments/src/components/Sidebar/Sidebar.types.tsx')]} />
        }
        overview={
          <div>
            <p>Sidebar navigation component. If the sidebar is collapsible, the collapse button is shown on the top.</p>
            <p>
              The sidebar uses a list of items to render the vertical navigation. Items are rendered as Sidebar buttons by default. If an
              item has a buttonAs or onRender property, these properties will be used to render the item instead. If not, but a
              defaultButton property is specified on the sidebar, the default button will be used for button rendering. Items should have an
              icon and a label if they are used in a collapsible sidebar.
            </p>
            <p>
              Custom styling for the sidebar is done by passing in a ISidebarStyles object. And example of this can be seen in the basic
              example below.
            </p>
          </div>
        }
        isHeaderVisible={this.props.isHeaderVisible}
      />
    );
  }
}
