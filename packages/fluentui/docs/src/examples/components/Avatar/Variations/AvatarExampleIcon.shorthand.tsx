import * as React from 'react';
import { Avatar } from '@fluentui/react-northstar';
import { CalendarIcon } from '@fluentui/react-icons-northstar';

const AvatarExampleIconShorthand = () => (
  <>
    <Avatar icon={<CalendarIcon />} />
    &emsp;
    <Avatar icon={<CalendarIcon />} square />
  </>
);

export default AvatarExampleIconShorthand;
