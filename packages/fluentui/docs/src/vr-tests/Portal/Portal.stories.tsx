// eslint-disable-next-line import/no-extraneous-dependencies
import { ComponentMeta } from '@storybook/react';
import { Portal } from '@fluentui/react-northstar';
import PortalExampleOpen from '../../examples/components/Portal/State/PortalExampleOpen';
import PortalExamplePortal from '../../examples/components/Portal/Types/PortalExample.shorthand';
import PortalExampleFocusTrapped from '../../examples/components/Portal/Types/PortalExampleFocusTrapped.shorthand';

export default { component: Portal, title: 'Portal' } as ComponentMeta<typeof Portal>;

export { PortalExampleOpen, PortalExamplePortal, PortalExampleFocusTrapped };
