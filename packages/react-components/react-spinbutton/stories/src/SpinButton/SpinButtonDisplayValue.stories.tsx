import * as React from 'react';
import { makeStyles, tokens, useId, Label, SpinButton } from '@fluentui/react-components';
import type { SpinButtonProps } from '@fluentui/react-components';

const useLayoutStyles = makeStyles({
  base: {
    display: 'flex',
    flexDirection: 'column',
    maxWidth: '500px',

    '> label': {
      marginBottom: tokens.spacingVerticalXXS,
    },
  },
});

type FormatterFn = (value: number) => string;
type ParserFn = (formattedValue: string) => number;

export const DisplayValue = () => {
  const formatter: FormatterFn = value => {
    return `$${value}`;
  };

  const parser: ParserFn = formattedValue => {
    if (formattedValue === null) {
      return NaN;
    }

    return parseFloat(formattedValue.replace('$', ''));
  };

  const onSpinButtonChange: SpinButtonProps['onChange'] = (_ev, data) => {
    if (data.value !== undefined && data.value !== null) {
      setSpinButtonValue(data.value);
      setSpinButtonDisplayValue(formatter(data.value));
    } else if (data.displayValue !== undefined) {
      const newValue = parser(data.displayValue);
      if (!Number.isNaN(newValue)) {
        setSpinButtonValue(newValue);
        setSpinButtonDisplayValue(formatter(newValue));
      } else {
        // Display a "special" value when user types something
        // that's not parsable as a number.
        setSpinButtonValue(null);
        setSpinButtonDisplayValue('(null)');
      }
    }
  };

  const layoutStyles = useLayoutStyles();
  const id = useId();
  const [spinButtonValue, setSpinButtonValue] = React.useState<number | null>(1);
  const [spinButtonDisplayValue, setSpinButtonDisplayValue] = React.useState(formatter(1));

  return (
    <div className={layoutStyles.base}>
      <Label htmlFor={id}>Display Value</Label>
      <SpinButton value={spinButtonValue} displayValue={spinButtonDisplayValue} onChange={onSpinButtonChange} id={id} />
    </div>
  );
};

DisplayValue.parameters = {
  docs: {
    description: {
      story: `SpinButton supports formatted display values.`,
    },
  },
};
