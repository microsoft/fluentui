import * as React from 'react';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import './TextField.Examples.scss';

export class TextFieldIconExample extends React.Component<any, any> {
  public render(): JSX.Element {
    return (
      <div className="docs-TextFieldExample">
        <TextField label="TextField with an icon" iconProps={{ iconName: 'Calendar' }} />
        <TextField label="Disabled TextField with an icon" iconProps={{ iconName: 'Calendar' }} disabled />
      </div>
    );
  }
}
