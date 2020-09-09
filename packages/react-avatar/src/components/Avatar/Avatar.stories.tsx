import * as React from 'react';
import { Avatar } from './Avatar';
import { AvatarProps, avatarSizes } from './Avatar.types';
import { StoryExample } from '../utils/StoryExample';
import {
  GroupIcon,
  CatIcon,
  IDBadgeIcon,
  CalendarIcon,
  TelemarketerIcon,
  RoomIcon,
  RobotIcon,
  SkypeClockIcon,
  SkypeCheckIcon,
  SkypeMinusIcon,
  SkypeArrowIcon,
} from '@fluentui/react-icons';

export const AvatarExamples = () => (
  <>
    <StoryExample title="Basic examples">
      <Avatar />
      <Avatar size={24} name="John Doe" badge="warning" />
      <Avatar name="Group" icon={<GroupIcon />} square />
      <Avatar size={48} name="Ade Matthews" image="images/avatar/ade.png" />
      <Avatar size={64} name="Group" icon={<GroupIcon />} square display="icon" />
      <Avatar size={96} name="Joe Daniels" image="images/avatar/joe.png" badge="success" />
    </StoryExample>
    <StoryExample title="Image">
      <AvatarExampleList display="image" />
      <AvatarExampleList display="image" square />
    </StoryExample>
    <StoryExample title="Initials">
      <AvatarExampleList display="label" />
      <AvatarExampleList display="label" square />
    </StoryExample>
    <StoryExample title="Icon">
      <AvatarExampleList display="icon" />
      <AvatarExampleList display="icon" square />
    </StoryExample>
    <StoryExample title="Custom shape">
      <AvatarExampleList
        icon={<RobotIcon />}
        display="icon"
        tokens={{ clipPath: 'polygon(25% 6.7%, 75% 6.7%, 100% 50%, 75% 93.3%, 25% 93.3%, 0% 50%)' }}
      />
    </StoryExample>
    <StoryExample title="Custom Size">
      <Avatar name="Custom Size" badge="success" customSize={17} />
      <Avatar name="Custom Size" badge="warning" customSize={42} />
      <Avatar name="Custom Size" badge="error" customSize={55} />
      <Avatar name="Custom Size" badge="success" customSize={100} />
      <Avatar name="Custom Size" badge="success" customSize={150} />
    </StoryExample>
  </>
);

/**
 * Examples for the name and image props used by AvatarExampleList
 */
const people: readonly Pick<AvatarProps, 'name' | 'image'>[] = [
  { name: 'Ade Laura', image: 'images/avatar/ade.png' },
  { name: 'Christain Matthew', image: 'images/avatar/christian.png' },
  { name: 'Daniel Molly', image: 'images/avatar/daniel.png' },
  { name: 'Elliot Nan', image: 'images/avatar/elliot.png' },
  { name: 'Elyse Patrick', image: 'images/avatar/elyse.png' },
  { name: 'Helen Rachel', image: 'images/avatar/helen.png' },
  { name: 'Jenny Steve', image: 'images/avatar/jenny.png' },
  { name: 'Joe Stevie', image: 'images/avatar/joe.png' },
  { name: 'Justen Tom', image: 'images/avatar/justen.png' },
  { name: 'Kristy Veronika', image: 'images/avatar/kristy.png' },
  { name: 'Laura Zoe', image: 'images/avatar/laura.png' },
  { name: 'Matt Ade', image: 'images/avatar/matt.png' },
  { name: 'Matthew Chris', image: 'images/avatar/matthew.png' },
  { name: 'Molly Christain', image: 'images/avatar/molly.png' },
  { name: 'Nan Daniel', image: 'images/avatar/nan.png' },
  { name: 'Patrick Elliot', image: 'images/avatar/patrick.png' },
  { name: 'Rachel Elyse', image: 'images/avatar/rachel.png' },
  { name: 'Steve Helen', image: 'images/avatar/steve.png' },
  { name: 'Stevie Jenny', image: 'images/avatar/stevie.png' },
  { name: 'Tom Joe', image: 'images/avatar/tom.png' },
  { name: 'Veronika Justen', image: 'images/avatar/veronika.png' },
  { name: 'Zoe Kristy', image: 'images/avatar/zoe.png' },
];

/**
 * Examples for the icon prop used by AvatarExampleList
 */
const icons: readonly Pick<AvatarProps, 'icon'>[] = [
  {}, // default icon
  { icon: <GroupIcon /> },
  { icon: <CatIcon /> },
  { icon: <CalendarIcon /> },
  { icon: <RoomIcon /> },
  { icon: <IDBadgeIcon /> },
  { icon: <TelemarketerIcon /> },
];

/**
 * Examples for the badge prop used by AvatarExampleList
 */
const badges: readonly Pick<AvatarProps, 'badge'>[] = [
  {}, // no badge (default)
  { badge: 'success' },
  { badge: 'warning' },
  { badge: 'error' },
  { badge: 'info' },
  {}, // no badge (default)
  { badge: { state: 'success', icon: { as: SkypeCheckIcon } } },
  { badge: { state: 'warning', icon: { as: SkypeClockIcon } } },
  { badge: { state: 'error', icon: { as: SkypeMinusIcon } } },
  { badge: { state: 'info', icon: { as: SkypeArrowIcon } } },
];

// Keep track of the offset in the example arrays, so the same size doesn't always line up with the same image/icon/etc
let offset = 0;

const AvatarExampleList = (props: Exclude<AvatarProps, 'size'>) => {
  const avatars = avatarSizes.map((size, i) => (
    <div key={size} style={{ margin: '5px' }}>
      <Avatar
        size={size}
        {...people[(i + offset) % people.length]}
        {...badges[(i + offset) % badges.length]}
        {...icons[(i + offset) % icons.length]}
        {...props}
      />
    </div>
  ));

  offset += avatars.length;

  return (
    <div style={{ display: 'flex', margin: '0', flexWrap: 'wrap' }}>
      <div style={{ display: 'flex' }}>{avatars.slice(0, 9)}</div>
      <div style={{ display: 'flex' }}>{avatars.slice(9)}</div>
    </div>
  );
};
