import { ComponentMeta } from '@storybook/react';
import { ItemLayout } from '@fluentui/react-northstar';
import ItemLayoutExampleContent from '../../examples/components/ItemLayout/Content/ItemLayoutExampleContent.shorthand';
import ItemLayoutExampleContentMediaShorthand from '../../examples/components/ItemLayout/Content/ItemLayoutExampleContentMedia.shorthand';
import ItemLayoutExampleEndMediaShorthand from '../../examples/components/ItemLayout/Content/ItemLayoutExampleEndMedia.shorthand';
import ItemLayoutExampleHeader from '../../examples/components/ItemLayout/Content/ItemLayoutExampleHeader.shorthand';
import ItemLayoutExampleHeaderContentShorthand from '../../examples/components/ItemLayout/Content/ItemLayoutExampleHeaderContent.shorthand';
import ItemLayoutExampleHeaderMediaShorthand from '../../examples/components/ItemLayout/Content/ItemLayoutExampleHeaderMedia.shorthand';
import ItemLayoutExampleMediaShorthand from '../../examples/components/ItemLayout/Content/ItemLayoutExampleMedia.shorthand';
import ItemLayoutExampleRtlShorthand from '../../examples/components/ItemLayout/Rtl/ItemLayoutExample.rtl';
import ItemLayoutExampleShorthand from '../../examples/components/ItemLayout/Types/ItemLayoutExample.shorthand';
import ItemLayoutExampleSelectionShorthand from '../../examples/components/ItemLayout/Types/ItemLayoutExampleSelection.shorthand';

export default { component: ItemLayout, title: 'ItemLayout' } as ComponentMeta<typeof ItemLayout>;

export {
  ItemLayoutExampleContent,
  ItemLayoutExampleContentMediaShorthand,
  ItemLayoutExampleEndMediaShorthand,
  ItemLayoutExampleHeader,
  ItemLayoutExampleHeaderContentShorthand,
  ItemLayoutExampleHeaderMediaShorthand,
  ItemLayoutExampleMediaShorthand,
  ItemLayoutExampleRtlShorthand,
  ItemLayoutExampleShorthand,
  ItemLayoutExampleSelectionShorthand,
};
