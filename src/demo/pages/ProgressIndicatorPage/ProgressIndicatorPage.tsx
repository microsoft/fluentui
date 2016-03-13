import * as React from 'react';
import {
  Link
} from '../../../components/index';
import {
  ExampleCard,
  PropertiesTable
} from '../../components/index';
import ProgressIndicatorProps from './ProgressIndicatorProps';

import ProgressIndicatorBasicExample from './examples/ProgressIndicator.Basic.Example';
let ProgressIndicatorBasicExampleCode = require('./examples/ProgressIndicator.Basic.Example.tsx');

export default class ProgressIndicatorPage extends React.Component<any, any> {

  public render() {
    return (
      <div className='ProgressIndicatorExample'>
        <h1 className='ms-font-xxl'>ProgressIndicator</h1>
        <div><Link target='_blank' text='ProgressIndicators' url='http://dev.office.com/fabric/components/ProgressIndicator' />. A simple, determinate progress indicator that allows the user to see the status of activities.Unlike the Spinner, ProgressIndicator should accurately display the progress of the activity while the Spinner is used when the time is indeterminate.</div>

        <h2 className='ms-font-xl'>Examples</h2>

        <ExampleCard title='ProgressIndicator' code={ ProgressIndicatorBasicExampleCode }>
          <ProgressIndicatorBasicExample />
        </ExampleCard>

        <PropertiesTable properties={ ProgressIndicatorProps } />
      </div>
    );
  }
}
