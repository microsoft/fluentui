import * as React from 'react';
import { TextField, MaskedTextField } from 'office-ui-fabric-react/lib/TextField';

// tslint:disable-next-line:no-any
const style = require('./FluentStyles.Example.scss') as any;

export class FluentStylesTextFieldExample extends React.Component<{}, {}> {
  public render(): JSX.Element {
    return (
      <div className={style.sidebyside}>
        <TextField label="Standard" />
        <TextField label="Disabled" disabled={true} />
        <TextField label="Read Only" readOnly={true} />
        <TextField label="Required " required={true} />
        <TextField label="With error message" errorMessage="Error message" />
        <MaskedTextField label="With input mask" mask="m\ask: (999) 999 - 9999" />
      </div>
    );
  }
}
