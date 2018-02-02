import * as React from 'react';
import {
  ExampleCard,
  IComponentDemoPageProps,
  ComponentPage,
  PropertiesTableSet
} from '@uifabric/example-app-base';

import { CoachmarkBasicExample } from './examples/Coachmark.Basic.Example';
const CoachmarkBasicExampleCode =
  require('!raw-loader!experiments/src/components/Coachmark/examples/Coachmark.Basic.Example.tsx') as string;

export class CoachmarkPage extends React.Component<IComponentDemoPageProps, {}> {
  public render(): JSX.Element {
    return (
      <ComponentPage
        title='Coachmark'
        componentName='Coachmark'
        exampleCards={
          <div>
            <ExampleCard title='Coachmark Basic' isOptIn={ true } code={ CoachmarkBasicExampleCode }>
              <CoachmarkBasicExample />
            </ExampleCard>
          </div>
        }
        propertiesTables={
          <PropertiesTableSet
            sources={ [
              require<string>('!raw-loader!experiments/src/components/coachmark/Coachmark.types.ts')
            ] }
          />
        }
        overview={
          <div>
            <p>Coachmarks are used to draw a persons attention to a part of the UI, and increase engagement with that element
               in the product.</p>

            <p>
              They should be contextual whenever possible, or related to something that will make existing user flows more efficient
            </p>
          </div>
        }
        bestPractices={
          <div />
        }
        dos={
          <div>
            <ul>
              <li>Only one coachmark + callout combo will be displayed at a time</li>
              <li>Coachmarks can be stand alone or sequential. Sequential coachmarks should be used sparingly, to walk through complex
                multi-step interactions. It is recommended that a sequence of coachmakrs does not exceed 3 steps.</li>
              <li>Coachmarks are designed to only hold Callouts.</li>
            </ul>
          </div>
        }
        donts={
          <div>
            <ul>
              <li>Coachmark size, color, and animation should not be altered.</li>
              <li>Don't show the coachmark more than once even if the user has not completed the action.</li>
            </ul>
          </div>
        }
        isHeaderVisible={ this.props.isHeaderVisible }
      />
    );
  }
}