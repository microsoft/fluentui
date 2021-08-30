import * as React from 'react';
import { PresenceBadgeProps, PresenceBadgeStatus } from './components/PresenceBadge/PresenceBadge.types';
import { PresenceBadge } from './index';

const Template = (args: PresenceBadgeProps) => <PresenceBadge {...args} />;
Template.args = {} as PresenceBadgeProps;

export const {
  busy: Busy,
  available: Available,
  away: Away,
  doNotDisturb: DoNotDisturb,
  offline: Offline,
  outOfOffice: OutOfOffice,
} = (['busy', 'available', 'away', 'doNotDisturb', 'offline', 'outOfOffice'] as PresenceBadgeStatus[]).reduce(
  (acc, curr) => {
    acc[curr] = Template.bind({});
    acc[curr].args = {
      status: curr,
    };
    return acc;
  },
  {} as Record<PresenceBadgeStatus, typeof Template>,
);

export default {
  title: 'Components/Badge/Presence Badges',
  component: PresenceBadge,
  parameters: {
    docs: {
      description: {
        component: 'Presence represents someone’s availability',
      },
    },
  },
};
