import * as React from 'react';

import { PresenceBadge } from '../index';

export const Status = () => {
  return (
    <>
      <PresenceBadge status="available" />
      <PresenceBadge status="away" />
      <PresenceBadge status="busy" />
      <PresenceBadge status="doNotDisturb" />
      <PresenceBadge status="offline" />
      <PresenceBadge status="outOfOffice" />
    </>
  );
};

Status.parameters = {
  docs: {
    description: {
      story:
        'A presence badge supports `available`, `away`, `busy`, `doNotDisturb`, ' +
        '`offline`, and `outOfOffice` status.' +
        ' The default is `available`.',
    },
  },
};
