import * as React from 'react';
import { DetailsListPage } from 'office-ui-fabric-react/lib/components/DetailsList/DetailsListPage';
import { PageHeader } from '../../components/PageHeader/PageHeader';
const pageStyles: any = require('../PageStyles.module.scss');
import { ComponentPage as DummyComponentPage } from '../../components/ComponentPage/ComponentPage';

// @TODO(keco): Refactor these to live under Fabric instead of website package??
import {
  ExampleCard,
  ComponentPage,
  PageMarkdown,
  PropertiesTableSet
} from '@uifabric/example-app-base';
import { DetailsListCompactExample } from 'office-ui-fabric-react/src/components/DetailsList/examples/DetailsList.Compact.Example';
const DetailsListCompactExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/DetailsList/examples/DetailsList.Compact.Example.tsx') as string;

import { DetailsListGroupedExample } from 'office-ui-fabric-react/src/components/DetailsList/examples/DetailsList.Grouped.Example';
const DetailsListGroupedExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/DetailsList/examples/DetailsList.Grouped.Example.tsx') as string;

import { DetailsListCustomColumnsExample } from 'office-ui-fabric-react/src/components/DetailsList/examples/DetailsList.CustomColumns.Example';
const DetailsListCustomColumnsExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/DetailsList/examples/DetailsList.CustomColumns.Example.tsx') as string;

export class DetailsListComponentPage extends React.Component<any, any> {
  public render(): JSX.Element {
    return (
      <div ref='pageElement' className={ pageStyles.basePage }>
        <DummyComponentPage>
          <PageHeader pageTitle='DetailsList' backgroundColor='#038387'
            links={
              [
                {
                  'text': 'Overview',
                  'location': 'Overview'
                },
                {
                  'text': 'Best Practices',
                  'location': 'BestPractices'
                },
                {
                  'text': 'Variants',
                  'location': 'Variants'
                },
                {
                  'text': 'Implementation',
                  'location': 'Implementation'
                }
              ]
            } />
          <DetailsListPage isHeaderVisible={ false } />
        </DummyComponentPage>
      </div>
    );
  }
}

export class DetailsListCompactComponentPage extends React.Component<any, any> {
  public render(): JSX.Element {
    return (
      <ComponentPage
        title='Compact DetailsListExample'
        componentName='DetailsListCompactExample'
        componentUrl='https://github.com/OfficeDev/office-ui-fabric-react/tree/master/packages/office-ui-fabric-react/src/components/DetailsList'
        exampleCards={
          <ExampleCard title='Compact DetailsList with 500 items, filtering, marquee selection' isOptIn={ true } code={ DetailsListCompactExampleCode }>
            <DetailsListCompactExample />
          </ExampleCard>
        }
        propertiesTables={
          <PropertiesTableSet
            sources={ [
              require<string>('!raw-loader!office-ui-fabric-react/src/components/DetailsList/DetailsList.types.ts')
            ] }
          />
        }
        isHeaderVisible={ false }
      />
    );
  }
}

export class DetailsListGroupedComponentPage extends React.Component<any, any> {
  public render(): JSX.Element {
    return (
      <ComponentPage
        title='Grouped DetailsListExample'
        componentName='DetailsListGroupedExample'
        componentUrl='https://github.com/OfficeDev/office-ui-fabric-react/tree/master/packages/office-ui-fabric-react/src/components/DetailsList' // @TODO(keco): UPDATE
        exampleCards={
          <ExampleCard title='Simple Grouped DetailsList' isOptIn={ true } code={ DetailsListGroupedExampleCode }>
            <DetailsListGroupedExample />
          </ExampleCard>
        }
        propertiesTables={
          <PropertiesTableSet
            sources={ [
              require<string>('!raw-loader!office-ui-fabric-react/src/components/DetailsList/DetailsList.types.ts')
            ] }
          />
        }
        isHeaderVisible={ false }
      />
    );
  }
}

export class DetailsListCustomColumnsComponentPage extends React.Component<any, any> {
}

export class DetailsListCustomRowsComponentPage extends React.Component<any, any> {
}

export class DetailsListCustomGroupHeadersComponentPage extends React.Component<any, any> {
}

export class DetailsListAdvancedComponentPage extends React.Component<any, any> {
}

export class DetailsListDragDropComponentPage extends React.Component<any, any> {
}

export class DetailsListNavigatingFocusComponentPage extends React.Component<any, any> {
}

{/* <ExampleCard id='simple' title='Simple DetailsList with 500 items, filtering, marquee selection' isOptIn={ true } code={ DetailsListBasicExampleCode }>
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
<ExampleCard title='Drag and Drop DetailsList with 10 items' isOptIn={ true } code={ DetailsListDragDropExampleCode }>
<DetailsListDragDropExample />
</ExampleCard>
<ExampleCard title='Navigating to new content preserving keyboard focus with initialFocusedIndex' isOptIn={ true } code={ DetailsListNavigatingFocusExampleCode }>
<DetailsListNavigatingFocusExample />
</ExampleCard> */}