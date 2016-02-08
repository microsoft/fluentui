import * as React from 'react';
import Pivot from '../../../components/pivot/Pivot';

export default class PivotExample extends React.Component<any, any> {
  public render() {
    return (
      <div className='PivotExample'>
        <h1>Pivot</h1>
        <Pivot />
      </div>
    );
  }

}
