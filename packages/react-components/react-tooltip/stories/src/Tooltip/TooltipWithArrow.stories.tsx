import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { Button, Tooltip } from '@fluentui/react-components';
import { ArrowStepInRegular } from '@fluentui/react-icons';

export const WithArrow = (): JSXElement => (
  <Tooltip withArrow content="Example tooltip with an arrow" relationship="label">
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
