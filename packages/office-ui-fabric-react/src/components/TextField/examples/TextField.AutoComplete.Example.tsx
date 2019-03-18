import * as React from 'react';
import { getId } from 'office-ui-fabric-react/lib/Utilities';
import { Label } from 'office-ui-fabric-react/lib/Label';
import { PrimaryButton } from 'office-ui-fabric-react/lib/Button';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import './TextField.Examples.scss';

export class TextFieldAutoCompleteExample extends React.Component<any, any> {
  private _textFieldId: string = getId('autoCompleteTextField');
  private _labelId: string = getId('autoCompleteLabel');

  public render(): JSX.Element {
    // Separate <Label> control exists to generate an id that can be used by <form>.
    return (
      <form action="" className="docs-TextFieldExample" aria-labelledby={this._labelId}>
        <Label htmlFor={this._textFieldId} id={this._labelId}>
          Fill in and submit this form. The page will reload and autocomplete suggestions will appear.
        </Label>
        <TextField id={this._textFieldId} aria-describedby={this._labelId} label="" name="example" autoComplete="on" />
        <PrimaryButton type="submit">Submit</PrimaryButton>
      </form>
    );
  }
}
