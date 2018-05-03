import * as React from "react";
import { Link, Customizer } from "office-ui-fabric-react";
import FluentTheme from "@uifabric/experiments/lib/components/fluent/theme/fluentTheme";

export class FluentThemeBasicExample extends React.Component<{}, {}> {
  public render(): JSX.Element {
    return (
      <div>
        <p>
          <Link disabled={true}>Disabled link (current theme)</Link>
        </p>

        <Customizer settings={{ theme: FluentTheme }}>
          <p>
            <Link disabled={true}>Disabled link (Fluent theme)</Link>
          </p>
        </Customizer>
      </div>
    );
  }
}
