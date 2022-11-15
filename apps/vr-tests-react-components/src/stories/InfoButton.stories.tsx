import * as React from 'react';
import Screener from 'screener-storybook/src/screener';
import { InfoButton } from '@fluentui/react-infobutton';
import { storiesOf } from '@storybook/react';

const infoButtonContent = 'This is the content of an InfoButton.';

storiesOf('InfoButton', module)
  .addDecorator(story => (
    <Screener
      steps={new Screener.Steps()
        .click('.show-content-small')
        .click('.show-content-medium')
        .click('.show-content-large')
        .snapshot('infoButtonOpen')
        .end()}
    >
      {story()}
    </Screener>
  ))
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
  );
