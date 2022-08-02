import * as React from 'react';
import { storiesOf } from '@storybook/react';
import Screener from 'screener-storybook/src/screener';
import {
  AvatarGroup,
  AvatarGroupItem,
  AvatarGroupOverflow,
  AvatarGroupOverflowProps,
  AvatarGroupProps,
  partitionAvatarGroupItems,
} from '@fluentui/react-avatar';
import { TestWrapperDecorator } from '../utilities/TestWrapperDecorator';

const names = [
  'Katri Athokas',
  'Elvia Atkins',
  'Mauricio August',
  'Colin Ballinger',
  'Lydia Bauer',
  'Amanda Brady',
  'Henry Brill',
  'Celeste Burton',
  'Robin Counts',
  'Tim Deboer',
  'Cameron Evans',
  'Isaac Fielder',
  'Cecil Folk',
  'Miguel Garcia',
  'Wanda Howard',
  'Mona Kane',
  'Kat Larsson',
  'Ashley McCarthy',
  'Johnie McConnell',
  'Allan Munger',
  'Erik Nason',
  'Kristin Patterson',
  'Daisy Phillips',
  'Carole Poland',
  'Carlos Slattery',
  'Robert Tolbert',
  'Kevin Sturgis',
  'Charlotte Waltson',
  'Elliot Woodward',
];

const sizes = [16, 20, 24, 28, 32, 36, 40, 48, 56, 64, 72, 96, 120, 128];

const AvatarGroupList: React.FC<
  AvatarGroupProps & { overflowIndicator?: AvatarGroupOverflowProps['indicator'] }
> = props => {
  const items = names.map(name => <AvatarGroupItem key={name} name={name} />);
  const { inlineItems, overflowItems } = partitionAvatarGroupItems({ items });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', flexWrap: 'wrap', gap: '10px', padding: '10px' }}>
      {sizes.map(size => (
        <AvatarGroup key={size} size={size as AvatarGroupProps['size']} {...props}>
          {inlineItems}
          <AvatarGroupOverflow indicator={props.overflowIndicator}>{overflowItems}</AvatarGroupOverflow>
        </AvatarGroup>
      ))}
    </div>
  );
};

// Non-interactive stories
storiesOf('AvatarGroup Converged', module)
  .addDecorator(TestWrapperDecorator)
  .addDecorator(story => (
    <Screener steps={new Screener.Steps().snapshot('default', { cropTo: '.testWrapper' }).end()}>{story()}</Screener>
  ))
  .addStory('basic', () => <AvatarGroupList />, {
    includeHighContrast: true,
    includeDarkMode: true,
  })
  .addStory('layoutStack', () => <AvatarGroupList layout="stack" />, {
    includeHighContrast: true,
    includeDarkMode: true,
  })
  .addStory('overflowIndicator', () => <AvatarGroupList overflowIndicator="icon" />, {
    includeHighContrast: true,
    includeDarkMode: true,
  });

// Interactive stories
storiesOf('AvatarGroup Converged', module)
  .addDecorator(TestWrapperDecorator)
  .addDecorator(story => (
    <Screener steps={new Screener.Steps().click('#show-overflow').snapshot('overflowContentOpen').end()}>
      {story()}
    </Screener>
  ))
  .addStory(
    'overflowContent',
    () => {
      const items = names.map(name => <AvatarGroupItem key={name} name={name} />);
      const { inlineItems, overflowItems } = partitionAvatarGroupItems({ items });
      return (
        <AvatarGroup>
          {inlineItems}
          <AvatarGroupOverflow triggerButton={{ id: 'show-overflow' }}>{overflowItems}</AvatarGroupOverflow>
        </AvatarGroup>
      );
    },
    {
      includeHighContrast: true,
      includeDarkMode: true,
    },
  );
