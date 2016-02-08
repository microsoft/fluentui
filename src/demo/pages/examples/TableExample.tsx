import * as React from 'react';
import Table from '../../../components/table/Table';

export default class TableExample extends React.Component<any, any> {
  public render() {
    return (
      <div className='TableExample'>
        <h1>Table</h1>
        <Table />
      </div>
    );
  }

}
