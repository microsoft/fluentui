import * as React from 'react';

import { Label, Button, Checkbox, SpinButton, SpinButtonProps } from '@fluentui/react-components';

import { Scenario } from './utils';

type Formatter = (value: number) => string;
type Parser = (formattedValue: string) => number;
export const DonationFormSpinButtons: React.FunctionComponent = () => {
  const [isRecurrenceLimit, setIsRecurrenceLimit] = React.useState(false);
  const [isSubmitted, setIsSubmitted] = React.useState(false);

  const formatter: Formatter = value => {
    return `$${value}`;
  };

  const parser: Parser = formattedValue => {
    if (formattedValue === null) {
      return NaN;
    }
    return parseFloat(formattedValue.replace('$', ''));
  };

  const [amountValue, setAmountValue] = React.useState<number | null>(10);
  const [amountDisplayValue, setAmountDisplayValue] = React.useState(formatter(10));

  const onAmountChange: SpinButtonProps['onChange'] = (event, data) => {
    if (data.value !== undefined && data.value !== null) {
      setAmountValue(data.value);
      setAmountDisplayValue(formatter(data.value));
    } else if (data.displayValue !== undefined) {
      const newValue = parser(data.displayValue);
      if (!Number.isNaN(newValue)) {
        setAmountValue(newValue);
        setAmountDisplayValue(formatter(newValue));
      } else {
        setAmountValue(null);
        setAmountDisplayValue('(null)');
      }
    }
  };

  React.useEffect(() => {
    if (isSubmitted) {
      document.getElementById('formSubmittedText')?.focus();
    }
  }, [isSubmitted]);

  const onSubmit = (event: React.BaseSyntheticEvent) => {
    event.preventDefault();
    setIsSubmitted(true);
  };

  return (
    <Scenario pageTitle="Site navigation links">
      <h1>Donation form</h1>
      {!isSubmitted ? (
        <form onSubmit={onSubmit}>
          <p id="howMuchText">How much money do you want to donate?</p>

          <Label htmlFor="amount">Donation amount</Label>
          <SpinButton
            id="amount"
            value={amountValue}
            displayValue={amountDisplayValue}
            step={10}
            stepPage={100}
            min={0}
            onChange={onAmountChange}
            aria-describedby="howMuchText"
          />

          <p id="recurrenceText">Choose the payment recurrence in months.</p>

          <Label htmlFor="recurrence">Recurrence in months</Label>
          <SpinButton id="recurrence" defaultValue={1} min={1} max={12} aria-describedby="recurrenceText" />

          <Button type="submit">Submit</Button>
        </form>
      ) : (
        <p id="formSubmittedText" tabIndex={-1}>
          The form would have been submitted.
        </p>
      )}
    </Scenario>
  );
};
