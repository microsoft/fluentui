import * as React from 'react';
import { ExampleCard, IComponentDemoPageProps, ComponentPage, PropertiesTableSet } from '@uifabric/example-app-base';

import { StackVerticalExample } from './examples/Stack.Vertical.Example';
const StackVerticalExampleCode = require('!raw-loader!@uifabric/experiments/src/components/Stack/examples/Stack.Vertical.Example.tsx') as string;

import { StackVerticalAlignExample } from './examples/Stack.Vertical.VerticalAlign.Example';
const StackVerticalAlignExampleCode = require('!raw-loader!@uifabric/experiments/src/components/Stack/examples/Stack.Vertical.VerticalAlign.Example.tsx') as string;

import { StackVerticalHorizontalAlignExample } from './examples/Stack.Vertical.HorizontalAlign.Example';
const StackVerticalHorizontalAlignExampleCode = require('!raw-loader!@uifabric/experiments/src/components/Stack/examples/Stack.Vertical.HorizontalAlign.Example.tsx') as string;

import { StackHorizontalExample } from './examples/Stack.Horizontal.Example';
const StackHorizontalExampleCode = require('!raw-loader!@uifabric/experiments/src/components/Stack/examples/Stack.Horizontal.Example.tsx') as string;

import { StackHorizontalAlignExample } from './examples/Stack.Horizontal.HorizontalAlign.Example';
const StackHorizontalAlignExampleCode = require('!raw-loader!@uifabric/experiments/src/components/Stack/examples/Stack.Horizontal.HorizontalAlign.Example.tsx') as string;

import { StackHorizontalVerticalAlignExample } from './examples/Stack.Horizontal.VerticalAlign.Example';
const StackHorizontalVerticalAlignExampleCode = require('!raw-loader!@uifabric/experiments/src/components/Stack/examples/Stack.Horizontal.VerticalAlign.Example.tsx') as string;

export class StackPage extends React.Component<IComponentDemoPageProps, {}> {
  public render(): JSX.Element {
    return (
      <ComponentPage
        title="Stack"
        componentName="Stack"
        exampleCards={
          <div>
            <ExampleCard title="Vertical Stack" code={StackVerticalExampleCode}>
              <StackVerticalExample />
            </ExampleCard>
            <ExampleCard title="Vertical Stack - Vertical Alignments" code={StackVerticalAlignExampleCode}>
              <StackVerticalAlignExample />
            </ExampleCard>
            <ExampleCard title="Vertical Stack - Horizontal Alignments" code={StackVerticalHorizontalAlignExampleCode}>
              <StackVerticalHorizontalAlignExample />
            </ExampleCard>
            <ExampleCard title="Horizontal Stack" code={StackHorizontalExampleCode}>
              <StackHorizontalExample />
            </ExampleCard>
            <ExampleCard title="Horizontal Stack - Horizontal Alignments" code={StackHorizontalAlignExampleCode}>
              <StackHorizontalAlignExample />
            </ExampleCard>
            <ExampleCard title="Horizontal Stack - Vertical Alignments" code={StackHorizontalVerticalAlignExampleCode}>
              <StackHorizontalVerticalAlignExample />
            </ExampleCard>
          </div>
        }
        propertiesTables={
          <PropertiesTableSet
            sources={[
              require<
                string
              >('!raw-loader!@uifabric/experiments/src/components/Stack/VerticalStack/VerticalStack.types.ts'),
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
