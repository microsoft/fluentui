import * as React from 'react';
import {
  ExampleCard,
  PropertiesTableSet,
  ComponentPage
} from '../../components/index';

import { DialogBasicExample } from './examples/Dialog.Basic.Example';
import { DialogLargeHeaderExample } from './examples/Dialog.LargeHeader.Example';
import { DialogCloseExample } from './examples/Dialog.Close.Example';
import { DialogBlockingExample } from './examples/Dialog.Blocking.Example';
import { getPageRouteFromState } from '../../utilities/pageroute';
import { AppState } from '../../components/App/AppState';
import { IComponentDemoPageProps } from '../../components/ComponentPage/IComponentDemoPageProps';

const DialogBasicExampleCode = require('./examples/Dialog.Basic.Example.tsx');
const DialogLargeHeaderExampleCode = require('./examples/Dialog.LargeHeader.Example.tsx');
const DialogCloseExampleCode = require('./examples/Dialog.Close.Example.tsx');
const DialogBlockingExampleCode = require('./examples/Dialog.Blocking.Example.tsx');

export class DialogPage extends React.Component<IComponentDemoPageProps, any> {
  private _url: string;

  constructor() {
    super();
    this._url = getPageRouteFromState(AppState, 'Basic components', 'Dialog');
  }

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
            <ExampleCard title='Dialog Close' code={ DialogCloseExampleCode }>
              <p>
                Use a Dialog with an explicit close button when the user is able to close the Dialog without providing the necessary information that it asks for. This is the most common type of dialog; it is generally used for user initiated actions that they change their mind about, or other non-critical information.
              </p>
              <DialogCloseExample />
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
          <div>
            <PropertiesTableSet componentName='Dialog' />
          </div>
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
        related={
          <a href='https://github.com/OfficeDev/office-ui-fabric-js/blob/master/ghdocs/components/Dialog.md'>Fabric JS</a>
        }
        route={ this._url }
        isHeaderVisible={ this.props.isHeaderVisible }>
      </ComponentPage>
    );
  }
}
