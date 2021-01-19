import * as React from 'react';
import Screener from 'screener-storybook/src/screener';
import { storiesOf } from '@storybook/react';
import { Avatar, AvatarProps, avatarSizeValues } from '@fluentui/react-avatar';
import { Stack } from '@fluentui/react';
import { GroupIcon, TelemarketerIcon, ChatBotIcon } from '@fluentui/react-icons-mdl2';
import { AvatarExamples as examples } from '@fluentui/example-data';

/** Renders an Avatar at every standard size */
const AvatarList: React.FC<AvatarProps> = props => (
  <Stack wrap horizontal tokens={{ childrenGap: 48 }}>
    {avatarSizeValues.map((size, i) => (
      <Avatar
        key={size}
        size={size}
        {...examples.nameAndImage[i % examples.nameAndImage.length]}
        {...props}
      />
    ))}
  </Stack>
);

/** Renders an Avatar at a few custom sizes */
const AvatarCustomSizeList: React.FC<AvatarProps> = props => (
  <Stack wrap horizontal tokens={{ childrenGap: 48 }}>
    {examples.customSize.map((size, i) => (
      <Avatar
        key={size}
        customSize={size}
        {...examples.nameAndImage[examples.nameAndImage.length - 1 - i]}
        {...props}
      />
    ))}
  </Stack>
);

storiesOf('Avatar', module)
  .addDecorator(story => (
    <div style={{ display: 'flex' }}>
      <Stack
        className="testWrapper"
        horizontal
        tokens={{ childrenGap: '24px', padding: '24px', maxWidth: '750px' }}
      >
        {story()}
      </Stack>
    </div>
  ))
  .addDecorator(story => (
    <Screener steps={new Screener.Steps().snapshot('normal', { cropTo: '.testWrapper' }).end()}>
      {story()}
    </Screener>
  ))
  .addStory('basic', () => (
    <>
      <Avatar />
      <Avatar name="First Last" />
      <Avatar name="Three Word Name" />
      <Avatar name="One" />
      <Avatar name="(111)-555-1234" icon={<TelemarketerIcon />} />
      <Avatar icon={<GroupIcon />} square />
      <Avatar name="Group" icon={<GroupIcon />} square />
      <Avatar image={examples.image[14]} badge="warning" />
      <Avatar name={examples.name[7]} image={examples.image[7]} badge="success" />
    </>
  ))
  .addStory('size+name', () => <AvatarList display="label" />)
  .addStory('size+icon+badge+square', () => (
    <AvatarList display="icon" icon={<GroupIcon />} badge="warning" square />
  ))
  .addStory('size+image+badge', () => <AvatarList display="image" badge="error" />)
  .addStory('size+inactive+badge', () => <AvatarList active={false} badge="info" />)
  .addStory('size+active+badge', () => <AvatarList active badge="success" />)
  .addStory('size+active+shadow', () => <AvatarList active activeDisplay="shadow" />)
  .addStory('size+active+glow', () => <AvatarList active activeDisplay="glow" />)
  .addStory('size+active+ring-shadow', () => <AvatarList active activeDisplay="ring-shadow" />)
  .addStory('size+active+ring-glow', () => <AvatarList active activeDisplay="ring-glow" />)
  .addStory('customSize+image', () => <AvatarCustomSizeList />)
  .addStory('customSize+name+badge', () => <AvatarCustomSizeList display="label" badge="success" />)
  .addStory('customSize+icon+active', () => <AvatarCustomSizeList display="icon" active />)
  .addStory('tokens', () => (
    <>
      <Avatar name="First Last" active tokens={{ activeRingColor: 'tomato' }} />
      <Avatar
        name="First Last"
        active
        activeDisplay="glow"
        tokens={{ activeGlowColor: 'tomato' }}
      />
      <Avatar
        name="First Last"
        active={false}
        tokens={{
          inactiveOpacity: '0.5',
          inactiveScale: '0.67',
        }}
      />
      <Avatar
        name="First Last"
        active
        customSize={29}
        tokens={{
          borderRadius: '10px',
          fontFamily: '"Times New Roman", serif',
          fontSize: '19px',
          fontWeight: '900',
          color: 'darkred',
          background: 'tomato',
          activeRingColor: 'tomato',
        }}
      />
      <Avatar
        icon={<ChatBotIcon />}
        size={32}
        tokens={{
          iconSize: '24px',
          height: '32px',
          width: '36px',
          background: `url('${svgHexagonDataUrl}') 0px/contain no-repeat`,
          borderRadius: '0',
        }}
      />
    </>
  ));

// The hexagon background for the robot example
const svgHexagonDataUrl =
  'data:image/svg+xml;utf8,' +
  '<svg width="36" height="32" viewBox="0 0 36 32" fill="none" xmlns="http://www.w3.org/2000/svg">' +
  '<path fill="rgb(232,232,232)" d="M0.407926 17.528C-0.135976 16.5859 -0.135975 15.4141 0.407926 14.472' +
  'L7.91541 1.46793C8.44076 0.557947 9.39444 0 10.4245 0H25.5755C26.6056 0 27.5592 0.557951 28.0846 1.46793' +
  'L35.5921 14.472C36.136 15.4141 36.136 16.5859 35.5921 17.528L28.0846 30.5321C27.5592 31.4421 26.6056 32 25.5755 32' +
  'H10.4245C9.39443 32 8.44076 31.4421 7.91541 30.5321L0.407926 17.528Z"/></svg>';
