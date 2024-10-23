import * as React from 'react';
import { StoryWright, Steps } from 'storywright';
import { Meta } from '@storybook/react';
import { Tooltip, buttonClassName, dialogSlotClassNames } from '@fluentui/react-northstar';
import TooltipExampleDialogContentShorthand from '../../examples/components/Tooltip/Usage/TooltipExampleDialogContent.shorthand';

export default {
  component: Tooltip,
  title: 'Tooltip',
  decorators: [
    story => (
      <StoryWright
        steps={new Steps()
          .click(`.${buttonClassName}`)
          .hover(`.${dialogSlotClassNames.content} .${buttonClassName}`)
          .snapshot('Shows tooltip in a dialog')
          .end()}
      >
        {story()}
      </StoryWright>
    ),
  ],
} as Meta<typeof Tooltip>;

export { TooltipExampleDialogContentShorthand };
