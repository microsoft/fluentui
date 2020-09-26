import * as React from 'react';
import { ExampleCard, IComponentDemoPageProps, ComponentPage } from '@uifabric/example-app-base';

import { SlotsExample } from './Slots.Example';
import { SlotsAsyncExample } from './Slots.Async.Example';
import { SlotsRootExample } from './Slots.Root.Example';
import { SlotsIconExample } from './Slots.Icon.Example';
import { SlotsContentExample } from './Slots.Content.Example';
import { SlotsStyledExample } from './Slots.Styled.Example';
import { SlotsRecompositionExample } from './Slots.Recomposition.Example';

const SlotsExampleCode = require('!raw-loader!@fluentui/react-examples/src/experiments/Slots/Slots.Example.tsx') as string;
const SlotsAsyncExampleCode = require('!raw-loader!@fluentui/react-examples/src/experiments/Slots/Slots.Async.Example.tsx') as string;
const SlotsRootExampleCode = require('!raw-loader!@fluentui/react-examples/src/experiments/Slots/Slots.Root.Example.tsx') as string;
const SlotsIconExampleCode = require('!raw-loader!@fluentui/react-examples/src/experiments/Slots/Slots.Icon.Example.tsx') as string;
const SlotsContentExampleCode = require('!raw-loader!@fluentui/react-examples/src/experiments/Slots/Slots.Content.Example.tsx') as string;
const SlotsStyledExampleCode = require('!raw-loader!@fluentui/react-examples/src/experiments/Slots/Slots.Styled.Example.tsx') as string;
const SlotsRecompositionExampleCode = require('!raw-loader!@fluentui/react-examples/src/experiments/Slots/Slots.Recomposition.Example.tsx') as string;

export class SlotsPage extends React.Component<IComponentDemoPageProps, {}> {
  public render(): JSX.Element {
    return (
      <ComponentPage
        title="Slots"
        componentName="Slots"
        overview={
          <div>
            <p>
              Slots are a method of combining all of the various ways that subcomponents can be interacted into one
              prop.
            </p>
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
            <ExampleCard title="Button Icon Slot" code={SlotsIconExampleCode}>
              <SlotsIconExample />
            </ExampleCard>
            <ExampleCard title="Button Content Slot" code={SlotsContentExampleCode}>
              <SlotsContentExample />
            </ExampleCard>
            <ExampleCard title="Button Styled" code={SlotsStyledExampleCode}>
              <SlotsStyledExample />
            </ExampleCard>
            <ExampleCard title="Recomposition Examples" code={SlotsRecompositionExampleCode}>
              <SlotsRecompositionExample />
            </ExampleCard>
          </div>
        }
        isHeaderVisible={this.props.isHeaderVisible}
      />
    );
  }
}
