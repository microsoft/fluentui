import * as React from 'react';
import { ExampleCard, IComponentDemoPageProps, ComponentPage, PropertiesTableSet } from '@uifabric/example-app-base';

import { ButtonExample } from './examples/Button.Example';
import { ButtonStyleVarsExample } from './examples/Button.StyleVars.Example';

const ButtonExampleCode = require('!raw-loader!@uifabric/experiments/src/components/Button/examples/Button.Example.tsx') as string;
const ButtonStyleVarsExampleCode =
  require('!raw-loader!@uifabric/experiments/src/components/Button/examples/Button.StyleVars.Example.tsx') as string;

export class ButtonPage extends React.Component<IComponentDemoPageProps, {}> {
  public render(): JSX.Element {
    return (
      <ComponentPage
        title=" Button"
        componentName=" Button"
        exampleCards={
          <div>
            <ExampleCard title=" Button Ramps (Old Slots)" code={ButtonExampleCode}>
              <ButtonExample />
            </ExampleCard>
            <ExampleCard title=" Button Ramps (New Slots)" code={ButtonExampleCode}>
              <ButtonExample useNewSlots />
            </ExampleCard>
            <ExampleCard title="Button Style Variables (Old Slots)" code={ButtonExampleCode}>
              <ButtonStyleVarsExample />
            </ExampleCard>
            <ExampleCard title="Button Style Variables (New Slots)" code={ButtonExampleCode}>
              <ButtonStyleVarsExample useNewSlots />
            </ExampleCard>
          </div>
        }
        propertiesTables={
          <PropertiesTableSet sources={[require<string>('!raw-loader!@uifabric/experiments/src/components/Button/Button.types.tsx')]} />
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
