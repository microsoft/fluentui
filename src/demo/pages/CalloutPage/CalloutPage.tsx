import * as React from 'react';
import {
  Link
} from '../../../components/index';
import {
  ExampleCard,
  PropertiesTable
} from '../../components/index';
import CalloutProps from './CalloutProps';
import CalloutBasicExample from './examples/Callout.Basic.Example';
let CalloutBasicExampleCode = require('./examples/Callout.Basic.Example.tsx');

export default class CalloutPage extends React.Component<any, any> {
  public render() {
    return (
      <div className='ms-CalloutPage'>
        <h1 className='ms-font-xxl'>Callout</h1>
        <div><Link target='_blank' text='Callouts' url='http://dev.office.com/fabric/components/callout' /> are used to notify the user of something special.</div>
        <h2 className='ms-font-xl'>Examples</h2>
        <ExampleCard title='Simple callout' code={ CalloutBasicExampleCode }>
          <CalloutBasicExample />
        </ExampleCard>
        <PropertiesTable properties={ CalloutProps } />
      </div>
    );
  }

}
