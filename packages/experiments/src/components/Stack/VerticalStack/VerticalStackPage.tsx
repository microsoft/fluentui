import * as React from 'react';
import { ExampleCard, IComponentDemoPageProps, ComponentPage, PropertiesTableSet } from '@uifabric/example-app-base';

import { VerticalStackBasicExample } from './examples/VerticalStack.Basic.Example';
const VerticalStackBasicExampleCode = require('!raw-loader!@uifabric/experiments/src/components/Stack/VerticalStack/examples/VerticalStack.Basic.Example.tsx') as string;

import { VerticalStackSpacingExample } from './examples/VerticalStack.Spacing.Example';
const VerticalStackSpacingExampleCode = require('!raw-loader!@uifabric/experiments/src/components/Stack/VerticalStack/examples/VerticalStack.Spacing.Example.tsx') as string;

import { VerticalStackGrowExample } from './examples/VerticalStack.Grow.Example';
const VerticalStackGrowExampleCode = require('!raw-loader!@uifabric/experiments/src/components/Stack/VerticalStack/examples/VerticalStack.Grow.Example.tsx') as string;

import { VerticalStackShrinkExample } from './examples/VerticalStack.Shrink.Example';
const VerticalStackShrinkExampleCode = require('!raw-loader!@uifabric/experiments/src/components/Stack/VerticalStack/examples/VerticalStack.Shrink.Example.tsx') as string;

import { VerticalStackVerticalAlignExample } from './examples/VerticalStack.VerticalAlign.Example';
const VerticalStackVerticalAlignExampleCode = require('!raw-loader!@uifabric/experiments/src/components/Stack/VerticalStack/examples/VerticalStack.VerticalAlign.Example.tsx') as string;

import { VerticalStackHorizontalAlignExample } from './examples/VerticalStack.HorizontalAlign.Example';
const VerticalStackHorizontalAlignExampleCode = require('!raw-loader!@uifabric/experiments/src/components/Stack/VerticalStack/examples/VerticalStack.HorizontalAlign.Example.tsx') as string;

import { VerticalStackConfigureExample } from './examples/VerticalStack.Configure.Example';
const VerticalStackConfigureExampleCode = require('!raw-loader!@uifabric/experiments/src/components/Stack/VerticalStack/examples/VerticalStack.Configure.Example.tsx') as string;

export class VerticalStackPage extends React.Component<IComponentDemoPageProps, {}> {
  public render(): JSX.Element {
    return (
      <ComponentPage
        title="VerticalStack"
        componentName="VerticalStack"
        exampleCards={
          <div>
            <ExampleCard title="Basic Vertical Stack" code={VerticalStackBasicExampleCode}>
              <VerticalStackBasicExample />
            </ExampleCard>
            <ExampleCard title="Gap and Padding Sizes" code={VerticalStackSpacingExampleCode}>
              <VerticalStackSpacingExample />
            </ExampleCard>
            <ExampleCard title="Growing Items" code={VerticalStackGrowExampleCode}>
              <VerticalStackGrowExample />
            </ExampleCard>
            <ExampleCard title="Shrinking Items" code={VerticalStackShrinkExampleCode}>
              <VerticalStackShrinkExample />
            </ExampleCard>
            <ExampleCard title="Vertical Alignments" code={VerticalStackVerticalAlignExampleCode}>
              <VerticalStackVerticalAlignExample />
            </ExampleCard>
            <ExampleCard title="Horizontal Alignments" code={VerticalStackHorizontalAlignExampleCode}>
              <VerticalStackHorizontalAlignExample />
            </ExampleCard>
            <ExampleCard title="Configure Properties" code={VerticalStackConfigureExampleCode}>
              <VerticalStackConfigureExample />
            </ExampleCard>
          </div>
        }
        propertiesTables={
          <PropertiesTableSet
            sources={[
              require<string>('!raw-loader!@uifabric/experiments/src/components/Stack/VerticalStack/VerticalStack.types.ts'),
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
