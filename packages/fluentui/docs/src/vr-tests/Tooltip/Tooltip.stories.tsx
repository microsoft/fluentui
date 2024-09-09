import { Meta } from '@storybook/react';
import { Tooltip } from '@fluentui/react-northstar';
import TooltipOpenExample from '../../examples/components/Tooltip/States/TooltipOpenControlledExample.shorthand';

import TooltipExampleDisabledTrigger from '../../examples/components/Tooltip/Usage/TooltipExampleDisabledTrigger.shorthand';
import TooltipExampleDismissOnContentMouseEnter from '../../examples/components/Tooltip/Usage/TooltipExampleDismissOnContentMouseEnter';

import TooltipExamplePosition from '../../examples/components/Tooltip/Variations/TooltipExamplePosition.shorthand';
import TooltipExamplePointerMargin from '../../examples/components/Tooltip/Visual/TooltipExamplePointerMargin.shorthand';

export default { component: Tooltip, title: 'Tooltip' } as Meta<typeof Tooltip>;

export {
  TooltipOpenExample,
  TooltipExampleDisabledTrigger,
  TooltipExampleDismissOnContentMouseEnter,
  TooltipExamplePosition,
  TooltipExamplePointerMargin,
};
