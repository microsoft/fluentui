import * as React from 'react';
import { Link, Customizer, Breadcrumb } from 'office-ui-fabric-react';
import { FluentCustomizations } from '@uifabric/fluent-theme';

export class FluentThemeBasicExample extends React.Component<{}, {}> {
  public render(): JSX.Element {
    return (
      <div>
        <h2>Current theme</h2>
        {this._renderComponents()}

        <h2>Fluent color theme</h2>
        <Customizer {...FluentCustomizations}>{this._renderComponents()}</Customizer>
      </div>
    );
  }

  private _renderComponents(): JSX.Element {
    return (
      <div>
        <Link disabled={true}>Disabled link</Link>
        <Breadcrumb
          items={[
            { text: 'Files', key: 'Files' },
            { text: 'This is folder 1', key: 'f1' },
            { text: 'This is folder 2', key: 'f2' },
            { text: 'This is folder 3', key: 'f3', isCurrentItem: true }
          ]}
        />
      </div>
    );
  }
}
