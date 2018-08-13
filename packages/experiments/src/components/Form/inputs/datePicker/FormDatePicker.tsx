import * as DatePickerStylesModule from './FormDatePicker.scss';
/*tslint:disable:no-any */
const DatePickerStyles = DatePickerStylesModule as any;
/*tslint:enable:no-any */

import * as React from 'react';

// Components
import { IFormDatePickerProps } from './FormDatePicker.types';
import { DatePicker, IDatePickerProps } from 'office-ui-fabric-react/lib/DatePicker';
import { Icon } from 'office-ui-fabric-react/lib/Icon';
import { FormBaseInput, IFormBaseInputState } from '../../FormBaseInput';
import { IFormContext } from '../../Form';

// Utilities
import { css } from 'office-ui-fabric-react/lib/Utilities';

/**
 * DatePicker input for Form
 */
export class FormDatePicker extends FormBaseInput<Date, IFormDatePickerProps, IFormBaseInputState<Date>> {
  constructor(props: IFormDatePickerProps, context: IFormContext) {
    super(props, context);
    this.state = {
      isValid: true,
      currentValue: this.props.value,
      currentError: undefined
    };

    this._validateDatePickerProps(this.props.datePickerProps);
  }

  /**
   * Render a Fabric DatePicker
   */
  public render(): JSX.Element {
    return (
      <div className={css('form-date-picker', DatePickerStyles.formDatePicker)}>
        <DatePicker
          {...this.props.datePickerProps}
          // These props cannot be overridden
          key={this.props.inputKey}
          value={this.state.currentValue}
          onSelectDate={this._onDateChanged}
        />
        {this.state.currentError && this._renderError()}
      </div>
    );
  }

  private _renderError(): JSX.Element {
    return (
      <div className={css('input-error', DatePickerStyles.inputError)}>
        <Icon iconName="Error" />
        {this.state.currentError}
      </div>
    );
  }

  private _onDateChanged = (date: Date): void => {
    this.setValue(date);
  };

  private _validateDatePickerProps(props?: IDatePickerProps): void {
    if (props) {
      if (props.onSelectDate) {
        console.warn(`FormDatePicker: 'onSelectDate' prop was specified and will be ignored`);
      }

      if (props.strings) {
        console.warn(`FormDatePicker: 'strings' prop was specified and will be ignored`);
      }
    }
  }
}
