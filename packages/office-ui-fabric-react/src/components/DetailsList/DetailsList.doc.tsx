import * as React from 'react';

import { IDocPageProps } from '../../common/DocPage.types';
import { DetailsListStatus } from './DetailsList.checklist';

import { DetailsListBasicExample } from './examples/DetailsList.Basic.Example';
const DetailsListBasicExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/DetailsList/examples/DetailsList.Basic.Example.tsx') as string;

import { DetailsListCompactExample } from './examples/DetailsList.Compact.Example';
const DetailsListCompactExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/DetailsList/examples/DetailsList.Compact.Example.tsx') as string;

import { DetailsListCustomColumnsExample } from './examples/DetailsList.CustomColumns.Example';
const DetailsListCustomColumnsExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/DetailsList/examples/DetailsList.CustomColumns.Example.tsx') as string;

import { DetailsListCustomRowsExample } from './examples/DetailsList.CustomRows.Example';
const DetailsListCustomRowsExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/DetailsList/examples/DetailsList.CustomRows.Example.tsx') as string;

import { DetailsListCustomGroupHeadersExample } from './examples/DetailsList.CustomGroupHeaders.Example';
const DetailsListCustomGroupHeadersExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/DetailsList/examples/DetailsList.CustomGroupHeaders.Example.tsx') as string;

import { DetailsListAdvancedExample } from './examples/DetailsList.Advanced.Example';
const DetailsListAdvancedExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/DetailsList/examples/DetailsList.Advanced.Example.tsx') as string;

import { DetailsListGroupedExample } from './examples/DetailsList.Grouped.Example';
const DetailsListGroupedExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/DetailsList/examples/DetailsList.Grouped.Example.tsx') as string;

import { DetailsListGroupedLargeExample } from './examples/DetailsList.Grouped.Large.Example';
const DetailsListGroupedLargeExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/DetailsList/examples/DetailsList.Grouped.Large.Example.tsx') as string;

import { DetailsListDragDropExample } from './examples/DetailsList.DragDrop.Example';
const DetailsListDragDropExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/DetailsList/examples/DetailsList.DragDrop.Example.tsx') as string;

import { DetailsListDocumentsExample } from './examples/DetailsList.Documents.Example';
const DetailsListDocumentsExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/DetailsList/examples/DetailsList.Documents.Example.tsx') as string;

import { DetailsListNavigatingFocusExample } from './examples/DetailsList.NavigatingFocus.Example';
const DetailsListNavigatingFocusExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/DetailsList/examples/DetailsList.NavigatingFocus.Example.tsx') as string;

import { DetailsListShimmerExample } from './examples/DetailsList.Shimmer.Example';
const DetailsListShimmerExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/DetailsList/examples/DetailsList.Shimmer.Example.tsx') as string;

import { DetailsListCustomFooterExample } from './examples/DetailsList.CustomFooter.Example';
const DetailsListCustomFooterExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/DetailsList/examples/DetailsList.CustomFooter.Example.tsx') as string;

export const DetailsListPageProps: IDocPageProps = {
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
    }
  ],
  propertiesTablesSources: [require<string>('!raw-loader!office-ui-fabric-react/src/components/DetailsList/DetailsList.types.ts')],
  overview: require<string>('!raw-loader!office-ui-fabric-react/src/components/DetailsList/docs/DetailsListOverview.md'),
  bestPractices: '',
  dos: require<string>('!raw-loader!office-ui-fabric-react/src/components/DetailsList/docs/DetailsListDos.md'),
  donts: require<string>('!raw-loader!office-ui-fabric-react/src/components/DetailsList/docs/DetailsListDonts.md'),
  isHeaderVisible: true
};

function generateProps(example: { title: string; code: string; view: JSX.Element }): IDocPageProps {
  return {
    title: example.title,
    componentName: 'DetailsList',
    componentUrl:
      'https://github.com/OfficeDev/office-ui-fabric-react/tree/master/packages/office-ui-fabric-react/src/components/DetailsList',
    examples: [example],
    isHeaderVisible: false,
    isFeedbackVisible: true
  };
}

export const DetailsListBasicPageProps: IDocPageProps = generateProps({
  title: 'Simple DetailsList with 500 items, filtering, marquee selection',
  code: DetailsListBasicExampleCode,
  view: <DetailsListBasicExample />
});

export const DetailsListCompactPageProps: IDocPageProps = generateProps({
  title: 'Compact DetailsList with 500 items, filtering, marquee selection',
  code: DetailsListCompactExampleCode,
  view: <DetailsListCompactExample />
});

export const DetailsListSimpleGroupedPageProps: IDocPageProps = generateProps({
  title: 'Simple Grouped DetailsList',
  code: DetailsListGroupedExampleCode,
  view: <DetailsListGroupedExample />
});

export const DetailsListLargeGroupedPageProps: IDocPageProps = generateProps({
  title: 'Large Grouped DetailsList',
  code: DetailsListGroupedLargeExampleCode,
  view: <DetailsListGroupedLargeExample />
});

export const DetailsListCustomColumnsPageProps: IDocPageProps = generateProps({
  title: 'Rendering custom item columns with sorting',
  code: DetailsListCustomColumnsExampleCode,
  view: <DetailsListCustomColumnsExample />
});

export const DetailsListCustomRowsPageProps: IDocPageProps = generateProps({
  title: 'Rendering custom item rows',
  code: DetailsListCustomRowsExampleCode,
  view: <DetailsListCustomRowsExample />
});

export const DetailsListCustomGroupHeadersPageProps: IDocPageProps = generateProps({
  title: 'Rendering custom group headers',
  code: DetailsListCustomGroupHeadersExampleCode,
  view: <DetailsListCustomGroupHeadersExample />
});

export const DetailsListAdvancedPageProps: IDocPageProps = generateProps({
  title: 'Advanced DetailsList of 5000 items, variable row heights',
  code: DetailsListAdvancedExampleCode,
  view: <DetailsListAdvancedExample />
});

export const DetailsListDragDropPageProps: IDocPageProps = generateProps({
  title: 'Drag and Drop DetailsList with 10 items',
  code: DetailsListDragDropExampleCode,
  view: <DetailsListDragDropExample />
});

export const DetailsListNavigatingFocusPageProps: IDocPageProps = generateProps({
  title: 'Navigating to new content preserving keyboard focus with initialFocusedIndex',
  code: DetailsListNavigatingFocusExampleCode,
  view: <DetailsListNavigatingFocusExample />
});

export const DetailsListShimmerPageProps: IDocPageProps = generateProps({
  title: 'DetailsList Shimmer - usually show before retrieving data from network',
  code: DetailsListShimmerExampleCode,
  view: <DetailsListShimmerExample />
});

export const DetailsListCustomFooterPageProps: IDocPageProps = generateProps({
  title: 'Rendering custom details list footer',
  code: DetailsListCustomFooterExampleCode,
  view: <DetailsListCustomFooterExample />
});
