import * as React from 'react';
import { Avatar } from './index';

export const Badge = () => (
  <>
    <Avatar name="Lydia Bauer" badge={{ status: 'available' }} />
    <Avatar name="Amanda Brady" badge={{ status: 'busy' }} />
    <Avatar name="Henry Brill" badge={{ status: 'outOfOffice' }} />
    <Avatar name="Robin Counts" badge={{ status: 'away' }} />
    <Avatar name="Tim Deboer" badge={{ status: 'offline' }} />
    <Avatar name="Cameron Evans" badge={{ status: 'doNotDisturb' }} />
    <Avatar name="Mona Kane" badge={{ status: 'available', outOfOffice: true }} />
    <Avatar name="Allan Munger" badge={{ status: 'busy', outOfOffice: true }} />
    <Avatar name="Erik Nason" badge={{ status: 'outOfOffice', outOfOffice: true }} />
    <Avatar name="Daisy Phillips" badge={{ status: 'away', outOfOffice: true }} />
    <Avatar name="Kevin Sturgis" badge={{ status: 'offline', outOfOffice: true }} />
    <Avatar name="Elliot Woodward" badge={{ status: 'doNotDisturb', outOfOffice: true }} />
  </>
);

Badge.parameters = {
  docs: {
    description: {
      story: 'An avatar can have a badge to indicate presence status. See the PresenceBadge component for more info.',
    },
  },
};
