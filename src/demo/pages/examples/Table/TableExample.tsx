import * as React from 'react';
import Table from '../../../../components/Table/index';
import Link from '../../../../components/Link/index';
import ExampleCard from '../../../components/ExampleCard/index';
import PropertiesTable from '../../../components/PropertiesTable/index';

export default class TableExample extends React.Component<any, any> {
  public render() {
    return (
      <div className='TableExample'>
        <h1 className='ms-font-xxl'>Table</h1>
        <div><Link target='_blank' text='Tables' url='http://dev.office.com/fabric/components/table' /> render data in a grid, and provide callbacks for common behaviors.</div>

        <PropertiesTable properties={ [] } />

        <h2 className='ms-font-xl'>Examples</h2>

        <ExampleCard title='Table'>
          <Table />
        </ExampleCard>
      </div>
    );
  }

}
