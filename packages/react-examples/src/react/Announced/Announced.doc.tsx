import * as React from 'react';
import { IDocPageProps } from '@fluentui/react/lib/common/DocPage.types';

import { AnnouncedSearchResultsExample } from './Announced.SearchResults.Example';
const AnnouncedSearchResultsExampleCode =
  require('!raw-loader?esModule=false!@fluentui/react-examples/src/react/Announced/Announced.SearchResults.Example.tsx') as string;

import { AnnouncedLazyLoadingExample } from './Announced.LazyLoading.Example';
const AnnouncedLazyLoadingExampleCode =
  require('!raw-loader?esModule=false!@fluentui/react-examples/src/react/Announced/Announced.LazyLoading.Example.tsx') as string;

import { AnnouncedBulkOperationsExample } from './Announced.BulkOperations.Example';
const AnnouncedBulkOperationsExampleCode =
  require('!raw-loader?esModule=false!@fluentui/react-examples/src/react/Announced/Announced.BulkOperations.Example.tsx') as string;

import { AnnouncedQuickActionsExample } from './Announced.QuickActions.Example';
const AnnouncedQuickActionsExampleCode =
  require('!raw-loader?esModule=false!@fluentui/react-examples/src/react/Announced/Announced.QuickActions.Example.tsx') as string;

export const AnnouncedPageProps: IDocPageProps = {
  title: 'Use Cases',
  componentName: 'Announced',
  componentUrl: 'https://github.com/microsoft/fluentui/tree/master/packages/react/src/components/Announced',
  overview: require('!raw-loader?esModule=false!@fluentui/react-examples/src/react/Announced/docs/AnnouncedOverview.md'),
  isHeaderVisible: false,
};

export const AnnouncedQuickActionsPageProps: IDocPageProps = {
  title: 'Quick Actions',
  componentName: 'Quick Actions',
  componentUrl: 'https://github.com/microsoft/fluentui/tree/master/packages/react/src/components/Announced',
  examples: [
    {
      title: 'Quick actions',
      code: AnnouncedQuickActionsExampleCode,
      view: <AnnouncedQuickActionsExample />,
    },
  ],
  overview: require<string>('!raw-loader?esModule=false!@fluentui/react-examples/src/react/Announced/docs/QuickActions/Overview.md'),
  dos: require<string>('!raw-loader?esModule=false!@fluentui/react-examples/src/react/Announced/docs/QuickActions/Dos.md'),
  donts: require<string>('!raw-loader?esModule=false!@fluentui/react-examples/src/react/Announced/docs/QuickActions/Donts.md'),
  isHeaderVisible: false,
};

export const AnnouncedSearchResultsPageProps: IDocPageProps = {
  title: 'Search Results',
  componentName: 'Search Results',
  componentUrl: 'https://github.com/microsoft/fluentui/tree/master/packages/react/src/components/Announced',
  examples: [
    {
      title: 'Search results',
      code: AnnouncedSearchResultsExampleCode,
      view: <AnnouncedSearchResultsExample />,
    },
  ],
  overview: require<string>('!raw-loader?esModule=false!@fluentui/react-examples/src/react/Announced/docs/SearchResults/Overview.md'),
  dos: require<string>('!raw-loader?esModule=false!@fluentui/react-examples/src/react/Announced/docs/SearchResults/Dos.md'),
  donts: require<string>('!raw-loader?esModule=false!@fluentui/react-examples/src/react/Announced/docs/SearchResults/Donts.md'),
  isHeaderVisible: false,
};

export const AnnouncedLazyLoadingPageProps: IDocPageProps = {
  title: 'Asynchronous',
  componentName: 'Asynchronous',
  componentUrl: 'https://github.com/microsoft/fluentui/tree/master/packages/react/src/components/Announced',
  examples: [
    {
      title: 'Asynchronous',
      code: AnnouncedLazyLoadingExampleCode,
      view: <AnnouncedLazyLoadingExample />,
    },
  ],
  overview: require<string>('!raw-loader?esModule=false!@fluentui/react-examples/src/react/Announced/docs/Asynchronous/Overview.md'),
  dos: require<string>('!raw-loader?esModule=false!@fluentui/react-examples/src/react/Announced/docs/Asynchronous/Dos.md'),
  donts: require<string>('!raw-loader?esModule=false!@fluentui/react-examples/src/react/Announced/docs/Asynchronous/Donts.md'),
  isHeaderVisible: false,
};

export const AnnouncedBulkOperationsPageProps: IDocPageProps = {
  title: 'Bulk Long Running',
  componentName: 'Bulk Long Running',
  componentUrl: 'https://github.com/microsoft/fluentui/tree/master/packages/react/src/components/Announced',
  examples: [
    {
      title: 'Bulk long running',
      code: AnnouncedBulkOperationsExampleCode,
      view: <AnnouncedBulkOperationsExample />,
    },
  ],
  overview: require<string>('!raw-loader?esModule=false!@fluentui/react-examples/src/react/Announced/docs/BulkLongRunning/Overview.md'),
  dos: require<string>('!raw-loader?esModule=false!@fluentui/react-examples/src/react/Announced/docs/BulkLongRunning/Dos.md'),
  donts: require<string>('!raw-loader?esModule=false!@fluentui/react-examples/src/react/Announced/docs/BulkLongRunning/Donts.md'),
  isHeaderVisible: false,
};
