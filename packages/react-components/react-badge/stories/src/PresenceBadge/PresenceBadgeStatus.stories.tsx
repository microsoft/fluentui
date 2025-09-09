import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';

import { PresenceBadge } from '@fluentui/react-components';

export const Status = (): JSXElement => {
  return (
    <>
      <PresenceBadge status="available" />
      <PresenceBadge status="away" />
      <PresenceBadge status="busy" />
      <PresenceBadge status="do-not-disturb" />
      <PresenceBadge status="offline" />
      <PresenceBadge status="out-of-office" />
      <PresenceBadge status="blocked" />
      <PresenceBadge status="unknown" />
    </>
  );
};

Status.parameters = {
  docs: {
    description: {
      story:
        'A presence badge supports `available`, `away`, `busy`, `do-not-disturb`, ' +
        '`offline`, `out-of-office`, `blocked` and `unknown` status.' +
        ' The default is `available`.',
    },
  },
};
