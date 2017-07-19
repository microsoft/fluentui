import * as React from 'react';
import {
  ExampleCard,
  ComponentPage,
  IComponentDemoPageProps,
  PropertiesTableSet
} from '@uifabric/example-app-base';
import { ScrollablePaneDefaultExample } from './examples/ScrollablePane.Default.Example';
import { ScrollablePaneDetailsListExample } from './examples/ScrollablePane.DetailsList.Example';

const ScrollablePaneDefaultExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/ScrollablePane/examples/ScrollablePane.Default.Example.tsx') as string;

const ScrollablePaneDetailsListExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/ScrollablePane/examples/ScrollablePane.DetailsList.Example.tsx') as string;

export class ScrollablePanePage extends React.Component<IComponentDemoPageProps, {}> {
  public render() {
    return (
      <ComponentPage
        title='ScrollablePane'
        componentName='ScrollablePaneExample'
        exampleCards={
          <div>
            <ExampleCard title='Default' code={ ScrollablePaneDefaultExampleCode }>
              <ScrollablePaneDefaultExample />
            </ExampleCard>
            <ExampleCard title='DetailsList Locked Header' code={ ScrollablePaneDetailsListExampleCode }>
              <ScrollablePaneDetailsListExample />
            </ExampleCard>
          </div>
        }
        propertiesTables={
          <PropertiesTableSet
            sources={ [
              require<string>('!raw-loader!office-ui-fabric-react/src/components/ScrollablePane/ScrollablePane.Props.ts')
            ] }
          />
        }
        overview={
          <div>
            <p>
              ScrollablePane is a helper component designed to use in conjunction with a Sticky component.  ScrollablePane will find the nearest scrollable parent element, and designate that as the container for Sticky components.  Sticky components will "stick" to the top or bottom of a ScrollablePane's scrollable region and remain visible.
            </p>
          </div>
        }
        bestPractices={
          <div></div>
        }
        dos={
          <div>
            <ul>
              <li>Designate the cloest scrollable parent with the attribute data-is-scrollable=true</li>
              <li>Use Sticky component on block level elements</li>
              <li>Sticky component are ideally section headers and/or footers</li>
            </ul>
          </div>
        }
        donts={
          <div>
            <ul>
              <li>Don't use Sticky on elements with margin top or bottom</li>
            </ul>
          </div>
        }
        isHeaderVisible={ this.props.isHeaderVisible }>
      </ComponentPage>
    );
  }

}
