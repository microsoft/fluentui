import * as React from 'react';
import { SpinButton } from 'office-ui-fabric-react/lib/SpinButton';

const hasSuffix = (value: string, unitSuffix: string): Boolean => {
  const subString = value.substr(value.length - unitSuffix.length);
  return subString === unitSuffix;
};

const removeSuffix = (value: string, unitSuffix: string): string => {
  if (!hasSuffix(value, unitSuffix)) {
    return value;
  }
  return value.substr(0, value.length - suffix.length);
};

const suffix = ' cm';

const onSpinButtonIncrement = (value: string) => {
  value = removeSuffix(value, suffix);
  if (Number(value) + 2 > 100) {
    return String(+value) + suffix;
  } else {
    return String(+value + 2) + suffix;
  }
};

const onSpinButtonDecrement = (value: string) => {
  value = removeSuffix(value, suffix);
  if (Number(value) - 2 < 0) {
    return String(+value) + suffix;
  } else {
    return String(+value - 2) + suffix;
  }
};

const onSpinButtonValidate = (value: string) => {
  value = removeSuffix(value, suffix);
  if (Number(value) > 100 || Number(value) < 0 || value.trim().length === 0 || isNaN(+value)) {
    return '0' + suffix;
  }

  return String(value) + suffix;
};

export const SpinButtonStatefulExample: React.FC = () => (
  <div style={{ width: '400px' }}>
    <SpinButton
      label={'SpinButton with custom implementation:'}
      min={0}
      max={100}
      value={'7' + suffix}
      onValidate={onSpinButtonValidate}
      onIncrement={onSpinButtonIncrement}
      onDecrement={onSpinButtonDecrement}
      incrementButtonAriaLabel={'Increase value by 2'}
      decrementButtonAriaLabel={'Decrease value by 2'}
    />
  </div>
);
