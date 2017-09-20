import * as React from 'react';
import {
  ExampleCard,
  IComponentDemoPageProps,
  ComponentPage,
  PropertiesTableSet
} from '@uifabric/example-app-base';
import { MessageBarBasicExample } from './examples/MessageBar.Basic.Example';
import { ComponentStatus } from '../../demo/ComponentStatus/ComponentStatus';
import { MessageBarStatus } from './MessageBar.checklist';

const MessageBarBasicExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/MessageBar/examples/MessageBar.Basic.Example.tsx') as string;

export class MessageBarPage extends React.Component<IComponentDemoPageProps, {}> {
  public render() {
    return (
      <ComponentPage
        title='MessageBar'
        componentName='MessageBarExample'
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
              require<string>('!raw-loader!office-ui-fabric-react/src/components/MessageBar/MessageBar.Props.ts')
            ] }
          />
        }
        overview={
          <div>
            <p>
              A MessageBar is an area at the top of a primary view that displays relevant status information. You can use a MessageBar to tell the user about a situation that does not require their immediate attention and therefore does not need to block other activities.
            </p>
          </div>
        }
        bestPractices={
          <div />
        }
        dos={
          <div>
            <ul>
              <li>Place the message bar near the top of the relevant view, in a highly visible but unobtrusive location.</li>
              <li>Keep the text very brief. Be succinct and your users are more likely to read everything you say.</li>
              <li>Consider how localization may affect the message. Translation to other languages may add up to 33% more characters to the string length.</li>
              <li>Use the right variant for the type and urgency of the particular message (see variants)</li>
            </ul>
          </div>
        }
        donts={
          <div>
            <ul>
              <li>Don’t use paragraphs, long sentences, or special formatting in a MessageBar. The control tries to grow to accommodate all the text and will just result in pushing the user’s main content too low on the view.</li>
              <li>Don’t use buttons when a subtler link will suffice. Reserve the usage of button for when the MessageBar has a single ”hero” action that has vital usefulness to the user at that particular moment. Using more than one button is discouraged.
              </li>
            </ul>
          </div>
        }
        related={
          <a href='https://dev.office.com/fabric-js/Components/MessageBar/MessageBar.html'>Fabric JS</a>
        }
        isHeaderVisible={ this.props.isHeaderVisible }
        componentStatus={
          <ComponentStatus
            {...MessageBarStatus}
          />
        }
      />
    );
  }

}
