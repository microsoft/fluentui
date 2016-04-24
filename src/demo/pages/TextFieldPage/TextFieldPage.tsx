import * as React from 'react';
import {
  Link
} from '../../../components/index';
import {
  ExampleCard,
  PropertiesTableSet
} from '../../components/index';

import TextFieldBasicExample from './examples/TextField.Basic.Example';
let TextFieldBasicExampleCode = require('./examples/TextField.Basic.Example.tsx');

export default class TextFieldPage extends React.Component<any, any> {
  public render() {
    return (
      <div className='TextFieldExample'>
        <h1 className='ms-font-xxl'>TextField</h1>
        <div>
          <Link target='_blank' href='http://dev.office.com/fabric/components/textfields'>TextFields</Link>
          allow the user to enter text.
        </div>
        <h2 className='ms-font-xl'>Examples</h2>
        <ExampleCard title='TextField variations' code={ TextFieldBasicExampleCode }>
          <TextFieldBasicExample />
        </ExampleCard>
        <PropertiesTableSet componentName='TextField' />
      </div>
    );
  }
}
