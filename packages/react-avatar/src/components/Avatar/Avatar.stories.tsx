import * as React from 'react';
import { Avatar } from './Avatar';
import { Status } from '../Status/Status';
import {
  Provider,
  themes,
  Header,
  Text,
  Avatar as FUIAvatar,
  Status as FUIStatus,
  Flex,
} from '@fluentui/react-northstar';

export const AvatarFela = () => (
  <Provider theme={themes.teams}>
    <Header>Avatar (fela)</Header>
    <Flex column gap="gap.small">
      <Flex gap="gap.small">
        <FUIAvatar size="smallest" name="John Doe" status="success" />
        <FUIAvatar size="smaller" name="John Doe" status="success" />
        <FUIAvatar size="small" name="John Doe" status="success" />
        <FUIAvatar name="John Doe" status="success" />
        <FUIAvatar size="large" name="Jane Doe" status="error" />
        <FUIAvatar size="larger" name="Lorem Ipsum" status="warning" />
        <FUIAvatar size="largest" name="Lorem Ipsum" status="warning" />
        <FUIAvatar square size="smallest" name="John Doe" status="success" />
        <FUIAvatar square size="smaller" name="John Doe" status="success" />
        <FUIAvatar square size="small" name="John Doe" status="success" />
        <FUIAvatar square name="John Doe" status="success" />
        <FUIAvatar square size="large" name="Jane Doe" status="error" />
        <FUIAvatar square size="larger" name="Lorem Ipsum" status="warning" />
        <FUIAvatar square size="largest" name="Lorem Ipsum" status="warning" />
      </Flex>
      <Flex gap="gap.small">
        <FUIAvatar size="smallest" name="John Doe" status="success" image="http://www.fillmurray.com/200/200" />
        <FUIAvatar size="smaller" name="John Doe" status="success" image="http://www.fillmurray.com/200/200" />
        <FUIAvatar size="small" name="John Doe" status="success" image="http://www.fillmurray.com/200/200" />
        <FUIAvatar name="John Doe" status="success" image="http://www.fillmurray.com/200/200" />
        <FUIAvatar size="large" name="Jane Doe" status="error" image="http://www.fillmurray.com/200/200" />
        <FUIAvatar size="larger" name="Lorem Ipsum" status="warning" image="http://www.fillmurray.com/200/200" />
        <FUIAvatar size="largest" name="Lorem Ipsum" status="warning" image="http://www.fillmurray.com/200/200" />
        <FUIAvatar square size="smallest" name="John Doe" status="success" image="http://www.fillmurray.com/200/200" />
        <FUIAvatar square size="smaller" name="John Doe" status="success" image="http://www.fillmurray.com/200/200" />
        <FUIAvatar square size="small" name="John Doe" status="success" image="http://www.fillmurray.com/200/200" />
        <FUIAvatar square name="John Doe" status="success" image="http://www.fillmurray.com/200/200" />
        <FUIAvatar square size="large" name="Jane Doe" status="error" image="http://www.fillmurray.com/200/200" />
        <FUIAvatar square size="larger" name="Lorem Ipsum" status="warning" image="http://www.fillmurray.com/200/200" />
        <FUIAvatar
          square
          size="largest"
          name="Lorem Ipsum"
          status="warning"
          image="http://www.fillmurray.com/200/200"
        />
      </Flex>
    </Flex>
  </Provider>
);

export const AvatarCss = () => (
  <Provider theme={themes.teams}>
    <Header>Avatar (css)</Header>
    <Flex column gap="gap.small">
      <Flex gap="gap.small">
        <Avatar size="smallest" name="John Doe" status="success" />
        <Avatar size="smaller" name="John Doe" status="success" />
        <Avatar size="small" name="John Doe" status="success" />
        <Avatar name="John Doe" status="success" />
        <Avatar size="large" name="Jane Doe" status="error" />
        <Avatar size="larger" name="Lorem Ipsum" status="warning" />
        <Avatar size="largest" name="Lorem Ipsum" status="warning" />
        <Avatar square size="smallest" name="John Doe" status="success" />
        <Avatar square size="smaller" name="John Doe" status="success" />
        <Avatar square size="small" name="John Doe" status="success" />
        <Avatar square name="John Doe" status="success" />
        <Avatar square size="large" name="Jane Doe" status="error" />
        <Avatar square size="larger" name="Lorem Ipsum" status="warning" />
        <Avatar square size="largest" name="Lorem Ipsum" status="warning" />
      </Flex>
      <Flex gap="gap.small">
        <Avatar size="smallest" name="John Doe" status="success" image="http://www.fillmurray.com/200/200" />
        <Avatar size="smaller" name="John Doe" status="success" image="http://www.fillmurray.com/200/200" />
        <Avatar size="small" name="John Doe" status="success" image="http://www.fillmurray.com/200/200" />
        <Avatar name="John Doe" status="success" image="http://www.fillmurray.com/200/200" />
        <Avatar size="large" name="Jane Doe" status="error" image="http://www.fillmurray.com/200/200" />
        <Avatar size="larger" name="Lorem Ipsum" status="warning" image="http://www.fillmurray.com/200/200" />
        <Avatar size="largest" name="Lorem Ipsum" status="warning" image="http://www.fillmurray.com/200/200" />
        <Avatar square size="smallest" name="John Doe" status="success" image="http://www.fillmurray.com/200/200" />
        <Avatar square size="smaller" name="John Doe" status="success" image="http://www.fillmurray.com/200/200" />
        <Avatar square size="small" name="John Doe" status="success" image="http://www.fillmurray.com/200/200" />
        <Avatar square name="John Doe" status="success" image="http://www.fillmurray.com/200/200" />
        <Avatar square size="large" name="Jane Doe" status="error" image="http://www.fillmurray.com/200/200" />
        <Avatar square size="larger" name="Lorem Ipsum" status="warning" image="http://www.fillmurray.com/200/200" />
        <Avatar square size="largest" name="Lorem Ipsum" status="warning" image="http://www.fillmurray.com/200/200" />
      </Flex>
    </Flex>
  </Provider>
);
