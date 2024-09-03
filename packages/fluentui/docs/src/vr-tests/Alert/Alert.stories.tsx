import { Meta } from '@storybook/react';
import { Alert } from '@fluentui/react-northstar';
import AlertDefaultBsize from '../../examples/components/Alert/Performance/AlertDefault.bsize';
import AlertExampleRtl from '../../examples/components/Alert/Rtl/AlertExample.rtl';
import AlertExampleChildrenRtl from '../../examples/components/Alert/Rtl/AlertExampleChildren.rtl';
import AlertExampleDismissActionRtl from '../../examples/components/Alert/Rtl/AlertExampleDismissAction.rtl';
import AlertExampleDismissAction from '../../examples/components/Alert/Slots/AlertExampleActions.shorthand';
import AlertExampleHeader from '../../examples/components/Alert/Slots/AlertExampleHeader.shorthand';
import AlertExampleIcon from '../../examples/components/Alert/Slots/AlertExampleIcon.shorthand';
import AlertExample from '../../examples/components/Alert/Types/AlertExample.shorthand';
import AlertExampleDismissActions from '../../examples/components/Alert/Usage/AlertExampleDismissActions.shorthand';
import AlertExampleImportantMessage from '../../examples/components/Alert/Usage/AlertExampleImportantMessage.shorthand';
import AlertExampleWidth from '../../examples/components/Alert/Usage/AlertExampleWidth.shorthand';
import AlertExampleShorthand from '../../examples/components/Alert/Variations/AlertExampleAttached.shorthand';
import AlertExampleFitted from '../../examples/components/Alert/Variations/AlertExampleFitted.shorthand';
import AlertExampleSuccess from '../../examples/components/Alert/Variations/AlertExampleSuccess.shorthand';
import AlertExampleWarning from '../../examples/components/Alert/Variations/AlertExampleWarning.shorthand';

export default { component: Alert, title: 'Alert' } as Meta<typeof Alert>;

export {
  AlertDefaultBsize,
  AlertExampleRtl,
  AlertExampleChildrenRtl,
  AlertExampleDismissActionRtl,
  AlertExampleDismissAction,
  AlertExampleHeader,
  AlertExampleIcon,
  AlertExample,
  AlertExampleDismissActions,
  AlertExampleImportantMessage,
  AlertExampleWidth,
  AlertExampleShorthand,
  AlertExampleFitted,
  AlertExampleSuccess,
  AlertExampleWarning,
};
