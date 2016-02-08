import * as React from 'react';
import ProgressIndicator from '../../../components/progressIndicator/ProgressIndicator';

export default class ProgressIndicatorExample extends React.Component<any, any> {
  public render() {
    return (
      <div className='ProgressIndicatorExample'>
        <h1>ProgressIndicator</h1>
        <ProgressIndicator />
      </div>
    );
  }

}
