import * as React from 'react';
import Screener, { Steps } from 'screener-storybook/src/screener';
import { storiesOf } from '@storybook/react';
import { Checkbox } from '@fluentui/react-checkbox';
import { TestWrapperDecoratorFixedWidth } from '../utilities/TestWrapperDecorator';

storiesOf('Checkbox Converged', module)
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
  .addStoryInteractive('unchecked', () => <Checkbox label="Unchecked" />)
  .addStoryInteractive('checked', () => <Checkbox checked label="Checked" />)
  .addStoryInteractive('mixed', () => <Checkbox checked="mixed" label="Mixed" />)
  .addStoryInteractive('disabled', () => <Checkbox disabled label="Disabled" />);
