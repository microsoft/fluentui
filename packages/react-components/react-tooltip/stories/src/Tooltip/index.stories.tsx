import * as React from 'react';
import { Meta } from '@storybook/react';
import { Tooltip } from '@fluentui/react-components';
import descriptionMd from './TooltipDescription.md';
export { Default } from './TooltipDefault.stories';
export { RelationshipLabel } from './TooltipRelationshipLabel.stories';
export { RelationshipDescription } from './TooltipRelationshipDescription.stories';
export { Inverted } from './TooltipInverted.stories';
export { WithArrow } from './TooltipWithArrow.stories';
export { Styled } from './TooltipStyled.stories';
export { CustomMount } from './TooltipCustomMount.stories';
export { Controlled } from './TooltipControlled.stories';
export { Positioning } from './TooltipPositioning.stories';
export { Target } from './TooltipTarget.stories';
export { Icon } from './TooltipIcon.stories';

export default {
  title: 'Components/Tooltip',
  component: Tooltip,
  parameters: {
    docs: {
      description: {
        component: [descriptionMd].join('\n'),
      },
    },
  },
  decorators: [
    Story => (
      <div
        style={{
          display: 'flex',
          alignItems: 'flex-start',
          gap: '4px',
          flexDirection: 'row',
          margin: '16px 0',
        }}
      >
        <Story />
      </div>
    ),
  ],
} as Meta;
