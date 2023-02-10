import * as React from 'react';
import { Switch } from '@fluentui/react-components';

export const Checked = () => {
  const [checked, setChecked] = React.useState(true);
  const onChange = React.useCallback(
    ev => {
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
