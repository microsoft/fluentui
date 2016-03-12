import * as React from 'react';
import {
  Link
} from '../../../components/index';
import {
  ExampleCard,
  PropertiesTable
} from '../../components/index';
import TableProps from './TableProps';

import TableBasicExample from './examples/Table.Basic.Example';
let TableBasicExampleCode = require('./examples/Table.Basic.Example.tsx');

export default class TablePage extends React.Component<any, any> {
  public render() {
    return (
      <div>
        <h1 className='ms-font-xxl'>Table</h1>
        <div><Link target='_blank' text='Tables' url='http://dev.office.com/fabric/components/table' /> render data in a grid, and provide callbacks for common behaviors.</div>
        <h2 className='ms-font-xl'>Examples</h2>
        <ExampleCard title='Table' code={ TableBasicExampleCode }>
          <TableBasicExample />
        </ExampleCard>
        <PropertiesTable properties={ TableProps } />
      </div>
    );
  }

}
