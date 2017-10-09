/* tslint:disable:no-any */
import * as React from 'react';
import { autobind } from 'office-ui-fabric-react/lib/Utilities';
import { Form } from '../Form';
import { Validators } from '../validators/Validators';
import { FormConditionalSubmitButton } from '../inputs/FormConditionalSubmitButton';
import { FormTextInput } from '../inputs/FormTextInput';
import { FormDatePicker } from '../inputs/FormDatePicker';

export interface IFormValidationExampleState {
  formResults: any;
}

export class FormValidationExample extends React.Component<{}, IFormValidationExampleState> {

  public render(): JSX.Element {
    return (
      <div>
        <Form onSubmit={ this._onSubmit } >
          <FormTextInput
            textFieldProps={ { label: 'Text Input with max length of 10' } }
            inputKey='maxLength'
            validators={ [Validators.maxLength(10, (length: number) => 'Must be less than 10 characters')] }
          />
          <FormTextInput
            textFieldProps={ { label: 'Text input with min length of 10' } }
            inputKey='minLength'
            validators={ [Validators.minLength(10, (length: number) => 'Must be greater than 10 characters')] }
          />
          <FormTextInput
            textFieldProps={ { label: 'Required text input' } }
            inputKey='required'
            validators={ [Validators.required('Field is required')] }
          />
          <FormDatePicker
            datePickerProps={ { label: 'Date Picker with date no less than yesterday' } }
            inputKey='date'
            validators={ [(value: Date) => {
              if (value) {
                let date = new Date();
                date.setDate(date.getDate() - 1);
                if (value.getTime() < date.getTime()) {
                  return 'Date must be today or later';
                }
              }
            }] }
          />
          <FormConditionalSubmitButton>Submit</FormConditionalSubmitButton>
        </Form>
        {
          this.state && this.state.formResults &&
          <div className='results-view'>
            <h4>Results</h4>
            { JSON.stringify(this.state.formResults) }
          </div>
        }
      </div>
    );
  }

  @autobind
  private _onSubmit(values: { [key: string]: any }): void {
    this.setState({ formResults: values });
  }
}