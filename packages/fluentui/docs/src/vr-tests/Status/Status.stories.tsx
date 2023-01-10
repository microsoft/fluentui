import { ComponentMeta } from '@storybook/react';
import { Status } from '@fluentui/react-northstar';
import StatusExampleShorthand from '../../examples/components/Status/Types/StatusExample.shorthand';
import StatusColorExampleShorthand from '../../examples/components/Status/Variations/StatusColorExample.shorthand';
import StatusCustomExampleShorthand from '../../examples/components/Status/Variations/StatusCustomExample.shorthand';
import StatusIconExampleShorthand from '../../examples/components/Status/Variations/StatusIconExample.shorthand';
import StatusSizeExampleShorthand from '../../examples/components/Status/Variations/StatusSizeExample.shorthand';

export default { component: Status, title: 'Status' } as ComponentMeta<typeof Status>;

export {
  StatusExampleShorthand,
  StatusColorExampleShorthand,
  StatusCustomExampleShorthand,
  StatusIconExampleShorthand,
  StatusSizeExampleShorthand,
};
