import * as React from "react";
import {
  IComponentDemoPageProps,
  ComponentPage,
  ExampleCard
} from "@uifabric/example-app-base";

import { FluentThemeBasicExample } from "@uifabric/experiments/lib/components/fluent/theme/examples/FluentTheme.Basic.Example";
const FluentThemeBasicExampleCode = require("!raw-loader!@uifabric/experiments/src/components/fluent/theme/examples/FluentTheme.Basic.Example.tsx") as string;

export class FluentThemePage extends React.Component<
  IComponentDemoPageProps,
  {}
> {
  public render(): JSX.Element {
    return (
      <ComponentPage
        title="Fluent Theme"
        componentName="FluentTheme"
        overview={
          <div>
            <p>
              We're updating Fabric to use new colors from the{" "}
              <a href="https://fluent.microsoft.com/">Fluent Design System</a>.
              Before these colors become the defaults, this theme is provided as
              a way to preview how the color changes will affect your app.
            </p>
          </div>
        }
        isHeaderVisible={this.props.isHeaderVisible}
        exampleCards={
          <div>
            <ExampleCard
              title="Using Customizer to theme a component"
              code={FluentThemeBasicExampleCode}
            >
              <FluentThemeBasicExample />
            </ExampleCard>
          </div>
        }
      />
    );
  }
}
