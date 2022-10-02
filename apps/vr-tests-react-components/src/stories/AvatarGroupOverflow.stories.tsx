import * as React from 'react';
import Screener from 'screener-storybook/src/screener';
import { AvatarGroup, AvatarGroupItem, AvatarGroupPopover, partitionAvatarGroupItems } from '@fluentui/react-avatar';
import { TestWrapperDecorator } from '../utilities/TestWrapperDecorator';
import { ComponentMeta } from '@storybook/react';
import { getStoryVariant, DARK_MODE, HIGH_CONTRAST } from '../utilities/index';
import { FluentProvider } from '../../../../packages/react-components/react-provider/src/FluentProvider';
import { webLightTheme } from '../../../../packages/react-components/react-theme/src/index';

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

export default {
  title: 'AvatarGroup Converged',
  component: AvatarGroup,
  decorators: [
    TestWrapperDecorator,
    story => (
      <Screener steps={new Screener.Steps().click('#show-overflow').snapshot('popoverContentOpen').end()}>
        {story()}
      </Screener>
    ),
    story => <FluentProvider theme={webLightTheme}>{story()}</FluentProvider>,
  ],
} as ComponentMeta<typeof AvatarGroup>;

export const OverflowContent = () => {
  const { inlineItems, overflowItems } = partitionAvatarGroupItems({ items: names });
  return (
    <div style={{ padding: '10px' }}>
      <AvatarGroup>
        {inlineItems.map(name => (
          <AvatarGroupItem key={name} name={name} />
        ))}
        <AvatarGroupPopover triggerButton={{ id: 'show-overflow' }}>
          {overflowItems.map(name => (
            <AvatarGroupItem key={name} name={name} />
          ))}
        </AvatarGroupPopover>
      </AvatarGroup>
    </div>
  );
};

OverflowContent.storyName = 'overflowContent';

export const OverflowContentHighContrast = getStoryVariant(OverflowContent, HIGH_CONTRAST);
export const OverflowContentDarkMode = getStoryVariant(OverflowContent, DARK_MODE);
