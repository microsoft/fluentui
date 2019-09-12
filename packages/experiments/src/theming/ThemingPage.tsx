import * as React from 'react';
import { IComponentDemoPageProps, ComponentPage, ExampleCard } from '@uifabric/example-app-base';

import { ThemingSchemesVariantExample } from './examples/Theming.Schemes.Variant.Example';
import { ThemingSchemesCustomExample } from './examples/Theming.Schemes.Custom.Example';

// tslint:disable:max-line-length
const ThemingSchemesVariantExampleCode = require('!raw-loader!@uifabric/experiments/src/theming/examples/Theming.Schemes.Variant.Example.tsx') as string;
const ThemingSchemesCustomExampleCode = require('!raw-loader!@uifabric/experiments/src/theming/examples/Theming.Schemes.Custom.Example.tsx') as string;

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
            <ExampleCard title="Schemes: Using one Customizer to theme components" code={ThemingSchemesCustomExampleCode}>
              <ThemingSchemesCustomExample />
            </ExampleCard>
            <ExampleCard
              title="Schemes: Using one Customizer to theme components (using Variant package)"
              code={ThemingSchemesVariantExampleCode}
            >
              <ThemingSchemesVariantExample />
            </ExampleCard>
          </div>
        }
      />
    );
  }
}
