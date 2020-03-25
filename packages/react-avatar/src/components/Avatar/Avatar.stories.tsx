import * as React from 'react';
import { Avatar } from './Avatar';
import { Provider, themes } from '@fluentui/react-northstar';

export const BasicAvatar = () => (
  <Provider theme={themes.teams}>
    <Avatar size="small" name="John Doe" status="success" image="http://www.fillmurray.com/200/200" />
    <Avatar size="large" name="Jane Doe" status="error" />
    <Avatar size="larger" name="Lorem Ipsum" status="warning" />
  </Provider>
);
