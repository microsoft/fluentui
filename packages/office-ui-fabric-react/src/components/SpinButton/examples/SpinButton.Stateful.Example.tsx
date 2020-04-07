import * as React from 'react';
import { SpinButton } from 'office-ui-fabric-react/lib/SpinButton';

const hasSuffix = (value: string, suffix: string): Boolean => {
  const subString = value.substr(value.length - suffix.length);
  return subString === suffix;
};

const removeSuffix = (value: string, suffix: string): string => {
  if (!hasSuffix(value, suffix)) {
    return value;
  }
  return value.substr(0, value.length - suffix.length);
};

export const SpinButtonStatefulExample: React.FC = () => {
  const suffix = ' cm';

  const onSpinButtonValidate = (value: string) => {
    value = removeSuffix(value, suffix);
    if (Number(value) > 100 || Number(value) < 0 || value.trim().length === 0 || isNaN(+value)) {
      return '0' + suffix;
    }

    return String(value) + suffix;
  };

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

  return (
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
};
