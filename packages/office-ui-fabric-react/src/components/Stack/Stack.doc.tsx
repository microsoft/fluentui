import * as React from 'react';

import { IDocPageProps } from '../../common/DocPage.types';
import { StackStatus } from './Stack.checklist';

// Vertical Stack Examples
import { VerticalStackBasicExample } from './examples/Stack.Vertical.Basic.Example';
const VerticalStackBasicExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/Stack/examples/Stack.Vertical.Basic.Example.tsx') as string;
const VerticalStackBasicExampleCodepen = require('!raw-loader!office-ui-fabric-react/lib/codepen/components/Stack/Stack.Vertical.Basic.Example.Codepen.txt') as string;

import { VerticalStackReversedExample } from './examples/Stack.Vertical.Reversed.Example';
const VerticalStackReversedExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/Stack/examples/Stack.Vertical.Reversed.Example.tsx') as string;
const VerticalStackReversedExampleCodepen = require('!raw-loader!office-ui-fabric-react/lib/codepen/components/Stack/Stack.Vertical.Reversed.Example.Codepen.txt') as string;

import { VerticalStackSpacingExample } from './examples/Stack.Vertical.Spacing.Example';
const VerticalStackSpacingExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/Stack/examples/Stack.Vertical.Spacing.Example.tsx') as string;
const VerticalStackSpacingExampleCodepen = require('!raw-loader!office-ui-fabric-react/lib/codepen/components/Stack/Stack.Vertical.Spacing.Example.Codepen.txt') as string;

import { VerticalStackGrowExample } from './examples/Stack.Vertical.Grow.Example';
const VerticalStackGrowExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/Stack/examples/Stack.Vertical.Grow.Example.tsx') as string;
const VerticalStackGrowExampleCodepen = require('!raw-loader!office-ui-fabric-react/lib/codepen/components/Stack/Stack.Vertical.Grow.Example.Codepen.txt') as string;

import { VerticalStackShrinkExample } from './examples/Stack.Vertical.Shrink.Example';
const VerticalStackShrinkExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/Stack/examples/Stack.Vertical.Shrink.Example.tsx') as string;
const VerticalStackShrinkExampleCodepen = require('!raw-loader!office-ui-fabric-react/lib/codepen/components/Stack/Stack.Vertical.Shrink.Example.Codepen.txt') as string;

import { VerticalStackWrapExample } from './examples/Stack.Vertical.Wrap.Example';
const VerticalStackWrapExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/Stack/examples/Stack.Vertical.Wrap.Example.tsx') as string;
const VerticalStackWrapExampleCodepen = require('!raw-loader!office-ui-fabric-react/lib/codepen/components/Stack/Stack.Vertical.Wrap.Example.Codepen.txt') as string;

import { VerticalStackWrapAdvancedExample } from './examples/Stack.Vertical.WrapAdvanced.Example';
const VerticalStackWrapAdvancedExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/Stack/examples/Stack.Vertical.WrapAdvanced.Example.tsx') as string;
const VerticalStackWrapAdvancedExampleCodepen = require('!raw-loader!office-ui-fabric-react/lib/codepen/components/Stack/Stack.Vertical.WrapAdvanced.Example.Codepen.txt') as string;

import { VerticalStackWrapNestedExample } from './examples/Stack.Vertical.WrapNested.Example';
const VerticalStackWrapNestedExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/Stack/examples/Stack.Vertical.WrapNested.Example.tsx') as string;
const VerticalStackWrapNestedExampleCodepen = require('!raw-loader!office-ui-fabric-react/lib/codepen/components/Stack/Stack.Vertical.WrapNested.Example.Codepen.txt') as string;

import { VerticalStackVerticalAlignExample } from './examples/Stack.Vertical.VerticalAlign.Example';
const VerticalStackVerticalAlignExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/Stack/examples/Stack.Vertical.VerticalAlign.Example.tsx') as string;
const VerticalStackVerticalAlignExampleCodepen = require('!raw-loader!office-ui-fabric-react/lib/codepen/components/Stack/Stack.Vertical.VerticalAlign.Example.Codepen.txt') as string;

import { VerticalStackHorizontalAlignExample } from './examples/Stack.Vertical.HorizontalAlign.Example';
const VerticalStackHorizontalAlignExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/Stack/examples/Stack.Vertical.HorizontalAlign.Example.tsx') as string;
const VerticalStackHorizontalAlignExampleCodepen = require('!raw-loader!office-ui-fabric-react/lib/codepen/components/Stack/Stack.Vertical.HorizontalAlign.Example.Codepen.txt') as string;

import { VerticalStackConfigureExample } from './examples/Stack.Vertical.Configure.Example';
const VerticalStackConfigureExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/Stack/examples/Stack.Vertical.Configure.Example.tsx') as string;
const VerticalStackConfigureExampleCodepen = require('!raw-loader!office-ui-fabric-react/lib/codepen/components/Stack/Stack.Vertical.Configure.Example.Codepen.txt') as string;

// Horizontal Stack Examples
import { HorizontalStackBasicExample } from './examples/Stack.Horizontal.Basic.Example';
const HorizontalStackBasicExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/Stack/examples/Stack.Horizontal.Basic.Example.tsx') as string;
const HorizontalStackBasicExampleCodepen = require('!raw-loader!office-ui-fabric-react/lib/codepen/components/Stack/Stack.Horizontal.Basic.Example.Codepen.txt') as string;

import { HorizontalStackReversedExample } from './examples/Stack.Horizontal.Reversed.Example';
const HorizontalStackReversedExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/Stack/examples/Stack.Horizontal.Reversed.Example.tsx') as string;
const HorizontalStackReversedExampleCodepen = require('!raw-loader!office-ui-fabric-react/lib/codepen/components/Stack/Stack.Horizontal.Reversed.Example.Codepen.txt') as string;

import { HorizontalStackSpacingExample } from './examples/Stack.Horizontal.Spacing.Example';
const HorizontalStackSpacingExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/Stack/examples/Stack.Horizontal.Spacing.Example.tsx') as string;
const HorizontalStackSpacingExampleCodepen = require('!raw-loader!office-ui-fabric-react/lib/codepen/components/Stack/Stack.Horizontal.Spacing.Example.Codepen.txt') as string;

import { HorizontalStackGrowExample } from './examples/Stack.Horizontal.Grow.Example';
const HorizontalStackGrowExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/Stack/examples/Stack.Horizontal.Grow.Example.tsx') as string;
const HorizontalStackGrowExampleCodepen = require('!raw-loader!office-ui-fabric-react/lib/codepen/components/Stack/Stack.Horizontal.Grow.Example.Codepen.txt') as string;

import { HorizontalStackShrinkExample } from './examples/Stack.Horizontal.Shrink.Example';
const HorizontalStackShrinkExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/Stack/examples/Stack.Horizontal.Shrink.Example.tsx') as string;
const HorizontalStackShrinkExampleCodepen = require('!raw-loader!office-ui-fabric-react/lib/codepen/components/Stack/Stack.Horizontal.Shrink.Example.Codepen.txt') as string;

import { HorizontalStackWrapExample } from './examples/Stack.Horizontal.Wrap.Example';
const HorizontalStackWrapExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/Stack/examples/Stack.Horizontal.Wrap.Example.tsx') as string;
const HorizontalStackWrapExampleCodepen = require('!raw-loader!office-ui-fabric-react/lib/codepen/components/Stack/Stack.Horizontal.Wrap.Example.Codepen.txt') as string;

import { HorizontalStackWrapAdvancedExample } from './examples/Stack.Horizontal.WrapAdvanced.Example';
const HorizontalStackWrapAdvancedExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/Stack/examples/Stack.Horizontal.WrapAdvanced.Example.tsx') as string;
const HorizontalStackWrapAdvancedExampleCodepen = require('!raw-loader!office-ui-fabric-react/lib/codepen/components/Stack/Stack.Horizontal.WrapAdvanced.Example.Codepen.txt') as string;

import { HorizontalStackWrapNestedExample } from './examples/Stack.Horizontal.WrapNested.Example';
const HorizontalStackWrapNestedExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/Stack/examples/Stack.Horizontal.WrapNested.Example.tsx') as string;
const HorizontalStackWrapNestedExampleCodepen = require('!raw-loader!office-ui-fabric-react/lib/codepen/components/Stack/Stack.Horizontal.WrapNested.Example.Codepen.txt') as string;

import { HorizontalStackHorizontalAlignExample } from './examples/Stack.Horizontal.HorizontalAlign.Example';
const HorizontalStackHorizontalAlignExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/Stack/examples/Stack.Horizontal.HorizontalAlign.Example.tsx') as string;
const HorizontalStackHorizontalAlignExampleCodepen = require('!raw-loader!office-ui-fabric-react/lib/codepen/components/Stack/Stack.Horizontal.HorizontalAlign.Example.Codepen.txt') as string;

import { HorizontalStackVerticalAlignExample } from './examples/Stack.Horizontal.VerticalAlign.Example';
const HorizontalStackVerticalAlignExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/Stack/examples/Stack.Horizontal.VerticalAlign.Example.tsx') as string;
const HorizontalStackVerticalAlignExampleCodepen = require('!raw-loader!office-ui-fabric-react/lib/codepen/components/Stack/Stack.Horizontal.VerticalAlign.Example.Codepen.txt') as string;

import { HorizontalStackConfigureExample } from './examples/Stack.Horizontal.Configure.Example';
const HorizontalStackConfigureExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/Stack/examples/Stack.Horizontal.Configure.Example.tsx') as string;
const HorizontalStackConfigureExampleCodepen = require('!raw-loader!office-ui-fabric-react/lib/codepen/components/Stack/Stack.Horizontal.Configure.Example.Codepen.txt') as string;

export const StackPageProps: IDocPageProps = {
  title: 'Stack',
  componentName: 'Stack',
  componentUrl: 'https://github.com/OfficeDev/office-ui-fabric-react/tree/master/packages/office-ui-fabric-react/src/components/Stack',
  componentStatus: StackStatus,
  examples: [
    {
      title: 'Basic Vertical Stack',
      code: VerticalStackBasicExampleCode,
      view: <VerticalStackBasicExample />,
      codepenJS: VerticalStackBasicExampleCodepen
    },
    {
      title: 'Reversed Basic Vertical Stack',
      code: VerticalStackReversedExampleCode,
      view: <VerticalStackReversedExample />,
      codepenJS: VerticalStackReversedExampleCodepen
    },
    {
      title: 'Vertical Stack - Gap and Padding Sizes',
      code: VerticalStackSpacingExampleCode,
      view: <VerticalStackSpacingExample />,
      codepenJS: VerticalStackSpacingExampleCodepen
    },
    {
      title: 'Vertical Stack - Growing Items',
      code: VerticalStackGrowExampleCode,
      view: <VerticalStackGrowExample />,
      codepenJS: VerticalStackGrowExampleCodepen
    },
    {
      title: 'Vertical Stack - Shrinking Items',
      code: VerticalStackShrinkExampleCode,
      view: <VerticalStackShrinkExample />,
      codepenJS: VerticalStackShrinkExampleCodepen
    },
    {
      title: 'Vertical Stack - Wrapping - Basic',
      code: VerticalStackWrapExampleCode,
      view: <VerticalStackWrapExample />,
      codepenJS: VerticalStackWrapExampleCodepen
    },
    {
      title: 'Vertical Stack - Wrapping - Advanced',
      code: VerticalStackWrapAdvancedExampleCode,
      view: <VerticalStackWrapAdvancedExample />,
      codepenJS: VerticalStackWrapAdvancedExampleCodepen
    },
    {
      title: 'Vertical Stack - Wrapping - Nested',
      code: VerticalStackWrapNestedExampleCode,
      view: <VerticalStackWrapNestedExample />,
      codepenJS: VerticalStackWrapNestedExampleCodepen
    },
    {
      title: 'Vertical Stack - Vertical Alignments',
      code: VerticalStackVerticalAlignExampleCode,
      view: <VerticalStackVerticalAlignExample />,
      codepenJS: VerticalStackVerticalAlignExampleCodepen
    },
    {
      title: 'Vertical Stack - Horizontal Alignments',
      code: VerticalStackHorizontalAlignExampleCode,
      view: <VerticalStackHorizontalAlignExample />,
      codepenJS: VerticalStackHorizontalAlignExampleCodepen
    },
    {
      title: 'Vertical Stack - Configure Properties',
      code: VerticalStackConfigureExampleCode,
      view: <VerticalStackConfigureExample />,
      codepenJS: VerticalStackConfigureExampleCodepen
    },
    {
      title: 'Basic Horizontal Stack',
      code: HorizontalStackBasicExampleCode,
      view: <HorizontalStackBasicExample />,
      codepenJS: HorizontalStackBasicExampleCodepen
    },
    {
      title: 'Reversed Basic Horizontal Stack',
      code: HorizontalStackReversedExampleCode,
      view: <HorizontalStackReversedExample />,
      codepenJS: HorizontalStackReversedExampleCodepen
    },
    {
      title: 'Horizontal Stack - Gap and Padding Sizes',
      code: HorizontalStackSpacingExampleCode,
      view: <HorizontalStackSpacingExample />,
      codepenJS: HorizontalStackSpacingExampleCodepen
    },
    {
      title: 'Horizontal Stack - Growing Items',
      code: HorizontalStackGrowExampleCode,
      view: <HorizontalStackGrowExample />,
      codepenJS: HorizontalStackGrowExampleCodepen
    },
    {
      title: 'Horizontal Stack - Shrinking Items',
      code: HorizontalStackShrinkExampleCode,
      view: <HorizontalStackShrinkExample />,
      codepenJS: HorizontalStackShrinkExampleCodepen
    },
    {
      title: 'Horizontal Stack - Wrapping - Basic',
      code: HorizontalStackWrapExampleCode,
      view: <HorizontalStackWrapExample />,
      codepenJS: HorizontalStackWrapExampleCodepen
    },
    {
      title: 'Horizontal Stack - Wrapping - Advanced',
      code: HorizontalStackWrapAdvancedExampleCode,
      view: <HorizontalStackWrapAdvancedExample />,
      codepenJS: HorizontalStackWrapAdvancedExampleCodepen
    },
    {
      title: 'Horizontal Stack - Wrapping - Nested',
      code: HorizontalStackWrapNestedExampleCode,
      view: <HorizontalStackWrapNestedExample />,
      codepenJS: HorizontalStackWrapNestedExampleCodepen
    },
    {
      title: 'Horizontal Stack - Horizontal Alignments',
      code: HorizontalStackHorizontalAlignExampleCode,
      view: <HorizontalStackHorizontalAlignExample />,
      codepenJS: HorizontalStackHorizontalAlignExampleCodepen
    },
    {
      title: 'Horizontal Stack - Vertical Alignments',
      code: HorizontalStackVerticalAlignExampleCode,
      view: <HorizontalStackVerticalAlignExample />,
      codepenJS: HorizontalStackVerticalAlignExampleCodepen
    },
    {
      title: 'Horizontal Stack - Configure Properties',
      code: HorizontalStackConfigureExampleCode,
      view: <HorizontalStackConfigureExample />,
      codepenJS: HorizontalStackConfigureExampleCodepen
    }
  ],
  propertiesTablesSources: [
    require<string>('!raw-loader!office-ui-fabric-react/src/components/Stack/Stack.types.ts'),
    require<string>('!raw-loader!office-ui-fabric-react/src/components/Stack/StackItem/StackItem.types.ts')
  ],
  overview: require<string>('!raw-loader!office-ui-fabric-react/src/components/Stack/docs/StackOverview.md'),
  bestPractices: '',
  dos: require<string>('!raw-loader!office-ui-fabric-react/src/components/Stack/docs/StackDos.md'),
  donts: require<string>('!raw-loader!office-ui-fabric-react/src/components/Stack/docs/StackDonts.md'),
  isHeaderVisible: true,
  isFeedbackVisible: true,
  allowNativeProps: true
};
