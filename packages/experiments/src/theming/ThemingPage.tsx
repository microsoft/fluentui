import * as React from 'react';
import { IComponentDemoPageProps, ComponentPage, ExampleCard } from '@uifabric/example-app-base';

import { ThemingSchemesCustomExample, ThemingSchemesVariantExample } from './examples/Theming.Schemes.Example';

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
            <ExampleCard title="Schemes: Using one Customizer to theme components (using Variant package)" code={ThemingSchemesExampleCode}>
              <ThemingSchemesVariantExample />
            </ExampleCard>
          </div>
        }
      />
    );
  }
}
