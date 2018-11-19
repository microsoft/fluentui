import * as React from 'react';

// Components
import { Checkbox, ICheckboxProps } from 'office-ui-fabric-react/lib/Checkbox';
import { IFormCheckBoxProps } from './FormCheckBox.types';
import { FormBaseInput, IFormBaseInputState } from '../../FormBaseInput';
import { IFormContext } from '../../Form';

/**
 * Checkbox input for the Form. Displays a boolean value as a checkbox
 */
export class FormCheckBox extends FormBaseInput<boolean, IFormCheckBoxProps, IFormBaseInputState<boolean>> {
  constructor(props: IFormCheckBoxProps, context: IFormContext) {
    super(props, context);
    this.state = {
      isValid: true,
      currentValue: this.props.value || false,
      currentError: undefined
    };

    this._validateCheckboxProps(props.checkboxProps);
  }

  /**
   * Render a checkbox
   */
  public render(): JSX.Element {
    return <Checkbox {...this.props.checkboxProps} key={this.props.inputKey} onChange={this._onChange} checked={this.state.currentValue} />;
  }

  private _onChange = (event: React.FormEvent<HTMLElement>, isChecked: boolean): void => {
    this.setValue(isChecked);
  };

  private _validateCheckboxProps(props?: ICheckboxProps): void {
    if (props) {
      if (props.checked !== null && props.checked !== undefined) {
        console.warn(`FormCheckBox: 'checked' prop was specified and will be ignored`);
      }

      if (props.onChange) {
        console.warn(`FormCheckBox: 'onChange' prop was specified and will be ignored`);
      }
    }
  }
}
