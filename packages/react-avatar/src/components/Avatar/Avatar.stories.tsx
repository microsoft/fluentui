import * as React from 'react';
import { Avatar } from './Avatar';
import { AvatarProps } from './Avatar.types';
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
} from '@fluentui/react-icons';

const imageUrl = 'http://www.fillmurray.com/192/192';

export const AvatarExamples = () => (
  <>
    <StoryExample title="With icon">
      <Avatar size={20} icon={<CatIcon />} badge="success" />
      <Avatar size={24} icon={<CalendarIcon />} badge="success" />
      <Avatar size={28} icon={<RoomIcon />} badge="success" square />
      <Avatar badge="success" />
      <Avatar size={48} icon={<TelemarketerIcon />} name="(206) 555-0123" badge="error" />
      <Avatar size={64} icon={<IDBadgeIcon />} badge="warning" />
      <Avatar size={96} icon={<GroupIcon />} badge="warning" square />
      <Avatar size={128} badge="warning" />
    </StoryExample>
    <StoryExample title="Round with initials">
      <Avatar size={20} name="John Doe" badge="success" />
      <Avatar size={24} name="John Doe" badge="success" />
      <Avatar size={28} name="John Doe" badge="success" />
      <Avatar name="John Doe" badge="success" />
      <Avatar size={48} name="Jane Doe" badge="error" />
      <Avatar size={64} name="Lorem Ipsum" badge="warning" />
      <Avatar size={96} name="Lorem Ipsum" badge="warning" />
      <Avatar size={128} name="Lorem Ipsum" badge="warning" />
    </StoryExample>
    <StoryExample title="Square with initials">
      <Avatar square size={20} name="John Doe" />
      <Avatar square size={24} name="John Doe" />
      <Avatar square size={28} name="John Doe" />
      <Avatar square name="John Doe" />
      <Avatar square size={48} name="Jane Doe" />
      <Avatar square size={64} name="Lorem Ipsum" />
      <Avatar square size={96} name="Lorem Ipsum" />
      <Avatar square size={128} name="Lorem Ipsum" />
    </StoryExample>
    <StoryExample title="Round with image">
      <Avatar size={20} name="John Doe" badge="success" image={imageUrl} />
      <Avatar size={24} name="John Doe" badge="success" image={imageUrl} />
      <Avatar size={28} name="John Doe" badge="success" image={imageUrl} />
      <Avatar name="John Doe" badge="success" image={imageUrl} />
      <Avatar size={48} name="Jane Doe" badge="error" image={imageUrl} />
      <Avatar size={64} name="Lorem Ipsum" badge="warning" image={imageUrl} />
      <Avatar size={96} name="Lorem Ipsum" badge="warning" image={imageUrl} />
      <Avatar size={128} name="Lorem Ipsum" badge="warning" image={imageUrl} />
    </StoryExample>
    <StoryExample title="Square with image">
      <Avatar square size={20} name="John Doe" image={imageUrl} />
      <Avatar square size={24} name="John Doe" image={imageUrl} />
      <Avatar square size={28} name="John Doe" image={imageUrl} />
      <Avatar square name="John Doe" image={imageUrl} />
      <Avatar square size={48} name="Jane Doe" image={imageUrl} />
      <Avatar square size={64} name="Lorem Ipsum" image={imageUrl} />
      <Avatar square size={96} name="Lorem Ipsum" image={imageUrl} />
      <Avatar square size={128} name="Lorem Ipsum" image={imageUrl} />
    </StoryExample>
    <StoryExample title="Custom Shape">
      <RobotAvatar size={20} name="Mr. Robot" />
      <RobotAvatar size={24} name="Mr. Robot" />
      <RobotAvatar size={28} name="Mr. Robot" />
      <RobotAvatar size={32} name="Mr. Robot" />
      <RobotAvatar size={48} name="Mr. Robot" />
      <RobotAvatar
        size={64}
        name="Chat Bot"
        icon={<ChatBotIcon />}
        badge={{ tokens: { backgroundColor: 'hotpink' } }}
      />
      <RobotAvatar size={96} name="Mr. Robot" />
      <RobotAvatar size={128} name="Mr. Robot" />
    </StoryExample>
    <StoryExample title="Custom Size">
      <Avatar name="Custom Size" badge={{ state: 'success', size: 'smallest' }} tokens={{ size: '17px' }} />
      <Avatar name="Custom Size" badge={{ state: 'success', size: 'small' }} tokens={{ size: '42px' }} />
      <Avatar name="Custom Size" badge={{ state: 'success', size: 'medium' }} tokens={{ size: '55px' }} />
      <Avatar name="Custom Size" badge={{ state: 'success', size: 'larger' }} tokens={{ size: '100px' }} />
      <Avatar name="Custom Size" badge={{ state: 'success', size: 'largest' }} tokens={{ size: '150px' }} />
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
