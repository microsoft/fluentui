import * as React from 'react';
import { Button } from '@fluentui/react-components';
import { Tooltip } from '@fluentui/react-modern-components-preview/tooltip';
import { ArrowStepInRegular } from '@fluentui/react-icons';

export const WithArrow = (): React.ReactNode => (
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
