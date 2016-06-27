import * as React from 'react';
import {
   Link
} from '../../../index';
import {
  ExampleCard,
  PropertiesTableSet
} from '../../components/index';

import { MessageBarBasicExample } from './examples/MessageBar.Basic.Example';

const MessageBarBasicExampleCode = require('./examples/MessageBar.Basic.Example.tsx');

export class MessageBarPage extends React.Component<any, any> {
  public render() {
    return (
      <div className='MessageBarExample'>
        <h1 className='ms-font-xxl'>MessageBar</h1>
        <div>
          <Link target='_blank' href='http://dev.office.com/fabric/components/MessageBar'>MessageBars</Link>
          <span> are used typically to inform the user like a notification.</span>
        </div>
        <h2 className='ms-font-xl'>Examples</h2>

        <ExampleCard
          title='Various MessageBar types'
          code={ MessageBarBasicExampleCode }
        >
          <MessageBarBasicExample />
        </ExampleCard>

        <PropertiesTableSet componentName='MessageBar' />
        <p>Besides the above properties, the <code>MessageBar</code> component accepts all properties that the React <code>MessageBar</code> and <code>a</code> components accept.</p>
      </div>
    );
  }

}
