import * as React from 'react';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import './TextField.Examples.scss';

export class TextFieldPrefixExample extends React.Component<any, any> {
  public render(): JSX.Element {
    return (
      <div className="docs-TextFieldExample">
        <TextField prefix="https://" />
        <TextField label="Disabled" prefix="https://" disabled />
      </div>
    );
  }
}
