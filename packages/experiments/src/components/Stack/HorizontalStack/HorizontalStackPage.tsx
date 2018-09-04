import * as React from 'react';
import { ExampleCard, IComponentDemoPageProps, ComponentPage, PropertiesTableSet } from '@uifabric/example-app-base';

import { HorizontalStackBasicExample } from './examples/HorizontalStack.Basic.Example';
const HorizontalStackBasicExampleCode = require('!raw-loader!@uifabric/experiments/src/components/Stack/HorizontalStack/examples/HorizontalStack.Basic.Example.tsx') as string;

import { HorizontalStackGrowExample } from './examples/HorizontalStack.Grow.Example';
const HorizontalStackGrowExampleCode = require('!raw-loader!@uifabric/experiments/src/components/Stack/HorizontalStack/examples/HorizontalStack.Grow.Example.tsx') as string;

import { HorizontalStackShrinkExample } from './examples/HorizontalStack.Shrink.Example';
const HorizontalStackShrinkExampleCode = require('!raw-loader!@uifabric/experiments/src/components/Stack/HorizontalStack/examples/HorizontalStack.Shrink.Example.tsx') as string;

import { HorizontalStackHorizontalAlignExample } from './examples/HorizontalStack.HorizontalAlign.Example';
const HorizontalStackHorizontalAlignExampleCode = require('!raw-loader!@uifabric/experiments/src/components/Stack/HorizontalStack/examples/HorizontalStack.HorizontalAlign.Example.tsx') as string;

import { HorizontalStackVerticalAlignExample } from './examples/HorizontalStack.VerticalAlign.Example';
const HorizontalStackVerticalAlignExampleCode = require('!raw-loader!@uifabric/experiments/src/components/Stack/HorizontalStack/examples/HorizontalStack.VerticalAlign.Example.tsx') as string;

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
            <ExampleCard title="Growing Items" code={HorizontalStackGrowExampleCode}>
              <HorizontalStackGrowExample />
            </ExampleCard>
            <ExampleCard title="Shrinking Items" code={HorizontalStackShrinkExampleCode}>
              <HorizontalStackShrinkExample />
            </ExampleCard>
            <ExampleCard title="Horizontal Alignments" code={HorizontalStackHorizontalAlignExampleCode}>
              <HorizontalStackHorizontalAlignExample />
            </ExampleCard>
            <ExampleCard title="Vertical Alignments" code={HorizontalStackVerticalAlignExampleCode}>
              <HorizontalStackVerticalAlignExample />
            </ExampleCard>
          </div>
        }
        propertiesTables={
          <PropertiesTableSet
            sources={[
              require<
                string
              >('!raw-loader!@uifabric/experiments/src/components/Stack/HorizontalStack/HorizontalStack.types.ts'),
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
