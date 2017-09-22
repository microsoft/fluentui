import * as React from 'react';
import {
  ExampleCard,
  ComponentPage,
  IComponentDemoPageProps,
  PropertiesTableSet
} from '@uifabric/example-app-base';
import './examples/ActivityItem.Example.scss';
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
              require<string>('!raw-loader!office-ui-fabric-react/src/components/ActivityItem/ActivityItem.Props.ts')
            ] }
          />
        }
        overview={
          <div>
            <p>
              ActivityItems represent individual units of a user's activity, such as making a comment, mentioning someone with an @mention, editing a document, or moving a file.
            </p>
          </div>
        }
        bestPractices={
          <div></div>
        }
        dos={
          <div>
            <ul>
              <li>Use a list of multiple ActivityItems to indicate a history of events relating to a single file, folder, user, or other entity. Alternatively, use a single ActivityItem to indicate the most recent event on an entity.</li>
              <li>Group multiple similar events occuring near the same time into single ActivityItems.</li>
            </ul>
          </div>
        }
        donts={
          <div>
            <ul>
              <li>Use ActivityItems to render large amounts of body text, they are meant to be concise descriptions of a specific activity.</li>
            </ul>
          </div>
        }
        isHeaderVisible={ this.props.isHeaderVisible }>
      </ComponentPage>
    );
  }

}
