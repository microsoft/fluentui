import { Menu } from '../index';

import descriptionMd from './MenuDescription.md';
import bestPracticesMd from './MenuBestPractices.md';
export { Default } from './MenuDefault.stories';
export { Interaction } from './MenuInteraction.stories';
export { MenuItemsWithIcons } from './MenuMenuItemsWithIcons.stories';
export { AligningWithIcons } from './MenuAligningWithIcons.stories';
export { AligningWithSelectableItems } from './MenuAligningWithSelectableItems.stories';
export { SecondaryContentForMenuItems } from './MenuSecondaryContentForMenuItems.stories';
export { ControllingOpenAndClose } from './MenuControllingOpenAndClose.stories';
export { GrouppingItems } from './MenuGrouppingItems.stories';
export { VisualDividerOnly } from './MenuVisualDividerOnly.stories';
export { CheckboxItems } from './MenuCheckboxItems.stories';
export { RadioItems } from './MenuRadioItems.stories';
export { ControlledCheckboxItems } from './MenuControlledCheckboxItems.stories';
export { ControlledRadioItems } from './MenuControlledRadioItems.stories';
export { SelectionGroup } from './MenuSelectionGroup.stories';
export { NestedSubmenus } from './MenuNestedSubmenus.stories';
export { NestedSubmenusControlled } from './MenuNestedSubmenusControlled.stories';
export { AnchorToCustomTarget } from './MenuAnchorToTarget.stories';
export { CustomTrigger } from './MenuCustomTrigger.stories';
export { RenderFunctionTrigger } from './MenuRenderFunctionTrigger.stories';
export { MemoizedMenuItems } from './MenuMemoizedMenuItems.stories';
export { SplitMenuItem } from './MenuSplitMenuItem.stories';
export { MenuTriggerWithTooltip } from './MenuTriggerWithTooltip.stories';

export default {
  title: 'Components/Menu',
  component: Menu,
  parameters: {
    docs: {
      description: {
        component: [descriptionMd, bestPracticesMd].join('\n'),
      },
    },
  },
};
