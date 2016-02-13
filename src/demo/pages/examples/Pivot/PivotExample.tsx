import * as React from 'react';
import Pivot from '../../../../components/Pivot';
import Link from '../../../../components/Link';
import ExampleCard from '../../../components/ExampleCard';
import PropertiesTable from '../../../components/PropertiesTable';

export default class PivotExample extends React.Component<any, any> {
  public render() {
    return (
      <div className='PivotExample'>
        <h1 className='ms-font-xxl'>Pivot</h1>
        <div><Link text='Pivots' url='http://dev.office.com/fabric/components/Pivot' /> are ...TODO</div>

        <PropertiesTable properties={ [] } />

        <h2 className='ms-font-xl'>Examples</h2>

        <ExampleCard title='Pivot'>
          <Pivot />
        </ExampleCard>
      </div>
    );
  }

}
