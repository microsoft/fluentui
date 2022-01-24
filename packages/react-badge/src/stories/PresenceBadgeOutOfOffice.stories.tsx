import * as React from 'react';

import { PresenceBadge } from '../index';

export const OutOfOffice = () => {
  return (
    <>
      <PresenceBadge outOfOffice status="available" />
      <PresenceBadge outOfOffice status="away" />
      <PresenceBadge outOfOffice status="busy" />
      <PresenceBadge outOfOffice status="doNotDisturb" />
      <PresenceBadge outOfOffice status="offline" />
      <PresenceBadge outOfOffice status="outOfOffice" />
    </>
  );
};

OutOfOffice.parameters = {
  docs: {
    description: {
      story:
        'A presence badge supports `available`, `away`, `busy`, `doNotDisturb`, ' +
        '`offline`, or `outOfOffice` status when `outOfOffice` is set.',
    },
  },
};
