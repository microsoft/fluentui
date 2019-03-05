import * as React from 'react';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import './TextField.Examples.scss';

export class TextFieldPrefixAndSuffixExample extends React.Component<any, any> {
  public render(): JSX.Element {
    return (
      <div className="docs-TextFieldExample">
        <TextField ariaLabel="Prefix https://, suffix .com" prefix="https://" suffix=".com" />
        <TextField ariaLabel="Prefix https://, suffix .com" label="Disabled" prefix="https://" suffix=".com" disabled />
      </div>
    );
  }
}
