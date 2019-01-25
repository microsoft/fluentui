import * as React from 'react';
import { ExampleCard, IComponentDemoPageProps, ComponentPage, PageMarkdown, PropertiesTableSet } from '@uifabric/example-app-base';

// Vertical Stack Examples
import { VerticalStackBasicExample } from './examples/Stack.Vertical.Basic.Example';
const VerticalStackBasicExampleCode = require('!raw-loader!@uifabric/experiments/src/components/Stack/examples/Stack.Vertical.Basic.Example.tsx') as string;

import { VerticalStackReversedExample } from './examples/Stack.Vertical.Reversed.Example';
const VerticalStackReversedExampleCode = require('!raw-loader!@uifabric/experiments/src/components/Stack/examples/Stack.Vertical.Reversed.Example.tsx') as string;

import { VerticalStackSpacingExample } from './examples/Stack.Vertical.Spacing.Example';
const VerticalStackSpacingExampleCode = require('!raw-loader!@uifabric/experiments/src/components/Stack/examples/Stack.Vertical.Spacing.Example.tsx') as string;

import { VerticalStackGrowExample } from './examples/Stack.Vertical.Grow.Example';
const VerticalStackGrowExampleCode = require('!raw-loader!@uifabric/experiments/src/components/Stack/examples/Stack.Vertical.Grow.Example.tsx') as string;

import { VerticalStackShrinkExample } from './examples/Stack.Vertical.Shrink.Example';
const VerticalStackShrinkExampleCode = require('!raw-loader!@uifabric/experiments/src/components/Stack/examples/Stack.Vertical.Shrink.Example.tsx') as string;

import { VerticalStackWrapExample } from './examples/Stack.Vertical.Wrap.Example';
const VerticalStackWrapExampleCode = require('!raw-loader!@uifabric/experiments/src/components/Stack/examples/Stack.Vertical.Wrap.Example.tsx') as string;

import { VerticalStackWrapAdvancedExample } from './examples/Stack.Vertical.WrapAdvanced.Example';
const VerticalStackWrapAdvancedExampleCode = require('!raw-loader!@uifabric/experiments/src/components/Stack/examples/Stack.Vertical.WrapAdvanced.Example.tsx') as string;

import { VerticalStackWrapNestedExample } from './examples/Stack.Vertical.WrapNested.Example';
const VerticalStackWrapNestedExampleCode = require('!raw-loader!@uifabric/experiments/src/components/Stack/examples/Stack.Vertical.WrapNested.Example.tsx') as string;

import { VerticalStackVerticalAlignExample } from './examples/Stack.Vertical.VerticalAlign.Example';
const VerticalStackVerticalAlignExampleCode = require('!raw-loader!@uifabric/experiments/src/components/Stack/examples/Stack.Vertical.VerticalAlign.Example.tsx') as string;

import { VerticalStackHorizontalAlignExample } from './examples/Stack.Vertical.HorizontalAlign.Example';
const VerticalStackHorizontalAlignExampleCode = require('!raw-loader!@uifabric/experiments/src/components/Stack/examples/Stack.Vertical.HorizontalAlign.Example.tsx') as string;

import { VerticalStackConfigureExample } from './examples/Stack.Vertical.Configure.Example';
const VerticalStackConfigureExampleCode = require('!raw-loader!@uifabric/experiments/src/components/Stack/examples/Stack.Vertical.Configure.Example.tsx') as string;

// Horizontal Stack Examples
import { HorizontalStackBasicExample } from './examples/Stack.Horizontal.Basic.Example';
const HorizontalStackBasicExampleCode = require('!raw-loader!@uifabric/experiments/src/components/Stack/examples/Stack.Horizontal.Basic.Example.tsx') as string;

import { HorizontalStackReversedExample } from './examples/Stack.Horizontal.Reversed.Example';
const HorizontalStackReversedExampleCode = require('!raw-loader!@uifabric/experiments/src/components/Stack/examples/Stack.Horizontal.Reversed.Example.tsx') as string;

import { HorizontalStackSpacingExample } from './examples/Stack.Horizontal.Spacing.Example';
const HorizontalStackSpacingExampleCode = require('!raw-loader!@uifabric/experiments/src/components/Stack/examples/Stack.Horizontal.Spacing.Example.tsx') as string;

import { HorizontalStackGrowExample } from './examples/Stack.Horizontal.Grow.Example';
const HorizontalStackGrowExampleCode = require('!raw-loader!@uifabric/experiments/src/components/Stack/examples/Stack.Horizontal.Grow.Example.tsx') as string;

import { HorizontalStackShrinkExample } from './examples/Stack.Horizontal.Shrink.Example';
const HorizontalStackShrinkExampleCode = require('!raw-loader!@uifabric/experiments/src/components/Stack/examples/Stack.Horizontal.Shrink.Example.tsx') as string;

import { HorizontalStackWrapExample } from './examples/Stack.Horizontal.Wrap.Example';
const HorizontalStackWrapExampleCode = require('!raw-loader!@uifabric/experiments/src/components/Stack/examples/Stack.Horizontal.Wrap.Example.tsx') as string;

import { HorizontalStackWrapAdvancedExample } from './examples/Stack.Horizontal.WrapAdvanced.Example';
const HorizontalStackWrapAdvancedExampleCode = require('!raw-loader!@uifabric/experiments/src/components/Stack/examples/Stack.Horizontal.WrapAdvanced.Example.tsx') as string;

import { HorizontalStackWrapNestedExample } from './examples/Stack.Horizontal.WrapNested.Example';
const HorizontalStackWrapNestedExampleCode = require('!raw-loader!@uifabric/experiments/src/components/Stack/examples/Stack.Horizontal.WrapNested.Example.tsx') as string;

import { HorizontalStackHorizontalAlignExample } from './examples/Stack.Horizontal.HorizontalAlign.Example';
const HorizontalStackHorizontalAlignExampleCode = require('!raw-loader!@uifabric/experiments/src/components/Stack/examples/Stack.Horizontal.HorizontalAlign.Example.tsx') as string;

import { HorizontalStackVerticalAlignExample } from './examples/Stack.Horizontal.VerticalAlign.Example';
const HorizontalStackVerticalAlignExampleCode = require('!raw-loader!@uifabric/experiments/src/components/Stack/examples/Stack.Horizontal.VerticalAlign.Example.tsx') as string;

import { HorizontalStackConfigureExample } from './examples/Stack.Horizontal.Configure.Example';
const HorizontalStackConfigureExampleCode = require('!raw-loader!@uifabric/experiments/src/components/Stack/examples/Stack.Horizontal.Configure.Example.tsx') as string;

export class StackPage extends React.Component<IComponentDemoPageProps, {}> {
  public render(): JSX.Element {
    return (
      <ComponentPage
        title="Stack"
        componentName="Stack"
        exampleCards={
          <div>
            <ExampleCard title="Basic Vertical Stack" code={VerticalStackBasicExampleCode}>
              <VerticalStackBasicExample />
            </ExampleCard>
            <ExampleCard title="Reversed Basic Vertical Stack" code={VerticalStackReversedExampleCode}>
              <VerticalStackReversedExample />
            </ExampleCard>
            <ExampleCard title="Vertical Stack - Gap and Padding Sizes" code={VerticalStackSpacingExampleCode}>
              <VerticalStackSpacingExample />
            </ExampleCard>
            <ExampleCard title="Vertical Stack - Growing Items" code={VerticalStackGrowExampleCode}>
              <VerticalStackGrowExample />
            </ExampleCard>
            <ExampleCard title="Vertical Stack - Shrinking Items" code={VerticalStackShrinkExampleCode}>
              <VerticalStackShrinkExample />
            </ExampleCard>
            <ExampleCard title="Vertical Stack - Wrapping - Basic" code={VerticalStackWrapExampleCode}>
              <VerticalStackWrapExample />
            </ExampleCard>
            <ExampleCard title="Vertical Stack - Wrapping - Advanced" code={VerticalStackWrapAdvancedExampleCode}>
              <VerticalStackWrapAdvancedExample />
            </ExampleCard>
            <ExampleCard title="Vertical Stack - Wrapping - Nested" code={VerticalStackWrapNestedExampleCode}>
              <VerticalStackWrapNestedExample />
            </ExampleCard>
            <ExampleCard title="Vertical Stack - Vertical Alignments" code={VerticalStackVerticalAlignExampleCode}>
              <VerticalStackVerticalAlignExample />
            </ExampleCard>
            <ExampleCard title="Vertical Stack - Horizontal Alignments" code={VerticalStackHorizontalAlignExampleCode}>
              <VerticalStackHorizontalAlignExample />
            </ExampleCard>
            <ExampleCard title="Vertical Stack - Configure Properties" code={VerticalStackConfigureExampleCode}>
              <VerticalStackConfigureExample />
            </ExampleCard>
            <ExampleCard title="Basic Horizontal Stack" code={HorizontalStackBasicExampleCode}>
              <HorizontalStackBasicExample />
            </ExampleCard>
            <ExampleCard title="Reversed Basic Horizontal Stack" code={HorizontalStackReversedExampleCode}>
              <HorizontalStackReversedExample />
            </ExampleCard>
            <ExampleCard title="Horizontal Stack - Gap and Padding Sizes" code={HorizontalStackSpacingExampleCode}>
              <HorizontalStackSpacingExample />
            </ExampleCard>
            <ExampleCard title="Horizontal Stack - Growing Items" code={HorizontalStackGrowExampleCode}>
              <HorizontalStackGrowExample />
            </ExampleCard>
            <ExampleCard title="Horizontal Stack - Shrinking Items" code={HorizontalStackShrinkExampleCode}>
              <HorizontalStackShrinkExample />
            </ExampleCard>
            <ExampleCard title="Horizontal Stack - Wrapping - Basic" code={HorizontalStackWrapExampleCode}>
              <HorizontalStackWrapExample />
            </ExampleCard>
            <ExampleCard title="Horizontal Stack - Wrapping - Advanced" code={HorizontalStackWrapAdvancedExampleCode}>
              <HorizontalStackWrapAdvancedExample />
            </ExampleCard>
            <ExampleCard title="Horizontal Stack - Wrapping - Nested" code={HorizontalStackWrapNestedExampleCode}>
              <HorizontalStackWrapNestedExample />
            </ExampleCard>
            <ExampleCard title="Horizontal Stack - Horizontal Alignments" code={HorizontalStackHorizontalAlignExampleCode}>
              <HorizontalStackHorizontalAlignExample />
            </ExampleCard>
            <ExampleCard title="Horizontal Stack - Vertical Alignments" code={HorizontalStackVerticalAlignExampleCode}>
              <HorizontalStackVerticalAlignExample />
            </ExampleCard>
            <ExampleCard title="Horizontal Stack - Configure Properties" code={HorizontalStackConfigureExampleCode}>
              <HorizontalStackConfigureExample />
            </ExampleCard>
          </div>
        }
        propertiesTables={
          <PropertiesTableSet
            sources={[
              require<string>('!raw-loader!@uifabric/experiments/src/components/Stack/Stack.types.ts'),
              require<string>('!raw-loader!@uifabric/experiments/src/components/Stack/StackItem/StackItem.types.ts')
            ]}
          />
        }
        overview={
          <PageMarkdown>{require<string>('!raw-loader!@uifabric/experiments/src/components/Stack/docs/StackOverview.md')}</PageMarkdown>
        }
        bestPractices={<div />}
        dos={<PageMarkdown>{require<string>('!raw-loader!@uifabric/experiments/src/components/Stack/docs/StackDos.md')}</PageMarkdown>}
        donts={<PageMarkdown>{require<string>('!raw-loader!@uifabric/experiments/src/components/Stack/docs/StackDonts.md')}</PageMarkdown>}
        isHeaderVisible={this.props.isHeaderVisible}
      />
    );
  }
}
