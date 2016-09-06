import * as React from 'react';
import {
  Link
} from '../../../index';
import {
  ExampleCard,
  PropertiesTableSet,
  ComponentPage
} from '../../components/index';

import { getPageRouteFromState } from '../../utilities/pageroute';
import { AppState } from '../../components/App/AppState';

import { DetailsListBasicExample } from './examples/DetailsList.Basic.Example';
const DetailsListBasicExampleCode = require('./examples/DetailsList.Basic.Example.tsx');

import { DetailsListCustomColumnsExample } from './examples/DetailsList.CustomColumns.Example';
const DetailsListCustomColumnsExampleCode = require('./examples/DetailsList.CustomColumns.Example.tsx');

import { DetailsListCustomRowsExample } from './examples/DetailsList.CustomRows.Example';
const DetailsListCustomRowsExampleCode = require('./examples/DetailsList.CustomRows.Example.tsx');

import { DetailsListAdvancedExample } from './examples/DetailsList.Advanced.Example';
const DetailsListAdvancedExampleCode = require('./examples/DetailsList.Advanced.Example.tsx');

export class DetailsListPage extends React.Component<any, any> {
 private _url: string;

  constructor() {
    super();
    this._url = getPageRouteFromState(AppState, 'Basic components', 'DetailsList');
  }

  public render() {
    return (
      <ComponentPage
        title='DetailsList'
        componentName='DetailsListExample'
        exampleCards={
          [
            <ExampleCard title='Simple DetailsList with 500 items, filtering, marquee selection' isOptIn={ true } code={ DetailsListBasicExampleCode }>
              <DetailsListBasicExample />
            </ExampleCard>,
            <ExampleCard title='Rendering custom item columns with sorting' isOptIn={ true } code={ DetailsListCustomColumnsExampleCode }>
              <DetailsListCustomColumnsExample />
            </ExampleCard>,
            <ExampleCard title='Rendering custom item rows' isOptIn={ true } code={ DetailsListCustomRowsExampleCode }>
              <DetailsListCustomRowsExample />
            </ExampleCard>,
            <ExampleCard title='Advanced DetailsList of 5000 items, variable row heights' isOptIn={ true } code={ DetailsListAdvancedExampleCode }>
              <DetailsListAdvancedExample />
            </ExampleCard>
          ]
        }
        propertiesTables={
          [
            <PropertiesTableSet componentName='DetailsList' />
          ]
        }
        overview={
          <div>
            <Link target='_blank' href='http://dev.office.com/fabric/components/DetailsList'>DetailsList</Link>
            <span> is a derivative of </span>
            <Link href='#/examples/list'>List</Link>
            <span> and provides a sortable, filterable, justified table for rendering large sets of items. This component replaces the Table Component.</span>
          </div>
        }
        route={ this._url }>
      </ComponentPage>
    );
  }
}
