import * as React from 'react';
// https://github.com/microsoft/fluentui/pull/18695#issuecomment-868432982
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { Badge } from '@fluentui/react-badge';

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
        'A Badge has predefined set of colors for `warning`, `success`, `subtle`, `severe`, ' +
        '`informative`, `important`, `danger` and `brand`',
    },
  },
};
