import * as React from 'react';
// https://github.com/microsoft/fluentui/pull/18695#issuecomment-868432982
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { PresenceBadge } from '@fluentui/react-badge';

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
        'A PresenceBadge supports `available`, `away`, `busy`, `doNotDisutrb`, ' +
        '`offline`, and `outOfOffice` status',
    },
  },
};
