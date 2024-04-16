import * as React from 'react';

import { CounterBadge } from '@fluentui/react-components';
export const Color = () => {
  return (
    <>
      <CounterBadge appearance="filled" color="brand" count={5} />
      <CounterBadge appearance="filled" color="danger" count={5} />
      <CounterBadge appearance="filled" color="important" count={5} />
      <CounterBadge appearance="filled" color="informative" count={5} />
    </>
  );
};

Color.parameters = {
  docs: {
    description: {
      story:
        'A counter badge can be different colors.' +
        ' The available colors are `brand`, `danger`, `important`, `informative`, ' +
        '`severe`, `severe`, `success` or `warning`.' +
        ' The default is `brand`.' +
        ' Information conveyed by color should also be communicated in another way' +
        ' to meet [accessibility requirements](https://w3c.github.io/wcag/guidelines/22/#use-of-color).',
    },
  },
};
