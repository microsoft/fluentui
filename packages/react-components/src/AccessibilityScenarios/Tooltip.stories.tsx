import * as React from 'react';

import { Button } from '@fluentui/react-button';
import { Label } from '@fluentui/react-label';
import { Tooltip, TooltipProps } from '@fluentui/react-tooltip';

// https://github.com/microsoft/fluentui/pull/18695#issuecomment-868432982
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { TextItalic24Regular, TextUnderline24Regular, TextBold24Regular } from '@fluentui/react-icons';

import { Scenario } from './utils';

export const ButtonsWithTooltipAccessibilityScenario: React.FunctionComponent = () => {
  const [tooltipVisible, setTooltipVisible] = React.useState(false);

  const onVisibleChange: TooltipProps['onVisibleChange'] = (event, { visible }) => {
    setTooltipVisible(visible);
  };

  return (
    <Scenario pageTitle="Buttons with tooltip">
      <h2>Tooltip as a password requirements</h2>
      <Label htmlFor="password">Password</Label>
      <Tooltip
        relationship="label"
        onVisibleChange={onVisibleChange}
        visible={tooltipVisible}
        content="Password must be at least 8 characters long, contain a capital letter, and a number."
      >
        <Button onClick={() => setTooltipVisible(visible => !visible)}>Password requirements</Button>
      </Tooltip>
      <input type="password" id="password" name="password" />

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

export default {
  title: 'Accessibility Scenarios/ Buttons with tooltip',
  id: 'tooltip-accessibility-scenario',
};
