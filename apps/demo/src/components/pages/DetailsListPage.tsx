import * as React from 'react';
import { DemoPage } from '../DemoPage';
import { IDemoPageProps } from '../DemoPage.types';
import { DetailsListStatus } from 'office-ui-fabric-react/lib/components/DetailsList/DetailsList.checklist';

import { DetailsListBasicExample } from 'office-ui-fabric-react/lib/components/DetailsList/examples/DetailsList.Basic.Example';
const DetailsListBasicExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/DetailsList/examples/DetailsList.Basic.Example.tsx') as string;

import { DetailsListCompactExample } from 'office-ui-fabric-react/lib/components/DetailsList/examples/DetailsList.Compact.Example';
const DetailsListCompactExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/DetailsList/examples/DetailsList.Compact.Example.tsx') as string;

import { DetailsListCustomColumnsExample } from 'office-ui-fabric-react/lib/components/DetailsList/examples/DetailsList.CustomColumns.Example';
const DetailsListCustomColumnsExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/DetailsList/examples/DetailsList.CustomColumns.Example.tsx') as string;

import { DetailsListCustomRowsExample } from 'office-ui-fabric-react/lib/components/DetailsList/examples/DetailsList.CustomRows.Example';
const DetailsListCustomRowsExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/DetailsList/examples/DetailsList.CustomRows.Example.tsx') as string;

import { DetailsListCustomGroupHeadersExample } from 'office-ui-fabric-react/lib/components/DetailsList/examples/DetailsList.CustomGroupHeaders.Example';
const DetailsListCustomGroupHeadersExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/DetailsList/examples/DetailsList.CustomGroupHeaders.Example.tsx') as string;

import { DetailsListAdvancedExample } from 'office-ui-fabric-react/lib/components/DetailsList/examples/DetailsList.Advanced.Example';
const DetailsListAdvancedExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/DetailsList/examples/DetailsList.Advanced.Example.tsx') as string;

import { DetailsListGroupedExample } from 'office-ui-fabric-react/lib/components/DetailsList/examples/DetailsList.Grouped.Example';
const DetailsListGroupedExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/DetailsList/examples/DetailsList.Grouped.Example.tsx') as string;

import { DetailsListDragDropExample } from 'office-ui-fabric-react/lib/components/DetailsList/examples/DetailsList.DragDrop.Example';
const DetailsListDragDropExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/DetailsList/examples/DetailsList.DragDrop.Example.tsx') as string;

import { DetailsListDocumentsExample } from 'office-ui-fabric-react/lib/components/DetailsList/examples/DetailsList.Documents.Example';
const DetailsListDocumentsExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/DetailsList/examples/DetailsList.Documents.Example.tsx') as string;

import { DetailsListNavigatingFocusExample } from 'office-ui-fabric-react/lib/components/DetailsList/examples/DetailsList.NavigatingFocus.Example';
const DetailsListNavigatingFocusExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/DetailsList/examples/DetailsList.NavigatingFocus.Example.tsx') as string;

export const DetailsListPageProps: IDemoPageProps = {
  title: 'DetailsList',
  componentName: 'DetailsList',
  componentUrl:
    'https://github.com/OfficeDev/office-ui-fabric-react/tree/master/packages/office-ui-fabric-react/src/components/DetailsList',
  componentStatus: DetailsListStatus,
  examples: [
    {
      title: 'Document DetailsList with 500 items, sorting, filtering, marquee selection, justified columns',
      code: DetailsListDocumentsExampleCode,
      view: <DetailsListDocumentsExample />
    },
    {
      title: 'Simple DetailsList with 500 items, filtering, marquee selection',
      code: DetailsListBasicExampleCode,
      view: <DetailsListBasicExample />
    },
    {
      title: 'Compact DetailsList with 500 items, filtering, marquee selection',
      code: DetailsListCompactExampleCode,
      view: <DetailsListCompactExample />
    },
    {
      title: 'Simple Grouped DetailsList',
      code: DetailsListGroupedExampleCode,
      view: <DetailsListGroupedExample />
    },
    {
      title: 'Rendering custom item columns with sorting',
      code: DetailsListCustomColumnsExampleCode,
      view: <DetailsListCustomColumnsExample />
    },
    {
      title: 'Rendering custom item rows',
      code: DetailsListCustomRowsExampleCode,
      view: <DetailsListCustomRowsExample />
    },
    {
      title: 'Rendering custom group headers',
      code: DetailsListCustomGroupHeadersExampleCode,
      view: <DetailsListCustomGroupHeadersExample />
    },
    {
      title: 'Advanced DetailsList of 5000 items, variable row heights',
      code: DetailsListAdvancedExampleCode,
      view: <DetailsListAdvancedExample />
    },
    {
      title: 'Drag and Drop DetailsList with 10 items',
      code: DetailsListDragDropExampleCode,
      view: <DetailsListDragDropExample />
    },
    {
      title: 'Navigating to new content preserving keyboard focus with initialFocusedIndex',
      code: DetailsListNavigatingFocusExampleCode,
      view: <DetailsListNavigatingFocusExample />
    }
  ],
  propertiesTablesSources: [
    require<string>('!raw-loader!office-ui-fabric-react/src/components/DetailsList/DetailsList.types.ts')
  ],
  overview: require<
    string
  >('!raw-loader!office-ui-fabric-react/src/components/DetailsList/docs/DetailsListOverview.md'),
  bestPractices: '',
  dos: require<string>('!raw-loader!office-ui-fabric-react/src/components/DetailsList/docs/DetailsListDos.md'),
  donts: require<string>('!raw-loader!office-ui-fabric-react/src/components/DetailsList/docs/DetailsListDonts.md'),
  isHeaderVisible: true
};

export const DetailsListPage = (props: { isHeaderVisible: boolean }) => (
  <DemoPage {...{ ...DetailsListPageProps, ...props }} />
);
