import * as React from 'react';
import {
   Link
} from '../../../components/index';
import {
  ExampleCard,
  PropertiesTable
} from '../../components/index';
import ButtonProps from './ButtonProps';

import ButtonBasicExample from './examples/Button.Basic.Example';
let ButtonBasicExampleCode = require('./examples/Button.Basic.Example.tsx');

export default class ButtonPage extends React.Component<any, any> {
  public render() {
    return (
      <div className='ButtonExample'>
        <h1 className='ms-font-xxl'>Button</h1>
        <div><Link  target='_blank' text='Buttons' url='http://dev.office.com/fabric/components/button' /> are used typically in dialogs and for starting an operation.</div>
        <h2 className='ms-font-xl'>Examples</h2>

        <ExampleCard
          title='Various button types'
          code={ ButtonBasicExampleCode }
        >
          <ButtonBasicExample />
        </ExampleCard>

        <PropertiesTable properties={ ButtonProps } />
        <p>Besides the above properties, the <code>Button</code> component accepts all properties that the React <code>button</code> component accepts.</p>
      </div>
    );
  }

}
