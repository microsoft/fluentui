import * as React from 'react';

import { Badge } from '@fluentui/react-components';

export const Color = () => {
  return (
    <>
      <Badge appearance="filled" color="brand">
        999+
      </Badge>
      <Badge appearance="filled" color="danger">
        999+
      </Badge>
      <Badge appearance="filled" color="important">
        999+
      </Badge>
      <Badge appearance="filled" color="informative">
        999+
      </Badge>
      <Badge appearance="filled" color="severe">
        999+
      </Badge>
      <Badge appearance="filled" color="subtle">
        999+
      </Badge>
      <Badge appearance="filled" color="success">
        999+
      </Badge>
      <Badge appearance="filled" color="warning">
        999+
      </Badge>
    </>
  );
};

Color.parameters = {
  docs: {
    description: {
      story:
        'A badge can have different colors.' +
        ' The available colors are `brand`, `danger`, `important`, `informative`, ' +
        '`severe`, `subtle`, `success` or `warning`.' +
        ' The default is `brand`.' +
        ' Information conveyed by color should also be communicated in another way' +
        ' to meet [accessibility requirements](https://w3c.github.io/wcag/guidelines/22/#use-of-color).',
    },
  },
};
