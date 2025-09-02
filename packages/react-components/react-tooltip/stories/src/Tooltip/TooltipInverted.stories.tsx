import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { Button, Tooltip } from '@fluentui/react-components';
import { SlideTextFilled } from '@fluentui/react-icons';

export const Inverted = (): JSXElement => (
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
