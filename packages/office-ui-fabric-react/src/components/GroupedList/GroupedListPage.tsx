import * as React from 'react';
import {
  ExampleCard,
  IComponentDemoPageProps,
  ComponentPage,
  PageMarkdown,
  PropertiesTableSet
} from '@uifabric/example-app-base';
import { GroupedListBasicExample } from './examples/GroupedList.Basic.Example';
import { GroupedListCustomExample } from './examples/GroupedList.Custom.Example';
import { ComponentStatus } from '../../demo/ComponentStatus/ComponentStatus';
import { GroupedListStatus } from './GroupedList.checklist';

const GroupedListBasicExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/GroupedList/examples/GroupedList.Basic.Example.tsx') as string;
const GroupedListCustomExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/GroupedList/examples/GroupedList.Custom.Example.tsx') as string;

export class GroupedListPage extends React.Component<IComponentDemoPageProps, {}> {
  public render(): JSX.Element {
    return (
      <ComponentPage
        title='GroupedList'
        componentName='GroupedListExample'
        componentUrl='https://github.com/OfficeDev/office-ui-fabric-react/tree/master/packages/office-ui-fabric-react/src/components/GroupedList'
        exampleCards={
          <div>
            <ExampleCard title='GroupedList basic example' isOptIn={ true } code={ GroupedListBasicExampleCode }>
              <GroupedListBasicExample />
            </ExampleCard>
            <ExampleCard title='GroupedList example with custom header and footer' isOptIn={ true } code={ GroupedListCustomExampleCode }>
              <GroupedListCustomExample />
            </ExampleCard>
          </div>
        }
        propertiesTables={
          <PropertiesTableSet
            sources={ [
              require<string>('!raw-loader!office-ui-fabric-react/src/components/GroupedList/GroupedList.types.ts')
            ] }
          />
        }
        overview={
          <PageMarkdown>
            { require<string>('!raw-loader!office-ui-fabric-react/src/components/GroupedList/docs/GroupedListOverview.md') }
          </PageMarkdown>
        }
        isHeaderVisible={ this.props.isHeaderVisible }
        componentStatus={
          <ComponentStatus
            { ...GroupedListStatus }
          />
        }
      />
    );
  }

}
