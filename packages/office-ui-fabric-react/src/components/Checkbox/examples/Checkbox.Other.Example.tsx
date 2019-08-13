import * as React from 'react';
import { Checkbox } from 'office-ui-fabric-react/lib/Checkbox';

export interface ICheckboxOtherExamplesState {
  isChecked: boolean;
  isChecked2: boolean;
  isChecked3: boolean;
  isIndeter: boolean;
}

export class CheckboxOtherExamples extends React.Component<{}, ICheckboxOtherExamplesState> {
  public state: ICheckboxOtherExamplesState = {
    isChecked: false,
    isChecked2: false,
    isChecked3: false,
    isIndeter: true
  };

  public render(): JSX.Element {
    const { isChecked, isChecked2, isChecked3, isIndeter } = this.state;

    const checkboxStyles = () => {
      return {
        root: {
          marginTop: '10px'
        }
      };
    };

    return (
      <div>
        <Checkbox
          label="Uncontrolled checkbox"
          onChange={this._onCheckboxChange}
          inputProps={{
            onFocus: () => {
              console.log('Uncontrolled checkbox is focused');
            },
            onBlur: () => {
              console.log('Uncontrolled checkbox is blured');
            }
          }}
          styles={checkboxStyles}
        />

        <Checkbox
          label="Uncontrolled checkbox with defaultChecked true"
          defaultChecked={true}
          onChange={this._onCheckboxChange}
          styles={checkboxStyles}
        />

        <Checkbox label="Disabled uncontrolled checkbox" disabled={true} styles={checkboxStyles} />

        <Checkbox
          label="Disabled uncontrolled checkbox with defaultChecked true"
          disabled={true}
          defaultChecked={true}
          onChange={this._onCheckboxChange}
          styles={checkboxStyles}
        />

        <Checkbox label="Controlled checkbox" checked={isChecked} onChange={this._onControlledCheckboxChange} styles={checkboxStyles} />

        <Checkbox label='Checkbox rendered with boxSide "end" test' boxSide="end" styles={checkboxStyles} />

        <Checkbox label="Persona Checkbox" styles={checkboxStyles} onRenderLabel={this._renderLabelWithLink} />

        <Checkbox
          label="Controlled Indeterminate Uncontrolled check Checkbox"
          styles={checkboxStyles}
          onChange={this._onControlledIndeterminateChange}
          indeterminate={isIndeter}
          checked={isChecked2}
        />

        <Checkbox
          label="Uncontrolled Indeterminate Controlled Check Checkbox"
          styles={checkboxStyles}
          checked={isChecked3}
          onChange={this._onControlledCheckboxChange2}
          defaultIndeterminate
        />

        <Checkbox label="Disabled Controlled Indeterminate Checkbox" styles={checkboxStyles} disabled={true} indeterminate={true} />

        <Checkbox label="Disabled Uncontrolled Indeterminate Checkbox" styles={checkboxStyles} disabled={true} defaultIndeterminate />
      </div>
    );
  }

  private _onCheckboxChange = (ev: React.FormEvent<HTMLElement>, isChecked: boolean) => {
    console.log(`The option has been changed to ${isChecked}.`);
  };

  private _onControlledIndeterminateChange = (ev: React.FormEvent<HTMLElement>, checked: boolean): void => {
    if (this.state.isIndeter) {
      this.setState({ isIndeter: false });
    } else {
      this.setState({ isChecked2: checked! });
    }
  };

  private _onControlledCheckboxChange = (ev: React.FormEvent<HTMLElement>, checked: boolean): void => {
    this.setState({ isChecked: checked! });
  };

  private _onControlledCheckboxChange2 = (ev: React.FormEvent<HTMLElement>, checked: boolean): void => {
    this.setState({ isChecked3: checked! });
  };

  private _renderLabelWithLink = () => {
    return (
      <span>
        This is a <a href="https://www.microsoft.com">link</a> inside a label.
      </span>
    );
  };
}
