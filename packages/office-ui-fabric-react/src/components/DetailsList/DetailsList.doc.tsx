import * as React from 'react';

import { IDocPageProps, IExample } from '../../common/DocPage.types';
import { DetailsListStatus } from './DetailsList.checklist';

import { DetailsListBasicExample } from './examples/DetailsList.Basic.Example';
const DetailsListBasicExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/DetailsList/examples/DetailsList.Basic.Example.tsx') as string;
const DetailsListBasicExampleCodepen = require('!@uifabric/codepen-loader!office-ui-fabric-react/src/components/DetailsList/examples/DetailsList.Basic.Example.tsx') as string;

import { DetailsListCompactExample } from './examples/DetailsList.Compact.Example';
const DetailsListCompactExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/DetailsList/examples/DetailsList.Compact.Example.tsx') as string;
const DetailsListCompactExampleCodepen = require('!@uifabric/codepen-loader!office-ui-fabric-react/src/components/DetailsList/examples/DetailsList.Compact.Example.tsx') as string;

import { DetailsListCustomColumnsExample } from './examples/DetailsList.CustomColumns.Example';
const DetailsListCustomColumnsExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/DetailsList/examples/DetailsList.CustomColumns.Example.tsx') as string;
const DetailsListCustomColumnsExampleCodepen = require('!@uifabric/codepen-loader!office-ui-fabric-react/src/components/DetailsList/examples/DetailsList.CustomColumns.Example.tsx') as string;

import { DetailsListCustomRowsExample } from './examples/DetailsList.CustomRows.Example';
const DetailsListCustomRowsExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/DetailsList/examples/DetailsList.CustomRows.Example.tsx') as string;
const DetailsListCustomRowsExampleCodepen = require('!@uifabric/codepen-loader!office-ui-fabric-react/src/components/DetailsList/examples/DetailsList.CustomRows.Example.tsx') as string;

import { DetailsListCustomGroupHeadersExample } from './examples/DetailsList.CustomGroupHeaders.Example';
const DetailsListCustomGroupHeadersExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/DetailsList/examples/DetailsList.CustomGroupHeaders.Example.tsx') as string;
const DetailsListCustomGroupHeadersExampleCodepen = require('!@uifabric/codepen-loader!office-ui-fabric-react/src/components/DetailsList/examples/DetailsList.CustomGroupHeaders.Example.tsx') as string;

import { DetailsListAdvancedExample } from './examples/DetailsList.Advanced.Example';
const DetailsListAdvancedExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/DetailsList/examples/DetailsList.Advanced.Example.tsx') as string;
const DetailsListAdvancedExampleCodepen = require('!@uifabric/codepen-loader!office-ui-fabric-react/src/components/DetailsList/examples/DetailsList.Advanced.Example.tsx') as string;

import { DetailsListGroupedExample } from './examples/DetailsList.Grouped.Example';
const DetailsListGroupedExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/DetailsList/examples/DetailsList.Grouped.Example.tsx') as string;
const DetailsListGroupedExampleCodepen = require('!@uifabric/codepen-loader!office-ui-fabric-react/src/components/DetailsList/examples/DetailsList.Grouped.Example.tsx') as string;

import { DetailsListGroupedLargeExample } from './examples/DetailsList.Grouped.Large.Example';
const DetailsListGroupedLargeExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/DetailsList/examples/DetailsList.Grouped.Large.Example.tsx') as string;
const DetailsListGroupedLargeExampleCodepen = require('!@uifabric/codepen-loader!office-ui-fabric-react/src/components/DetailsList/examples/DetailsList.Grouped.Large.Example.tsx') as string;

import { DetailsListDragDropExample } from './examples/DetailsList.DragDrop.Example';
const DetailsListDragDropExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/DetailsList/examples/DetailsList.DragDrop.Example.tsx') as string;
const DetailsListDragDropExampleCodepen = require('!@uifabric/codepen-loader!office-ui-fabric-react/src/components/DetailsList/examples/DetailsList.DragDrop.Example.tsx') as string;

import { DetailsListDocumentsExample } from './examples/DetailsList.Documents.Example';
const DetailsListDocumentsExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/DetailsList/examples/DetailsList.Documents.Example.tsx') as string;
const DetailsListDocumentsExampleCodepen = require('!@uifabric/codepen-loader!office-ui-fabric-react/src/components/DetailsList/examples/DetailsList.Documents.Example.tsx') as string;

import { DetailsListNavigatingFocusExample } from './examples/DetailsList.NavigatingFocus.Example';
const DetailsListNavigatingFocusExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/DetailsList/examples/DetailsList.NavigatingFocus.Example.tsx') as string;
const DetailsListNavigatingFocusExampleCodepen = require('!@uifabric/codepen-loader!office-ui-fabric-react/src/components/DetailsList/examples/DetailsList.NavigatingFocus.Example.tsx') as string;

import { ShimmerApplicationExample as DetailsListShimmerExample } from '../Shimmer/examples/Shimmer.Application.Example';
const DetailsListShimmerExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/Shimmer/examples/Shimmer.Application.Example.tsx') as string;
const DetailsListShimmerExampleCodepen = require('!@uifabric/codepen-loader!office-ui-fabric-react/src/components/Shimmer/examples/Shimmer.Application.Example.tsx') as string;

import { DetailsListCustomFooterExample } from './examples/DetailsList.CustomFooter.Example';
const DetailsListCustomFooterExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/DetailsList/examples/DetailsList.CustomFooter.Example.tsx') as string;
const DetailsListCustomFooterExampleCodepen = require('!@uifabric/codepen-loader!office-ui-fabric-react/src/components/DetailsList/examples/DetailsList.CustomFooter.Example.tsx') as string;

export const DetailsListPageProps: IDocPageProps = {
  title: 'DetailsList',
  componentName: 'DetailsList',
  componentUrl:
    'https://github.com/OfficeDev/office-ui-fabric-react/tree/master/packages/office-ui-fabric-react/src/components/DetailsList',
  componentStatus: DetailsListStatus,
  examples: [
    {
      title: 'DetailsList with 500 documents, sorting, filtering, marquee selection, justified columns',
      code: DetailsListDocumentsExampleCode,
      codepenJS: DetailsListDocumentsExampleCodepen,
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
  codepenJS: DetailsListBasicExampleCodepen,
  view: <DetailsListBasicExample />
});

export const DetailsListCompactPageProps: IDocPageProps = generateProps({
  title: 'Compact DetailsList with filtering and marquee selection',
  code: DetailsListCompactExampleCode,
  codepenJS: DetailsListCompactExampleCodepen,
  view: <DetailsListCompactExample />
});

export const DetailsListSimpleGroupedPageProps: IDocPageProps = generateProps({
  title: 'Simple grouped DetailsList',
  code: DetailsListGroupedExampleCode,
  codepenJS: DetailsListGroupedExampleCodepen,
  view: <DetailsListGroupedExample />
});

export const DetailsListLargeGroupedPageProps: IDocPageProps = generateProps({
  title: 'Large grouped DetailsList',
  code: DetailsListGroupedLargeExampleCode,
  codepenJS: DetailsListGroupedLargeExampleCodepen,
  view: <DetailsListGroupedLargeExample />
});

export const DetailsListCustomColumnsPageProps: IDocPageProps = generateProps({
  title: 'Rendering custom item columns with sorting',
  code: DetailsListCustomColumnsExampleCode,
  codepenJS: DetailsListCustomColumnsExampleCodepen,
  view: <DetailsListCustomColumnsExample />
});

export const DetailsListCustomRowsPageProps: IDocPageProps = generateProps({
  title: 'Rendering custom item rows',
  code: DetailsListCustomRowsExampleCode,
  codepenJS: DetailsListCustomRowsExampleCodepen,
  view: <DetailsListCustomRowsExample />
});

export const DetailsListCustomGroupHeadersPageProps: IDocPageProps = generateProps({
  title: 'Rendering custom group headers',
  code: DetailsListCustomGroupHeadersExampleCode,
  codepenJS: DetailsListCustomGroupHeadersExampleCodepen,
  view: <DetailsListCustomGroupHeadersExample />
});

export const DetailsListAdvancedPageProps: IDocPageProps = generateProps({
  title: 'Advanced DetailsList of 5000 items with variable row heights',
  code: DetailsListAdvancedExampleCode,
  codepenJS: DetailsListAdvancedExampleCodepen,
  view: <DetailsListAdvancedExample />
});

export const DetailsListDragDropPageProps: IDocPageProps = generateProps({
  title: 'DetailsList supporting drag and drop',
  code: DetailsListDragDropExampleCode,
  codepenJS: DetailsListDragDropExampleCodepen,
  view: <DetailsListDragDropExample />
});

export const DetailsListNavigatingFocusPageProps: IDocPageProps = generateProps({
  title: 'Navigating to new content while preserving keyboard focus',
  code: DetailsListNavigatingFocusExampleCode,
  codepenJS: DetailsListNavigatingFocusExampleCodepen,
  view: <DetailsListNavigatingFocusExample />
});

export const DetailsListShimmerPageProps: IDocPageProps = generateProps({
  title: 'Shimmered DetailsList - usually shown while retrieving data',
  code: DetailsListShimmerExampleCode,
  codepenJS: DetailsListShimmerExampleCodepen,
  view: <DetailsListShimmerExample />
});

export const DetailsListCustomFooterPageProps: IDocPageProps = generateProps({
  title: 'Rendering custom DetailsList footer',
  code: DetailsListCustomFooterExampleCode,
  codepenJS: DetailsListCustomFooterExampleCodepen,
  view: <DetailsListCustomFooterExample />
});
