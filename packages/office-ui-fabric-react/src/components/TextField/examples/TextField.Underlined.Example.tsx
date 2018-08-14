// @codepen
import * as React from 'react';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import './TextField.Examples.scss';

export class TextFieldUnderlinedExample extends React.Component<any, any> {
  public render(): JSX.Element {
    return (
      <div className="docs-TextFieldExample">
        <TextField label="Standard:" underlined />
        <TextField label="Disabled:" underlined disabled={true} />
        <TextField label="Required:" underlined required={true} />
        <TextField label="With error message:" underlined errorMessage="Error message" />
      </div>
    );
  }
}
