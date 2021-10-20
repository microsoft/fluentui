import * as React from 'react';
// https://github.com/microsoft/fluentui/pull/18695#issuecomment-868432982
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { Badge } from '@fluentui/react-badge';

export const Sizes = () => {
  return (
    <>
      <Badge size="tiny" />
      <Badge size="extra-small" />
      <Badge size="small" />
      <Badge size="medium" />
      <Badge size="large" />
      <Badge size="extra-large" />
    </>
  );
};

Sizes.parameters = {
  docs: {
    description: {
      story: 'A Badge supports `tiny`, `extra-small`, `small`, `medium`, `large`, and `extra-large` sizes.',
    },
  },
};
