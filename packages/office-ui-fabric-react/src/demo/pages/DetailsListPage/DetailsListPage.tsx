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
import { IComponentDemoPageProps } from '../../components/ComponentPage/IComponentDemoPageProps';

import { DetailsListBasicExample } from './examples/DetailsList.Basic.Example';
const DetailsListBasicExampleCode = require('./examples/DetailsList.Basic.Example.tsx');

import { DetailsListCustomColumnsExample } from './examples/DetailsList.CustomColumns.Example';
const DetailsListCustomColumnsExampleCode = require('./examples/DetailsList.CustomColumns.Example.tsx');

import { DetailsListCustomRowsExample } from './examples/DetailsList.CustomRows.Example';
const DetailsListCustomRowsExampleCode = require('./examples/DetailsList.CustomRows.Example.tsx');

import { DetailsListCustomGroupHeadersExample } from './examples/DetailsList.CustomGroupHeaders.Example';
const DetailsListCustomGroupHeadersExampleCode = require('./examples/DetailsList.CustomGroupHeaders.Example.tsx');

import { DetailsListAdvancedExample } from './examples/DetailsList.Advanced.Example';
const DetailsListAdvancedExampleCode = require('./examples/DetailsList.Advanced.Example.tsx');

export class DetailsListPage extends React.Component<IComponentDemoPageProps, any> {
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
          <div>
            <ExampleCard title='Simple DetailsList with 500 items, filtering, marquee selection' isOptIn={ true } code={ DetailsListBasicExampleCode }>
              <DetailsListBasicExample />
            </ExampleCard>
            <ExampleCard title='Rendering custom item columns with sorting' isOptIn={ true } code={ DetailsListCustomColumnsExampleCode }>
              <DetailsListCustomColumnsExample />
            </ExampleCard>
            <ExampleCard title='Rendering custom item rows' isOptIn={ true } code={ DetailsListCustomRowsExampleCode }>
              <DetailsListCustomRowsExample />
            </ExampleCard>,
            <ExampleCard title='Rendering custom group headers' isOptIn={ true } code={ DetailsListCustomGroupHeadersExampleCode }>
              <DetailsListCustomGroupHeadersExample />
            </ExampleCard>
            <ExampleCard title='Advanced DetailsList of 5000 items, variable row heights' isOptIn={ true } code={ DetailsListAdvancedExampleCode }>
              <DetailsListAdvancedExample />
            </ExampleCard>
          </div>
        }
        propertiesTables={
          <PropertiesTableSet componentName='DetailsList' />
        }
        overview={
          <div>
            <p>
              DetailsList is a derivative of the <Link href='#/examples/list'>List</Link> component. It is a robust way to display an information rich collection of items. It can support powerful ways to aid a user in finding content with sorting, grouping and filtering. Lists are a great way to handle large amounts of content, but poorly designed Lists can be difficult to parse.
            </p>
            <p>
              Use a DetailsList when density of information is critical. Lists can support single and multiple selection, as well as drag and drop and marquee selection. They are composed of a column header, which contains the metadata fields which are attached to the list items, and provide the ability to sort, filter and even group the list. List items are composed of selection, icon, and name columns at minimum. One can also include other columns such as Date Modified, or any other metadata field associated with the collection. Place the most important columns from left to right for ease of recall and comparison.
            </p>
            <p>
              DetailsList is classically used to display files, but is also used to render custom lists that can be purely metadata. Avoid using file type icon overlays to denote status of a file as it can make the entire icon unclear. Be sure to leave ample width for each column’s data. If there are multiple lines of text in a column, consider the variable row height variant.
            </p>
          </div>
        }
        bestPractices={
          <div></div>
        }
        dos={
          <div>
            <ul>
              <li>Use them to display content.</li>
              <li>Provide useful columns of metadata.</li>
              <li>Display columns in order of importance left to right or right to left depending on the standards of the culture.</li>
              <li>Give columns ample default width to display information.</li>
            </ul>
          </div>
        }
        donts={
          <div>
            <ul>
              <li>Use them to display commands or settings.</li>
              <li>Overload the view with too many columns that require excessive horizontal scrolling.</li>
              <li>Make columns so narrow that it truncates the information in typical cases.</li>
            </ul>
          </div>
        }
        route={ this._url }
        isHeaderVisible={ this.props.isHeaderVisible }>
      </ComponentPage>
    );
  }
}
