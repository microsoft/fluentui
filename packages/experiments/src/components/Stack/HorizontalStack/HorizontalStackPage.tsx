import * as React from 'react';
import { ExampleCard, IComponentDemoPageProps, ComponentPage, PropertiesTableSet } from '@uifabric/example-app-base';

import { HorizontalStackBasicExample } from './examples/HorizontalStack.Basic.Example';
const HorizontalStackBasicExampleCode = require('!raw-loader!@uifabric/experiments/src/components/Stack/HorizontalStack/examples/HorizontalStack.Basic.Example.tsx') as string;

import { HorizontalStackSpacingExample } from './examples/HorizontalStack.Spacing.Example';
const HorizontalStackSpacingExampleCode = require('!raw-loader!@uifabric/experiments/src/components/Stack/HorizontalStack/examples/HorizontalStack.Spacing.Example.tsx') as string;

import { HorizontalStackGrowExample } from './examples/HorizontalStack.Grow.Example';
const HorizontalStackGrowExampleCode = require('!raw-loader!@uifabric/experiments/src/components/Stack/HorizontalStack/examples/HorizontalStack.Grow.Example.tsx') as string;

import { HorizontalStackShrinkExample } from './examples/HorizontalStack.Shrink.Example';
const HorizontalStackShrinkExampleCode = require('!raw-loader!@uifabric/experiments/src/components/Stack/HorizontalStack/examples/HorizontalStack.Shrink.Example.tsx') as string;

import { HorizontalStackWrapExample } from './examples/HorizontalStack.Wrap.Example';
const HorizontalStackWrapExampleCode = require('!raw-loader!@uifabric/experiments/src/components/Stack/HorizontalStack/examples/HorizontalStack.Wrap.Example.tsx') as string;

import { HorizontalStackWrapAdvancedExample } from './examples/HorizontalStack.WrapAdvanced.Example';
const HorizontalStackWrapAdvancedExampleCode = require('!raw-loader!@uifabric/experiments/src/components/Stack/HorizontalStack/examples/HorizontalStack.WrapAdvanced.Example.tsx') as string;

import { HorizontalStackWrapNestedExample } from './examples/HorizontalStack.WrapNested.Example';
const HorizontalStackWrapNestedExampleCode = require('!raw-loader!@uifabric/experiments/src/components/Stack/HorizontalStack/examples/HorizontalStack.WrapNested.Example.tsx') as string;

import { HorizontalStackHorizontalAlignExample } from './examples/HorizontalStack.HorizontalAlign.Example';
const HorizontalStackHorizontalAlignExampleCode = require('!raw-loader!@uifabric/experiments/src/components/Stack/HorizontalStack/examples/HorizontalStack.HorizontalAlign.Example.tsx') as string;

import { HorizontalStackVerticalAlignExample } from './examples/HorizontalStack.VerticalAlign.Example';
const HorizontalStackVerticalAlignExampleCode = require('!raw-loader!@uifabric/experiments/src/components/Stack/HorizontalStack/examples/HorizontalStack.VerticalAlign.Example.tsx') as string;

import { HorizontalStackConfigureExample } from './examples/HorizontalStack.Configure.Example';
const HorizontalStackConfigureExampleCode = require('!raw-loader!@uifabric/experiments/src/components/Stack/HorizontalStack/examples/HorizontalStack.Configure.Example.tsx') as string;

export class HorizontalStackPage extends React.Component<IComponentDemoPageProps, {}> {
  public render(): JSX.Element {
    return (
      <ComponentPage
        title="HorizontalStack"
        componentName="HorizontalStack"
        exampleCards={
          <div>
            <ExampleCard title="Basic Horizontal Stack" code={HorizontalStackBasicExampleCode}>
              <HorizontalStackBasicExample />
            </ExampleCard>
            <ExampleCard title="Gap and Padding Sizes" code={HorizontalStackSpacingExampleCode}>
              <HorizontalStackSpacingExample />
            </ExampleCard>
            <ExampleCard title="Growing Items" code={HorizontalStackGrowExampleCode}>
              <HorizontalStackGrowExample />
            </ExampleCard>
            <ExampleCard title="Shrinking Items" code={HorizontalStackShrinkExampleCode}>
              <HorizontalStackShrinkExample />
            </ExampleCard>
            <ExampleCard title="Wrapping - Basic" code={HorizontalStackWrapExampleCode}>
              <HorizontalStackWrapExample />
            </ExampleCard>
            <ExampleCard title="Wrapping - Advanced" code={HorizontalStackWrapAdvancedExampleCode}>
              <HorizontalStackWrapAdvancedExample />
            </ExampleCard>
            <ExampleCard title="Wrapping - Nested" code={HorizontalStackWrapNestedExampleCode}>
              <HorizontalStackWrapNestedExample />
            </ExampleCard>
            <ExampleCard title="Horizontal Alignments" code={HorizontalStackHorizontalAlignExampleCode}>
              <HorizontalStackHorizontalAlignExample />
            </ExampleCard>
            <ExampleCard title="Vertical Alignments" code={HorizontalStackVerticalAlignExampleCode}>
              <HorizontalStackVerticalAlignExample />
            </ExampleCard>
            <ExampleCard title="Configure Properties" code={HorizontalStackConfigureExampleCode}>
              <HorizontalStackConfigureExample />
            </ExampleCard>
          </div>
        }
        propertiesTables={
          <PropertiesTableSet
            sources={[
              require<string>('!raw-loader!@uifabric/experiments/src/components/Stack/HorizontalStack/HorizontalStack.types.ts'),
              require<string>('!raw-loader!@uifabric/experiments/src/components/Stack/Stack.types.ts'),
              require<string>('!raw-loader!@uifabric/experiments/src/components/Stack/StackItem/StackItem.types.ts')
            ]}
          />
        }
        overview={<div />}
        bestPractices={<div />}
        dos={
          <div>
            <ul>
              <li />
            </ul>
          </div>
        }
        donts={
          <div>
            <ul>
              <li />
            </ul>
          </div>
        }
        isHeaderVisible={this.props.isHeaderVisible}
      />
    );
  }
}
