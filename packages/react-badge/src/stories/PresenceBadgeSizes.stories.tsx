import * as React from 'react';
// https://github.com/microsoft/fluentui/pull/18695#issuecomment-868432982
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { PresenceBadge } from '@fluentui/react-badge';

export const Sizes = () => {
  return (
    <>
      <PresenceBadge size="smallest" />
      <PresenceBadge size="smaller" />
      <PresenceBadge size="small" />
      <PresenceBadge size="medium" />
      <PresenceBadge size="large" />
      <PresenceBadge size="larger" />
    </>
  );
};

Sizes.parameters = {
  docs: {
    description: {
      story: 'A PresenceBadge supports `smallest`, `smaller`, `small`, `medium`, `large`, and `larger` sizes',
    },
  },
};
