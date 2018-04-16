import * as React from 'react';
import {
  ExampleCard,
  ComponentPage,
  IComponentDemoPageProps,
  PropertiesTableSet,
  PageMarkdown
} from '@uifabric/example-app-base';
import { ComponentStatus } from '../../demo/ComponentStatus/ComponentStatus';
import { ActivityItemStatus } from './ActivityItem.checklist';
import { ActivityItemBasicExample } from './examples/ActivityItem.Basic.Example';
import { ActivityItemPersonaExample } from './examples/ActivityItem.Persona.Example';
import { ActivityItemCompactExample } from './examples/ActivityItem.Compact.Example';

const ActivityItemBasicExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/ActivityItem/examples/ActivityItem.Basic.Example.tsx') as string;
const ActivityItemPersonaExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/ActivityItem/examples/ActivityItem.Persona.Example.tsx') as string;
const ActivityItemCompactExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/ActivityItem/examples/ActivityItem.Compact.Example.tsx') as string;

export class ActivityItemPage extends React.Component<IComponentDemoPageProps, {}> {
  public render() {
    return (
      <ComponentPage
        title='ActivityItem'
        componentName='ActivityItem'
        componentUrl='https://github.com/OfficeDev/office-ui-fabric-react/blob/master/packages/office-ui-fabric-react/src/components/ActivityItem/'
        exampleCards={
          <div>
            <ExampleCard title='Activity Items with Icons' code={ ActivityItemBasicExampleCode }>
              <ActivityItemBasicExample />
            </ExampleCard>
            <ExampleCard title='Activity Items with Personas' code={ ActivityItemPersonaExampleCode }>
              <ActivityItemPersonaExample />
            </ExampleCard>
            <ExampleCard title='Compact Activity Items' code={ ActivityItemCompactExampleCode }>
              <ActivityItemCompactExample />
            </ExampleCard>
          </div>
        }
        propertiesTables={
          <PropertiesTableSet
            sources={ [
              require<string>('!raw-loader!office-ui-fabric-react/src/components/ActivityItem/ActivityItem.types.ts')
            ] }
          />
        }
        overview={
          <PageMarkdown>
            { require<string>('!raw-loader!office-ui-fabric-react/src/components/ActivityItem/docs/ActivityItemOverview.md') }
          </PageMarkdown>
        }
        bestPractices={
          <div />
        }
        dos={
          <PageMarkdown>
            { require<string>('!raw-loader!office-ui-fabric-react/src/components/ActivityItem/docs/ActivityItemDos.md') }
          </PageMarkdown>
        }
        donts={
          <PageMarkdown>
            { require<string>('!raw-loader!office-ui-fabric-react/src/components/ActivityItem/docs/ActivityItemDonts.md') }
          </PageMarkdown>
        }
        isHeaderVisible={ this.props.isHeaderVisible }
        componentStatus={
          <ComponentStatus
            { ...ActivityItemStatus }
          />
        }
      />
    );
  }

}
