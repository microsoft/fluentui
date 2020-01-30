import * as React from 'react';
import { IDocPageProps } from '../../common/DocPage.types';
import { ListBasicExample } from './examples/List.Basic.Example';
import { ListGridExample } from './examples/List.Grid.Example';
import { ListScrollingExample } from './examples/List.Scrolling.Example';
import { ListGhostingExample } from './examples/List.Ghosting.Example';
import { createListItems } from '@uifabric/example-data';

const ListBasicExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/List/examples/List.Basic.Example.tsx') as string;
const ListGridExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/List/examples/List.Grid.Example.tsx') as string;
const ListScrollingExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/List/examples/List.Scrolling.Example.tsx') as string;
const ListGhostingExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/List/examples/List.Ghosting.Example.tsx') as string;

const _cachedItems = createListItems(5000);

export const ListPageProps: IDocPageProps = {
  title: 'List',
  componentName: 'ListExample',
  componentUrl: 'https://github.com/OfficeDev/office-ui-fabric-react/tree/master/packages/office-ui-fabric-react/src/components/List',
  examples: [
    {
      title: 'List of 5000 grid items',
      code: ListGridExampleCode,
      view: <ListGridExample items={_cachedItems} />
    },
    {
      title: 'List of 5000 variable height items',
      code: ListBasicExampleCode,
      view: <ListBasicExample items={_cachedItems} />
    },
    {
      title: 'Scrolling items into view',
      code: ListScrollingExampleCode,
      view: <ListScrollingExample items={_cachedItems} />
    },
    {
      title: 'Rendering ghost items while the list is scrolling',
      code: ListGhostingExampleCode,
      view: <ListGhostingExample items={_cachedItems} />
    }
  ],

  allowNativeProps: true,
  overview: require<string>('!raw-loader!office-ui-fabric-react/src/components/List/docs/ListOverview.md'),
  isHeaderVisible: true,
  isFeedbackVisible: true
};
