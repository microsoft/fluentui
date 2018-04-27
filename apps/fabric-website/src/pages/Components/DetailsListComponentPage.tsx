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
          <ExampleCard title='Compact DetailsList with 500 items, filtering, marquee selection' isOptIn={ true } /*code={ DetailsListCompactExampleCode }*/>
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
