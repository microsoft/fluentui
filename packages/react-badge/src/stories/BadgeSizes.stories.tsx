import * as React from 'react';
// https://github.com/microsoft/fluentui/pull/18695#issuecomment-868432982
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { Badge } from '@fluentui/react-badge';

export const Sizes = () => {
  return (
    <>
      <Badge size="smallest" />
      <Badge size="smaller" />
      <Badge size="small" />
      <Badge size="medium" />
      <Badge size="large" />
      <Badge size="larger" />
      <Badge size="largest" />
    </>
  );
};

Sizes.parameters = {
  docs: {
    description: {
      story: 'A Badge supports `smallest`, `smaller`, `small`, `medium`, `large`, `larger`, and `largest` sized',
    },
  },
};
