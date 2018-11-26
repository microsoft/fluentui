import * as React from 'react';
import { IDocPageProps } from '../../../common/DocPage.types';
import { HorizontalStackStatus } from './HorizontalStack.checklist';

import { HorizontalStackBasicExample } from './examples/HorizontalStack.Basic.Example';
const HorizontalStackBasicExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/Stack/HorizontalStack/examples/HorizontalStack.Basic.Example.tsx') as string;
const HorizontalStackBasicExampleCodepen = require('!raw-loader!office-ui-fabric-react/lib/codepen/components/Stack/HorizontalStack/HorizontalStack.Basic.Example.Codepen.txt') as string;

import { HorizontalStackSpacingExample } from './examples/HorizontalStack.Spacing.Example';
const HorizontalStackSpacingExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/Stack/HorizontalStack/examples/HorizontalStack.Spacing.Example.tsx') as string;
const HorizontalStackSpacingExampleCodepen = require('!raw-loader!office-ui-fabric-react/lib/codepen/components/Stack/HorizontalStack/HorizontalStack.Spacing.Example.Codepen.txt') as string;

import { HorizontalStackGrowExample } from './examples/HorizontalStack.Grow.Example';
const HorizontalStackGrowExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/Stack/HorizontalStack/examples/HorizontalStack.Grow.Example.tsx') as string;
const HorizontalStackGrowExampleCodepen = require('!raw-loader!office-ui-fabric-react/lib/codepen/components/Stack/HorizontalStack/HorizontalStack.Grow.Example.Codepen.txt') as string;

import { HorizontalStackShrinkExample } from './examples/HorizontalStack.Shrink.Example';
const HorizontalStackShrinkExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/Stack/HorizontalStack/examples/HorizontalStack.Shrink.Example.tsx') as string;
const HorizontalStackShrinkExampleCodepen = require('!raw-loader!office-ui-fabric-react/lib/codepen/components/Stack/HorizontalStack/HorizontalStack.Shrink.Example.Codepen.txt') as string;

import { HorizontalStackWrapExample } from './examples/HorizontalStack.Wrap.Example';
const HorizontalStackWrapExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/Stack/HorizontalStack/examples/HorizontalStack.Wrap.Example.tsx') as string;
const HorizontalStackWrapExampleCodepen = require('!raw-loader!office-ui-fabric-react/lib/codepen/components/Stack/HorizontalStack/HorizontalStack.Wrap.Example.Codepen.txt') as string;

import { HorizontalStackWrapAdvancedExample } from './examples/HorizontalStack.WrapAdvanced.Example';
const HorizontalStackWrapAdvancedExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/Stack/HorizontalStack/examples/HorizontalStack.WrapAdvanced.Example.tsx') as string;
const HorizontalStackWrapAdvancedExampleCodepen = require('!raw-loader!office-ui-fabric-react/lib/codepen/components/Stack/HorizontalStack/HorizontalStack.WrapAdvanced.Example.Codepen.txt') as string;

import { HorizontalStackWrapNestedExample } from './examples/HorizontalStack.WrapNested.Example';
const HorizontalStackWrapNestedExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/Stack/HorizontalStack/examples/HorizontalStack.WrapNested.Example.tsx') as string;
const HorizontalStackWrapNestedExampleCodepen = require('!raw-loader!office-ui-fabric-react/lib/codepen/components/Stack/HorizontalStack/HorizontalStack.WrapNested.Example.Codepen.txt') as string;

import { HorizontalStackHorizontalAlignExample } from './examples/HorizontalStack.HorizontalAlign.Example';
const HorizontalStackHorizontalAlignExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/Stack/HorizontalStack/examples/HorizontalStack.HorizontalAlign.Example.tsx') as string;
const HorizontalStackHorizontalAlignExampleCodepen = require('!raw-loader!office-ui-fabric-react/lib/codepen/components/Stack/HorizontalStack/HorizontalStack.HorizontalAlign.Example.Codepen.txt') as string;

import { HorizontalStackVerticalAlignExample } from './examples/HorizontalStack.VerticalAlign.Example';
const HorizontalStackVerticalAlignExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/Stack/HorizontalStack/examples/HorizontalStack.VerticalAlign.Example.tsx') as string;
const HorizontalStackVerticalAlignExampleCodepen = require('!raw-loader!office-ui-fabric-react/lib/codepen/components/Stack/HorizontalStack/HorizontalStack.VerticalAlign.Example.Codepen.txt') as string;

import { HorizontalStackConfigureExample } from './examples/HorizontalStack.Configure.Example';
const HorizontalStackConfigureExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/Stack/HorizontalStack/examples/HorizontalStack.Configure.Example.tsx') as string;
const HorizontalStackConfigureExampleCodepen = require('!raw-loader!office-ui-fabric-react/lib/codepen/components/Stack/HorizontalStack/HorizontalStack.Configure.Example.Codepen.txt') as string;

export const HorizontalStackPageProps: IDocPageProps = {
  title: 'Horizontal Stack',
  componentName: 'HorizontalStackPageProps',
  componentUrl:
    'https://github.com/OfficeDev/office-ui-fabric-react/tree/master/packages/office-ui-fabric-react/src/components/Stack/HorizontalStack',
  componentStatus: HorizontalStackStatus,
  examples: [
    {
      title: 'Basic Horizontal Stack',
      code: HorizontalStackBasicExampleCode,
      view: <HorizontalStackBasicExample />,
      codepenJS: HorizontalStackBasicExampleCodepen
    },
    {
      title: 'Gap and Padding Sizes',
      code: HorizontalStackSpacingExampleCode,
      view: <HorizontalStackSpacingExample />,
      codepenJS: HorizontalStackSpacingExampleCodepen
    },
    {
      title: 'Growing Items',
      code: HorizontalStackGrowExampleCode,
      view: <HorizontalStackGrowExample />,
      codepenJS: HorizontalStackGrowExampleCodepen
    },
    {
      title: 'Shrinking Items',
      code: HorizontalStackShrinkExampleCode,
      view: <HorizontalStackShrinkExample />,
      codepenJS: HorizontalStackShrinkExampleCodepen
    },
    {
      title: 'Wrapping - Basic',
      code: HorizontalStackWrapExampleCode,
      view: <HorizontalStackWrapExample />,
      codepenJS: HorizontalStackWrapExampleCodepen
    },
    {
      title: 'Wrapping - Advanced',
      code: HorizontalStackWrapAdvancedExampleCode,
      view: <HorizontalStackWrapAdvancedExample />,
      codepenJS: HorizontalStackWrapAdvancedExampleCodepen
    },
    {
      title: 'Wrapping - Nested',
      code: HorizontalStackWrapNestedExampleCode,
      view: <HorizontalStackWrapNestedExample />,
      codepenJS: HorizontalStackWrapNestedExampleCodepen
    },
    {
      title: 'Horizontal Alignments',
      code: HorizontalStackHorizontalAlignExampleCode,
      view: <HorizontalStackHorizontalAlignExample />,
      codepenJS: HorizontalStackHorizontalAlignExampleCodepen
    },
    {
      title: 'Vertical Alignments',
      code: HorizontalStackVerticalAlignExampleCode,
      view: <HorizontalStackVerticalAlignExample />,
      codepenJS: HorizontalStackVerticalAlignExampleCodepen
    },
    {
      title: 'Configure Properties',
      code: HorizontalStackConfigureExampleCode,
      view: <HorizontalStackConfigureExample />,
      codepenJS: HorizontalStackConfigureExampleCodepen
    }
  ],
  propertiesTablesSources: [
    require<string>('!raw-loader!office-ui-fabric-react/src/components/Stack/HorizontalStack/HorizontalStack.types.ts'),
    require<string>('!raw-loader!office-ui-fabric-react/src/components/Stack/Stack.types.ts'),
    require<string>('!raw-loader!office-ui-fabric-react/src/components/Stack/StackItem/StackItem.types.ts')
  ],
  overview: '',
  bestPractices: '',
  dos: '',
  donts: '',
  isHeaderVisible: true,
  isFeedbackVisible: true
};
