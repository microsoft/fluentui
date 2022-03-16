import * as React from 'react';
import { Checkbox } from './index';

export const Checked = () => {
  const [checked, setChecked] = React.useState(true);

  return <Checkbox checked={checked} onChange={ev => setChecked(ev.currentTarget.checked)} label="Checked" />;
};
Checked.parameters = {
  docs: {
    description: {
      story: 'A checkbox can be initially checked using `defaultChecked`, or controlled via the `checked` property.',
    },
  },
};
