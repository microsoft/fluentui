import * as React from 'react';
import { Avatar } from './Avatar';
import { StoryExample } from '../utils/StoryExample';

const imageUrl = 'http://www.fillmurray.com/192/192';

export const AvatarCss = () => (
  <StoryExample title="Avatar (css)">
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

    <Avatar size="smallest" name="John Doe" status="success" image={imageUrl} />
    <Avatar size="smaller" name="John Doe" status="success" image={imageUrl} />
    <Avatar size="small" name="John Doe" status="success" image={imageUrl} />
    <Avatar name="John Doe" status="success" image={imageUrl} />
    <Avatar size="large" name="Jane Doe" status="error" image={imageUrl} />
    <Avatar size="larger" name="Lorem Ipsum" status="warning" image={imageUrl} />
    <Avatar size="largest" name="Lorem Ipsum" status="warning" image={imageUrl} />
    <Avatar square size="smallest" name="John Doe" status="success" image={imageUrl} />
    <Avatar square size="smaller" name="John Doe" status="success" image={imageUrl} />
    <Avatar square size="small" name="John Doe" status="success" image={imageUrl} />
    <Avatar square name="John Doe" status="success" image={imageUrl} />
    <Avatar square size="large" name="Jane Doe" status="error" image={imageUrl} />
    <Avatar square size="larger" name="Lorem Ipsum" status="warning" image={imageUrl} />
    <Avatar square size="largest" name="Lorem Ipsum" status="warning" image={imageUrl} />
  </StoryExample>
);
