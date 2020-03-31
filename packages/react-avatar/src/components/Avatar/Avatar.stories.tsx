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

export const BasicAvatar = () => (
  <Provider theme={themes.teams}>
    <Header>Avatar (fela)</Header>
    <Flex column gap="gap.small">
      <Flex gap="gap.small">
        <FUIAvatar size="smallest" name="John Doe" status="success" image="http://www.fillmurray.com/200/200" />
        <FUIAvatar size="smaller" name="John Doe" status="success" image="http://www.fillmurray.com/200/200" />
        <FUIAvatar size="small" name="John Doe" status="success" image="http://www.fillmurray.com/200/200" />
        <FUIAvatar name="John Doe" status="success" image="http://www.fillmurray.com/200/200" />
        <FUIAvatar size="large" name="Jane Doe" status="error" />
        <FUIAvatar size="larger" name="Lorem Ipsum" status="warning" />
        <FUIAvatar size="largest" name="Lorem Ipsum" status="warning" />
        <FUIAvatar square size="smallest" name="John Doe" status="success" image="http://www.fillmurray.com/200/200" />
        <FUIAvatar square size="smaller" name="John Doe" status="success" image="http://www.fillmurray.com/200/200" />
        <FUIAvatar square size="small" name="John Doe" status="success" image="http://www.fillmurray.com/200/200" />
        <FUIAvatar square name="John Doe" status="success" image="http://www.fillmurray.com/200/200" />
        <FUIAvatar square size="large" name="Jane Doe" status="error" />
        <FUIAvatar square size="larger" name="Lorem Ipsum" status="warning" />
        <FUIAvatar square size="largest" name="Lorem Ipsum" status="warning" />
      </Flex>

      <Header>Avatar (css)</Header>
      <Flex gap="gap.small">
        <Avatar size="smallest" name="John Doe" status="success" image="http://www.fillmurray.com/200/200" />
        <Avatar size="smaller" name="John Doe" status="success" image="http://www.fillmurray.com/200/200" />
        <Avatar size="small" name="John Doe" status="success" image="http://www.fillmurray.com/200/200" />
        <Avatar name="John Doe" status="success" image="http://www.fillmurray.com/200/200" />
        <Avatar size="large" name="Jane Doe" status="error" />
        <Avatar size="larger" name="Lorem Ipsum" status="warning" />
        <Avatar size="largest" name="Lorem Ipsum" status="warning" />
        <Avatar square size="smallest" name="John Doe" status="success" image="http://www.fillmurray.com/200/200" />
        <Avatar square size="smaller" name="John Doe" status="success" image="http://www.fillmurray.com/200/200" />
        <Avatar square size="small" name="John Doe" status="success" image="http://www.fillmurray.com/200/200" />
        <Avatar square name="John Doe" status="success" image="http://www.fillmurray.com/200/200" />
        <Avatar square size="large" name="Jane Doe" status="error" />
        <Avatar square size="larger" name="Lorem Ipsum" status="warning" />
        <Avatar square size="largest" name="Lorem Ipsum" status="warning" />
      </Flex>

      <Header>Status (fela)</Header>
      <Flex gap="gap.small">
        <FUIStatus size="smallest" state="error" />
        <FUIStatus size="smaller" state="info" />
        <FUIStatus size="small" state="success" />
        <FUIStatus />
        <FUIStatus size="large" state="warning" />
        <FUIStatus size="larger" />
        <FUIStatus size="largest" />
      </Flex>

      <Header>Status (css)</Header>
      <Flex gap="gap.small">
        <Status size="smallest" state="error" />
        <Status size="smaller" state="info" />
        <Status size="small" state="success" />
        <Status />
        <Status size="large" state="warning" />
        <Status size="larger" />
        <Status size="largest" />
      </Flex>
    </Flex>
  </Provider>
);
