import { storiesOf } from '@storybook/react';
import * as React from 'react';
import Screener from 'screener-storybook/src/screener';
import { CounterBadge } from '@fluentui/react-badge';
import { TestWrapperDecorator } from '../utilities/TestWrapperDecorator';

storiesOf('CounterBadge Converged', module)
  .addDecorator(TestWrapperDecorator)
  .addDecorator(story => (
    <Screener steps={new Screener.Steps().snapshot('default', { cropTo: '.testWrapper' }).end()}>
      {story()}
    </Screener>
  ))
  .addStory(
    'colors',
    () => (
      <div style={{ display: 'flex', gap: 10 }}>
        {(['brand', 'danger', 'important', 'informative'] as const).map(color => (
          <CounterBadge count={5} appearance="filled" color={color} key={color} />
        ))}
      </div>
    ),
    { includeRtl: true },
  );
