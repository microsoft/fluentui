import type { Meta } from '@storybook/react';
import CreateMotionComponentVariantDescription from './CreateMotionComponentVariantDescription.md';
import { CreateMotionComponentVariantDefault } from './CreateMotionComponentVariantDefault.stories';
export { CreateMotionComponentVariantDefault as Default } from './CreateMotionComponentVariantDefault.stories';

export default {
  title: 'Motion/APIs/createMotionComponentVariant',
  component: CreateMotionComponentVariantDefault,
  parameters: {
    docs: {
      description: {
        component: CreateMotionComponentVariantDescription,
      },
    },
  },
} satisfies Meta;
