import * as React from 'react';

// https://github.com/microsoft/fluentui/pull/18695#issuecomment-868432982
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { Button } from '@fluentui/react-button';

// https://github.com/microsoft/fluentui/pull/18695#issuecomment-868432982
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { Tooltip } from '@fluentui/react-tooltip';

import { Scenario } from './utils';

export const ButtonsWithTooltipAccessibilityScenario: React.FunctionComponent = () => {
  return (
    <Scenario pageTitle="Buttons with tooltip">
      <Tooltip content="Tooltip as a replacement label" triggerAriaAttribute="label">
        <Button>First</Button>
      </Tooltip>

      <Tooltip content="Tooltip as a description" triggerAriaAttribute="describedby">
        <Button>Second</Button>
      </Tooltip>
    </Scenario>
  );
};

export default {
  title: 'Accessibility Scenarios/ Buttons with tooltip',
  id: 'tooltip-accessibility-scenario',
};
