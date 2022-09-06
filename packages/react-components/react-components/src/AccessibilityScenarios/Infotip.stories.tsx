import * as React from 'react';

import { Button, Tooltip } from '@fluentui/react-components';

import { Info24Regular } from '@fluentui/react-icons';

import { Scenario } from './utils';

export const Infotip: React.FunctionComponent = () => {
  return (
    <Scenario pageTitle="Infotip pattern">
      <Tooltip
        relationship="description"
        content="This is the detailed description which is accessible on keyboard focus or mouse over"
      >
        <Info24Regular tabIndex={0} aria-label="More info" />
      </Tooltip>
    </Scenario>
  );
};
