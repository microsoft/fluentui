import * as React from 'react';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import './TextField.Examples.scss';

export class TextFieldPrefixAndSuffixExample extends React.Component<any, any> {
  public render(): JSX.Element {
    return (
      <div className="docs-TextFieldExample">
        <TextField ariaLabel="Example text field with https:// prefix and .com suffix" prefix="https://" suffix=".com" />
        <TextField
          ariaLabel="Example text field with https:// prefix and .com suffix"
          label="Disabled"
          prefix="https://"
          suffix=".com"
          disabled
        />
      </div>
    );
  }
}
