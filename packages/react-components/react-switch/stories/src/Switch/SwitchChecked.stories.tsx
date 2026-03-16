import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { Switch } from '@fluentui/react-components';

export const Checked = (): JSXElement => {
  const [checked, setChecked] = React.useState(true);
  const onChange = React.useCallback(
    (ev: React.ChangeEvent<HTMLInputElement>) => {
      setChecked(ev.currentTarget.checked);
    },
    [setChecked],
  );

  return <Switch checked={checked} onChange={onChange} label={checked ? 'Checked' : 'Unchecked'} />;
};

Checked.parameters = {
  docs: {
    description: {
      story:
        'A Switch can be initially checked by passing a value to the `defaultChecked` property, or have its checked ' +
        'value controlled via the `checked` property.',
    },
  },
};
