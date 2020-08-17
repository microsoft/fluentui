import * as React from 'react';
import { Avatar } from './Avatar';
import { AvatarProps } from './Avatar.types';
import { StoryExample } from '../utils/StoryExample';
import { mergeProps } from '@fluentui/react-compose/lib/next/index';
import { RobotIcon } from '@fluentui/react-icons';

const imageUrl = 'http://www.fillmurray.com/192/192';

export const AvatarExamples = () => (
  <div>
    <StoryExample title="Round with initials">
      <Avatar size={20} name="John Doe" status="success" />
      <Avatar size={24} name="John Doe" status="success" />
      <Avatar size={28} name="John Doe" status="success" />
      <Avatar name="John Doe" status="success" />
      <Avatar size={48} name="Jane Doe" status="error" />
      <Avatar size={64} name="Lorem Ipsum" status="warning" />
      <Avatar size={96} name="Lorem Ipsum" status="warning" />
      <Avatar size={128} name="Lorem Ipsum" status="warning" />
    </StoryExample>
    <StoryExample title="Square with initials">
      <Avatar square size={20} name="John Doe" status="success" />
      <Avatar square size={24} name="John Doe" status="success" />
      <Avatar square size={28} name="John Doe" status="success" />
      <Avatar square name="John Doe" status="success" />
      <Avatar square size={48} name="Jane Doe" status="error" />
      <Avatar square size={64} name="Lorem Ipsum" status="warning" />
      <Avatar square size={96} name="Lorem Ipsum" status="warning" />
      <Avatar square size={128} name="Lorem Ipsum" status="warning" />
    </StoryExample>
    <StoryExample title="Round with image">
      <Avatar size={20} name="John Doe" status="success" image={imageUrl} />
      <Avatar size={24} name="John Doe" status="success" image={imageUrl} />
      <Avatar size={28} name="John Doe" status="success" image={imageUrl} />
      <Avatar name="John Doe" status="success" image={imageUrl} />
      <Avatar size={48} name="Jane Doe" status="error" image={imageUrl} />
      <Avatar size={64} name="Lorem Ipsum" status="warning" image={imageUrl} />
      <Avatar size={96} name="Lorem Ipsum" status="warning" image={imageUrl} />
      <Avatar size={128} name="Lorem Ipsum" status="warning" image={imageUrl} />
    </StoryExample>
    <StoryExample title="Square with image">
      <Avatar square size={20} name="John Doe" status="success" image={imageUrl} />
      <Avatar square size={24} name="John Doe" status="success" image={imageUrl} />
      <Avatar square size={28} name="John Doe" status="success" image={imageUrl} />
      <Avatar square name="John Doe" status="success" image={imageUrl} />
      <Avatar square size={48} name="Jane Doe" status="error" image={imageUrl} />
      <Avatar square size={64} name="Lorem Ipsum" status="warning" image={imageUrl} />
      <Avatar square size={96} name="Lorem Ipsum" status="warning" image={imageUrl} />
      <Avatar square size={128} name="Lorem Ipsum" status="warning" image={imageUrl} />
    </StoryExample>
    <StoryExample title="Custom Shape">
      <RobotAvatar size={20} name="Mr. Robot" status="success" />
      <RobotAvatar size={24} name="Mr. Robot" status="success" />
      <RobotAvatar size={28} name="Mr. Robot" status="success" />
      <RobotAvatar size={32} name="Mr. Robot" status="success" />
      <RobotAvatar size={48} name="Mr. Robot" status="success" />
      <RobotAvatar size={64} name="Mr. Robot" status="success" />
      <RobotAvatar size={96} name="Mr. Robot" status="success" />
      <RobotAvatar size={128} name="Mr. Robot" status="success" />
    </StoryExample>
    <StoryExample title="Custom Size">
      <Avatar name="Custom Size" status="success" tokens={{ size: '17px' }} />
      <Avatar name="Custom Size" status="success" tokens={{ size: '42px' }} />
      <Avatar name="Custom Size" status="success" tokens={{ size: '55px' }} />
      <Avatar name="Custom Size" status="success" tokens={{ size: '100px' }} />
      <Avatar name="Custom Size" status="success" tokens={{ size: '200px' }} />
    </StoryExample>
  </div>
);

const RobotAvatar = React.forwardRef((props: AvatarProps, ref: React.Ref<HTMLElement>) => {
  return (
    <Avatar
      {...mergeProps(
        {
          image: {
            as: RobotIcon,
            style: {
              top: 'calc(var(--avatar-size) * 0.10)',
              left: 'calc(var(--avatar-size) * 0.15)',
              width: 'calc(var(--avatar-size) * 0.75)',
              height: 'calc(var(--avatar-size) * 0.75)',
            },
          },
          label: {
            children: null,
            style: {
              clipPath: 'polygon(25% 6.7%, 75% 6.7%, 100% 50%, 75% 93.3%, 25% 93.3%, 0% 50%)',
            },
          },
        },
        props,
      )}
    />
  );
});
