import * as React from 'react';

import { IDocPageProps, IExample } from '../../common/DocPage.types';

import { DetailsListBasicExample } from './examples/DetailsList.Basic.Example';
const DetailsListBasicExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/DetailsList/examples/DetailsList.Basic.Example.tsx') as string;

import { DetailsListAnimationExample } from './examples/DetailsList.Animation.Example';
const DetailsListAnimationExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/DetailsList/examples/DetailsList.Animation.Example.tsx') as string;

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

import { ShimmerApplicationExample as DetailsListShimmerExample } from '../Shimmer/examples/Shimmer.Application.Example';
const DetailsListShimmerExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/Shimmer/examples/Shimmer.Application.Example.tsx') as string;

import { DetailsListCustomFooterExample } from './examples/DetailsList.CustomFooter.Example';
const DetailsListCustomFooterExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/DetailsList/examples/DetailsList.CustomFooter.Example.tsx') as string;

export const DetailsListPageProps: IDocPageProps = {
  title: 'DetailsList',
  componentName: 'DetailsList',
  componentUrl:
    'https://github.com/OfficeDev/office-ui-fabric-react/tree/master/packages/office-ui-fabric-react/src/components/DetailsList',
  examples: [
    {
      title: 'DetailsList with 500 documents, sorting, filtering, marquee selection, justified columns',
      code: DetailsListDocumentsExampleCode,
      view: <DetailsListDocumentsExample />
    }
  ],
  overview: require<string>('!raw-loader!office-ui-fabric-react/src/components/DetailsList/docs/DetailsListOverview.md'),
  bestPractices: '',
  dos: require<string>('!raw-loader!office-ui-fabric-react/src/components/DetailsList/docs/DetailsListDos.md'),
  donts: require<string>('!raw-loader!office-ui-fabric-react/src/components/DetailsList/docs/DetailsListDonts.md'),
  isHeaderVisible: true
};

function generateProps(example: IExample): IDocPageProps {
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
  title: 'Simple DetailsList with filtering and marquee selection',
  code: DetailsListBasicExampleCode,
  view: <DetailsListBasicExample />
});

export const DetailsListAnimationPageProps: IDocPageProps = generateProps({
  title: 'DetailsList with Row animation when cell content changed',
  code: DetailsListAnimationExampleCode,
  view: <DetailsListAnimationExample />
});

export const DetailsListCompactPageProps: IDocPageProps = generateProps({
  title: 'Compact DetailsList with filtering and marquee selection',
  code: DetailsListCompactExampleCode,
  view: <DetailsListCompactExample />
});

export const DetailsListSimpleGroupedPageProps: IDocPageProps = generateProps({
  title: 'Simple grouped DetailsList',
  code: DetailsListGroupedExampleCode,
  view: <DetailsListGroupedExample />
});

export const DetailsListLargeGroupedPageProps: IDocPageProps = generateProps({
  title: 'Large grouped DetailsList',
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
  title: 'Advanced DetailsList of 5000 items with variable row heights',
  code: DetailsListAdvancedExampleCode,
  view: <DetailsListAdvancedExample />
});

export const DetailsListDragDropPageProps: IDocPageProps = generateProps({
  title: 'DetailsList supporting drag and drop',
  code: DetailsListDragDropExampleCode,
  view: <DetailsListDragDropExample />
});

export const DetailsListNavigatingFocusPageProps: IDocPageProps = generateProps({
  title: 'Navigating to new content while preserving keyboard focus',
  code: DetailsListNavigatingFocusExampleCode,
  view: <DetailsListNavigatingFocusExample />
});

export const DetailsListShimmerPageProps: IDocPageProps = generateProps({
  title: 'Shimmered DetailsList - usually shown while retrieving data',
  code: DetailsListShimmerExampleCode,
  view: <DetailsListShimmerExample />
});

export const DetailsListCustomFooterPageProps: IDocPageProps = generateProps({
  title: 'Rendering custom DetailsList footer',
  code: DetailsListCustomFooterExampleCode,
  view: <DetailsListCustomFooterExample />
});
