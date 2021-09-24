import { storiesOf } from '@storybook/react';
import * as React from 'react';
import Screener from 'screener-storybook/src/screener';
import { Avatar, AvatarProps } from '@fluentui/react-avatar';
import { Stack } from '@fluentui/react';
import { People20Regular, PersonCall20Regular } from '@fluentui/react-icons';
import { AvatarExamples as examples } from '@fluentui/example-data';

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
          image={images ? { src: images[i % images.length] } : undefined}
          {...restOfProps}
        />
      ))}
    </Stack>
  );
};

const customSizes: { baseSize: AvatarProps['size']; customSize: string }[] = [
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
          image={images ? { src: images[images.length - (i % images.length) - 1] } : undefined}
          {...restOfProps}
        />
      ))}
    </Stack>
  );
};

storiesOf('Avatar Converged', module)
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
  .addStory(
    'basic',
    () => (
      <>
        <Avatar />
        <Avatar name="First Last" />
        <Avatar name="Three Word Name" />
        <Avatar name="One" />
        <Avatar name="(111)-555-1234" icon={<PersonCall20Regular />} />
        <Avatar icon={<People20Regular />} shape="square" />
        <Avatar name="Group" icon={<People20Regular />} shape="square" />
        <Avatar image={{ src: examples.image[14] }} badge={{ status: 'away' }} />
        <Avatar
          name={examples.name[7]}
          image={{ src: examples.image[7] }}
          badge={{ status: 'available' }}
        />
      </>
    ),
    { includeRtl: true, includeHighContrast: true, includeDarkMode: true },
  )
  .addStory('size+name', () => <AvatarList names={examples.name} />)
  .addStory('size+icon+badge+square', () => (
    <AvatarList badge={{ status: 'outOfOffice' }} shape="square" />
  ))
  .addStory('size+image+badge', () => (
    <AvatarList images={examples.image} badge={{ status: 'doNotDisturb' }} />
  ))
  .addStory('size+inactive+badge', () => (
    <AvatarList images={examples.image} active="inactive" badge={{ status: 'offline' }} />
  ))
  .addStory('size+active+badge', () => (
    <AvatarList images={examples.image} active="active" badge={{ status: 'available' }} />
  ))
  .addStory('size+active+shadow', () => (
    <AvatarList images={examples.image} active="active" activeAppearance="shadow" />
  ))
  .addStory('size+active+glow', () => (
    <AvatarList images={examples.image} active="active" activeAppearance="glow" />
  ))
  .addStory('size+active+ring-shadow', () => (
    <AvatarList images={examples.image} active="active" activeAppearance="ring-shadow" />
  ))
  .addStory('size+active+ring-glow', () => (
    <AvatarList images={examples.image} active="active" activeAppearance="ring-glow" />
  ))
  .addStory('customSize+image', () => <AvatarCustomSizeList images={examples.image} />)
  .addStory('customSize+name+badge', () => (
    <AvatarCustomSizeList names={examples.name} badge={{ status: 'available' }} />
  ))
  .addStory('customSize+icon+active', () => <AvatarCustomSizeList active="active" />)
  .addStory(
    'color',
    () => (
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
    ),
    { includeHighContrast: true, includeDarkMode: true },
  );
