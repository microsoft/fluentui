// eslint-disable-next-line import/no-extraneous-dependencies
import { ComponentMeta } from '@storybook/react';
import { Ref } from '@fluentui/react-northstar';
import RefExample from '../../examples/components/Ref/Types/RefExample.shorthand';
import RefForwardingExample from '../../examples/components/Ref/Types/RefForwardingExample.shorthand';

export default { component: Ref, title: 'Ref' } as ComponentMeta<typeof Ref>;

export { RefExample, RefForwardingExample };
