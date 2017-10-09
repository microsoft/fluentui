
import "./Form.Basic.Example.scss";
import * as React from 'react';
import { PrimaryButton } from "office-ui-fabric-react/lib/Button";
import { Form } from '../Form';
import { FormTextInput } from "../inputs/FormTextInput";

export interface IFormBasicExampleState {
  formResults: any;
}

export class FormBasicExample extends React.Component<{}, IFormBasicExampleState> {

  public render(): JSX.Element {
    return (
      <div>
        <Form onSubmit={ (results) => { this.setState({ formResults: results }) } }>
          <FormTextInput textFieldProps={ { label: "Name" } } inputKey="name" />
          <PrimaryButton>Submit</PrimaryButton>
        </Form>
        {
          this.state && this.state.formResults &&
          <div className="results-view">
            <h4>Results</h4>
            { JSON.stringify(this.state.formResults) }
          </div>
        }
      </div>
    );
  }
}