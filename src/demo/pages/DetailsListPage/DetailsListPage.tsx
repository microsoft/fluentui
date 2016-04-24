import * as React from 'react';
import {
  Link
} from '../../../components/index';
import {
  ExampleCard,
  PropertiesTableSet
} from '../../components/index';

import DetailsListBasicExample from './examples/DetailsList.Basic.Example';
let DetailsListBasicExampleCode = require('./examples/DetailsList.Basic.Example.tsx');

export default class DetailsListPage extends React.Component<any, any> {

  public render() {
    return (
      <div className='ms-DetailsListPage'>
        <h1 className='ms-font-xxl'>DetailsList</h1>
        <p>
          <Link target='_blank' href='http://dev.office.com/fabric/components/DetailsList'>DetailsList</Link>
          is a derivative of
          <Link href='#/examples/list'>List</Link>
          and provides a sortable, filterable, justified table for rendering large sets of items. This component replaces the Table Component.
        </p>
        <h2 className='ms-font-xl'>Examples</h2>
        <ExampleCard title='DetailsList of 20000 items, variable row heights' isOptIn={ false } code={ DetailsListBasicExampleCode }>
          <DetailsListBasicExample />
        </ExampleCard>
        <PropertiesTableSet componentName='DetailsList' />
      </div>
    );
  }

}
