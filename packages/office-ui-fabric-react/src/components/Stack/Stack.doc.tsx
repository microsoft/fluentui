import * as React from 'react';

import { IDocPageProps } from '../../common/DocPage.types';

// Vertical Stack Examples
import { VerticalStackBasicExample } from './examples/Stack.Vertical.Basic.Example';
const VerticalStackBasicExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/Stack/examples/Stack.Vertical.Basic.Example.tsx') as string;

import { VerticalStackReversedExample } from './examples/Stack.Vertical.Reversed.Example';
const VerticalStackReversedExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/Stack/examples/Stack.Vertical.Reversed.Example.tsx') as string;

import { VerticalStackSpacingExample } from './examples/Stack.Vertical.Spacing.Example';
const VerticalStackSpacingExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/Stack/examples/Stack.Vertical.Spacing.Example.tsx') as string;

import { VerticalStackGrowExample } from './examples/Stack.Vertical.Grow.Example';
const VerticalStackGrowExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/Stack/examples/Stack.Vertical.Grow.Example.tsx') as string;

import { VerticalStackShrinkExample } from './examples/Stack.Vertical.Shrink.Example';
const VerticalStackShrinkExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/Stack/examples/Stack.Vertical.Shrink.Example.tsx') as string;

import { VerticalStackWrapExample } from './examples/Stack.Vertical.Wrap.Example';
const VerticalStackWrapExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/Stack/examples/Stack.Vertical.Wrap.Example.tsx') as string;

import { VerticalStackWrapAdvancedExample } from './examples/Stack.Vertical.WrapAdvanced.Example';
const VerticalStackWrapAdvancedExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/Stack/examples/Stack.Vertical.WrapAdvanced.Example.tsx') as string;

import { VerticalStackWrapNestedExample } from './examples/Stack.Vertical.WrapNested.Example';
const VerticalStackWrapNestedExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/Stack/examples/Stack.Vertical.WrapNested.Example.tsx') as string;

import { VerticalStackVerticalAlignExample } from './examples/Stack.Vertical.VerticalAlign.Example';
const VerticalStackVerticalAlignExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/Stack/examples/Stack.Vertical.VerticalAlign.Example.tsx') as string;

import { VerticalStackHorizontalAlignExample } from './examples/Stack.Vertical.HorizontalAlign.Example';
const VerticalStackHorizontalAlignExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/Stack/examples/Stack.Vertical.HorizontalAlign.Example.tsx') as string;

import { VerticalStackConfigureExample } from './examples/Stack.Vertical.Configure.Example';
const VerticalStackConfigureExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/Stack/examples/Stack.Vertical.Configure.Example.tsx') as string;

// Horizontal Stack Examples
import { HorizontalStackBasicExample } from './examples/Stack.Horizontal.Basic.Example';
const HorizontalStackBasicExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/Stack/examples/Stack.Horizontal.Basic.Example.tsx') as string;

import { HorizontalStackReversedExample } from './examples/Stack.Horizontal.Reversed.Example';
const HorizontalStackReversedExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/Stack/examples/Stack.Horizontal.Reversed.Example.tsx') as string;

import { HorizontalStackSpacingExample } from './examples/Stack.Horizontal.Spacing.Example';
const HorizontalStackSpacingExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/Stack/examples/Stack.Horizontal.Spacing.Example.tsx') as string;

import { HorizontalStackGrowExample } from './examples/Stack.Horizontal.Grow.Example';
const HorizontalStackGrowExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/Stack/examples/Stack.Horizontal.Grow.Example.tsx') as string;

import { HorizontalStackShrinkExample } from './examples/Stack.Horizontal.Shrink.Example';
const HorizontalStackShrinkExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/Stack/examples/Stack.Horizontal.Shrink.Example.tsx') as string;

import { HorizontalStackWrapExample } from './examples/Stack.Horizontal.Wrap.Example';
const HorizontalStackWrapExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/Stack/examples/Stack.Horizontal.Wrap.Example.tsx') as string;

import { HorizontalStackWrapAdvancedExample } from './examples/Stack.Horizontal.WrapAdvanced.Example';
const HorizontalStackWrapAdvancedExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/Stack/examples/Stack.Horizontal.WrapAdvanced.Example.tsx') as string;

import { HorizontalStackWrapNestedExample } from './examples/Stack.Horizontal.WrapNested.Example';
const HorizontalStackWrapNestedExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/Stack/examples/Stack.Horizontal.WrapNested.Example.tsx') as string;

import { HorizontalStackHorizontalAlignExample } from './examples/Stack.Horizontal.HorizontalAlign.Example';
const HorizontalStackHorizontalAlignExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/Stack/examples/Stack.Horizontal.HorizontalAlign.Example.tsx') as string;

import { HorizontalStackVerticalAlignExample } from './examples/Stack.Horizontal.VerticalAlign.Example';
const HorizontalStackVerticalAlignExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/Stack/examples/Stack.Horizontal.VerticalAlign.Example.tsx') as string;

import { HorizontalStackConfigureExample } from './examples/Stack.Horizontal.Configure.Example';
const HorizontalStackConfigureExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/Stack/examples/Stack.Horizontal.Configure.Example.tsx') as string;

export const StackPageProps: IDocPageProps = {
  title: 'Stack',
  componentName: 'Stack',
  componentUrl: 'https://github.com/OfficeDev/office-ui-fabric-react/tree/master/packages/office-ui-fabric-react/src/components/Stack',
  examples: [
    {
      title: 'Basic Vertical Stack',
      code: VerticalStackBasicExampleCode,
      view: <VerticalStackBasicExample />
    },
    {
      title: 'Reversed Basic Vertical Stack',
      code: VerticalStackReversedExampleCode,
      view: <VerticalStackReversedExample />
    },
    {
      title: 'Vertical Stack - Gap and Padding Sizes',
      code: VerticalStackSpacingExampleCode,
      view: <VerticalStackSpacingExample />
    },
    {
      title: 'Vertical Stack - Growing Items',
      code: VerticalStackGrowExampleCode,
      view: <VerticalStackGrowExample />
    },
    {
      title: 'Vertical Stack - Shrinking Items',
      code: VerticalStackShrinkExampleCode,
      view: <VerticalStackShrinkExample />
    },
    {
      title: 'Vertical Stack - Wrapping - Basic',
      code: VerticalStackWrapExampleCode,
      view: <VerticalStackWrapExample />
    },
    {
      title: 'Vertical Stack - Wrapping - Advanced',
      code: VerticalStackWrapAdvancedExampleCode,
      view: <VerticalStackWrapAdvancedExample />
    },
    {
      title: 'Vertical Stack - Wrapping - Nested',
      code: VerticalStackWrapNestedExampleCode,
      view: <VerticalStackWrapNestedExample />
    },
    {
      title: 'Vertical Stack - Vertical Alignments',
      code: VerticalStackVerticalAlignExampleCode,
      view: <VerticalStackVerticalAlignExample />
    },
    {
      title: 'Vertical Stack - Horizontal Alignments',
      code: VerticalStackHorizontalAlignExampleCode,
      view: <VerticalStackHorizontalAlignExample />
    },
    {
      title: 'Vertical Stack - Configure Properties',
      code: VerticalStackConfigureExampleCode,
      view: <VerticalStackConfigureExample />
    },
    {
      title: 'Basic Horizontal Stack',
      code: HorizontalStackBasicExampleCode,
      view: <HorizontalStackBasicExample />
    },
    {
      title: 'Reversed Basic Horizontal Stack',
      code: HorizontalStackReversedExampleCode,
      view: <HorizontalStackReversedExample />
    },
    {
      title: 'Horizontal Stack - Gap and Padding Sizes',
      code: HorizontalStackSpacingExampleCode,
      view: <HorizontalStackSpacingExample />
    },
    {
      title: 'Horizontal Stack - Growing Items',
      code: HorizontalStackGrowExampleCode,
      view: <HorizontalStackGrowExample />
    },
    {
      title: 'Horizontal Stack - Shrinking Items',
      code: HorizontalStackShrinkExampleCode,
      view: <HorizontalStackShrinkExample />
    },
    {
      title: 'Horizontal Stack - Wrapping - Basic',
      code: HorizontalStackWrapExampleCode,
      view: <HorizontalStackWrapExample />
    },
    {
      title: 'Horizontal Stack - Wrapping - Advanced',
      code: HorizontalStackWrapAdvancedExampleCode,
      view: <HorizontalStackWrapAdvancedExample />
    },
    {
      title: 'Horizontal Stack - Wrapping - Nested',
      code: HorizontalStackWrapNestedExampleCode,
      view: <HorizontalStackWrapNestedExample />
    },
    {
      title: 'Horizontal Stack - Horizontal Alignments',
      code: HorizontalStackHorizontalAlignExampleCode,
      view: <HorizontalStackHorizontalAlignExample />
    },
    {
      title: 'Horizontal Stack - Vertical Alignments',
      code: HorizontalStackVerticalAlignExampleCode,
      view: <HorizontalStackVerticalAlignExample />
    },
    {
      title: 'Horizontal Stack - Configure Properties',
      code: HorizontalStackConfigureExampleCode,
      view: <HorizontalStackConfigureExample />
    }
  ],
  overview: require<string>('!raw-loader!office-ui-fabric-react/src/components/Stack/docs/StackOverview.md'),
  bestPractices: '',
  dos: require<string>('!raw-loader!office-ui-fabric-react/src/components/Stack/docs/StackDos.md'),
  donts: require<string>('!raw-loader!office-ui-fabric-react/src/components/Stack/docs/StackDonts.md'),
  isHeaderVisible: true,
  isFeedbackVisible: true,
  allowNativeProps: true
};
