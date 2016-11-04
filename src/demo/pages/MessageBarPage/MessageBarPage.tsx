import * as React from 'react';
import {
  ExampleCard,
  PropertiesTableSet,
  ComponentPage
} from '../../components/index';

import { MessageBarBasicExample } from './examples/MessageBar.Basic.Example';
import { getPageRouteFromState } from '../../utilities/pageroute';
import { AppState } from '../../components/App/AppState';
import { IComponentDemoPageProps } from '../../components/ComponentPage/IComponentDemoPageProps';

const MessageBarBasicExampleCode = require('./examples/MessageBar.Basic.Example.tsx');

export class MessageBarPage extends React.Component<IComponentDemoPageProps, any> {
  private _url: string;

  constructor() {
    super();
    this._url = getPageRouteFromState(AppState, 'Basic components', 'MessageBar');
  }

  public render() {
    return (
      <ComponentPage
        title='MessageBar'
        componentName='MessageBarExample'
        exampleCards={
          <ExampleCard
            title='Various MessageBar types'
            code={ MessageBarBasicExampleCode }>
            <MessageBarBasicExample />
          </ExampleCard>
        }
        propertiesTables={
          <div>
            <PropertiesTableSet componentName='MessageBar' />,
            <p>Besides the above properties, the <code>MessageBar</code> component accepts all properties that the React <code>MessageBar</code> and <code>a</code> components accept.</p>
          </div>
        }
        overview={
          <div>
            <p>
              A MessageBar is an area at the top of a primary view that displays relevant status information. You can use a MessageBar to tell the user about a situation that does not require their immediate attention and therefore does not need to block other activities.
            </p>
          </div>
        }
        bestPractices={
          <div></div>
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
          <a href='https://github.com/OfficeDev/office-ui-fabric-js/blob/master/ghdocs/components/MessageBar.md'>Fabric JS</a>
        }
        route={ this._url }
        isHeaderVisible={ this.props.isHeaderVisible }>
      </ComponentPage>
    );
  }

}
