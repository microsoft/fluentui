import * as React from 'react';
import {
  Link
} from '../../../components/index';
import {
  ExampleCard,
  PropertiesTable
} from '../../components/index';
import DialogProps from './DialogProps';

import DialogBasicExample from './examples/Dialog.Basic.Example';
let DialogBasicExampleCode = require('./examples/Dialog.Basic.Example.tsx');

export default class DialogPage extends React.Component<any, any> {
  public render() {
    return (
      <div className='ms-DialogPage'>
        <h1 className='ms-font-xxl'>Dialog</h1>
        <div><Link target='_blank' text='Dialogs' url='http://dev.office.com/fabric/components/dialog' /> are used to render a modal window.</div>
        <h2 className='ms-font-xl'>Examples</h2>
        <ExampleCard title='Dialog' code={ DialogBasicExampleCode }>
          <DialogBasicExample />
        </ExampleCard>
        <PropertiesTable properties={ [] } />
      </div>
    );
  }
}
