import * as React from 'react';
import {
  ComponentPage,
  ExampleCard,
  IComponentDemoPageProps,
  PropertiesTableSet,
  ComponentStatus
} from '@uifabric/example-app-base';
import { Link } from 'office-ui-fabric-react/lib/Link';
import { ModalBasicExample } from './examples/Modal.Basic.Example';
import { ComponentStatusState } from '../../demo/ComponentStatus/ComponentStatusState';

const ModalBasicExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/Modal/examples/Modal.Basic.Example.tsx') as string;

export class ModalPage extends React.Component<IComponentDemoPageProps, {}> {
  public render() {
    return (
      <ComponentPage
        title='Modal'
        componentName='ModalExample'
        exampleCards={
          <div>
            <ExampleCard title='Modal' code={ ModalBasicExampleCode }>
              <ModalBasicExample />
            </ExampleCard>
          </div>
        }
        propertiesTables={
          <PropertiesTableSet
            sources={ [
              require<string>('!raw-loader!office-ui-fabric-react/src/components/Modal/Modal.Props.ts')
            ] }
          />
        }
        overview={
          <div>
            <p>
              Modals are temporary, modal UI overlay that generally provide contextual app information or require user confirmation/input, or can be used to advertise new app features. In some cases, Modals block interactions with the web page or application until being explicitly dismissed. They are can be used for lightweight creation or edit tasks and simple management tasks, or for hosting heavier temporary content.
            </p>
            <p>
              For usage requiring a quick choice from the user, <Link href='#/components/dialog'>Dialog</Link> may be a more appropriate control.
            </p>
          </div>
        }
        bestPractices={
          <div />
        }
        dos={
          <div>
            <ul>
              <li>Use Modals for actionable interactions, such as needing the user to provide information or change settings.</li>
              <li>When possible, try a non-blocking Modal before resorting to a blocking Modal.</li>
            </ul>
          </div>
        }
        donts={
          <div>
            <ul>
              <li>Don’t overuse Modals. In some cases they can be perceived as interrupting workflow, and too many can be a bad user experience.</li>
            </ul>
          </div>
        }
        isHeaderVisible={ this.props.isHeaderVisible }
        componentStatus={
          <ComponentStatus
            {...ComponentStatusState.Modal}
          />
        }
      />
    );
  }
}
