import * as React from 'react';
import {
  ExampleCard,
  IComponentDemoPageProps,
  ComponentPage,
  PropertiesTableSet
} from '@uifabric/example-app-base';
import { ActivityItemCompactExample } from './examples/Activity.Item.Compact.Example';
import { ActivityItemPersonaExample } from './examples/Activity.Item.Persona.Example';
import { ActivityItemCommentExample } from './examples/Activity.Item.Comment.Example';
import { ActivityItemIconExample } from './examples/Activity.Item.Icon.Example';
import { ActivityItemCustomExample } from './examples/Activity.Item.Custom.Example';

const ActivityItemCompactExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/ActivityItem/examples/Activity.Item.Compact.Example.tsx') as string;
const ActivityItemPersonaExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/ActivityItem/examples/Activity.Item.Persona.Example.tsx') as string;
const ActivityItemCommentExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/ActivityItem/examples/Activity.Item.Comment.Example.tsx') as string;
const ActivityItemIconExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/ActivityItem/examples/Activity.Item.Icon.Example.tsx') as string;
const ActivityItemCustomExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/ActivityItem/examples/Activity.Item.Icon.Example.tsx') as string;

export class ActivityItemPage extends React.Component<IComponentDemoPageProps, {}> {
  public render() {
    return (
      <ComponentPage
        title='Activity Item'
        componentName='ActivityItemExample'
        exampleCards={
          <div>
            <ExampleCard title='Compact Activity Items' code={ ActivityItemCompactExampleCode }>
              <ActivityItemCompactExample />
            </ExampleCard>
            <ExampleCard title='Activity Items with Personas' code={ ActivityItemPersonaExampleCode }>
              <ActivityItemPersonaExample />
            </ExampleCard>
            <ExampleCard title='Commenting Activity Items' code={ ActivityItemCommentExampleCode }>
              <ActivityItemCommentExample />
            </ExampleCard>
            <ExampleCard title='File Activity Items' code={ ActivityItemIconExampleCode }>
              <ActivityItemIconExample />
            </ExampleCard>
            <ExampleCard title='Activity Items with Custom Renderers' code={ ActivityItemCustomExampleCode }>
              <ActivityItemCustomExample />
            </ExampleCard>
          </div>
        }
        propertiesTables={
          <PropertiesTableSet
            sources={ [
              require<string>('!raw-loader!office-ui-fabric-react/src/components/ActivityItem/ActivityItem.Props.ts')
            ] }
          />
        }
        overview={
          <div>
            <p>
              A single unit of a user's activity, such as editing a file or leaving a comment.
            </p>
          </div>
        }
        bestPractices={
          <div></div>
        }
        dos={
          <div>
            <ul>
              <li>Show a user's activity.</li>
            </ul>
          </div>
        }
        donts={
          <div>
            <ul>
              <li>Not show a user's activity.</li>
            </ul>
          </div>
        }
        isHeaderVisible={ this.props.isHeaderVisible }>
      </ComponentPage>
    );
  }
}
