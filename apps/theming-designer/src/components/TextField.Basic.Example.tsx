// @codepen
import * as React from 'react';
import { TextField, MaskedTextField } from 'office-ui-fabric-react/lib/TextField';
import './TextField.Examples.scss';

export class TextFieldBasicExample extends React.Component<any, any> {
  public render(): JSX.Element {
    return (
      <div className="docs-TextFieldExample">
        <TextField label="Label" />
        <TextField label="Label" disabled={true} />
        <TextField label="Label: " underlined />
      </div>
    );
  }
}
