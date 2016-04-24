import * as React from 'react';
import {
  Link
} from '../../../components/index';
import {
  ExampleCard,
  PropertiesTable
} from '../../components/index';
import LabelProps from './LabelProps';

import LabelBasicExample from './examples/Label.Basic.Example';
let LabelBasicExampleCode = require('./examples/Label.Basic.Example.tsx');

export default class LabelPage extends React.Component<any, any> {
  public render() {
    return (
      <div className='ms-LabelExample'>
        <h1 className='ms-font-xxl'>Label</h1>
        <div>
          <Link target='_blank' href='http://dev.office.com/fabric/components/label'>Labels</Link>
          render a text string.
        </div>
        <h2 className='ms-font-xl'>Examples</h2>
        <ExampleCard title='Label' code={ LabelBasicExampleCode }>
          <LabelBasicExample/>
        </ExampleCard>
        <PropertiesTable properties={ LabelProps } />
      </div>
    );
  }

}
