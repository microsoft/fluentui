import * as React from 'react';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import './TextField.Examples.scss';

export class TextFieldPlaceholderExample extends React.Component<any, any> {
  public render(): JSX.Element {
    return (
      <div className="docs-TextFieldExample">
        <TextField placeholder="I am a placeholder." ariaLabel="Please enter text here" />
        <TextField disabled={true} placeholder="I am disabled. " ariaLabel="Please enter text here" />
        <TextField required={true} placeholder="I am required." ariaLabel="Please enter text here" />
        <TextField errorMessage="Error message" placeholder="I have an error message." ariaLabel="Please enter text here" />
      </div>
    );
  }
}
