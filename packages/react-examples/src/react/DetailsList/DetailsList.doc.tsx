import * as React from 'react';

import { IDocPageProps, IExample } from '@fluentui/react/lib/common/DocPage.types';

import { DetailsListBasicExample } from './DetailsList.Basic.Example';
const DetailsListBasicExampleCode =
  require('!raw-loader?esModule=false!@fluentui/react-examples/src/react/DetailsList/DetailsList.Basic.Example.tsx') as string;

import { DetailsListAnimationExample } from './DetailsList.Animation.Example';
const DetailsListAnimationExampleCode =
  require('!raw-loader?esModule=false!@fluentui/react-examples/src/react/DetailsList/DetailsList.Animation.Example.tsx') as string;

import { DetailsListCompactExample } from './DetailsList.Compact.Example';
const DetailsListCompactExampleCode =
  require('!raw-loader?esModule=false!@fluentui/react-examples/src/react/DetailsList/DetailsList.Compact.Example.tsx') as string;

import { DetailsListCustomColumnsExample } from './DetailsList.CustomColumns.Example';
const DetailsListCustomColumnsExampleCode =
  require('!raw-loader?esModule=false!@fluentui/react-examples/src/react/DetailsList/DetailsList.CustomColumns.Example.tsx') as string;

import { DetailsListCustomRowsExample } from './DetailsList.CustomRows.Example';
const DetailsListCustomRowsExampleCode =
  require('!raw-loader?esModule=false!@fluentui/react-examples/src/react/DetailsList/DetailsList.CustomRows.Example.tsx') as string;

import { DetailsListCustomGroupHeadersExample } from './DetailsList.CustomGroupHeaders.Example';
const DetailsListCustomGroupHeadersExampleCode =
  require('!raw-loader?esModule=false!@fluentui/react-examples/src/react/DetailsList/DetailsList.CustomGroupHeaders.Example.tsx') as string;

import { DetailsListAdvancedExample } from './DetailsList.Advanced.Example';
const DetailsListAdvancedExampleCode =
  require('!raw-loader?esModule=false!@fluentui/react-examples/src/react/DetailsList/DetailsList.Advanced.Example.tsx') as string;

import { DetailsListProportionalColumnsExample } from './DetailsList.ProportionalColumns.Example';
const DetailsListProportionalColumnsCode =
  require('!raw-loader?esModule=false!@fluentui/react-examples/src/react/DetailsList/DetailsList.ProportionalColumns.Example.tsx') as string;

import { DetailsListGroupedExample } from './DetailsList.Grouped.Example';
const DetailsListGroupedExampleCode =
  require('!raw-loader?esModule=false!@fluentui/react-examples/src/react/DetailsList/DetailsList.Grouped.Example.tsx') as string;

import { DetailsListGroupedV2Example } from './DetailsList.GroupedV2.Example';
const DetailsListGroupedV2ExampleCode =
  require('!raw-loader?esModule=false!@fluentui/react-examples/src/react/DetailsList/DetailsList.GroupedV2.Example.tsx') as string;

import { DetailsListGroupedLargeExample } from './DetailsList.Grouped.Large.Example';
const DetailsListGroupedLargeExampleCode =
  require('!raw-loader?esModule=false!@fluentui/react-examples/src/react/DetailsList/DetailsList.Grouped.Large.Example.tsx') as string;

import { DetailsListGroupedV2LargeExample } from './DetailsList.GroupedV2.Large.Example';
const DetailsListGroupedV2LargeExampleCode =
  require('!raw-loader?esModule=false!@fluentui/react-examples/src/react/DetailsList/DetailsList.GroupedV2.Large.Example.tsx') as string;

import { DetailsListGroupedV2ScrollToIndexExample } from './DetailsList.GroupedV2.ScrollToIndex.Example';
const DetailsListGroupedV2ScrollToIndexExampleCode =
  require('!raw-loader?esModule=false!@fluentui/react-examples/src/react/DetailsList/DetailsList.GroupedV2.ScrollToIndex.Example.tsx') as string;

import { DetailsListDragDropExample } from './DetailsList.DragDrop.Example';
const DetailsListDragDropExampleCode =
  require('!raw-loader?esModule=false!@fluentui/react-examples/src/react/DetailsList/DetailsList.DragDrop.Example.tsx') as string;

import { DetailsListDocumentsExample } from './DetailsList.Documents.Example';
const DetailsListDocumentsExampleCode =
  require('!raw-loader?esModule=false!@fluentui/react-examples/src/react/DetailsList/DetailsList.Documents.Example.tsx') as string;

import { DetailsListNavigatingFocusExample } from './DetailsList.NavigatingFocus.Example';
const DetailsListNavigatingFocusExampleCode =
  require('!raw-loader?esModule=false!@fluentui/react-examples/src/react/DetailsList/DetailsList.NavigatingFocus.Example.tsx') as string;

import { ShimmerApplicationExample as DetailsListShimmerExample } from '../Shimmer/Shimmer.Application.Example';
const DetailsListShimmerExampleCode =
  require('!raw-loader?esModule=false!@fluentui/react-examples/src/react/Shimmer/Shimmer.Application.Example.tsx') as string;

import { DetailsListCustomFooterExample } from './DetailsList.CustomFooter.Example';
const DetailsListCustomFooterExampleCode =
  require('!raw-loader?esModule=false!@fluentui/react-examples/src/react/DetailsList/DetailsList.CustomFooter.Example.tsx') as string;

import { DetailsListKeyboardAccessibleResizeAndReorderExample } from './DetailsList.KeyboardAccessibleResizeAndReorder.Example';
const DetailsListKeyboardAccessibleResizeAndReorderExampleCode =
  require('!raw-loader?esModule=false!@fluentui/react-examples/src/react/DetailsList/DetailsList.KeyboardAccessibleResizeAndReorder.Example.tsx') as string;

import { DetailsListKeyboardOverridesExample } from './DetailsList.KeyboardOverrides.Example';
const DetailsListKeyboardOverridesExampleCode =
  require('!raw-loader?esModule=false!@fluentui/react-examples/src/react/DetailsList/DetailsList.KeyboardOverrides.Example.tsx') as string;

export const DetailsListPageProps: IDocPageProps = {
  title: 'DetailsList',
  componentName: 'DetailsList',
  componentUrl: 'https://github.com/microsoft/fluentui/tree/master/packages/react/src/components/DetailsList',
  examples: [
    {
      title: 'DetailsList with 500 documents, sorting, filtering, marquee selection, justified columns',
      code: DetailsListDocumentsExampleCode,
      view: <DetailsListDocumentsExample />,
    },
  ],
  overview: require<string>('!raw-loader?esModule=false!@fluentui/react-examples/src/react/DetailsList/docs/DetailsListOverview.md'),
  bestPractices: require<string>('!raw-loader?esModule=false!@fluentui/react-examples/src/react/DetailsList/docs/DetailsListBestPractices.md'),
  isHeaderVisible: true,
};

function generateProps(example: IExample): IDocPageProps {
  return {
    title: example.title,
    componentName: 'DetailsList',
    componentUrl: 'https://github.com/microsoft/fluentui/tree/master/packages/react/src/components/DetailsList',
    examples: [example],
    isHeaderVisible: false,
    isFeedbackVisible: true,
  };
}

export const DetailsListBasicPageProps: IDocPageProps = generateProps({
  title: 'Simple DetailsList with filtering and marquee selection',
  code: DetailsListBasicExampleCode,
  view: <DetailsListBasicExample />,
});

export const DetailsListAnimationPageProps: IDocPageProps = generateProps({
  title: 'DetailsList with Row animation when cell content changed',
  code: DetailsListAnimationExampleCode,
  view: <DetailsListAnimationExample />,
});

export const DetailsListCompactPageProps: IDocPageProps = generateProps({
  title: 'Compact DetailsList with filtering and marquee selection',
  code: DetailsListCompactExampleCode,
  view: <DetailsListCompactExample />,
});

export const DetailsListSimpleGroupedPageProps: IDocPageProps = generateProps({
  title: 'Simple grouped DetailsList',
  code: DetailsListGroupedExampleCode,
  view: <DetailsListGroupedExample />,
});

export const DetailsListSimpleGroupedV2PageProps: IDocPageProps = generateProps({
  title: 'Simple grouped DetailsList V2',
  code: DetailsListGroupedV2ExampleCode,
  view: <DetailsListGroupedV2Example />,
});

export const DetailsListLargeGroupedPageProps: IDocPageProps = generateProps({
  title: 'Large grouped DetailsList',
  code: DetailsListGroupedLargeExampleCode,
  view: <DetailsListGroupedLargeExample />,
});

export const DetailsListLargeGroupedV2PageProps: IDocPageProps = generateProps({
  title: 'Large grouped DetailsList V2',
  code: DetailsListGroupedV2LargeExampleCode,
  view: <DetailsListGroupedV2LargeExample />,
});

export const DetailsListScrollToIndexGroupedV2PageProps: IDocPageProps = generateProps({
  title: 'Scroll To Index DetailsList V2',
  code: DetailsListGroupedV2ScrollToIndexExampleCode,
  view: <DetailsListGroupedV2ScrollToIndexExample />,
});

export const DetailsListCustomColumnsPageProps: IDocPageProps = generateProps({
  title: 'Rendering custom item columns with sorting',
  code: DetailsListCustomColumnsExampleCode,
  view: <DetailsListCustomColumnsExample />,
});

export const DetailsListCustomRowsPageProps: IDocPageProps = generateProps({
  title: 'Rendering custom item rows',
  code: DetailsListCustomRowsExampleCode,
  view: <DetailsListCustomRowsExample />,
});

export const DetailsListCustomGroupHeadersPageProps: IDocPageProps = generateProps({
  title: 'Rendering custom group headers',
  code: DetailsListCustomGroupHeadersExampleCode,
  view: <DetailsListCustomGroupHeadersExample />,
});

export const DetailsListAdvancedPageProps: IDocPageProps = generateProps({
  title: 'Advanced DetailsList of 5000 items with variable row heights',
  code: DetailsListAdvancedExampleCode,
  view: <DetailsListAdvancedExample />,
});

export const DetailsListProportionalColumnsProps: IDocPageProps = generateProps({
  title: 'Rendering proportional and fixed columns',
  code: DetailsListProportionalColumnsCode,
  view: <DetailsListProportionalColumnsExample />,
});

export const DetailsListDragDropPageProps: IDocPageProps = generateProps({
  title: 'DetailsList supporting drag and drop',
  code: DetailsListDragDropExampleCode,
  view: <DetailsListDragDropExample />,
});

export const DetailsListNavigatingFocusPageProps: IDocPageProps = generateProps({
  title: 'Navigating to new content while preserving keyboard focus',
  code: DetailsListNavigatingFocusExampleCode,
  view: <DetailsListNavigatingFocusExample />,
});

export const DetailsListShimmerPageProps: IDocPageProps = generateProps({
  title: 'Shimmered DetailsList - usually shown while retrieving data',
  code: DetailsListShimmerExampleCode,
  view: <DetailsListShimmerExample />,
});

export const DetailsListCustomFooterPageProps: IDocPageProps = generateProps({
  title: 'Rendering custom DetailsList footer',
  code: DetailsListCustomFooterExampleCode,
  view: <DetailsListCustomFooterExample />,
});

export const DetailsListKeyboardAccessibleResizeAndReorderProps: IDocPageProps = generateProps({
  title: 'Keyboard-accessible column reordering and resizing',
  code: DetailsListKeyboardAccessibleResizeAndReorderExampleCode,
  view: <DetailsListKeyboardAccessibleResizeAndReorderExample />,
});

export const DetailsListKeyboardOverridesProps: IDocPageProps = generateProps({
  title: 'Keyboard overrides for selection',
  code: DetailsListKeyboardOverridesExampleCode,
  view: <DetailsListKeyboardOverridesExample />,
});
