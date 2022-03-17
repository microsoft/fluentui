import * as React from 'react';

import { PresenceBadge } from '../index';

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
      story:
        'A presence badge supports `tiny`, `extra-small`, `small`, `medium`, and `extra-large` sizes.' +
        ' The default is `medium`.',
    },
  },
};
