import * as React from 'react';
import {
   Link
} from '../../../index';
import {
  ExampleCard,
  PropertiesTableSet,
  ComponentPage
} from '../../components/index';

import { MessageBarBasicExample } from './examples/MessageBar.Basic.Example';
import { getPageRouteFromState } from '../../utilities/pageroute';
import { AppState } from '../../components/App/AppState';

const MessageBarBasicExampleCode = require('./examples/MessageBar.Basic.Example.tsx');

export class MessageBarPage extends React.Component<any, any> {
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
          [
            <ExampleCard
              title='Various MessageBar types'
              code={ MessageBarBasicExampleCode }>
              <MessageBarBasicExample />
            </ExampleCard>
          ]
        }
        propertiesTables={
          [
            <PropertiesTableSet componentName='MessageBar' />,
            <p>Besides the above properties, the <code>MessageBar</code> component accepts all properties that the React <code>MessageBar</code> and <code>a</code> components accept.</p>
          ]
        }
        overview={
          <div>
            <Link target='_blank' href='http://dev.office.com/fabric/components/MessageBar'>MessageBars</Link>
            <span> are used typically to inform the user like a notification.</span>
          </div>
        }
        route={ this._url }>
      </ComponentPage>
    );
  }

}
