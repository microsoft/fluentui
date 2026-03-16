import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { Checkbox } from '@fluentui/react-components';
import type { CheckboxProps } from '@fluentui/react-components';

export const Checked = (): JSXElement => {
  const [checked, setChecked] = React.useState<CheckboxProps['checked']>(true);

  return <Checkbox checked={checked} onChange={(ev, data) => setChecked(data.checked)} label="Checked" />;
};

Checked.parameters = {
  docs: {
    description: {
      story: 'A checkbox can be initially checked using `defaultChecked`, or controlled via the `checked` property.',
    },
  },
};
