import * as React from 'react';
import { Checkbox } from 'office-ui-fabric-react/lib/Checkbox';

export interface ICheckboxBasicExampleState {
  isChecked: boolean;
}

export class CheckboxBasicExample extends React.Component<{}, ICheckboxBasicExampleState> {
  constructor(props: {}) {
    super(props);

    this._onCheckboxChange = this._onCheckboxChange.bind(this);
  }

  public render(): JSX.Element {
    return (
      <div>
        <Checkbox label="Standard checkbox" onChange={this._onCheckboxChange} />
      </div>
    );
  }

  private _onCheckboxChange(ev: React.FormEvent<HTMLElement>, isChecked: boolean): void {
    console.log(`The option has been changed to ${isChecked}.`);
  }
}
