import * as React from 'react';
// https://github.com/microsoft/fluentui/pull/18695#issuecomment-868432982
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { PresenceBadge } from '@fluentui/react-badge';

export const Sizes = () => {
  return (
    <>
      <PresenceBadge size="tiny" />
      <PresenceBadge size="extra-small" />
      <PresenceBadge size="small" />
      <PresenceBadge size="medium" />
      <PresenceBadge size="large" />
      <PresenceBadge size="extra-large" />
    </>
  );
};

Sizes.parameters = {
  docs: {
    description: {
      story: 'A PresenceBadge supports `tiny`, `extra-small`, `small`, `medium`, and `extra-large` sizes.',
    },
  },
};
