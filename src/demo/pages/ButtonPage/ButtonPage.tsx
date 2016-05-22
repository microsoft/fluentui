import * as React from 'react';
import {
   Link
} from '../../../index';
import {
  ExampleCard,
  PropertiesTableSet
} from '../../components/index';

import { ButtonBasicExample } from './examples/Button.Basic.Example';

const ButtonBasicExampleCode = require('./examples/Button.Basic.Example.tsx');

export class ButtonPage extends React.Component<any, any> {
  public render() {
    return (
      <div className='ButtonExample'>
        <h1 className='ms-font-xxl'>Button</h1>
        <div>
          <Link target='_blank' href='http://dev.office.com/fabric/components/button'>Buttons</Link>
          <span> are used typically in dialogs and for starting an operation.</span>
        </div>
        <h2 className='ms-font-xl'>Examples</h2>

        <ExampleCard
          title='Various button types'
          code={ ButtonBasicExampleCode }
        >
          <ButtonBasicExample />
        </ExampleCard>

        <PropertiesTableSet componentName='Button' />
        <p>Besides the above properties, the <code>Button</code> component accepts all properties that the React <code>button</code> and <code>a</code> components accept.</p>
      </div>
    );
  }

}
