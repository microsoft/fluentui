import * as React from 'react';
import { InfoButton } from '@fluentui/react-infobutton';
import { storiesOf } from '@storybook/react';
import { PopoverProps } from '@fluentui/react-popover';

const infoButtonContent = 'This is the content of an InfoButton.';

storiesOf('InfoButton', module)
  .addStory(
    'size',
    () => (
      <div style={{ display: 'flex', flexDirection: 'column', padding: '25px', gap: '80px', alignItems: 'start' }}>
        <InfoButton id="show-content-small" size="small" content={infoButtonContent} />
        <InfoButton id="show-content-medium" size="medium" content={infoButtonContent} />
        <InfoButton id="show-content-large" size="large" content={infoButtonContent} />
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
      <div style={{ display: 'flex', flexDirection: 'column', padding: '25px', gap: '80px', alignItems: 'start' }}>
        <InfoButton
          id="show-content-small"
          size="small"
          content={{ children: infoButtonContent }}
          popover={{ open: true } as PopoverProps}
        />
        <InfoButton
          id="show-content-medium"
          size="medium"
          content={{ children: infoButtonContent }}
          popover={{ open: true } as PopoverProps}
        />
        <InfoButton
          id="show-content-large"
          size="large"
          content={{ children: infoButtonContent }}
          popover={{ open: true } as PopoverProps}
        />
      </div>
    ),
    {
      includeHighContrast: true,
      includeDarkMode: true,
    },
  );
