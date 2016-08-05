import * as React from 'react';
import {
  Link
} from '../../../index';
import {
  ExampleCard,
  PropertiesTableSet
} from '../../components/index';

import { DetailsListBasicExample } from './examples/DetailsList.Basic.Example';
const DetailsListBasicExampleCode = require('./examples/DetailsList.Basic.Example.tsx');

import { DetailsListCustomColumnsExample } from './examples/DetailsList.CustomColumns.Example';
const DetailsListCustomColumnsExampleCode = require('./examples/DetailsList.CustomColumns.Example.tsx');

import { DetailsListAdvancedExample } from './examples/DetailsList.Advanced.Example';
const DetailsListAdvancedExampleCode = require('./examples/DetailsList.Advanced.Example.tsx');

export class DetailsListPage extends React.Component<any, any> {

  public render() {
    return (
      <div className='ms-DetailsListPage'>
        <h1 className='ms-font-xxl'>DetailsList</h1>
        <p>
          <Link target='_blank' href='http://dev.office.com/fabric/components/DetailsList'>DetailsList</Link>
          <span> is a derivative of </span>
          <Link href='#/examples/list'>List</Link>
          <span> and provides a sortable, filterable, justified table for rendering large sets of items. This component replaces the Table Component.</span>
        </p>
        <h2 className='ms-font-xl'>Examples</h2>
        <ExampleCard title='Simple DetailsList with 500 items' isOptIn={ true } code={ DetailsListBasicExampleCode }>
          <DetailsListBasicExample />
        </ExampleCard>
        <ExampleCard title='Rendering custom item columns with sorting' isOptIn={ true } code={ DetailsListCustomColumnsExampleCode }>
          <DetailsListCustomColumnsExample />
        </ExampleCard>
        <ExampleCard title='Advanced DetailsList of 5000 items, variable row heights' isOptIn={ true } code={ DetailsListAdvancedExampleCode }>
          <DetailsListAdvancedExample />
        </ExampleCard>
        <PropertiesTableSet componentName='DetailsList' />
      </div>
    );
  }

}
