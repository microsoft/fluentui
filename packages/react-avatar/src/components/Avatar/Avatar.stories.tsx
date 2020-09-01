import * as React from 'react';
import { Avatar } from './Avatar';
import { AvatarProps, CustomAvatarSize } from './Avatar.types';
import { StoryExample } from '../utils/StoryExample';
import {
  GroupIcon,
  CatIcon,
  IDBadgeIcon,
  CalendarIcon,
  TelemarketerIcon,
  RoomIcon,
  RobotIcon,
  ChatBotIcon,
  SkypeClockIcon,
  SkypeCheckIcon,
  SkypeMinusIcon,
  SkypeArrowIcon,
} from '@fluentui/react-icons';

const imageUrl = 'http://www.fillmurray.com/192/192';

export const AvatarExamples = () => (
  <>
    <StoryExample title="Icon">
      <Avatar size={20} icon={<CatIcon />} badge="success" />
      <Avatar size={24} icon={<CalendarIcon />} badge="warning" />
      <Avatar size={28} icon={<RoomIcon />} badge="error" square />
      <Avatar badge="success" />
      <Avatar size={48} icon={<TelemarketerIcon />} name="(206) 555-0123" badge="info" />
      <Avatar size={64} icon={<IDBadgeIcon />} badge="error" />
      <Avatar size={96} icon={<GroupIcon />} badge="warning" square />
      {/* display="icon" should override the initials and image even if available */}
      <Avatar size={128} name="Lorem Ipsum" image={imageUrl} display="icon" />
    </StoryExample>
    <StoryExample title="Badge icon">
      <Avatar size={20} badge={{ state: 'success', icon: { as: SkypeCheckIcon } }} />
      <Avatar size={24} badge={{ state: 'warning', icon: { as: SkypeClockIcon } }} square />
      <Avatar size={28} badge={{ state: 'error', icon: { as: SkypeMinusIcon } }} />
      <Avatar badge={{ state: 'success', icon: { as: SkypeCheckIcon } }} square />
      <Avatar size={48} badge={{ state: 'info', icon: { as: SkypeArrowIcon } }} />
      <Avatar size={64} badge={{ state: 'error', icon: { as: SkypeMinusIcon } }} square />
      <Avatar size={96} badge={{ state: 'warning', icon: { as: SkypeClockIcon } }} />
      <Avatar size={128} badge={{ state: 'success', icon: { as: SkypeCheckIcon } }} square />
    </StoryExample>
    <StoryExample title="Initials (round)">
      <Avatar size={20} name="John Doe" badge="success" />
      <Avatar size={24} name="John Doe" badge="warning" />
      <Avatar size={28} name="John Doe" badge="error" />
      <Avatar name="John Doe" badge="success" />
      <Avatar size={48} name="Jane Doe" badge="info" />
      <Avatar size={64} name="Lorem Ipsum" badge="error" />
      <Avatar size={96} name="Lorem Ipsum" badge="warning" />
      {/* display="label" should override the image even if available */}
      <Avatar size={128} name="Lorem Ipsum" image={imageUrl} display="label" />
    </StoryExample>
    <StoryExample title="Initials (square)">
      <Avatar square size={20} name="John Doe" badge="success" />
      <Avatar square size={24} name="John Doe" badge="warning" />
      <Avatar square size={28} name="John Doe" badge="error" />
      <Avatar square name="John Doe" badge="success" />
      <Avatar square size={48} name="Jane Doe" badge="info" />
      <Avatar square size={64} name="Lorem Ipsum" badge="error" />
      <Avatar square size={96} name="Lorem Ipsum" badge="warning" />
      <Avatar square size={128} name="Lorem Ipsum" />
    </StoryExample>
    <StoryExample title="Image (round)">
      <Avatar size={20} name="John Doe" badge="success" image={imageUrl} />
      <Avatar size={24} name="John Doe" badge="warning" image={imageUrl} />
      <Avatar size={28} name="John Doe" badge="error" image={imageUrl} />
      <Avatar name="John Doe" badge="success" image={imageUrl} />
      <Avatar size={48} name="Jane Doe" badge="info" image={imageUrl} />
      <Avatar size={64} name="Lorem Ipsum" badge="error" image={imageUrl} />
      <Avatar size={96} name="Lorem Ipsum" badge="warning" image={imageUrl} />
      <Avatar size={128} name="Lorem Ipsum" image={imageUrl} />
    </StoryExample>
    <StoryExample title="Image (square)">
      <Avatar square size={20} name="John Doe" image={imageUrl} badge="success" />
      <Avatar square size={24} name="John Doe" image={imageUrl} badge="warning" />
      <Avatar square size={28} name="John Doe" image={imageUrl} badge="error" />
      <Avatar square name="John Doe" image={imageUrl} badge="success" />
      <Avatar square size={48} name="Jane Doe" image={imageUrl} badge="info" />
      <Avatar square size={64} name="Lorem Ipsum" image={imageUrl} badge="error" />
      <Avatar square size={96} name="Lorem Ipsum" image={imageUrl} badge="warning" />
      <Avatar square size={128} name="Lorem Ipsum" image={imageUrl} />
    </StoryExample>
    <StoryExample title="Custom Size">
      <Avatar name="Custom Size" badge="success" size={CustomAvatarSize(17)} />
      <Avatar name="Custom Size" badge="warning" size={CustomAvatarSize(42)} />
      <Avatar name="Custom Size" badge="error" size={CustomAvatarSize(55)} />
      <Avatar name="Custom Size" badge="success" size={CustomAvatarSize(100)} />
      <Avatar name="Custom Size" badge="success" size={CustomAvatarSize(150)} />
    </StoryExample>
    <StoryExample title="Custom Shape">
      <RobotAvatar size={20} name="Mr. Robot" />
      <RobotAvatar size={24} name="Mr. Robot" />
      <RobotAvatar size={28} name="Mr. Robot" />
      <RobotAvatar size={32} name="Mr. Robot" />
      <RobotAvatar size={48} name="Mr. Robot" />
      <RobotAvatar size={64} name="Chat Bot" icon={<ChatBotIcon />} badge={{ tokens: { color: 'hotpink' } }} />
      <RobotAvatar size={96} name="Mr. Robot" />
      <RobotAvatar size={128} name="Mr. Robot" />
    </StoryExample>
  </>
);

const RobotAvatar = (props: AvatarProps) => (
  <Avatar
    icon={<RobotIcon />}
    display="icon"
    tokens={{ clipPath: 'polygon(25% 6.7%, 75% 6.7%, 100% 50%, 75% 93.3%, 25% 93.3%, 0% 50%)' }}
    {...props}
  />
);
