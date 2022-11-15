import * as React from 'react';
import Screener from 'screener-storybook/src/screener';
import { InfoButton } from '@fluentui/react-infobutton';
import { storiesOf } from '@storybook/react';

const infoButtonContent = 'This is the content of an InfoButton.';

storiesOf('InfoButton', module)
  .addDecorator(story => (
    <Screener steps={new Screener.Steps().click('.show-content').snapshot('infoButtonOpen').end()}>{story()}</Screener>
  ))
  .addStory(
    'size',
    () => (
      <div style={{ display: 'flex', flexDirection: 'column', padding: '25px', gap: '80px', alignItems: 'start' }}>
        <InfoButton className="show-content" size="small" content={infoButtonContent} />
        <InfoButton className="show-content" size="medium" content={infoButtonContent} />
        <InfoButton className="show-content" size="large" content={infoButtonContent} />
      </div>
    ),
    {
      includeHighContrast: true,
      includeDarkMode: true,
    },
  );
