import { ComponentMeta } from '@storybook/react';
import { Tooltip } from '@fluentui/react-northstar';
import TooltipOpenExample from '../../examples/components/Tooltip/States/TooltipOpenControlledExample.shorthand';
import TooltipExample from '../../examples/components/Tooltip/Types/TooltipExample';
import TooltipExamplePointing from '../../examples/components/Tooltip/Types/TooltipExamplePointing';
import TooltipExampleDisabledTrigger from '../../examples/components/Tooltip/Usage/TooltipExampleDisabledTrigger.shorthand';
import TooltipExampleDismissOnContentMouseEnter from '../../examples/components/Tooltip/Usage/TooltipExampleDismissOnContentMouseEnter';
import TooltipExampleTarget from '../../examples/components/Tooltip/Usage/TooltipExampleTarget';
import TooltipExamplePosition from '../../examples/components/Tooltip/Variations/TooltipExamplePosition.shorthand';
import TooltipExamplePointerMargin from '../../examples/components/Tooltip/Visual/TooltipExamplePointerMargin.shorthand';

export default { component: Tooltip, title: 'Tooltip' } as ComponentMeta<typeof Tooltip>;

export {
  TooltipOpenExample,
  TooltipExample,
  TooltipExamplePointing,
  TooltipExampleDisabledTrigger,
  TooltipExampleDismissOnContentMouseEnter,
  TooltipExampleTarget,
  TooltipExamplePosition,
  TooltipExamplePointerMargin,
};
