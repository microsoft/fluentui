import * as React from 'react';
import { IDocPageProps } from '../../../common/DocPage.types';
import { VerticalStackStatus } from './VerticalStack.checklist';

import { VerticalStackBasicExample } from './examples/VerticalStack.Basic.Example';
const VerticalStackBasicExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/Stack/VerticalStack/examples/VerticalStack.Basic.Example.tsx') as string;
const VerticalStackBasicExampleCodepen = require('!raw-loader!office-ui-fabric-react/lib/codepen/components/Stack/VerticalStack/VerticalStack.Basic.Example.Codepen.txt') as string;

import { VerticalStackSpacingExample } from './examples/VerticalStack.Spacing.Example';
const VerticalStackSpacingExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/Stack/VerticalStack/examples/VerticalStack.Spacing.Example.tsx') as string;
const VerticalStackSpacingExampleCodepen = require('!raw-loader!office-ui-fabric-react/lib/codepen/components/Stack/VerticalStack/VerticalStack.Spacing.Example.Codepen.txt') as string;

import { VerticalStackGrowExample } from './examples/VerticalStack.Grow.Example';
const VerticalStackGrowExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/Stack/VerticalStack/examples/VerticalStack.Grow.Example.tsx') as string;
const VerticalStackGrowExampleCodepen = require('!raw-loader!office-ui-fabric-react/lib/codepen/components/Stack/VerticalStack/VerticalStack.Grow.Example.Codepen.txt') as string;

import { VerticalStackShrinkExample } from './examples/VerticalStack.Shrink.Example';
const VerticalStackShrinkExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/Stack/VerticalStack/examples/VerticalStack.Shrink.Example.tsx') as string;
const VerticalStackShrinkExampleCodepen = require('!raw-loader!office-ui-fabric-react/lib/codepen/components/Stack/VerticalStack/VerticalStack.Shrink.Example.Codepen.txt') as string;

import { VerticalStackVerticalAlignExample } from './examples/VerticalStack.VerticalAlign.Example';
const VerticalStackVerticalAlignExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/Stack/VerticalStack/examples/VerticalStack.VerticalAlign.Example.tsx') as string;
const VerticalStackVerticalAlignExampleCodepen = require('!raw-loader!office-ui-fabric-react/lib/codepen/components/Stack/VerticalStack/VerticalStack.VerticalAlign.Example.Codepen.txt') as string;

import { VerticalStackHorizontalAlignExample } from './examples/VerticalStack.HorizontalAlign.Example';
const VerticalStackHorizontalAlignExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/Stack/VerticalStack/examples/VerticalStack.HorizontalAlign.Example.tsx') as string;
const VerticalStackHorizontalAlignExampleCodepen = require('!raw-loader!office-ui-fabric-react/lib/codepen/components/Stack/VerticalStack/VerticalStack.HorizontalAlign.Example.Codepen.txt') as string;

import { VerticalStackConfigureExample } from './examples/VerticalStack.Configure.Example';
const VerticalStackConfigureExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/Stack/VerticalStack/examples/VerticalStack.Configure.Example.tsx') as string;
const VerticalStackConfigureExampleCodepen = require('!raw-loader!office-ui-fabric-react/lib/codepen/components/Stack/VerticalStack/VerticalStack.Configure.Example.Codepen.txt') as string;

export const VerticalStackPageProps: IDocPageProps = {
  title: 'Horizontal Stack',
  componentName: 'HorizontalStackPageProps',
  componentUrl:
    'https://github.com/OfficeDev/office-ui-fabric-react/tree/master/packages/office-ui-fabric-react/src/components/Stack/HorizontalStack',
  componentStatus: VerticalStackStatus,
  examples: [
    {
      title: 'Basic Vertical Stack',
      code: VerticalStackBasicExampleCode,
      view: <VerticalStackBasicExample />,
      codepenJS: VerticalStackBasicExampleCodepen
    },
    {
      title: 'Gap and Padding Sizes',
      code: VerticalStackSpacingExampleCode,
      view: <VerticalStackSpacingExample />,
      codepenJS: VerticalStackSpacingExampleCodepen
    },
    {
      title: 'Growing Items',
      code: VerticalStackGrowExampleCode,
      view: <VerticalStackGrowExample />,
      codepenJS: VerticalStackGrowExampleCodepen
    },
    {
      title: 'Shrinking Items',
      code: VerticalStackShrinkExampleCode,
      view: <VerticalStackShrinkExample />,
      codepenJS: VerticalStackShrinkExampleCodepen
    },
    {
      title: 'Vertical Alignments',
      code: VerticalStackVerticalAlignExampleCode,
      view: <VerticalStackVerticalAlignExample />,
      codepenJS: VerticalStackVerticalAlignExampleCodepen
    },
    {
      title: 'Horizontal Alignments',
      code: VerticalStackHorizontalAlignExampleCode,
      view: <VerticalStackHorizontalAlignExample />,
      codepenJS: VerticalStackHorizontalAlignExampleCodepen
    },
    {
      title: 'Configure Properties',
      code: VerticalStackConfigureExampleCode,
      view: <VerticalStackConfigureExample />,
      codepenJS: VerticalStackConfigureExampleCodepen
    }
  ],
  propertiesTablesSources: [
    require<string>('!raw-loader!office-ui-fabric-react/src/components/Stack/VerticalStack/VerticalStack.types.ts'),
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
