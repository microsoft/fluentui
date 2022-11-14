import * as React from 'react';
import {
  BriefcaseRegular,
  CalendarLtrRegular,
  ConferenceRoomRegular,
  GuestRegular,
  PeopleRegular,
  PeopleTeamRegular,
  PersonCallRegular,
} from '@fluentui/react-icons';

import { Avatar } from '@fluentui/react-components';

export const Icon = () => (
  <>
    <Avatar icon={<GuestRegular />} aria-label="Guest" />
    <Avatar icon={<PeopleRegular />} aria-label="Group" />
    <Avatar icon={<PeopleTeamRegular />} shape="square" aria-label="Team" />
    <Avatar icon={<PersonCallRegular />} aria-label="Phone Contact" />
    <Avatar icon={<CalendarLtrRegular />} aria-label="Meeting" />
    <Avatar icon={<BriefcaseRegular />} shape="square" aria-label="Tenant" />
    <Avatar icon={<ConferenceRoomRegular />} shape="square" aria-label="Room" />
  </>
);

Icon.parameters = {
  docs: {
    description: {
      story: 'An avatar can display an icon. The icon will only be shown when there is no image or initials available.',
    },
  },
};
