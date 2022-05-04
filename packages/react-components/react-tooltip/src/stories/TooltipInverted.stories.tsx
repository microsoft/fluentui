import * as React from 'react';
import { Tooltip } from '../Tooltip';
import { Button } from '@fluentui/react-button';
import { SlideTextFilled } from '@fluentui/react-icons';

export const Inverted = () => (
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
