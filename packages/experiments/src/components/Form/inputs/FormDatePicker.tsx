import * as DatePickerStylesModule from "./FormDatePicker.scss";
const DatePickerStyles = DatePickerStylesModule as any;

import * as React from "react";

// Components
import { DatePicker, IDatePickerProps } from "office-ui-fabric-react/lib/DatePicker";
import { Icon } from "office-ui-fabric-react/lib/Icon";
import { FormBaseInput, IFormBaseInputProps, IFormBaseInputState } from "../FormBaseInput";

export { IDatePickerProps };

/**
 * Additional props for the DatePicker input
 */
export interface IFormDatePickerProps extends IFormBaseInputProps<Date> {
  datePickerProps?: IDatePickerProps;
}

/**
 * Any additional state for the DatePicker input. Currently none
 */
export interface IFormDatePickerState extends IFormBaseInputState<Date> {

}

/**
 * DatePicker input for Form
 */
export class FormDatePicker extends FormBaseInput<Date, IFormDatePickerProps, IFormDatePickerState> {

  constructor(props: IFormDatePickerProps, context: any) {
    super(props, context);
    this.state = {
      isValid: true,
      currentValue: this.props.value,
      currentError: undefined
    };

    this.validateDatePickerProps(this.props.datePickerProps);
  }

  /**
   * Render a Fabric DatePicker
   */
  public render() {
    return (
      <div className={ DatePickerStyles['form-date-picker'] }>
        <DatePicker
          {...this.props.datePickerProps}
          // These props cannot be overridden
          key={ this.props.inputKey }
          value={ this.state.currentValue }
          onSelectDate={ (date: Date) => { this.setValue(date); } }
        />
        { this.state.currentError && this.renderError() }
      </div>
    );
  }

  private renderError(): JSX.Element {
    return (
      <div className="input-error">
        <Icon iconName="Error" />
        { this.state.currentError }
      </div>
    );
  }

  private validateDatePickerProps(props?: IDatePickerProps): void {
    if (props) {
      if (props.key != null) {
        console.warn("FormDatePicker: 'key' prop was specified and will be ignored");
      }

      if (props.ref != null) {
        console.warn("FormDatePicker: 'ref' prop was specified and will be ignored");
      }

      if (props.onSelectDate != null) {
        console.warn("FormDatePicker: 'onSelectDate' prop was specified and will be ignored");
      }

      if (props.strings != null) {
        console.warn("FormDatePicker: 'strings' prop was specified and will be ignored");
      }
    }
  }
}
