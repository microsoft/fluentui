import { storiesOf } from '@storybook/react';
import * as React from 'react';
import Screener from 'screener-storybook/src/screener';
import { Avatar, AvatarProps } from '@fluentui/react-avatar';
import { PeopleRegular, PersonCallRegular } from '@fluentui/react-icons';

const imageRoot = 'http://fabricweb.azureedge.net/fabric-website/assets/images/avatar';

/** Sample names and images for use in Avatar examples */
const nameAndImage = [
  { name: 'Katri Athokas', image: `${imageRoot}/KatriAthokas.jpg` },
  { name: 'Elvia Atkins', image: `${imageRoot}/ElviaAtkins.jpg` },
  { name: 'Mauricio August', image: `${imageRoot}/MauricioAugust.jpg` },
  { name: 'Colin Ballinger', image: `${imageRoot}/ColinBallinger.jpg` },
  { name: 'Lydia Bauer', image: `${imageRoot}/LydiaBauer.jpg` },
  { name: 'Amanda Brady', image: `${imageRoot}/AmandaBrady.jpg` },
  { name: 'Henry Brill', image: `${imageRoot}/HenryBrill.jpg` },
  { name: 'Celeste Burton', image: `${imageRoot}/CelesteBurton.jpg` },
  { name: 'Robin Counts', image: `${imageRoot}/RobinCounts.jpg` },
  { name: 'Tim Deboer', image: `${imageRoot}/TimDeboer.jpg` },
  { name: 'Cameron Evans', image: `${imageRoot}/CameronEvans.jpg` },
  { name: 'Isaac Fielder', image: `${imageRoot}/IsaacFielder.jpg` },
  { name: 'Cecil Folk', image: `${imageRoot}/CecilFolk.jpg` },
  { name: 'Miguel Garcia', image: `${imageRoot}/MiguelGarcia.jpg` },
  { name: 'Wanda Howard', image: `${imageRoot}/WandaHoward.jpg` },
  { name: 'Mona Kane', image: `${imageRoot}/MonaKane.jpg` },
  { name: 'Kat Larsson', image: `${imageRoot}/KatLarsson.jpg` },
  { name: 'Ashley McCarthy', image: `${imageRoot}/AshleyMcCarthy.jpg` },
  { name: 'Johnie McConnell', image: `${imageRoot}/JohnieMcConnell.jpg` },
  { name: 'Allan Munger', image: `${imageRoot}/AllanMunger.jpg` },
  { name: 'Erik Nason', image: `${imageRoot}/ErikNason.jpg` },
  { name: 'Kristin Patterson', image: `${imageRoot}/KristinPatterson.jpg` },
  { name: 'Daisy Phillips', image: `${imageRoot}/DaisyPhillips.jpg` },
  { name: 'Carole Poland', image: `${imageRoot}/CarolePoland.jpg` },
  { name: 'Carlos Slattery', image: `${imageRoot}/CarlosSlattery.jpg` },
  { name: 'Robert Tolbert', image: `${imageRoot}/RobertTolbert.jpg` },
  { name: 'Kevin Sturgis', image: `${imageRoot}/KevinSturgis.jpg` },
  { name: 'Charlotte Waltson', image: `${imageRoot}/CharlotteWaltson.jpg` },
  { name: 'Elliot Woodward', image: `${imageRoot}/ElliotWoodward.jpg` },
];

/** Arrays of example values for each Avatar prop */
const examples = {
  size: [16, 20, 24, 28, 32, 36, 40, 48, 56, 64, 72, 96, 120, 128],
  nameAndImage: nameAndImage,
  name: nameAndImage.map(p => p.name),
  image: nameAndImage.map(p => p.image),
  badge: [
    { status: 'available' },
    { status: 'away' },
    { status: 'busy' },
    { status: 'doNotDisturb' },
    { status: 'offline' },
    { status: 'outOfOffice' },
    { status: 'available', outOfOffice: true },
    { status: 'away', outOfOffice: true },
    { status: 'busy', outOfOffice: true },
    { status: 'doNotDisturb', outOfOffice: true },
    { status: 'offline', outOfOffice: true },
    { status: 'outOfOffice', outOfOffice: true },
  ],
  activeDisplay: ['ring', 'ring-shadow', 'shadow'],
  color: ['neutral', 'brand', 'colorful'],
  namedColors: [
    'darkRed',
    'cranberry',
    'red',
    'pumpkin',
    'peach',
    'marigold',
    'gold',
    'brass',
    'brown',
    'forest',
    'seafoam',
    'darkGreen',
    'lightTeal',
    'teal',
    'steel',
    'blue',
    'royalBlue',
    'cornflower',
    'navy',
    'lavender',
    'purple',
    'grape',
    'lilac',
    'pink',
    'magenta',
    'plum',
    'beige',
    'mink',
    'platinum',
    'anchor',
  ],
  /** A SVG hexagon data URL used by the CustomShape example */
  hexagon:
    'data:image/svg+xml;utf8,' +
    '<svg width="36" height="32" viewBox="0 0 36 32" fill="none" xmlns="http://www.w3.org/2000/svg">' +
    '<path fill="rgb(232,232,232)" d="M0.407926 17.528C-0.135976 16.5859 -0.135975 15.4141 0.407926 14.472' +
    'L7.91541 1.46793C8.44076 0.557947 9.39444 0 10.4245 0H25.5755C26.6056 0 27.5592 0.557951 28.0846 1.46793' +
    'L35.5921 14.472C36.136 15.4141 36.136 16.5859 35.5921 17.528L28.0846 30.5321' +
    'C27.5592 31.4421 26.6056 32 25.5755 32H10.4245C9.39443 32 8.44076 31.4421 7.91541 30.5321L0.407926 17.528Z"/>' +
    '</svg>',
} as const;

/** Renders an Avatar at every standard size */
const AvatarList: React.FC<
  AvatarProps & {
    names?: readonly string[];
    images?: readonly string[];
  }
> = props => {
  const { names, images, ...restOfProps } = props;
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '48px', padding: '24px' }}>
      {examples.size.map((size, i) => (
        <Avatar
          key={size}
          size={size}
          name={names && names[i % names.length]}
          image={images ? { src: images[i % images.length] } : undefined}
          {...restOfProps}
        />
      ))}
    </div>
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
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '48px', padding: '24px' }}>
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
    </div>
  );
};

storiesOf('Avatar Converged', module)
  .addDecorator(story => (
    <div style={{ display: 'flex' }}>
      <div className="testWrapper" style={{ maxWidth: '750px' }}>
        {story()}
      </div>
    </div>
  ))
  .addDecorator(story => (
    <Screener steps={new Screener.Steps().snapshot('normal', { cropTo: '.testWrapper' }).end()}>{story()}</Screener>
  ))
  .addStory(
    'basic',
    () => (
      <div style={{ display: 'flex', gap: '24px', padding: '24px' }}>
        <Avatar />
        <Avatar name="First Last" />
        <Avatar name="Three Word Name" />
        <Avatar name="One" />
        <Avatar name="(111)-555-1234" icon={<PersonCallRegular />} />
        <Avatar icon={<PeopleRegular />} shape="square" />
        <Avatar name="Group" icon={<PeopleRegular />} shape="square" />
        <Avatar image={{ src: examples.image[14] }} badge={{ status: 'away' }} />
        <Avatar name={examples.name[7]} image={{ src: examples.image[7] }} badge={{ status: 'available' }} />
      </div>
    ),
    { includeRtl: true, includeHighContrast: true, includeDarkMode: true },
  )
  .addStory('size+name', () => <AvatarList names={examples.name} />)
  .addStory('size+icon+badge+square', () => <AvatarList badge={{ status: 'outOfOffice' }} shape="square" />)
  .addStory('size+image+badge', () => <AvatarList images={examples.image} badge={{ status: 'doNotDisturb' }} />)
  .addStory('size+inactive+badge', () => (
    <AvatarList images={examples.image} active="inactive" badge={{ status: 'offline' }} />
  ))
  .addStory('size+active+badge', () => (
    <AvatarList images={examples.image} active="active" badge={{ status: 'available' }} />
  ))
  .addStory('size+active+shadow', () => (
    <AvatarList images={examples.image} active="active" activeAppearance="shadow" />
  ))
  .addStory('size+active+ring-shadow', () => (
    <AvatarList images={examples.image} active="active" activeAppearance="ring-shadow" />
  ))
  .addStory('customSize+image', () => <AvatarCustomSizeList images={examples.image} />)
  .addStory('customSize+name+badge', () => (
    <AvatarCustomSizeList names={examples.name} badge={{ status: 'available' }} />
  ))
  .addStory('customSize+icon+active', () => <AvatarCustomSizeList active="active" />)
  .addStory(
    'color',
    () => {
      const rowStyles: React.CSSProperties = { display: 'flex', flexWrap: 'wrap', gap: '8px' };

      return (
        <div style={{ display: 'flex', gap: '24px', flexDirection: 'row' }}>
          <div style={rowStyles}>
            <Avatar color="neutral" />
            <Avatar color="brand" />
          </div>
          <div style={rowStyles}>
            {examples.name.map(name => (
              <Avatar color="colorful" name={name} key={name} />
            ))}
          </div>
          <div style={rowStyles}>
            {examples.namedColors.map(color => (
              <Avatar color={color} key={color} />
            ))}
          </div>
        </div>
      );
    },
    { includeHighContrast: true, includeDarkMode: true },
  )
  .addStory('image-bad-url', () => <Avatar name="Broken Image" image={{ src: `${imageRoot}/bad_image_url.jpg` }} />);
