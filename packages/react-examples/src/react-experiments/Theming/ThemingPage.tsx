import * as React from 'react';
import { IComponentDemoPageProps, ComponentPage, ExampleCard } from '@fluentui/react-docsite-components';

import { ThemingSchemesVariantExample } from './Theming.Schemes.Variant.Example';
import { ThemingSchemesCustomExample } from './Theming.Schemes.Custom.Example';

const ThemingSchemesVariantExampleCode =
  require('!raw-loader?esModule=false!@fluentui/react-examples/src/react-experiments/Theming/Theming.Schemes.Variant.Example.tsx') as string;
const ThemingSchemesCustomExampleCode =
  require('!raw-loader?esModule=false!@fluentui/react-examples/src/react-experiments/Theming/Theming.Schemes.Custom.Example.tsx') as string;

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
            <ExampleCard
              title="Schemes: Using one Customizer to theme components"
              code={ThemingSchemesCustomExampleCode}
            >
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
