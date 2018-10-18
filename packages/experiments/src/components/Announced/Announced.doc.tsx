import * as React from 'react';

import { IDocPageProps } from 'office-ui-fabric-react/src/common/DocPage.types';

import { AnnouncedSearchResultsExample } from './examples/Announced.SearchResults.Example';
const AnnouncedSearchResultsExampleCode = require('!raw-loader!@uifabric/experiments/src/components/Announced/examples/Announced.SearchResults.Example.tsx') as string;

import { AnnouncedAsynchronousExample } from './examples/Announced.Asynchronous.Example';
const AnnouncedAsynchronousExampleCode = require('!raw-loader!@uifabric/experiments/src/components/Announced/examples/Announced.Asynchronous.Example.tsx') as string;

import { AnnouncedBulkLongRunningExample } from './examples/Announced.BulkLongRunning.Example';
const AnnouncedBulkLongRunningExampleCode = require('!raw-loader!@uifabric/experiments/src/components/Announced/examples/Announced.BulkLongRunning.Example.tsx') as string;

export const AnnouncedPageProps: IDocPageProps = {
  title: 'Announced',
  componentName: 'Announced',
  componentUrl:
    'https://github.com/OfficeDev/office-ui-fabric-react/tree/master/packages/experiments/src/components/Announced',
  examples: [
    {
      title: 'Announced component used for asynchronous resolution of contacts or search results',
      code: AnnouncedSearchResultsExampleCode,
      view: <AnnouncedSearchResultsExample />
    }
  ],
  propertiesTablesSources: [
    require<string>('!raw-loader!office-ui-fabric-react/src/components/DetailsList/DetailsList.types.ts')
  ],
  overview: `The Announced component aims to fill several of the accessibility gaps that exist in various web application experiences.
  It provides text for the screen reader in certain scenarios that are lacking comprehensive updates, particularly those showing the
  completion status or progress of operation(s).

  Some real-world applications of the component include copying, uploading, deleting, or moving many files, "lazy loading" of page
  sections that do not appear all at once, and appearance of search results.`,
  bestPractices: '',
  dos: '',
  donts: '',
  isHeaderVisible: true
};

function generateProps(example: { title: string; code: string; view: JSX.Element }): IDocPageProps {
  return {
    title: example.title,
    componentName: 'DetailsList',
    componentUrl:
      'https://github.com/OfficeDev/office-ui-fabric-react/tree/master/packages/experiments/src/components/Announced',
    examples: [example],
    isHeaderVisible: false,
    isFeedbackVisible: true
  };
}

export const AnnouncedAsynchronousPageProps: IDocPageProps = generateProps({
  title: 'Announced component used for asynchronous page/page content loading',
  code: AnnouncedAsynchronousExampleCode,
  view: <AnnouncedAsynchronousExample />
});

export const AnnouncedBulkLongRunningPageProps: IDocPageProps = generateProps({
  title: 'Announced component used for bulk async long running operations',
  code: AnnouncedBulkLongRunningExampleCode,
  view: <AnnouncedBulkLongRunningExample />
});