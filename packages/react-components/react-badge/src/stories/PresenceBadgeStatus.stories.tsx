import * as React from 'react';

import { PresenceBadge } from '../index';

export const Status = () => {
  return (
    <>
      <PresenceBadge status="available" />
      <PresenceBadge status="away" />
      <PresenceBadge status="busy" />
      <PresenceBadge status="do-not-disturb" />
      <PresenceBadge status="offline" />
      <PresenceBadge status="out-of-office" />
      <PresenceBadge status="unknown" />
    </>
  );
};

Status.parameters = {
  docs: {
    description: {
      story:
        'A presence badge supports `available`, `away`, `busy`, `do-not-disturb`, ' +
        '`offline`, `out-of-office` and `unknown` status.' +
        ' The default is `available`.',
    },
  },
};
