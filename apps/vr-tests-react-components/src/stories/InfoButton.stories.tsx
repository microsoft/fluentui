import * as React from 'react';
import Screener from 'screener-storybook/src/screener';
import { InfoButton } from '@fluentui/react-infobutton';
import { storiesOf } from '@storybook/react';
import { PopoverProps } from '@fluentui/react-popover';
import { TestWrapperDecoratorFixedWidth } from '../utilities/TestWrapperDecorator';

storiesOf('InfoButton', module)
  .addDecorator(TestWrapperDecoratorFixedWidth)
  .addDecorator(story => (
    <Screener
      steps={new Screener.Steps()
        .snapshot('rest', { cropTo: '.testWrapper' })
        .hover('button')
        .snapshot('hover', { cropTo: '.testWrapper' })
        .focus('button')
        .snapshot('focus', { cropTo: '.testWrapper' })
        .mouseDown('button')
        .snapshot('active', { cropTo: '.testWrapper' })
        .end()}
    >
      {story()}
    </Screener>
  ))
  .addStory(
    'size',
    () => (
      <div style={{ padding: '60px' }}>
        <InfoButton content="This is the content of an InfoButton." />
      </div>
    ),
    {
      includeHighContrast: true,
      includeDarkMode: true,
    },
  );

storiesOf('InfoButton - sizes', module)
  .addDecorator(TestWrapperDecoratorFixedWidth)
  .addDecorator(story => (
    <Screener steps={new Screener.Steps().snapshot('active', { cropTo: '.testWrapper' }).end()}>{story()}</Screener>
  ))
  .addStory(
    'size',
    () => (
      <div style={{ display: 'flex', flexDirection: 'column', padding: '60px', gap: '80px', alignItems: 'start' }}>
        <InfoButton size="small" content="This is the content of an InfoButton." />
        <InfoButton size="medium" content="This is the content of an InfoButton." />
        <InfoButton size="large" content="This is the content of an InfoButton." />
      </div>
    ),
    {
      includeHighContrast: true,
      includeDarkMode: true,
    },
  )
  .addStory(
    'size-open',
    () => (
      <div style={{ display: 'flex', flexDirection: 'column', padding: '60px', gap: '80px', alignItems: 'start' }}>
        <InfoButton
          size="small"
          content="This is the content of an InfoButton."
          popover={{ open: true } as PopoverProps}
        />
        <InfoButton
          size="medium"
          content="This is the content of an InfoButton."
          popover={{ open: true } as PopoverProps}
        />
        <InfoButton
          size="large"
          content="This is the content of an InfoButton."
          popover={{ open: true } as PopoverProps}
        />
      </div>
    ),
    {
      includeHighContrast: true,
      includeDarkMode: true,
    },
  );
