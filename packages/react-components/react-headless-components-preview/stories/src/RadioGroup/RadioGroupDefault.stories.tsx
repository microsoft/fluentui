import * as React from 'react';
import { RadioGroup, Radio } from '@fluentui/react-headless-components-preview';

const radioClass =
  'flex items-center gap-2.5 cursor-pointer p-1 has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-black has-[:focus-visible]:ring-offset-2';
const radioInputClass = 'h-4 w-4 cursor-pointer accent-gray-900 shrink-0 focus:outline-none';
const radioLabelClass = 'text-sm text-gray-700 cursor-pointer select-none';

const plans = [
  { value: 'free', label: 'Free', description: '$0 / month · Up to 3 projects' },
  { value: 'standard', label: 'Standard', description: '$12 / month · Up to 20 projects' },
  { value: 'pro', label: 'Pro', description: '$29 / month · Unlimited projects' },
];

export const Default = (): React.ReactNode => (
  <RadioGroup defaultValue="standard" className="flex flex-col gap-1 w-full max-w-xs">
    {plans.map(plan => (
      <Radio
        key={plan.value}
        value={plan.value}
        label={{
          children: (
            <span className="flex flex-col">
              <span className={radioLabelClass}>{plan.label}</span>
              <span className="text-xs text-gray-500">{plan.description}</span>
            </span>
          ),
        }}
        className={radioClass}
        input={{ className: radioInputClass }}
      />
    ))}
  </RadioGroup>
);
