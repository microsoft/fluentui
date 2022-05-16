import * as React from 'react';
import Screener, { Steps } from 'screener-storybook/src/screener';
import { storiesOf } from '@storybook/react';
import { Radio } from '@fluentui/react-radio';
import { TestWrapperDecoratorFixedWidth } from '../utilities/TestWrapperDecorator';

storiesOf('Radio Converged', module)
  .addDecorator(TestWrapperDecoratorFixedWidth)
  .addDecorator(story => (
    <Screener
      steps={new Steps()
        .hover('input')
        .snapshot('hover', { cropTo: '.testWrapper' })
        .mouseDown('input')
        .snapshot('active', { cropTo: '.testWrapper' })
        .end()}
    >
      {story()}
    </Screener>
  ))
  .addStory('unchecked', () => <Radio label="Unchecked" />, {
    includeDarkMode: true,
    includeHighContrast: true,
  })
  .addStory('checked', () => <Radio checked label="Checked" />, {
    includeDarkMode: true,
    includeHighContrast: true,
  })
  .addStory('disabled', () => <Radio disabled label="Disabled" />, {
    includeDarkMode: true,
    includeHighContrast: true,
  });
