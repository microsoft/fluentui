/* tslint:disable:no-any */
import * as React from 'react';
import { Form, FormDatePicker, FormTextInput, Validators } from '@uifabric/experiments/lib/Form';

export interface IFormAutosaveExampleState {
  formResults: any;
}

export class FormAutosaveExample extends React.Component<{}, IFormAutosaveExampleState> {
  public render(): JSX.Element {
    return (
      <div>
        <Form onUpdated={this._onUpdate}>
          <FormTextInput
            textFieldProps={{ label: 'Text Input with max length of 10' }}
            inputKey="maxLength"
            validators={[Validators.maxLength(10, (length: number) => 'Must be less than 10 characters')]}
          />
          <FormTextInput
            textFieldProps={{ label: 'Text input with min length of 10' }}
            inputKey="minLength"
            validators={[Validators.minLength(10, (length: number) => 'Must be greater than 10 characters')]}
          />
          <FormTextInput
            textFieldProps={{ label: 'Required text input' }}
            inputKey="required"
            validators={[Validators.required('Field is required')]}
          />
          <FormDatePicker
            datePickerProps={{ label: 'Date Picker with date no less than ye' }}
            inputKey="date"
            validators={[
              (value: Date) => {
                if (value) {
                  const date = new Date();
                  date.setDate(date.getDate() - 1);
                  if (value.getTime() < date.getTime()) {
                    return 'Date must be today or later';
                  }
                }
              }
            ]}
          />
        </Form>
        {this.state &&
          this.state.formResults && (
            <div className="results-view">
              <h4>Results</h4>
              {JSON.stringify(this.state.formResults)}
            </div>
          )}
      </div>
    );
  }

  private _onUpdate = (key: string, value: any): void => {
    const newFormResults = this.state && this.state.formResults ? { ...this.state.formResults } : {};
    newFormResults[key] = value;
    this.setState({ formResults: newFormResults });
  };
}
