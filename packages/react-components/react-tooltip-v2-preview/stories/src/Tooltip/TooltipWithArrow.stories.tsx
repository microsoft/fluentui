import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { Button } from '@fluentui/react-components';
import { Tooltip } from '@fluentui/react-tooltip-v2-preview';
import { ArrowStepInRegular } from '@fluentui/react-icons';

export const WithArrow = (): JSXElement => (
  <Tooltip positioning="above-end" withArrow content="Example tooltip with an arrow" relationship="label">
    <Button icon={<ArrowStepInRegular />} size="large" />
  </Tooltip>
);

WithArrow.parameters = {
  docs: {
    description: {
      story: 'The `withArrow` prop causes the tooltip to have an arrow pointing to its target.',
    },
  },
};
