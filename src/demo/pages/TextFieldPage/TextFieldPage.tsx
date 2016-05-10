import * as React from 'react';
import {
  Link
} from '../../../components/index';
import {
  ExampleCard,
  PropertiesTableSet
} from '../../components/index';

import TextFieldBasicExample from './examples/TextField.Basic.Example';
import TextFieldErrorMessageExample from './examples/TextField.ErrorMessage.Example';
let TextFieldBasicExampleCode = require('./examples/TextField.Basic.Example.tsx');
let TextFieldErrorMessageExampleCode = require('./examples/TextField.ErrorMessage.Example.tsx');

export default class TextFieldPage extends React.Component<any, any> {
  public render() {
    return (
      <div className='TextFieldExample'>
        <h1 className='ms-font-xxl'>TextField</h1>
        <div>
          <Link target='_blank' href='http://dev.office.com/fabric/components/textfields'>TextFields</Link>
          <span> allow the user to enter text.</span>
        </div>
        <h2 className='ms-font-xl'>Examples</h2>
        <ExampleCard title='TextField variations' code={ TextFieldBasicExampleCode }>
          <TextFieldBasicExample />
        </ExampleCard>
        <ExampleCard title='TextField error message variations' code={ TextFieldErrorMessageExampleCode }>
          <TextFieldErrorMessageExample />
        </ExampleCard>
        <PropertiesTableSet componentName='TextField' />
      </div>
    );
  }
}
