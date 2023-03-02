import * as React from 'react';

import { IDocPageProps } from '@fluentui/react/lib/common/DocPage.types';

// Vertical Stack Examples
import { VerticalStackBasicExample } from './Stack.Vertical.Basic.Example';
const VerticalStackBasicExampleCode =
  require('!raw-loader?esModule=false!@fluentui/react-examples/src/react/Stack/Stack.Vertical.Basic.Example.tsx') as string;

import { VerticalStackReversedExample } from './Stack.Vertical.Reversed.Example';
const VerticalStackReversedExampleCode =
  require('!raw-loader?esModule=false!@fluentui/react-examples/src/react/Stack/Stack.Vertical.Reversed.Example.tsx') as string;

import { VerticalStackSpacingExample } from './Stack.Vertical.Spacing.Example';
const VerticalStackSpacingExampleCode =
  require('!raw-loader?esModule=false!@fluentui/react-examples/src/react/Stack/Stack.Vertical.Spacing.Example.tsx') as string;

import { VerticalStackGrowExample } from './Stack.Vertical.Grow.Example';
const VerticalStackGrowExampleCode =
  require('!raw-loader?esModule=false!@fluentui/react-examples/src/react/Stack/Stack.Vertical.Grow.Example.tsx') as string;

import { VerticalStackShrinkExample } from './Stack.Vertical.Shrink.Example';
const VerticalStackShrinkExampleCode =
  require('!raw-loader?esModule=false!@fluentui/react-examples/src/react/Stack/Stack.Vertical.Shrink.Example.tsx') as string;

import { VerticalStackWrapExample } from './Stack.Vertical.Wrap.Example';
const VerticalStackWrapExampleCode =
  require('!raw-loader?esModule=false!@fluentui/react-examples/src/react/Stack/Stack.Vertical.Wrap.Example.tsx') as string;

import { VerticalStackWrapAdvancedExample } from './Stack.Vertical.WrapAdvanced.Example';
const VerticalStackWrapAdvancedExampleCode =
  require('!raw-loader?esModule=false!@fluentui/react-examples/src/react/Stack/Stack.Vertical.WrapAdvanced.Example.tsx') as string;

import { VerticalStackWrapNestedExample } from './Stack.Vertical.WrapNested.Example';
const VerticalStackWrapNestedExampleCode =
  require('!raw-loader?esModule=false!@fluentui/react-examples/src/react/Stack/Stack.Vertical.WrapNested.Example.tsx') as string;

import { VerticalStackVerticalAlignExample } from './Stack.Vertical.VerticalAlign.Example';
const VerticalStackVerticalAlignExampleCode =
  require('!raw-loader?esModule=false!@fluentui/react-examples/src/react/Stack/Stack.Vertical.VerticalAlign.Example.tsx') as string;

import { VerticalStackHorizontalAlignExample } from './Stack.Vertical.HorizontalAlign.Example';
const VerticalStackHorizontalAlignExampleCode =
  require('!raw-loader?esModule=false!@fluentui/react-examples/src/react/Stack/Stack.Vertical.HorizontalAlign.Example.tsx') as string;

import { VerticalStackConfigureExample } from './Stack.Vertical.Configure.Example';
const VerticalStackConfigureExampleCode =
  require('!raw-loader?esModule=false!@fluentui/react-examples/src/react/Stack/Stack.Vertical.Configure.Example.tsx') as string;

// Horizontal Stack Examples
import { HorizontalStackBasicExample } from './Stack.Horizontal.Basic.Example';
const HorizontalStackBasicExampleCode =
  require('!raw-loader?esModule=false!@fluentui/react-examples/src/react/Stack/Stack.Horizontal.Basic.Example.tsx') as string;

import { HorizontalStackReversedExample } from './Stack.Horizontal.Reversed.Example';
const HorizontalStackReversedExampleCode =
  require('!raw-loader?esModule=false!@fluentui/react-examples/src/react/Stack/Stack.Horizontal.Reversed.Example.tsx') as string;

import { HorizontalStackSpacingExample } from './Stack.Horizontal.Spacing.Example';
const HorizontalStackSpacingExampleCode =
  require('!raw-loader?esModule=false!@fluentui/react-examples/src/react/Stack/Stack.Horizontal.Spacing.Example.tsx') as string;

import { HorizontalStackGrowExample } from './Stack.Horizontal.Grow.Example';
const HorizontalStackGrowExampleCode =
  require('!raw-loader?esModule=false!@fluentui/react-examples/src/react/Stack/Stack.Horizontal.Grow.Example.tsx') as string;

import { HorizontalStackShrinkExample } from './Stack.Horizontal.Shrink.Example';
const HorizontalStackShrinkExampleCode =
  require('!raw-loader?esModule=false!@fluentui/react-examples/src/react/Stack/Stack.Horizontal.Shrink.Example.tsx') as string;

import { HorizontalStackWrapExample } from './Stack.Horizontal.Wrap.Example';
const HorizontalStackWrapExampleCode =
  require('!raw-loader?esModule=false!@fluentui/react-examples/src/react/Stack/Stack.Horizontal.Wrap.Example.tsx') as string;

import { HorizontalStackWrapAdvancedExample } from './Stack.Horizontal.WrapAdvanced.Example';
const HorizontalStackWrapAdvancedExampleCode =
  require('!raw-loader?esModule=false!@fluentui/react-examples/src/react/Stack/Stack.Horizontal.WrapAdvanced.Example.tsx') as string;

import { HorizontalStackWrapNestedExample } from './Stack.Horizontal.WrapNested.Example';
const HorizontalStackWrapNestedExampleCode =
  require('!raw-loader?esModule=false!@fluentui/react-examples/src/react/Stack/Stack.Horizontal.WrapNested.Example.tsx') as string;

import { HorizontalStackHorizontalAlignExample } from './Stack.Horizontal.HorizontalAlign.Example';
const HorizontalStackHorizontalAlignExampleCode =
  require('!raw-loader?esModule=false!@fluentui/react-examples/src/react/Stack/Stack.Horizontal.HorizontalAlign.Example.tsx') as string;

import { HorizontalStackVerticalAlignExample } from './Stack.Horizontal.VerticalAlign.Example';
const HorizontalStackVerticalAlignExampleCode =
  require('!raw-loader?esModule=false!@fluentui/react-examples/src/react/Stack/Stack.Horizontal.VerticalAlign.Example.tsx') as string;

import { HorizontalStackConfigureExample } from './Stack.Horizontal.Configure.Example';
const HorizontalStackConfigureExampleCode =
  require('!raw-loader?esModule=false!@fluentui/react-examples/src/react/Stack/Stack.Horizontal.Configure.Example.tsx') as string;

export const StackPageProps: IDocPageProps = {
  title: 'Stack',
  componentName: 'Stack',
  componentUrl: 'https://github.com/microsoft/fluentui/tree/master/packages/react/src/components/Stack',
  examples: [
    {
      title: 'Basic Vertical Stack',
      code: VerticalStackBasicExampleCode,
      view: <VerticalStackBasicExample />,
    },
    {
      title: 'Reversed Basic Vertical Stack',
      code: VerticalStackReversedExampleCode,
      view: <VerticalStackReversedExample />,
    },
    {
      title: 'Vertical Stack - Gap and Padding Sizes',
      code: VerticalStackSpacingExampleCode,
      view: <VerticalStackSpacingExample />,
    },
    {
      title: 'Vertical Stack - Growing Items',
      code: VerticalStackGrowExampleCode,
      view: <VerticalStackGrowExample />,
    },
    {
      title: 'Vertical Stack - Shrinking Items',
      code: VerticalStackShrinkExampleCode,
      view: <VerticalStackShrinkExample />,
    },
    {
      title: 'Vertical Stack - Wrapping - Basic',
      code: VerticalStackWrapExampleCode,
      view: <VerticalStackWrapExample />,
    },
    {
      title: 'Vertical Stack - Wrapping - Advanced',
      code: VerticalStackWrapAdvancedExampleCode,
      view: <VerticalStackWrapAdvancedExample />,
    },
    {
      title: 'Vertical Stack - Wrapping - Nested',
      code: VerticalStackWrapNestedExampleCode,
      view: <VerticalStackWrapNestedExample />,
    },
    {
      title: 'Vertical Stack - Vertical Alignments',
      code: VerticalStackVerticalAlignExampleCode,
      view: <VerticalStackVerticalAlignExample />,
    },
    {
      title: 'Vertical Stack - Horizontal Alignments',
      code: VerticalStackHorizontalAlignExampleCode,
      view: <VerticalStackHorizontalAlignExample />,
    },
    {
      title: 'Vertical Stack - Configure Properties',
      code: VerticalStackConfigureExampleCode,
      view: <VerticalStackConfigureExample />,
    },
    {
      title: 'Basic Horizontal Stack',
      code: HorizontalStackBasicExampleCode,
      view: <HorizontalStackBasicExample />,
    },
    {
      title: 'Reversed Basic Horizontal Stack',
      code: HorizontalStackReversedExampleCode,
      view: <HorizontalStackReversedExample />,
    },
    {
      title: 'Horizontal Stack - Gap and Padding Sizes',
      code: HorizontalStackSpacingExampleCode,
      view: <HorizontalStackSpacingExample />,
    },
    {
      title: 'Horizontal Stack - Growing Items',
      code: HorizontalStackGrowExampleCode,
      view: <HorizontalStackGrowExample />,
    },
    {
      title: 'Horizontal Stack - Shrinking Items',
      code: HorizontalStackShrinkExampleCode,
      view: <HorizontalStackShrinkExample />,
    },
    {
      title: 'Horizontal Stack - Wrapping - Basic',
      code: HorizontalStackWrapExampleCode,
      view: <HorizontalStackWrapExample />,
    },
    {
      title: 'Horizontal Stack - Wrapping - Advanced',
      code: HorizontalStackWrapAdvancedExampleCode,
      view: <HorizontalStackWrapAdvancedExample />,
    },
    {
      title: 'Horizontal Stack - Wrapping - Nested',
      code: HorizontalStackWrapNestedExampleCode,
      view: <HorizontalStackWrapNestedExample />,
    },
    {
      title: 'Horizontal Stack - Horizontal Alignments',
      code: HorizontalStackHorizontalAlignExampleCode,
      view: <HorizontalStackHorizontalAlignExample />,
    },
    {
      title: 'Horizontal Stack - Vertical Alignments',
      code: HorizontalStackVerticalAlignExampleCode,
      view: <HorizontalStackVerticalAlignExample />,
    },
    {
      title: 'Horizontal Stack - Configure Properties',
      code: HorizontalStackConfigureExampleCode,
      view: <HorizontalStackConfigureExample />,
    },
  ],
  overview: require<string>('!raw-loader?esModule=false!@fluentui/react-examples/src/react/Stack/docs/StackOverview.md'),
  bestPractices: require<string>('!raw-loader?esModule=false!@fluentui/react-examples/src/react/Stack/docs/StackBestPractices.md'),
  dos: require<string>('!raw-loader?esModule=false!@fluentui/react-examples/src/react/Stack/docs/StackDos.md'),
  donts: require<string>('!raw-loader?esModule=false!@fluentui/react-examples/src/react/Stack/docs/StackDonts.md'),
  isHeaderVisible: true,
  isFeedbackVisible: true,
  allowNativeProps: true,
};
