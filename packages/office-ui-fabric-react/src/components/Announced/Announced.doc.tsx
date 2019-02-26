import * as React from 'react';
import { IDocPageProps } from '../../common/DocPage.types';
import './examples/Announced.Example.scss';

import { AnnouncedSearchResultsExample } from './examples/Announced.SearchResults.Example';
const AnnouncedSearchResultsExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/Announced/examples/Announced.SearchResults.Example.tsx') as string;

import { AnnouncedLazyLoadingExample } from './examples/Announced.LazyLoading.Example';
const AnnouncedLazyLoadingExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/Announced/examples/Announced.LazyLoading.Example.tsx') as string;

import { AnnouncedBulkOperationsExample } from './examples/Announced.BulkOperations.Example';
const AnnouncedBulkOperationsExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/Announced/examples/Announced.BulkOperations.Example.tsx') as string;

import { AnnouncedQuickActionsExample } from './examples/Announced.QuickActions.Example';
const AnnouncedQuickActionsExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/Announced/examples/Announced.QuickActions.Example.tsx') as string;

export const AnnouncedPageProps: IDocPageProps = {
  title: 'Use Cases',
  componentName: 'Announced',
  componentUrl: 'https://github.com/OfficeDev/office-ui-fabric-react/tree/master/packages/experiments/src/components/Announced',
  propertiesTablesSources: [require<string>('!raw-loader!office-ui-fabric-react/src/components/Announced/Announced.types.ts')],
  overview: require('!raw-loader!office-ui-fabric-react/src/components/Announced/docs/AnnouncedOverview.md'),
  isHeaderVisible: false
};

export const AnnouncedQuickActionsPageProps: IDocPageProps = {
  title: 'Quick Actions',
  componentName: 'Quick Actions',
  componentUrl: 'https://github.com/OfficeDev/office-ui-fabric-react/tree/master/packages/office-ui-fabric-react/src/components/Announced',
  examples: [
    {
      title: 'Quick actions',
      code: AnnouncedQuickActionsExampleCode,
      view: <AnnouncedQuickActionsExample />
    }
  ],
  overview: require<string>('!raw-loader!office-ui-fabric-react/src/components/Announced/docs/QuickActions/Overview.md'),
  dos: require<string>('!raw-loader!office-ui-fabric-react/src/components/Announced/docs/QuickActions/Dos.md'),
  donts: require<string>('!raw-loader!office-ui-fabric-react/src/components/Announced/docs/QuickActions/Donts.md'),
  isHeaderVisible: false
};

export const AnnouncedSearchResultsPageProps: IDocPageProps = {
  title: 'Search Results',
  componentName: 'Search Results',
  componentUrl: 'https://github.com/OfficeDev/office-ui-fabric-react/tree/master/packages/office-ui-fabric-react/src/components/Announced',
  examples: [
    {
      title: 'Search results',
      code: AnnouncedSearchResultsExampleCode,
      view: <AnnouncedSearchResultsExample />
    }
  ],
  overview: require<string>('!raw-loader!office-ui-fabric-react/src/components/Announced/docs/SearchResults/Overview.md'),
  dos: require<string>('!raw-loader!office-ui-fabric-react/src/components/Announced/docs/SearchResults/Dos.md'),
  donts: require<string>('!raw-loader!office-ui-fabric-react/src/components/Announced/docs/SearchResults/Donts.md'),
  isHeaderVisible: false
};

export const AnnouncedLazyLoadingPageProps: IDocPageProps = {
  title: 'Asynchronous',
  componentName: 'Asynchronous',
  componentUrl: 'https://github.com/OfficeDev/office-ui-fabric-react/tree/master/packages/office-ui-fabric-react/src/components/Announced',
  examples: [
    {
      title: 'Asynchronous',
      code: AnnouncedLazyLoadingExampleCode,
      view: <AnnouncedLazyLoadingExample />
    }
  ],
  overview: require<string>('!raw-loader!office-ui-fabric-react/src/components/Announced/docs/Asynchronous/Overview.md'),
  dos: require<string>('!raw-loader!office-ui-fabric-react/src/components/Announced/docs/Asynchronous/Dos.md'),
  donts: require<string>('!raw-loader!office-ui-fabric-react/src/components/Announced/docs/Asynchronous/Donts.md'),
  isHeaderVisible: false
};

export const AnnouncedBulkOperationsPageProps: IDocPageProps = {
  title: 'Bulk Long Running',
  componentName: 'Bulk Long Running',
  componentUrl: 'https://github.com/OfficeDev/office-ui-fabric-react/tree/master/packages/office-ui-fabric-react/src/components/Announced',
  examples: [
    {
      title: 'Bulk long running',
      code: AnnouncedBulkOperationsExampleCode,
      view: <AnnouncedBulkOperationsExample />
    }
  ],
  overview: require<string>('!raw-loader!office-ui-fabric-react/src/components/Announced/docs/BulkLongRunning/Overview.md'),
  dos: require<string>('!raw-loader!office-ui-fabric-react/src/components/Announced/docs/BulkLongRunning/Dos.md'),
  donts: require<string>('!raw-loader!office-ui-fabric-react/src/components/Announced/docs/BulkLongRunning/Donts.md'),
  isHeaderVisible: false
};
