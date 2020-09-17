/*! Copyright (c) Microsoft Corporation. All rights reserved. Licensed under the MIT license. */
import * as React from 'react';
import Screener from 'screener-storybook/src/screener';
import { storiesOf } from '@storybook/react';
import { Avatar, AvatarProps, avatarSizeValues } from '@fluentui/react-avatar';
import { GroupIcon, ChatBotIcon } from '@fluentui/react-icons';

const imageUrl = (size: number) => `http://placehold.it/${size}/FFC83D/000000?text=%5E_%5E`;

const AllAvatarSizes: React.FC<AvatarProps> = props => (
  <div style={{ display: 'flex', flexDirection: 'column', width: '720px' }}>
    {/* Standard sizes */}
    <div style={{ display: 'flex', flexWrap: 'wrap' }}>
      {avatarSizeValues.map(size => (
        <div style={{ margin: '24px' }} key={size}>
          <Avatar
            size={size}
            name="John Doe"
            image={imageUrl(size)}
            icon={<GroupIcon />}
            {...props}
          />
        </div>
      ))}
    </div>

    {/* Custom sizes */}
    <div style={{ display: 'flex', flexWrap: 'wrap' }}>
      {[13, 21, 34, 55, 89, 144].map(customSize => (
        <div style={{ margin: '24px' }} key={customSize}>
          <Avatar
            customSize={customSize}
            name="John Doe"
            image={imageUrl(customSize)}
            icon={<GroupIcon />}
            {...props}
          />
        </div>
      ))}
    </div>
  </div>
);

storiesOf('Avatar', module)
  .addDecorator(story => (
    <div style={{ display: 'flex' }}>
      <div className="testWrapper" style={{ padding: '8px' }}>
        {story()}
      </div>
    </div>
  ))
  .addDecorator(story => (
    <Screener steps={new Screener.Steps().snapshot('snapshot', { cropTo: '.testWrapper' }).end()}>
      {story()}
    </Screener>
  ))
  .addStory('default', () => <Avatar />)
  .addStory('name, badge', () => <AllAvatarSizes display="label" badge="success" />)
  .addStory('icon, badge, square', () => <AllAvatarSizes display="icon" badge="warning" square />)
  .addStory('image, badge', () => <AllAvatarSizes display="image" badge="error" />)
  .addStory('inactive', () => <AllAvatarSizes active={false} badge="info" />)
  .addStory('active', () => <AllAvatarSizes active={true} badge="success" />)
  .addStory('active (shadow)', () => <AllAvatarSizes active={true} activeDisplay="shadow" />)
  .addStory('active (glow)', () => <AllAvatarSizes active={true} activeDisplay="glow" />)
  .addStory('active (ring-shadow)', () => (
    <AllAvatarSizes active={true} activeDisplay="ring-shadow" />
  ))
  .addStory('active (ring-glow), square', () => (
    <AllAvatarSizes active={true} activeDisplay="ring-glow" square />
  ))
  .addStory('tokens', () => (
    <>
      <Avatar
        size={40}
        name="John Doe"
        active
        tokens={{ activeRingColor: 'tomato' }}
        style={{ margin: '8px' }}
      />
      <Avatar
        size={40}
        name="John Doe"
        active
        activeDisplay="glow"
        tokens={{ activeGlowColor: 'tomato' }}
        style={{ margin: '8px' }}
      />
      <Avatar
        size={40}
        name="John Doe"
        active={false}
        tokens={{ inactiveOpacity: '0.5', inactiveScaleFactor: '0.67' }}
        style={{ margin: '8px' }}
      />
      <Avatar
        size={48}
        name="John Doe"
        active
        tokens={{
          fontSize: '25px',
          fontFamily: '"Times New Roman", serif',
          fontWeight: '900',
          background: 'linear-gradient(to bottom right, lightsteelblue, steelblue)',
          borderRadius: '0',
        }}
        style={{ margin: '8px' }}
      />
      <Avatar
        customSize={57}
        icon={<ChatBotIcon />}
        tokens={{
          iconSize: '36px',
          background: '#BBD7EB',
          clipPath: 'polygon(25% 6.7%, 75% 6.7%, 100% 50%, 75% 93.3%, 25% 93.3%, 0% 50%)',
        }}
        style={{ margin: '8px' }}
      />
    </>
  ));
