import * as React from 'react';
import { ExampleCard, IComponentDemoPageProps, ComponentPage, PropertiesTableSet } from '@uifabric/example-app-base';

import { AnnouncedSearchResultsExample } from './examples/Announced.SearchResults.Example';
const AnnouncedSearchResultsExampleCode = require('!raw-loader!@uifabric/experiments/src/components/Announced/examples/Announced.SearchResults.Example.tsx') as string;

import { AnnouncedAsynchronousExample } from './examples/Announced.Asynchronous.Example';
const AnnouncedAsynchronousExampleCode = require('!raw-loader!@uifabric/experiments/src/components/Announced/examples/Announced.Asynchronous.Example.tsx') as string;

import { AnnouncedBulkLongRunningExample } from './examples/Announced.BulkLongRunning.Example';
const AnnouncedBulkLongRunningExampleCode = require('!raw-loader!@uifabric/experiments/src/components/Announced/examples/Announced.BulkLongRunning.Example.tsx') as string;

export class AnnouncedPage extends React.Component<IComponentDemoPageProps, {}> {
  public render(): JSX.Element {
    return (
      <ComponentPage
        title="Announced"
        componentName="Announced"
        exampleCards={
          <div>
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
        overview={
          <div>
            <p>
              The Announced component aims to fill several of the accessibility gaps that exist in various web application experiences. It
              provides text for the screen reader in certain scenarios that are lacking comprehensive updates, particularly those showing
              the completion status or progress of operation(s).
            </p>
            <p>
              Some real-world applications of the component include copying, uploading, deleting, or moving many files, "lazy loading" of
              page sections that do not appear all at once, and appearance of search results.
            </p>
          </div>
        }
        bestPractices={<div />}
        dos={
          <div>
            <ul>
              <li />
            </ul>
          </div>
        }
        donts={
          <div>
            <ul>
              <li />
            </ul>
          </div>
        }
        isHeaderVisible={this.props.isHeaderVisible}
      />
    );
  }
}
