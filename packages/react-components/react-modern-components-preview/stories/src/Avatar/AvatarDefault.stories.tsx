import type { ArgTypes } from '@storybook/react-webpack5';
import * as React from 'react';
import { Avatar } from '@fluentui/react-modern-components-preview/avatar';
import type { AvatarProps } from '@fluentui/react-modern-components-preview/avatar';

export const Default = (props: Partial<AvatarProps>): React.ReactNode => <Avatar aria-label="Guest" {...props} />;

const argTypes: ArgTypes = {
  initials: {
    control: {
      type: 'text',
    },
  },
  badge: {
    control: {
      type: 'inline-radio',
      options: [{ status: 'away' }, { status: 'busy' }],
    },
  },
  size: {
    control: {
      type: 'select',
      options: [16, 20, 24, 28, 32, 36, 40, 48, 56, 64, 72, 96, 120, 128],
    },
  },
  name: {
    control: {
      type: 'text',
    },
  },
};

Default.argTypes = argTypes;
