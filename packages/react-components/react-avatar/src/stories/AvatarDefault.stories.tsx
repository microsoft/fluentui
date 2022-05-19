import { ArgTypes } from '@storybook/api';
import * as React from 'react';
import { Avatar, AvatarProps } from '../index';

export const Default = (props: Partial<AvatarProps>) => <Avatar {...props} />;

const argTypes: ArgTypes = {
  initials: {
    control: 'text',
    type: 'string',
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
      control: 'text',
      type: 'string',
    },
  },
};

Default.argTypes = argTypes;
