import * as React from 'react';
import Link from '../../../../components/Link/index';
import ExampleCard from '../../../components/ExampleCard/index';
import PropertiesTable from '../../../components/PropertiesTable/index';
import './DetailsListExample.scss';

import BasicExample from './examples/Basic.Example';
let BasicExampleCode = require('./examples/Basic.Example.tsx');

export default class DetailsListExample extends React.Component<any, any> {
  public render() {
    return (
      <div className='DetailsListExample'>
        <h1 className='ms-font-xxl'>DetailsList</h1>
        <p>
          <Link target='_blank' text='DetailsList' url='http://dev.office.com/fabric/components/DetailsList' /> is a derivative of <Link text='List' url='#/examples/list' /> and provides a sortable, filterable, justified table for rendering large sets of items.
        </p>

        <PropertiesTable properties={ [] } />

        <h2 className='ms-font-xl'>Examples</h2>

        <ExampleCard title='DetailsList of 20000 items, variable row heights' isOptIn={ true } code={ BasicExampleCode }>
          <BasicExample />
        </ExampleCard>
      </div>
    );
  }
}