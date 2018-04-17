import * as React from 'react';
import {
  ExampleCard,
  ComponentPage,
  PageMarkdown,
  IComponentDemoPageProps
} from '@uifabric/example-app-base';

import { MarqueeSelectionBasicExample } from './examples/MarqueeSelection.Basic.Example';

const MarqueeSelectionBasicExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/MarqueeSelection/examples/MarqueeSelection.Basic.Example.tsx') as string;

export class MarqueeSelectionPage extends React.Component<IComponentDemoPageProps, any> {
  public render(): JSX.Element {
    return (
      <ComponentPage
        title='MarqueeSelection'
        componentName='MarqueeSelectionExample'
        componentUrl='https://github.com/OfficeDev/office-ui-fabric-react/tree/master/packages/office-ui-fabric-react/src/components/MarqueeSelection'
        exampleCards={
          <ExampleCard title='Basic Selection Example' code={ MarqueeSelectionBasicExampleCode }>
            <MarqueeSelectionBasicExample />
          </ExampleCard>
        }
        overview={
          <PageMarkdown>
            { require<string>('!raw-loader!office-ui-fabric-react/src/components/MarqueeSelection/docs/MarqueeSelectionOverview.md') }
          </PageMarkdown>
        }
        isHeaderVisible={ this.props.isHeaderVisible }
      />
    );
  }

}