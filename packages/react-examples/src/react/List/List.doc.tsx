import * as React from 'react';
import { IDocPageProps } from '@fluentui/react/lib/common/DocPage.types';
import { ListBasicExample } from './List.Basic.Example';
import { ListGridExample } from './List.Grid.Example';
import { ListScrollingExample } from './List.Scrolling.Example';
import { ListGhostingExample } from './List.Ghosting.Example';

const ListBasicExampleCode =
  require('!raw-loader?esModule=false!@fluentui/react-examples/src/react/List/List.Basic.Example.tsx') as string;
const ListGridExampleCode =
  require('!raw-loader?esModule=false!@fluentui/react-examples/src/react/List/List.Grid.Example.tsx') as string;
const ListScrollingExampleCode =
  require('!raw-loader?esModule=false!@fluentui/react-examples/src/react/List/List.Scrolling.Example.tsx') as string;
const ListGhostingExampleCode =
  require('!raw-loader?esModule=false!@fluentui/react-examples/src/react/List/List.Ghosting.Example.tsx') as string;

export const ListPageProps: IDocPageProps = {
  title: 'List',
  componentName: 'ListExample',
  componentUrl: 'https://github.com/microsoft/fluentui/tree/master/packages/react/src/components/List',
  examples: [
    {
      title: 'List of 5000 grid items',
      code: ListGridExampleCode,
      view: <ListGridExample />,
    },
    {
      title: 'List of 5000 variable height items',
      code: ListBasicExampleCode,
      view: <ListBasicExample />,
    },
    {
      title: 'Scrolling items into view',
      code: ListScrollingExampleCode,
      view: <ListScrollingExample />,
    },
    {
      title: 'Rendering ghost items while the list is scrolling',
      code: ListGhostingExampleCode,
      view: <ListGhostingExample />,
    },
  ],

  allowNativeProps: true,
  overview: require<string>('!raw-loader?esModule=false!@fluentui/react-examples/src/react/List/docs/ListOverview.md'),
  bestPractices: require<string>('!raw-loader?esModule=false!@fluentui/react-examples/src/react/List/docs/ListBestPractices.md'),
  isHeaderVisible: true,
  isFeedbackVisible: true,
};
