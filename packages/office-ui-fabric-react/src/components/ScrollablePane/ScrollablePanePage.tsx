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
              require<string>('!raw-loader!office-ui-fabric-react/src/components/Panel/Panel.Props.ts')
            ] }
          />
        }
        overview={
          <div>
            <p>
              @TODO Add ScrollablePane Description
            </p>
          </div>
        }
        bestPractices={
          <div></div>
        }
        dos={
          <div>
            <ul>
              <li>@TODO Add Dos for ScrollablePane</li>
            </ul>
          </div>
        }
        donts={
          <div>
            <ul>
              <li>@TODO Add Donts for ScrollablePane</li>
            </ul>
          </div>
        }
        isHeaderVisible={ this.props.isHeaderVisible }>
      </ComponentPage>
    );
  }

}
