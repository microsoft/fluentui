import { storiesOf } from '@storybook/react';
import * as React from 'react';
import Screener from 'screener-storybook/src/screener';
import { Avatar, AvatarProps, AvatarSizeValue } from '@fluentui/react-avatar';
import { Stack } from '@fluentui/react';
import { ContactIcon, GroupIcon, TelemarketerIcon } from '@fluentui/react-icons-mdl2';
import { AvatarExamples as examples } from '@fluentui/example-data';

import { FluentProviderDecorator } from '../utilities/index';

/** Renders an Avatar at every standard size */
const AvatarList: React.FC<
  AvatarProps & {
    names?: readonly string[];
    images?: readonly string[];
  }
> = props => {
  const { names, images, ...restOfProps } = props;
  return (
    <Stack wrap horizontal tokens={{ childrenGap: 48 }}>
      {examples.size.map((size, i) => (
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

const customSizes: { baseSize: AvatarSizeValue; customSize: string }[] = [
  { baseSize: 20, customSize: '13px' },
  { baseSize: 20, customSize: '21px' },
  { baseSize: 32, customSize: '34px' },
  { baseSize: 48, customSize: '55px' },
  { baseSize: 72, customSize: '89px' },
  { baseSize: 128, customSize: '144px' },
];

/** Renders an Avatar at a few custom sizes */
const AvatarCustomSizeList: React.FC<
  AvatarProps & {
    names?: readonly string[];
    images?: readonly string[];
  }
> = props => {
  const { names, images, ...restOfProps } = props;

  return (
    <Stack wrap horizontal tokens={{ childrenGap: 48 }}>
      {customSizes.map(({ baseSize, customSize }, i) => (
        <Avatar
          key={customSize}
          size={baseSize}
          style={{ width: customSize, height: customSize }}
          name={names && names[names.length - (i % names.length) - 1]}
          image={images && images[images.length - (i % images.length) - 1]}
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
      <Avatar image={examples.image[14]} badge="away" />
      <Avatar name={examples.name[7]} image={examples.image[7]} badge="available" />
    </>
  ))
  .addStory('size+name', () => <AvatarList names={examples.name} />)
  .addStory('size+icon+badge+square', () => (
    <AvatarList icon={<GroupIcon />} badge="outOfOffice" square />
  ))
  .addStory('size+image+badge', () => <AvatarList images={examples.image} badge="doNotDisturb" />)
  .addStory('size+inactive+badge', () => (
    <AvatarList images={examples.image} active="inactive" badge="offline" />
  ))
  .addStory('size+active+badge', () => (
    <AvatarList images={examples.image} active="active" badge="available" />
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
  ))
  .addStory('customSize+image', () => <AvatarCustomSizeList images={examples.image} />)
  .addStory('customSize+name+badge', () => (
    <AvatarCustomSizeList names={examples.name} badge="available" />
  ))
  .addStory('customSize+icon+active', () => (
    <AvatarCustomSizeList icon={<ContactIcon />} active="active" />
  ))
  .addStory('color', () => (
    <Stack tokens={{ childrenGap: 24 }}>
      <Stack wrap horizontal tokens={{ childrenGap: 8 }}>
        <Avatar color="neutral" />
        <Avatar color="brand" />
      </Stack>
      <Stack wrap horizontal tokens={{ childrenGap: 8 }}>
        {examples.name.map(name => (
          <Avatar color="colorful" name={name} key={name} />
        ))}
      </Stack>
      <Stack wrap horizontal tokens={{ childrenGap: 8 }}>
        {examples.namedColors.map(color => (
          <Avatar color={color} key={color} />
        ))}
      </Stack>
    </Stack>
  ));
