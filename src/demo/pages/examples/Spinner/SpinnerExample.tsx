import * as React from 'react';
import Spinner from '../../../../components/Spinner';

export default class SpinnerExample extends React.Component<any, any> {
  public render() {
    return (
      <div className='SpinnerExample'>
        <h1>Spinner</h1>
        <Spinner />
      </div>
    );
  }

}
