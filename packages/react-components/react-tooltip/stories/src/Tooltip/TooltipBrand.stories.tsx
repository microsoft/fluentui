import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { Button, Tooltip } from '@fluentui/react-components';
import { SlideTextFilled } from '@fluentui/react-icons';

export const Brand = (): JSXElement => (
  <Tooltip appearance="brand" content="Example brand tooltip" relationship="label">
    <Button icon={<SlideTextFilled />} size="large" />
  </Tooltip>
);

Brand.storyName = 'Appearance: brand';
Brand.parameters = {
  docs: {
    description: {
      story: "The `appearance` prop can be set to `brand` to use the theme's brand colors.",
    },
  },
};
