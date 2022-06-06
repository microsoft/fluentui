import * as React from 'react';
import Screener from 'screener-storybook/src/screener';
import { storiesOf } from '@storybook/react';
import { TestWrapperDecorator } from '../utilities/index';
import { Overlay } from '@fluentui/react';

storiesOf('Overlay', module)
  .addDecorator(TestWrapperDecorator)
  .addDecorator(story =>
    // prettier-ignore
    <Screener
      steps={new Screener.Steps()
        .snapshot('default', { cropTo: '.ms-Overlay' })
        .end()}
    >
      {story()}
    </Screener>,
  )
  .addStory(
    'Root',
    // prettier-ignore
    () => <Overlay>Overlay content</Overlay>,
    { includeRtl: true },
  )
  .addStory(
    'Dark',
    // prettier-ignore
    () => <Overlay isDarkThemed>Overlay content</Overlay>,
  );
