import * as React from 'react';
import { Field } from '@fluentui/react-components';
import type { JSXElement } from '@fluentui/react-components';
import { DatePicker, defaultDatePickerErrorStrings } from '@fluentui/react-datepicker-preview';
import type { DatePickerErrorType } from '@fluentui/react-datepicker-preview';

export const ErrorHandling = (): JSXElement => {
  const [error, setError] = React.useState<DatePickerErrorType>();
  return (
    <Field label="Start date" required validationMessage={error && defaultDatePickerErrorStrings[error]}>
      <DatePicker
        allowTextInput
        today={new Date(2030, 0, 15)}
        minDate={new Date(2030, 0, 15)}
        placeholder="Choose January 15, 2030 or later"
        onValidationResult={(_, data) => setError(data.error)}
      />
    </Field>
  );
};
