import * as React from 'react';
import { IComponentDemoPageProps, ComponentPage, ExampleCard } from '@uifabric/example-app-base';

import { ThemingBasicExample } from './examples/Theming.Customizers.Example';
import {
  ThemingSchemesCustomExample,
  ThemingSchemesDefaultExample,
  ThemingSchemesVariantExample
} from './examples/Theming.Schemes.Example';

const ThemingCustomizersExampleCode = require('!raw-loader!@uifabric/experiments/src/theming/examples/Theming.Customizers.Example.tsx') as string;
const ThemingSchemesExampleCode = require('!raw-loader!@uifabric/experiments/src/theming/examples/Theming.Schemes.Example.tsx') as string;

export class ThemingPage extends React.Component<IComponentDemoPageProps, {}> {
  public render(): JSX.Element {
    return (
      <ComponentPage
        title="Theming"
        componentName="Theming"
        overview={
          <div>
            <p>Highlight and test various examples of theming using customizers and schemes.</p>
          </div>
        }
        isHeaderVisible={this.props.isHeaderVisible}
        exampleCards={
          <div>
            <ExampleCard title="Schemes: Using one Customizer to theme components" code={ThemingSchemesExampleCode}>
              <ThemingSchemesCustomExample />
            </ExampleCard>
            <ExampleCard title="Schemes: Using one Customizer to theme components (Variant)" code={ThemingSchemesExampleCode}>
              <ThemingSchemesVariantExample />
            </ExampleCard>
            <ExampleCard title="Schemes: Falling back to default global theme (no Customizer)" code={ThemingSchemesExampleCode}>
              <ThemingSchemesDefaultExample />
            </ExampleCard>
            <ExampleCard title="Using Multiple Customizers to theme components" code={ThemingCustomizersExampleCode}>
              <ThemingBasicExample />
            </ExampleCard>
          </div>
        }
      />
    );
  }
}
