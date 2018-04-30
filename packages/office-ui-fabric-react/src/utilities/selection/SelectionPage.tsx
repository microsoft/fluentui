import * as React from 'react';
import {
  ExampleCard,
  ComponentPage,
  PageMarkdown,
  IComponentDemoPageProps
} from '@uifabric/example-app-base';

import { SelectionBasicExample } from './examples/Selection.Basic.Example';

const SelectionBasicExampleCode = require('!raw-loader!office-ui-fabric-react/src/utilities/selection/examples/Selection.Basic.Example.tsx') as string;

export class SelectionPage extends React.Component<IComponentDemoPageProps, {}> {
  public render(): JSX.Element {
    return (
      <ComponentPage
        title='Selection'
        componentName='SelectionExample'
        componentUrl='https://github.com/OfficeDev/office-ui-fabric-react/tree/master/packages/office-ui-fabric-react/src/utilities/selection'
        exampleCards={
          <ExampleCard title='Basic Selection Example' code={ SelectionBasicExampleCode }>
            <SelectionBasicExample />
          </ExampleCard>
        }
        overview={
          <PageMarkdown>
            { require<string>('!raw-loader!office-ui-fabric-react/src/utilities/selection/docs/SelectionOverview.md') }
          </PageMarkdown>
        }
        isHeaderVisible={ this.props.isHeaderVisible }
      />
    );
  }

}