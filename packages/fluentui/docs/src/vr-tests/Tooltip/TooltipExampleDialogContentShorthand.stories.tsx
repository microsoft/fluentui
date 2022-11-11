import * as React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import Screener, { Steps } from 'screener-storybook/src/screener';
// eslint-disable-next-line import/no-extraneous-dependencies
import { ComponentMeta } from '@storybook/react';
import { Tooltip, buttonClassName, dialogSlotClassNames } from '@fluentui/react-northstar';
import TooltipExampleDialogContentShorthand from '../../examples/components/Tooltip/Usage/TooltipExampleDialogContent.shorthand';

export default {
  component: Tooltip,
  title: 'Tooltip',
  decorators: [
    story => (
      <Screener
        steps={new Steps()
          .click(`.${buttonClassName}`)
          .hover(`.${dialogSlotClassNames.content} .${buttonClassName}`)
          .snapshot('Shows tooltip in a dialog')
          .end()}
      >
        {story()}
      </Screener>
    ),
  ],
} as ComponentMeta<typeof Tooltip>;

export { TooltipExampleDialogContentShorthand };
