import * as React from 'react';
import { Avatar } from '../index';

export const Badge = () => (
  <>
    <Avatar name="Lydia Bauer" badge={{ status: 'available', 'aria-label': 'available' }} />
    <Avatar name="Amanda Brady" badge={{ status: 'busy', 'aria-label': 'busy' }} />
    <Avatar name="Henry Brill" badge={{ status: 'outOfOffice', 'aria-label': 'out of office' }} />
    <Avatar name="Robin Counts" badge={{ status: 'away', 'aria-label': 'away' }} />
    <Avatar name="Tim Deboer" badge={{ status: 'offline', 'aria-label': 'offline' }} />
    <Avatar name="Cameron Evans" badge={{ status: 'doNotDisturb', 'aria-label': 'do not disturb' }} />
    <Avatar
      name="Mona Kane"
      badge={{ status: 'available', outOfOffice: true, 'aria-label': 'available out of office' }}
    />
    <Avatar name="Allan Munger" badge={{ status: 'busy', outOfOffice: true, 'aria-label': 'busy out of office' }} />
    <Avatar name="Erik Nason" badge={{ status: 'outOfOffice', outOfOffice: true, 'aria-label': 'out of office' }} />
    <Avatar name="Daisy Phillips" badge={{ status: 'away', outOfOffice: true, 'aria-label': 'away out of office' }} />
    <Avatar
      name="Kevin Sturgis"
      badge={{ status: 'offline', outOfOffice: true, 'aria-label': 'offline out of office' }}
    />
    <Avatar
      name="Elliot Woodward"
      badge={{ status: 'doNotDisturb', outOfOffice: true, 'aria-label': 'do not disturb out of office' }}
    />
  </>
);

Badge.parameters = {
  docs: {
    description: {
      story: 'An avatar can have a badge to indicate presence status. See the PresenceBadge component for more info.',
    },
  },
};
