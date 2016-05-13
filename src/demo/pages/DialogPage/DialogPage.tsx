import * as React from 'react';
import {
  Link
} from '../../../index';
import {
  ExampleCard,
  PropertiesTableSet
} from '../../components/index';

import DialogBasicExample from './examples/Dialog.Basic.Example';
let DialogBasicExampleCode = require('./examples/Dialog.Basic.Example.tsx');

import DialogLargeHeaderExample from './examples/Dialog.LargeHeader.Example';
let DialogLargeHeaderExampleCode = require('./examples/Dialog.LargeHeader.Example.tsx');

import DialogCloseExample from './examples/Dialog.Close.Example';
let DialogCloseExampleCode = require('./examples/Dialog.Close.Example.tsx');

import DialogBlockingExample from './examples/Dialog.Blocking.Example';
let DialogBlockingExampleCode = require('./examples/Dialog.Blocking.Example.tsx');

export default class DialogPage extends React.Component<any, any> {

  public render() {
    return (
      <div className='ms-DialogPage'>
        <h1 className='ms-font-xxl'>Dialog</h1>
        <div>
          <Link target='_blank' href='http://dev.office.com/fabric/components/dialog'>Dialogs</Link>
          <span> are used to render a modal window.</span>
        </div>
        <h2 className='ms-font-xl'>Examples</h2>
        <ExampleCard title='Dialog' code={ DialogBasicExampleCode }>
          <DialogBasicExample />
        </ExampleCard>

        <ExampleCard title='Dialog Large Header' code={ DialogLargeHeaderExampleCode }>
          <DialogLargeHeaderExample />
        </ExampleCard>

        <ExampleCard title='Dialog Close' code={ DialogCloseExampleCode }>
          <DialogCloseExample />
        </ExampleCard>

        <ExampleCard title='Dialog Blocking' code={ DialogBlockingExampleCode }>
          <DialogBlockingExample />
        </ExampleCard>

        <PropertiesTableSet componentName='Dialog' />
      </div>
    );
  }
}
