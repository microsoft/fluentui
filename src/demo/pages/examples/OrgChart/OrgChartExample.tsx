import * as React from 'react';
import OrgChart from '../../../../components/OrgChart';

export default class OrgChartExample extends React.Component<any, any> {
  public render() {
    return (
      <div className='OrgChartExample'>
        <h1>OrgChart</h1>
        <OrgChart />
      </div>
    );
  }

}
