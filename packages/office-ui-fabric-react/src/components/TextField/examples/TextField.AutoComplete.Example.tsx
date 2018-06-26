import * as React from 'react';
import { PrimaryButton } from 'office-ui-fabric-react/lib/Button';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import './TextField.Examples.scss';

export class TextFieldAutoCompleteExample extends React.Component<any, any> {
  public render(): JSX.Element {
    return (
      <form action="" className="docs-TextFieldExample">
        <TextField
          label="Fill in and submit this form. The page will reload and autocomplete suggestions will appear."
          name="example"
          autoComplete="on"
        />
        <PrimaryButton type="submit">Submit</PrimaryButton>
      </form>
    );
  }
}
