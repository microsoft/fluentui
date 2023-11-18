import { ComponentMeta } from '@storybook/react';
import { SplitButton } from '@fluentui/react-northstar';
import SplitButtonIconAndContentExampleShorthand from '../../examples/components/SplitButton/Slots/SplitButtonIconAndContentExample.shorthand';
import SplitButtonExampleToggleButtonShorthand from '../../examples/components/SplitButton/Slots/SplitButtonToggleButtonExample.shorthand';
import SplitButtonExampleDisabledShorthand from '../../examples/components/SplitButton/States/SplitButtonExampleDisabled.shorthand';
import SplitButtonExampleShorthand from '../../examples/components/SplitButton/Types/SplitButtonExample.shorthand';
import SplitButtonExampleFlat from '../../examples/components/SplitButton/Types/SplitButtonExampleFlat.shorthand';
import SplitButtonExampleSmallShorthand from '../../examples/components/SplitButton/Types/SplitButtonExampleSmall.shorthand';
import SplitButtonMainOptionChangeExample from '../../examples/components/SplitButton/Usage/SplitButtonMainOptionChangeExample.shorthand';

export default { component: SplitButton, title: 'SplitButton' } as ComponentMeta<typeof SplitButton>;

export {
  SplitButtonIconAndContentExampleShorthand,
  SplitButtonExampleToggleButtonShorthand,
  SplitButtonExampleDisabledShorthand,
  SplitButtonExampleShorthand,
  SplitButtonExampleFlat,
  SplitButtonExampleSmallShorthand,
  SplitButtonMainOptionChangeExample,
};
