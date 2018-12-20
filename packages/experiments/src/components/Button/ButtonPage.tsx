import * as React from 'react';
import { ExampleCard, IComponentDemoPageProps, ComponentPage, PropertiesTableSet } from '@uifabric/example-app-base';

import { ButtonExample } from './examples/Button.Example';
import { ButtonStylesExample } from './examples/Button.Styles.Example';
import { ButtonStyleVarsExample } from './examples/Button.StyleVars.Example';

const ButtonExampleCode = require('!raw-loader!@uifabric/experiments/src/components/Button/examples/Button.Example.tsx') as string;
const ButtonStylesExampleCode =
  require('!raw-loader!@uifabric/experiments/src/components/Button/examples/Button.Styles.Example.tsx') as string;
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
            <ExampleCard title=" Button Ramps" code={ButtonExampleCode}>
              <ButtonExample />
            </ExampleCard>
            <ExampleCard title="Button Styles" code={ButtonExampleCode}>
              <ButtonStylesExample />
            </ExampleCard>
            <ExampleCard title="Button Style Variables" code={ButtonExampleCode}>
              <ButtonStyleVarsExample />
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
