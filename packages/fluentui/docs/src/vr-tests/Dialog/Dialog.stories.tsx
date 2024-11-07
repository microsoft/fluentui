import { Meta } from '@storybook/react';
import { Dialog } from '@fluentui/react-northstar';
import DialogExample from '../../examples/components/Dialog/Types/DialogExample.shorthand';
import DialogExampleCallbacks from '../../examples/components/Dialog/Usage/DialogExampleCallbacks.shorthand';

export default { component: Dialog, title: 'Dialog' } as Meta<typeof Dialog>;

export { DialogExample, DialogExampleCallbacks };
