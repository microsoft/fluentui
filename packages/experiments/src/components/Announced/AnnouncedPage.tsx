import * as React from 'react';
import { ExampleCard, IComponentDemoPageProps, ComponentPage, PropertiesTableSet, EditSection } from '@uifabric/example-app-base';
// import { IDocPageProps } from '../../common/DocPage.types';

import { AnnouncedSearchResultsExample } from './examples/Announced.SearchResults.Example';
const AnnouncedSearchResultsExampleCode = require('!raw-loader!@uifabric/experiments/src/components/Announced/examples/Announced.SearchResults.Example.tsx') as string;

import { AnnouncedAsynchronousExample } from './examples/Announced.Asynchronous.Example';
const AnnouncedAsynchronousExampleCode = require('!raw-loader!@uifabric/experiments/src/components/Announced/examples/Announced.Asynchronous.Example.tsx') as string;

import { AnnouncedBulkLongRunningExample } from './examples/Announced.BulkLongRunning.Example';
const AnnouncedBulkLongRunningExampleCode = require('!raw-loader!@uifabric/experiments/src/components/Announced/examples/Announced.BulkLongRunning.Example.tsx') as string;

import { AnnouncedQuickActionsExample } from './examples/Announced.QuickActions.Example';
const AnnouncedQuickActionsExampleCode = require('!raw-loader!@uifabric/experiments/src/components/Announced/examples/Announced.QuickActions.Example.tsx') as string;

// export const AnnouncedPageProps: IDocPageProps = {
//   title: 'Announced',
//   componentName: 'Announced',
//   componentUrl:
//     'https://github.com/OfficeDev/office-ui-fabric-react/tree/master/packages/experiments/src/components/Announced',
//   examples: [
//     {
//       title: 'Announced component used for quick actions',
//       code: AnnouncedQuickActionsExampleCode,
//       view: <AnnouncedQuickActionsExample />,
//       isScrollable: false
//     },
//     {
//       title: 'Announced component used for quick actions',
//       code: AnnouncedQuickActionsExampleCode,
//       view: <AnnouncedQuickActionsExample />,
//       isScrollable: false
//     },
//     {
//       title: 'Announced component used for quick actions',
//       code: AnnouncedQuickActionsExampleCode,
//       view: <AnnouncedQuickActionsExample />,
//       isScrollable: false
//     },
//     {
//       title: 'Announced component used for quick actions',
//       code: AnnouncedQuickActionsExampleCode,
//       view: <AnnouncedQuickActionsExample />,
//       isScrollable: false
//     }
//   ],
//   propertiesTablesSources: [
//     require<string>(require<string>('!raw-loader!@uifabric/experiments/src/components/Announced/Announced.types.ts'))
//   ],
//   overview: require('!raw-loader!@uifabric/experiments/src/components/Announced/docs/AnnouncedOverview.md'),
//   isHeaderVisible: true
// };

export class AnnouncedPage extends React.Component<IComponentDemoPageProps, {}> {
  public render(): JSX.Element {
    return (
      <ComponentPage
        title="Announced"
        componentName="Announced"
        exampleCards={
          <div>
            <ExampleCard title="Announced component used for quick actions" code={AnnouncedQuickActionsExampleCode}>
              <AnnouncedQuickActionsExample />
            </ExampleCard>
            <ExampleCard
              title="Announced component used for asynchronous resolution of contacts or search results"
              code={AnnouncedSearchResultsExampleCode}
            >
              <AnnouncedSearchResultsExample />
            </ExampleCard>
            <ExampleCard
              title="Announced component used for asynchronous page/page content loading"
              code={AnnouncedAsynchronousExampleCode}
            >
              <AnnouncedAsynchronousExample />
            </ExampleCard>
            <ExampleCard title="Announced component used for bulk async long running operations" code={AnnouncedBulkLongRunningExampleCode}>
              <AnnouncedBulkLongRunningExample />
            </ExampleCard>
          </div>
        }
        propertiesTables={
          <PropertiesTableSet
            sources={[require<string>('!raw-loader!@uifabric/experiments/src/components/Announced/Announced.types.ts')]}
          />
        }
        overview={<div>{require('!raw-loader!@uifabric/experiments/src/components/Announced/docs/AnnouncedOverview.md')}</div>}
        isHeaderVisible={this.props.isHeaderVisible}
      />
    );
  }
}
