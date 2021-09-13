import * as React from 'react';
// https://github.com/microsoft/fluentui/pull/18695#issuecomment-868432982
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { Badge } from '@fluentui/react-badge';

export const Appearance = () => {
  return (
    <>
      <Badge appearance="filled">999+</Badge>
      <Badge appearance="ghost">999+</Badge>
      <Badge appearance="outline">999+</Badge>
      <Badge appearance="tint">999+</Badge>
    </>
  );
};

Appearance.parameters = {
  docs: {
    description: {
      story: 'A Badge can have appearance as `ghost`, `filled`, `outline`, `tint`',
    },
  },
};
