import * as React from 'react';
import { IComponentDemoPageProps, ComponentPage, ExampleCard } from '@uifabric/example-app-base';

import { ThemingBasicExample } from './examples/Theming.Basic.Example';

const FluentThemeBasicExampleCode = require('!raw-loader!@uifabric/experiments/src/components/fluent/theme/examples/FluentTheme.Basic.Example.tsx') as string;

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
            <ExampleCard title="Using Customizer to theme components" code={FluentThemeBasicExampleCode}>
              <ThemingBasicExample />
            </ExampleCard>
          </div>
        }
      />
    );
  }
}
