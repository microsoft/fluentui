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
        bestPractices={<div />}
        dos={
          <div>
            <ul>
              <li>
                Use shimmer to help ease a UI transition when we know the service will potentially take a longer amount of time to retrieve
                the data.
              </li>
              <li>
                Provide widths for each of the shimmer elements you used to build a skeleton layout looking as close as possible to real
                content it is replacing.
              </li>
              <li>
                Use <code>isDataLoaded</code> prop to trigger the transition once we have the data from the service. The Shimmer UI should
                Fade out while the real UI Fades In.
              </li>
              <li>Use shimmer if you know the UI loading time is longer than 1 second.</li>
              <li>
                Provide an ETA as quickly as possible to help the user understand that the system isn’t broken if you use shimmer and the
                delay is longer than 10 seconds you must.
              </li>
              <li>Provide shimmer designs for the breakpoints that your experience is supported in.</li>
            </ul>
          </div>
        }
        donts={
          <div>
            <ul>
              <li>Use on the same element both types of widths. It will always default to just one of them. See documentation below.</li>
              <li>
                Build Shimmer UI should with a lot of details. Circles and rectangles are really as detailed as you want to get. Adding more
                detail will result in confusion once the UI loads.
              </li>
              <li>Use shimmer if you are confident that the UI will take less than a second to load.</li>
              <li>Use shimmer as a way to not make improvements in your code to improve performance.</li>
            </ul>
          </div>
        }
        isHeaderVisible={this.props.isHeaderVisible}
      />
    );
  }
}
