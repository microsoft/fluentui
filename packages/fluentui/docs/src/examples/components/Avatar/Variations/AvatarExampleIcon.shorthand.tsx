import * as React from 'react';
import { Avatar } from '@fluentui/react';

const AvatarExampleIconShorthand = () => (
  <>
    <Avatar icon="calendar" />
    &emsp;
    <Avatar icon={{ name: 'calendar', outline: true }} square />
  </>
);

export default AvatarExampleIconShorthand;
