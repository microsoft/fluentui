import * as React from 'react';
import Screener from 'screener-storybook/src/screener';
import { storiesOf } from '@storybook/react';
import { FabricDecorator } from '../utilities';
import { Overlay } from '@fluentui/react';

storiesOf('Overlay', module)
  .addDecorator(FabricDecorator)
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
    { rtl: true },
  )
  .addStory(
    'Dark',
    // prettier-ignore
    () => <Overlay isDarkThemed>Overlay content</Overlay>,
  );
