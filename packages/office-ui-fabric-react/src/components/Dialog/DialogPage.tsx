import * as React from 'react';
import {
  ExampleCard,
  IComponentDemoPageProps,
  ComponentPage,
  PropertiesTableSet
} from '@uifabric/example-app-base';
import { DialogBasicExample } from './examples/Dialog.Basic.Example';
import { DialogLargeHeaderExample } from './examples/Dialog.LargeHeader.Example';
import { DialogBlockingExample } from './examples/Dialog.Blocking.Example';

const DialogBasicExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/Dialog/examples/Dialog.Basic.Example.tsx') as string;
const DialogLargeHeaderExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/Dialog/examples/Dialog.LargeHeader.Example.tsx') as string;
const DialogBlockingExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/Dialog/examples/Dialog.Blocking.Example.tsx') as string;

export class DialogPage extends React.Component<IComponentDemoPageProps, {}> {
  public render() {
    return (
      <ComponentPage
        title='Dialog'
        componentName='DialogExample'
        exampleCards={
          <div>
            <ExampleCard title='Dialog' code={ DialogBasicExampleCode }>
              <DialogBasicExample />
            </ExampleCard>
            <ExampleCard title='Dialog Large Header' code={ DialogLargeHeaderExampleCode }>
              <p>
                Use this Dialog sparingly, when calling extra attention to the content. It can be used in situations where you want to teach the user something or notify them of an important change.
              </p>
              <DialogLargeHeaderExample />
            </ExampleCard>
            <ExampleCard title='Dialog Blocking' code={ DialogBlockingExampleCode }>
              <p>
                A blocking Dialog disables all other actions and commands on the page behind it. They should be used very sparingly, only when it is critical that the user makes a choice or provides information before they can proceed. Blocking Dialogs are generally used for irreversible or potentially destructive tasks.
              </p>
              <DialogBlockingExample />
            </ExampleCard>
          </div>
        }
        propertiesTables={
          <PropertiesTableSet
            sources={ [
              require<string>('!raw-loader!office-ui-fabric-react/src/components/Dialog/Dialog.Props.ts')
            ] }
          />
        }
        overview={
          <div>
            <p>
              Dialogs are temporary, modal UI overlay that generally provide contextual app information or require user confirmation/input. In most cases, Dialogs block interactions with the web page or application until being explicitly dismissed, and often request action from the user. They are primarily used for lightweight creation or edit tasks, and simple management tasks.
            </p>
          </div>
        }
        bestPractices={
          <div></div>
        }
        dos={
          <div>
            <ul>
              <li>Use Dialogs for quick, actionable interactions, such as making a choice or needing the user to provide information.</li>
              <li>When possible, try a non-blocking Dialog before resorting to a blocking Dialog.</li>
              <li>Only include information needed to help users make a decision.</li>
              <li>Button text should reflect the actions available to the user (e.g. save, delete).</li>
              <li>Validate that the user's entries are acceptable before closing the Dialog. Show an inline validation error near the field they must correct.</li>
            </ul>
          </div>
        }
        donts={
          <div>
            <ul>
              <li>Don’t overuse Dialogs. To some extent they can be perceived as interrupting workflow, and too many can be a bad user experience.</li>
              <li>Avoid "Are you sure?" or confirmation Dialogs unless the user is making an irreversible or destructive choice.</li>
              <li>Do not use a blocking Dialog unless absolutely necessary because they are very disruptive.</li>
              <li>Don’t have long sentences or complicated choices.</li>
              <li>Avoid generic button labels like "Ok" if you can be more specific about the action a user is about to complete. </li>
              <li>Don't dismiss the Dialog if underlying problem is not fixed. Don't put the user back into a broken/error state.</li>
              <li>Don't provide the user with more than 3 buttons.</li>
            </ul>
          </div>
        }
        isHeaderVisible={ this.props.isHeaderVisible }>
      </ComponentPage>
    );
  }
}