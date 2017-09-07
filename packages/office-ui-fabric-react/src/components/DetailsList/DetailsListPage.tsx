import * as React from 'react';
import { Link } from 'office-ui-fabric-react/lib/Link';
import {
  ExampleCard,
  IComponentDemoPageProps,
  ComponentPage,
  PropertiesTableSet
} from '@uifabric/example-app-base';
import { DetailsListBasicExample } from './examples/DetailsList.Basic.Example';
const DetailsListBasicExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/DetailsList/examples/DetailsList.Basic.Example.tsx') as string;

import { DetailsListCompactExample } from './examples/DetailsList.Compact.Example';
const DetailsListCompactExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/DetailsList/examples/DetailsList.Compact.Example.tsx') as string;

import { DetailsListCustomColumnsExample } from './examples/DetailsList.CustomColumns.Example';
const DetailsListCustomColumnsExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/DetailsList/examples/DetailsList.CustomColumns.Example.tsx') as string;

import { DetailsListCustomRowsExample } from './examples/DetailsList.CustomRows.Example';
const DetailsListCustomRowsExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/DetailsList/examples/DetailsList.CustomRows.Example.tsx') as string;

import { DetailsListCustomGroupHeadersExample } from './examples/DetailsList.CustomGroupHeaders.Example';
const DetailsListCustomGroupHeadersExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/DetailsList/examples/DetailsList.CustomGroupHeaders.Example.tsx') as string;

import { DetailsListAdvancedExample } from './examples/DetailsList.Advanced.Example';
const DetailsListAdvancedExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/DetailsList/examples/DetailsList.Advanced.Example.tsx') as string;

import { DetailsListGroupedExample } from './examples/DetailsList.Grouped.Example';
const DetailsListGroupedExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/DetailsList/examples/DetailsList.Grouped.Example.tsx') as string;

import { DetailsListDragDropExample } from './examples/DetailsList.DragDrop.Example';
const DetailsListDragDropExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/DetailsList/examples/DetailsList.DragDrop.Example.tsx') as string;

import { DetailsListDocumentsExample } from './examples/DetailsList.Documents.Example';
const DetailsListDocumentsExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/DetailsList/examples/DetailsList.Documents.Example.tsx') as string;

import { DetailsListNavigatingFocusExample } from './examples/DetailsList.NavigatingFocus.Example';
const DetailsListNavigatingFocusExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/DetailsList/examples/DetailsList.NavigatingFocus.Example.tsx') as string;

export class DetailsListPage extends React.Component<IComponentDemoPageProps, {}> {
  public render() {
    return (
      <ComponentPage
        title='DetailsList'
        componentName='DetailsListExample'
        exampleCards={
          <div>
            <ExampleCard title='Document DetailsList with 500 items, sorting, filtering, marquee selection, justified columns' isOptIn={ true } code={ DetailsListDocumentsExampleCode }>
              <DetailsListDocumentsExample />
            </ExampleCard>
            <ExampleCard title='Simple DetailsList with 500 items, filtering, marquee selection' isOptIn={ true } code={ DetailsListBasicExampleCode }>
              <DetailsListBasicExample />
            </ExampleCard>
            <ExampleCard title='Compact DetailsList with 500 items, filtering, marquee selection' isOptIn={ true } code={ DetailsListCompactExampleCode }>
              <DetailsListCompactExample />
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
            <ExampleCard title='Drag and Drop DetailsList with 10 items' isOptIn={ true } code={ DetailsListDragDropExampleCode }>
              <DetailsListDragDropExample />
            </ExampleCard>
            <ExampleCard title='Navigating to new content preserving keyboard focus with initialFocusedIndex' isOptIn={ true } code={ DetailsListNavigatingFocusExampleCode }>
              <DetailsListNavigatingFocusExample />
            </ExampleCard>
          </div>
        }
        propertiesTables={
          <PropertiesTableSet
            sources={ [
              require<string>('!raw-loader!office-ui-fabric-react/src/components/DetailsList/DetailsList.Props.ts')
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
        isHeaderVisible={ this.props.isHeaderVisible }
      >
      </ComponentPage>
    );
  }
}
