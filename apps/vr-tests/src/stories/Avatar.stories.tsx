import { storiesOf } from '@storybook/react';
import * as React from 'react';
import Screener from 'screener-storybook/src/screener';
import { Avatar, AvatarProps, avatarSizeValues } from '@fluentui/react-avatar';
import { Stack } from '@fluentui/react';
import { GroupIcon, TelemarketerIcon } from '@fluentui/react-icons-mdl2';
import { AvatarExamples as examples } from '@fluentui/example-data';

import { FluentProviderDecorator } from '../utilities/index';

/** Renders an Avatar at every standard size */
const AvatarList: React.FC<AvatarProps & {
  names?: readonly string[];
  images?: readonly string[];
}> = props => {
  const { names, images, ...restOfProps } = props;
  return (
    <Stack wrap horizontal tokens={{ childrenGap: 48 }}>
      {avatarSizeValues.map((size, i) => (
        <Avatar
          key={size}
          size={size}
          name={names && names[i % names.length]}
          image={images && images[i % images.length]}
          {...restOfProps}
        />
      ))}
    </Stack>
  );
};

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
  .addDecorator(FluentProviderDecorator)
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
  .addStory('size+name', () => <AvatarList names={examples.name} />)
  .addStory('size+icon+badge+square', () => (
    <AvatarList icon={<GroupIcon />} badge="warning" square />
  ))
  .addStory('size+image+badge', () => <AvatarList images={examples.image} badge="error" />)
  .addStory('size+inactive+badge', () => (
    <AvatarList images={examples.image} active="inactive" badge="info" />
  ))
  .addStory('size+active+badge', () => (
    <AvatarList images={examples.image} active="active" badge="success" />
  ))
  .addStory('size+active+shadow', () => (
    <AvatarList images={examples.image} active="active" activeDisplay="shadow" />
  ))
  .addStory('size+active+glow', () => (
    <AvatarList images={examples.image} active="active" activeDisplay="glow" />
  ))
  .addStory('size+active+ring-shadow', () => (
    <AvatarList images={examples.image} active="active" activeDisplay="ring-shadow" />
  ))
  .addStory('size+active+ring-glow', () => (
    <AvatarList images={examples.image} active="active" activeDisplay="ring-glow" />
  ));
