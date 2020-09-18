/*! Copyright (c) Microsoft Corporation. All rights reserved. Licensed under the MIT license. */
import * as React from 'react';
import Screener from 'screener-storybook/src/screener';
import { storiesOf } from '@storybook/react';
import { Avatar, AvatarProps, avatarSizeValues } from '@fluentui/react-avatar';
import { ChatBotIcon, GroupIcon, TelemarketerIcon } from '@fluentui/react-icons';
import { Stack } from '@fluentui/react-next';

const imageRoot = 'http://fabricweb.azureedge.net/fabric-website/assets/images/avatar/large';
const people = [
  { name: 'Ade Q', image: imageRoot + '/ade.jpg' },
  { name: 'Christain W', image: imageRoot + '/christian.jpg' },
  { name: 'Daniel E', image: imageRoot + '/daniel.jpg' },
  { name: 'Elliot R', image: imageRoot + '/elliot.jpg' },
  { name: 'Elyse T', image: imageRoot + '/elyse.png' },
  { name: 'Helen Y', image: imageRoot + '/helen.jpg' },
  { name: 'Jenny U', image: imageRoot + '/jenny.jpg' },
  { name: 'Joe I', image: imageRoot + '/joe.jpg' },
  { name: 'Justen O', image: imageRoot + '/justen.jpg' },
  { name: 'Kristy P', image: imageRoot + '/kristy.png' },
  { name: 'Laura A', image: imageRoot + '/laura.jpg' },
  { name: 'Matt S', image: imageRoot + '/matt.jpg' },
  { name: 'Matthew D', image: imageRoot + '/matthew.png' },
  { name: 'Molly F', image: imageRoot + '/molly.png' },
  { name: 'Nan G', image: imageRoot + '/nan.jpg' },
  { name: 'Patrick H', image: imageRoot + '/patrick.png' },
  { name: 'Rachel J', image: imageRoot + '/rachel.png' },
  { name: 'Steve K', image: imageRoot + '/steve.jpg' },
  { name: 'Stevie L', image: imageRoot + '/stevie.jpg' },
  { name: 'Tom Z', image: imageRoot + '/tom.jpg' },
  { name: 'Veronika X', image: imageRoot + '/veronika.jpg' },
  { name: 'Zoe C', image: imageRoot + '/zoe.jpg' },
] as const;

/** Renders an Avatar at every standard size */
const AvatarList: React.FC<AvatarProps> = props => (
  <Stack wrap horizontal tokens={{ childrenGap: '48px' }}>
    {avatarSizeValues.map((size, i) => (
      <Avatar key={size} size={size} {...people[i % people.length]} {...props} />
    ))}
  </Stack>
);

/** Renders an Avatar at a few custom sizes */
const AvatarCustomSizeList: React.FC<AvatarProps> = props => (
  <Stack wrap horizontal tokens={{ childrenGap: '48px' }}>
    {[13, 21, 34, 55, 89, 144].map((size, i) => (
      <Avatar key={size} customSize={size} {...people[people.length - 1 - i]} {...props} />
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
      <Avatar image={people[14].image} badge="warning" />
      <Avatar name={people[7].name} image={people[7].image} badge="success" />
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
          inactiveScaleFactor: '0.67',
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
          background: 'tomato',
          activeRingColor: 'tomato',
        }}
      />
      <Avatar
        icon={<ChatBotIcon />}
        tokens={{
          iconSize: '24px',
          borderRadius: '0',
          width: 'calc(var(--avatar-height) * 1.125)',
          background: `url('${svgHexagonDataUrl}') 0px/contain no-repeat`,
        }}
      />
    </>
  ));

// The hexagon background for the robot example
const svgHexagonDataUrl = `data:image/svg+xml;utf8,\
<svg width="36" height="32" viewBox="0 0 36 32" fill="none" xmlns="http://www.w3.org/2000/svg">\
<path fill="rgb(232,232,232)" d="M0.407926 17.528C-0.135976 16.5859 -0.135975 15.4141 0.407926 14.472L7.91541 1.46793\
C8.44076 0.557947 9.39444 0 10.4245 0H25.5755C26.6056 0 27.5592 0.557951 28.0846 1.46793L35.5921 14.472\
C36.136 15.4141 36.136 16.5859 35.5921 17.528L28.0846 30.5321C27.5592 31.4421 26.6056 32 25.5755 32H10.4245\
C9.39443 32 8.44076 31.4421 7.91541 30.5321L0.407926 17.528Z"/></svg>`;
