import * as React from 'react';
import {
  Link
} from '../../../components/index';
import {
  ExampleCard,
  PropertiesTable
} from '../../components/index';
import TextFieldProps from './TextFieldProps';

import TextFieldBasicExample from './examples/TextField.Basic.Example';
let TextFieldBasicExampleCode = require('./examples/TextField.Basic.Example.tsx');

export default class TextFieldExample extends React.Component<any, any> {
  public render() {
    return (
      <div className='TextFieldExample'>
        <h1 className='ms-font-xxl'>TextField</h1>
        <div><Link target='_blank' text='TextFields' url='http://dev.office.com/fabric/components/textfields' /> allow the user to enter text.</div>
        <h2 className='ms-font-xl'>Examples</h2>
        <ExampleCard title='TextField variations' code={ TextFieldBasicExampleCode }>
          <TextFieldBasicExample />
        </ExampleCard>
        <PropertiesTable properties={ TextFieldProps } />
      </div>
    );
  }
}
