import type { Meta } from '@storybook/react';

import UseSafeZoneAreaDescription from './UseSafeZoneAreaDescription.md';
import { UseSafeZoneAreaDefault } from './UseSafeZoneAreaDefault.stories';

export { UseSafeZoneAreaDefault as Default } from './UseSafeZoneAreaDefault.stories';

export default {
  title: 'Utilities/Positioning/useSafeZoneArea',
  component: UseSafeZoneAreaDefault,
  parameters: {
    docs: {
      description: {
        component: UseSafeZoneAreaDescription,
      },
    },
  },
} satisfies Meta;
