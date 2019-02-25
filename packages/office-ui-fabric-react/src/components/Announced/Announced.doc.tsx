import * as React from 'react';
import { IDocPageProps } from '../../common/DocPage.types';

import { AnnouncedSearchResultsExample } from './examples/Announced.SearchResults.Example';
const AnnouncedSearchResultsExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/Announced/examples/Announced.SearchResults.Example.tsx') as string;

import { AnnouncedAsynchronousExample } from './examples/Announced.Asynchronous.Example';
const AnnouncedAsynchronousExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/Announced/examples/Announced.Asynchronous.Example.tsx') as string;

import { AnnouncedBulkLongRunningExample } from './examples/Announced.BulkLongRunning.Example';
const AnnouncedBulkLongRunningExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/Announced/examples/Announced.BulkLongRunning.Example.tsx') as string;

import { AnnouncedQuickActionsExample } from './examples/Announced.QuickActions.Example';
const AnnouncedQuickActionsExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/Announced/examples/Announced.QuickActions.Example.tsx') as string;

export const AnnouncedPageProps: IDocPageProps = {
  title: 'Announced',
  componentName: 'Announced',
  componentUrl: 'https://github.com/OfficeDev/office-ui-fabric-react/tree/master/packages/experiments/src/components/Announced',
  examples: [
    {
      title: 'Quick actions',
      code: AnnouncedQuickActionsExampleCode,
      view: <AnnouncedQuickActionsExample />,
      isScrollable: false
    },
    {
      title: 'Asynchronous resolution of contacts or search results',
      code: AnnouncedSearchResultsExampleCode,
      view: <AnnouncedSearchResultsExample />,
      isScrollable: false
    },
    {
      title: 'Asynchronous page/page content loading',
      code: AnnouncedAsynchronousExampleCode,
      view: <AnnouncedAsynchronousExample />,
      isScrollable: false
    },
    {
      title: 'Bulk async long running operations',
      code: AnnouncedBulkLongRunningExampleCode,
      view: <AnnouncedBulkLongRunningExample />,
      isScrollable: false
    }
  ],
  propertiesTablesSources: [require<string>('!raw-loader!office-ui-fabric-react/src/components/Announced/Announced.types.ts')],
  overview: require('!raw-loader!office-ui-fabric-react/src/components/Announced/docs/AnnouncedOverview.md'),
  isHeaderVisible: true
};
