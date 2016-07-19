import * as React from 'react';
import {
  Link
} from '../../../index';
import {
  ExampleCard,
  PropertiesTableSet
} from '../../components/index';

import { ProgressIndicatorBasicExample } from './examples/ProgressIndicator.Basic.Example';
const ProgressIndicatorBasicExampleCode = require('./examples/ProgressIndicator.Basic.Example.tsx');

export class ProgressIndicatorPage extends React.Component<any, any> {

  public render() {
    return (
      <div className='ProgressIndicatorExample'>
        <h1 className='ms-font-xxl'>ProgressIndicator</h1>
        <div>
          <Link target='_blank' href='http://dev.office.com/fabric/components/ProgressIndicator'>ProgressIndicators</Link>
          <span> allow the user to see the status of activities. Unlike the Spinner, ProgressIndicator should accurately display the progress of the activity while the Spinner is used when the time is indeterminate.</span>
        </div>

        <h2 className='ms-font-xl'>Examples</h2>

        <ExampleCard title='ProgressIndicator' code={ ProgressIndicatorBasicExampleCode }>
          <ProgressIndicatorBasicExample />
        </ExampleCard>

        <PropertiesTableSet componentName='ProgressIndicator' />
      </div>
    );
  }
}
