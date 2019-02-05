import * as React from 'react';
import { ExampleCard, IComponentDemoPageProps, ComponentPage } from '@uifabric/example-app-base';

import { SlotsExample } from './examples/Slots.Example';
import { SlotsAsyncExample } from './examples/Slots.Async.Example';
import { SlotsRootExample } from './examples/Slots.Root.Example';
import { SlotsStackExample } from './examples/Slots.Stack.Example';
import { SlotsIconExample } from './examples/Slots.Icon.Example';
import { SlotsContentExample } from './examples/Slots.Content.Example';
import { SlotsStyledExample } from './examples/Slots.Styled.Example';

const SlotsExampleCode = require('!raw-loader!@uifabric/experiments/src/slots/examples/Slots.Example.tsx') as string;
const SlotsAsyncExampleCode = require('!raw-loader!@uifabric/experiments/src/slots/examples/Slots.Async.Example.tsx') as string;
const SlotsRootExampleCode = require('!raw-loader!@uifabric/experiments/src/slots/examples/Slots.Root.Example.tsx') as string;
const SlotsStackExampleCode = require('!raw-loader!@uifabric/experiments/src/slots/examples/Slots.Stack.Example.tsx') as string;
const SlotsIconExampleCode = require('!raw-loader!@uifabric/experiments/src/slots/examples/Slots.Icon.Example.tsx') as string;
const SlotsContentExampleCode = require('!raw-loader!@uifabric/experiments/src/slots/examples/Slots.Content.Example.tsx') as string;
const SlotsStyledExampleCode = require('!raw-loader!@uifabric/experiments/src/slots/examples/Slots.Styled.Example.tsx') as string;

export class SlotsPage extends React.Component<IComponentDemoPageProps, {}> {
  public render(): JSX.Element {
    return (
      <ComponentPage
        title="Slots"
        componentName="Slots"
        overview={
          <div>
            <p>Slots are a method of combining all of the various ways that subcomponents can be interacted into one prop.</p>
          </div>
        }
        exampleCards={
          <div>
            <ExampleCard title="All Slot Types" code={SlotsExampleCode}>
              <SlotsExample />
            </ExampleCard>
            <ExampleCard title="Async Render Functions" code={SlotsAsyncExampleCode}>
              <SlotsAsyncExample />
            </ExampleCard>
            <ExampleCard title="Button Root Slot" code={SlotsRootExampleCode}>
              <SlotsRootExample />
            </ExampleCard>
            <ExampleCard title="Button Stack Slot" code={SlotsStackExampleCode}>
              <SlotsStackExample />
            </ExampleCard>
            <ExampleCard title="Button Icon Slot" code={SlotsIconExampleCode}>
              <SlotsIconExample />
            </ExampleCard>
            <ExampleCard title="Button Content Slot" code={SlotsContentExampleCode}>
              <SlotsContentExample />
            </ExampleCard>
            <ExampleCard title="Button Styled" code={SlotsStyledExampleCode}>
              <SlotsStyledExample />
            </ExampleCard>
          </div>
        }
        isHeaderVisible={this.props.isHeaderVisible}
      />
    );
  }
}
