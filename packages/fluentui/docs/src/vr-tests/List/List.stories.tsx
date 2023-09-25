import { ComponentMeta } from '@storybook/react';
import { List } from '@fluentui/react-northstar';
import ListExample from '../../examples/components/List/Content/ListExampleContent.shorthand';
import ListExampleMediaShorthand from '../../examples/components/List/Content/ListExampleMedia.shorthand';
import ListExampleMedia from '../../examples/components/List/Content/ListExampleMedia';
import ListExampleRtl from '../../examples/components/List/Rtl/ListExample.rtl';
import ListExampleSelectable from '../../examples/components/List/Types/ListExample.shorthand';
import ListExampleNavigable from '../../examples/components/List/Types/ListExampleNavigable';
import SelectableListControlledExample from '../../examples/components/List/Types/ListExampleSelectableControlled.shorthand';

export default { component: List, title: 'List' } as ComponentMeta<typeof List>;

export {
  ListExample,
  ListExampleMediaShorthand,
  ListExampleMedia,
  ListExampleRtl,
  ListExampleSelectable,
  ListExampleNavigable,
  SelectableListControlledExample,
};
