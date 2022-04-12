import * as React from 'react';
import { SpinButton, SpinButtonProps } from '../index';
import { Label } from '@fluentui/react-label';
import { useId } from '@fluentui/react-utilities';

type FormatterFn = (value: number) => string;
type ParserFn = (formattedValue: string) => number;

export const DisplayValue = () => {
  const formatter: FormatterFn = value => {
    return `${value}"`;
  };

  const parser: ParserFn = formattedValue => {
    if (formattedValue === null) {
      return NaN;
    }

    return parseFloat(formattedValue);
  };

  const onSpinButtonChange: SpinButtonProps['onChange'] = (_ev, data) => {
    if (data.value !== undefined) {
      setSpinButtonValue(data.value);
      setSpinButtonDisplayValue(formatter(data.value));
    } else if (data.displayValue) {
      const newValue = parser(data.displayValue);
      if (!Number.isNaN(newValue)) {
        setSpinButtonValue(newValue);
        setSpinButtonDisplayValue(formatter(newValue));
      }
    }
  };

  const id = useId();
  const [spinButtonValue, setSpinButtonValue] = React.useState(1);
  const [spinButtonDisplayValue, setSpinButtonDisplayValue] = React.useState(formatter(1));

  return (
    <>
      <Label htmlFor={id}>Display Value</Label>
      <SpinButton value={spinButtonValue} displayValue={spinButtonDisplayValue} onChange={onSpinButtonChange} id={id} />
    </>
  );
};

DisplayValue.parameters = {
  docs: {
    description: {
      story: `SpinButton supports formatted display values.`,
    },
  },
};
