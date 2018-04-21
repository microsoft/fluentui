import * as React from 'react';
import {
  ExampleCard,
  IComponentDemoPageProps,
  ComponentPage,
  PageMarkdown,
  PropertiesTableSet
} from '@uifabric/example-app-base';
import { MessageBarBasicExample } from './examples/MessageBar.Basic.Example';
import { ComponentStatus } from '../../demo/ComponentStatus/ComponentStatus';
import { MessageBarStatus } from './MessageBar.checklist';

const MessageBarBasicExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/MessageBar/examples/MessageBar.Basic.Example.tsx') as string;

export class MessageBarPage extends React.Component<IComponentDemoPageProps, {}> {
  public render(): JSX.Element {
    return (
      <ComponentPage
        title='MessageBar'
        componentName='MessageBarExample'
        componentUrl='https://github.com/OfficeDev/office-ui-fabric-react/tree/master/packages/office-ui-fabric-react/src/components/MessageBar'
        exampleCards={
          <ExampleCard
            title='Various MessageBar types'
            code={ MessageBarBasicExampleCode }
          >
            <MessageBarBasicExample />
          </ExampleCard>
        }
        propertiesTables={
          <PropertiesTableSet
            sources={ [
              require<string>('!raw-loader!office-ui-fabric-react/src/components/MessageBar/MessageBar.types.ts')
            ] }
          />
        }
        overview={
          <PageMarkdown>
            { require<string>('!raw-loader!office-ui-fabric-react/src/components/MessageBar/docs/MessageBarOverview.md') }
          </PageMarkdown>
        }
        bestPractices={
          <div />
        }
        dos={
          <PageMarkdown>
            { require<string>('!raw-loader!office-ui-fabric-react/src/components/MessageBar/docs/MessageBarDos.md') }
          </PageMarkdown>
        }
        donts={
          <PageMarkdown>
            { require<string>('!raw-loader!office-ui-fabric-react/src/components/MessageBar/docs/MessageBarDonts.md') }
          </PageMarkdown>
        }
        isHeaderVisible={ this.props.isHeaderVisible }
        componentStatus={
          <ComponentStatus
            { ...MessageBarStatus }
          />
        }
      />
    );
  }

}
