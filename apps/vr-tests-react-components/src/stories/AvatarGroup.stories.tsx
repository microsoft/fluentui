import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { Steps, StoryWright } from 'storywright';
import {
  AvatarGroup,
  AvatarGroupItem,
  AvatarGroupPopover,
  AvatarGroupPopoverProps,
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
  AvatarGroupProps & { overflowIndicator?: AvatarGroupPopoverProps['indicator'] }
> = props => {
  const { inlineItems, overflowItems } = partitionAvatarGroupItems({ items: names, layout: props.layout });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', flexWrap: 'wrap', gap: '10px', padding: '10px' }}>
      {sizes.map(size => (
        <AvatarGroup key={size} size={size as AvatarGroupProps['size']} {...props}>
          {inlineItems.map(name => (
            <AvatarGroupItem key={name} name={name} />
          ))}
          {overflowItems && (
            <AvatarGroupPopover indicator={props.overflowIndicator}>
              {overflowItems.map(name => (
                <AvatarGroupItem key={name} name={name} />
              ))}
            </AvatarGroupPopover>
          )}
        </AvatarGroup>
      ))}
    </div>
  );
};

// Non-interactive stories
storiesOf('AvatarGroup Converged', module)
  .addDecorator(TestWrapperDecorator)
  .addDecorator(story => (
    <StoryWright steps={new Steps().snapshot('default', { cropTo: '.testWrapper' }).end()}>{story()}</StoryWright>
  ))
  .addStory('basic', () => <AvatarGroupList />, {
    includeHighContrast: true,
    includeDarkMode: true,
  })
  .addStory('layoutStack', () => <AvatarGroupList layout="stack" />, {
    includeHighContrast: true,
    includeDarkMode: true,
  })
  .addStory(
    'layoutPie-1',
    () => (
      <div style={{ padding: '10px' }}>
        <AvatarGroup layout="pie">
          <AvatarGroupItem name={names[0]} />
          <AvatarGroupPopover>
            <AvatarGroupItem name={names[0]} />
          </AvatarGroupPopover>
        </AvatarGroup>
      </div>
    ),
    {
      includeHighContrast: true,
      includeDarkMode: true,
      includeRtl: true,
    },
  )
  .addStory(
    'layoutPie-2',
    () => (
      <div style={{ padding: '10px' }}>
        <AvatarGroup layout="pie">
          <AvatarGroupItem name={names[0]} />
          <AvatarGroupItem name={names[1]} />
          <AvatarGroupPopover>
            <AvatarGroupItem name={names[0]} />
            <AvatarGroupItem name={names[1]} />
          </AvatarGroupPopover>
        </AvatarGroup>
      </div>
    ),
    {
      includeHighContrast: true,
      includeDarkMode: true,
      includeRtl: true,
    },
  )
  .addStory('layoutPie', () => <AvatarGroupList layout="pie" />, {
    includeHighContrast: true,
    includeDarkMode: true,
    includeRtl: true,
  })
  .addStory('overflowIndicator', () => <AvatarGroupList overflowIndicator="icon" />, {
    includeHighContrast: true,
    includeDarkMode: true,
  });

// Interactive stories
storiesOf('AvatarGroup Converged', module)
  .addDecorator(TestWrapperDecorator)
  .addDecorator(story => (
    <StoryWright steps={new Steps().click('#show-overflow').snapshot('popoverContentOpen').end()}>
      {story()}
    </StoryWright>
  ))
  .addStory(
    'overflowContent',
    () => {
      const { inlineItems, overflowItems } = partitionAvatarGroupItems({ items: names });
      return (
        <div style={{ padding: '10px' }}>
          <AvatarGroup>
            {inlineItems.map(name => (
              <AvatarGroupItem key={name} name={name} />
            ))}
            {overflowItems && (
              <AvatarGroupPopover triggerButton={{ id: 'show-overflow' }}>
                {overflowItems.map(name => (
                  <AvatarGroupItem key={name} name={name} />
                ))}
              </AvatarGroupPopover>
            )}
          </AvatarGroup>
        </div>
      );
    },
    {
      includeHighContrast: true,
      includeDarkMode: true,
    },
  );
