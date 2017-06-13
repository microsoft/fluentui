import * as React from 'react';
import {
  ExampleCard,
  IComponentDemoPageProps,
  ComponentPage,
  PropertiesTableSet
} from '@uifabric/example-app-base';
import { ActivityItemExample } from './examples/Activity.Item.Example';

const ActivityItemExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/ActivityItem/examples/Activity.Item.Example.tsx') as string;

export class ActivityItemPage extends React.Component<IComponentDemoPageProps, {}> {
  public render() {
    return (
      <ComponentPage
        title='Activity Item'
        componentName='ActivityItemExample'
        exampleCards={
          <div>
            <ExampleCard title='Activity Item' code={ ActivityItemExampleCode }>
              <ActivityItemExample />
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
