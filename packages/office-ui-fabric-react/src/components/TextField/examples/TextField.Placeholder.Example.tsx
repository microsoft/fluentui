import * as React from 'react';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import './TextField.Examples.scss';

export class TextFieldPlaceholderExample extends React.Component<any, any> {
  public render(): JSX.Element {
    return (
      <div className="docs-TextFieldExample">
        <TextField placeholder="I am a placeholder." ariaLabel="Please enter text here. Example text field with placeholder." />
        <TextField
          disabled={true}
          placeholder="I am disabled. "
          ariaLabel="Please enter text here. Example disabled text field with placeholder."
        />
        <TextField
          required={true}
          placeholder="I am required."
          ariaLabel="Please enter text here. Example required text field with placeholder."
        />
      </div>
    );
  }
}
