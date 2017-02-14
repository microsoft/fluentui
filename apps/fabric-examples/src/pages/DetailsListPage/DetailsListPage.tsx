import * as React from 'react';
import { Link } from 'office-ui-fabric-react/lib/Link';
import { Link } from '../../../Link';
import { Button, ButtonType } from '../../../Button';
import {
  ExampleCard,
  PropertiesTableSet,
  ComponentPage
} from '../../components/demoComponents';

import { getPageRouteFromState } from '../../utilities/pageroute';
import { AppState } from '../../components/App/AppState';
import { IComponentDemoPageProps } from '../../components/ComponentPage/IComponentDemoPageProps';

import { DetailsListBasicExample } from './examples/DetailsList.Basic.Example';
const DetailsListBasicExampleCode = require('./examples/DetailsList.Basic.Example.tsx') as string;

import { DetailsListCustomColumnsExample } from './examples/DetailsList.CustomColumns.Example';
const DetailsListCustomColumnsExampleCode = require('./examples/DetailsList.CustomColumns.Example.tsx') as string;

import { DetailsListCustomRowsExample } from './examples/DetailsList.CustomRows.Example';
const DetailsListCustomRowsExampleCode = require('./examples/DetailsList.CustomRows.Example.tsx') as string;

import { DetailsListCustomGroupHeadersExample } from './examples/DetailsList.CustomGroupHeaders.Example';
const DetailsListCustomGroupHeadersExampleCode = require('./examples/DetailsList.CustomGroupHeaders.Example.tsx') as string;

import { DetailsListAdvancedExample } from './examples/DetailsList.Advanced.Example';
const DetailsListAdvancedExampleCode = require('./examples/DetailsList.Advanced.Example.tsx') as string;

import { DetailsListGroupedExample } from './examples/DetailsList.Grouped.Example';
const DetailsListGroupedExampleCode = require('./examples/DetailsList.Grouped.Example.tsx') as string;

export class DetailsListPage extends React.Component<IComponentDemoPageProps, {}> {
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
            <ExampleCard title='Simple Grouped DetailsList' isOptIn={ true } code={ DetailsListGroupedExampleCode }>
              <DetailsListGroupedExample />
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
            <div>
              <p className='ExampleCard-title ms-font-xxl'>Simple DetailsList that watches a parent for visibility/render changes </p>
              <p>
                <Button buttonType={ ButtonType.normal } onClick={ this._onToggleParentClick } >
                  Toggle Parent Div
              </Button>
              </p>
              <span className='ExampleCard-title ms-font-l'>Set the 'parentToWatchByID' property on the DetailsListExample and the DetailsListExample will render when the parent is displayed. </span>
              <div id='hiddenExample' className='is-hidden'>
                <ExampleCard title='Parent aware DetialsList' isOptIn={ true } code={ DetailsListAdvancedExampleCode }>
                  <DetailsListBasicExample parentToWatchByID='#hiddenExample' />
                </ExampleCard>
              </div>
            </div>
          </div>
        }
        propertiesTables={
          <PropertiesTableSet
            sources={ [
              require<string>('office-ui-fabric-react/lib/components/DetailsList/DetailsList.Props.ts')
            ] }
          />
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
        isHeaderVisible={ this.props.isHeaderVisible }>
      </ComponentPage>
    );
  }

  private _onToggleParentClick() {
    var ele = document.querySelector('#hiddenExample') as HTMLDivElement;
    if (ele.className.indexOf('hidden') === -1) {
      ele.className = 'is-hidden';
    } else {
      ele.className = 'is-showing';
    }
  }
}
