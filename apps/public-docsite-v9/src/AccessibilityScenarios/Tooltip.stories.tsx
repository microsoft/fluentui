import * as React from 'react';

import { Button, Tooltip } from '@fluentui/react-components';

import { TextItalic24Regular, TextUnderline24Regular, TextBold24Regular } from '@fluentui/react-icons';

import { Scenario } from './utils';

export const ButtonsWithTooltip: React.FunctionComponent = () => {
  return (
    <Scenario pageTitle="Buttons with tooltip">
      <h1>Tooltip variants</h1>
      <h2>Tooltips for text formatting icon-only buttons</h2>
      <Tooltip relationship="label" content="Make text bold">
        <Button icon={<TextBold24Regular />} />
      </Tooltip>

      <Tooltip relationship="label" content="Make text underline">
        <Button icon={<TextUnderline24Regular />} />
      </Tooltip>

      <Tooltip relationship="label" content="Make text italic">
        <Button icon={<TextItalic24Regular />} />
      </Tooltip>

      <h2>Tooltip as an additional button description</h2>
      <Tooltip relationship="description" content="App and account settings, status and more">
        <Button>Settings</Button>
      </Tooltip>
    </Scenario>
  );
};
