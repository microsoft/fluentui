import * as React from 'react';
import ProgressIndicator from '../../../../components/ProgressIndicator/index';
import Link from '../../../../components/Link/index';
import ExampleCard from '../../../components/ExampleCard/index';
import PropertiesTable from '../../../components/PropertiesTable/index';
import ProgressIndicatorProperties from './ProgressIndicatorProperties';

let NormalProgressIndicator = require('./ProgressIndicator.txt');

export interface IProgressIndicatorExampleState {
    percentComplete: number;
}

export default class ProgressIndicatorExample extends React.Component<any, any> {

  constructor() {
    super();

    this.state = {
        percentComplete: 0
    };
  }

  public componentDidMount() {
    setInterval(() => {
      this.setState({
          percentComplete: (this.state.percentComplete + .1) % 1
      });
    }, 250);
  }

  public render() {
    let { percentComplete } = this.state;

    return (
      <div className='ProgressIndicatorExample'>
        <h1 className='ms-font-xxl'>ProgressIndicator</h1>
        <div><Link target='_blank' text='ProgressIndicators' url='http://dev.office.com/fabric/components/ProgressIndicator' />. A simple, determinate progress indicator that allows the user to see the status of activities.Unlike the Spinner, ProgressIndicator should accurately display the progress of the activity while the Spinner is used when the time is indeterminate.</div>

        <PropertiesTable properties={ ProgressIndicatorProperties } />

        <h2 className='ms-font-xl'>Examples</h2>

        <ExampleCard title='ProgressIndicator' code={ NormalProgressIndicator }>
          <ProgressIndicator
            title='Example title'
            description='Example description'
            percentComplete={ percentComplete } />
        </ExampleCard>
      </div>
    );
  }
}
