import * as React from 'react';
import { Button } from '@fluentui/react-components';
import { Tooltip } from '@fluentui/react-modern-components-preview/tooltip';
import { SlideTextFilled } from '@fluentui/react-icons';

export const Inverted = (): React.ReactNode => (
  <Tooltip appearance="inverted" content="Example inverted tooltip" relationship="label">
    <Button icon={<SlideTextFilled />} size="large" />
  </Tooltip>
);

Inverted.storyName = 'Appearance: inverted';
Inverted.parameters = {
  docs: {
    description: {
      story: "The `appearance` prop can be set to `inverted` to use the theme's inverted colors.",
    },
  },
};
