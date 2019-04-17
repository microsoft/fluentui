import * as React from 'react';
import { IComponentDemoPageProps, ComponentPage, ExampleCard } from '@uifabric/example-app-base';

import { FluentThemeBasicExample } from './examples/FluentTheme.Basic.Example';

const FluentThemeBasicExampleCode = require('!raw-loader!./examples/FluentTheme.Basic.Example.tsx') as string;

export class FluentThemePage extends React.Component<IComponentDemoPageProps, {}> {
  public render(): JSX.Element {
    const mergeStylesUrl = 'https://github.com/OfficeDev/office-ui-fabric-react/wiki/mergeStyles';
    const loadThemeUrl = 'https://github.com/OfficeDev/office-ui-fabric-react/blob/master/packages/styling/src/styles/theme.ts#L80';
    return (
      <ComponentPage
        title="Fluent Color Theme"
        componentName="FluentTheme"
        overview={
          <div>
            <p>
              We're updating Fabric to use new colors from the <a href="https://fluent.microsoft.com/">Fluent Design System</a>. Before
              these colors become the defaults, this theme is provided as a way to preview how the color changes will affect your app.
            </p>
            <p>
              For components that have been converted to <a href={mergeStylesUrl}>mergeStyles</a>, the Customizer component can be used to
              apply the theme. See the examples below. For all other components (including your app's custom components), use the{' '}
              <a href={loadThemeUrl}>loadTheme()</a> function.
            </p>
          </div>
        }
        isHeaderVisible={this.props.isHeaderVisible}
        exampleCards={
          <div>
            <ExampleCard title="Using Customizer to theme components" code={FluentThemeBasicExampleCode}>
              <FluentThemeBasicExample />
            </ExampleCard>
          </div>
        }
      />
    );
  }
}
