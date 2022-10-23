import * as React from 'react';
import Screener, { Steps } from 'screener-storybook/src/screener';
import { storiesOf } from '@storybook/react';
import { Checkbox } from '@fluentui/react-checkbox';
import { TestWrapperDecoratorFixedWidth } from '../../utilities/TestWrapperDecorator';

storiesOf('Checkbox Converged', module)
  .addDecorator(TestWrapperDecoratorFixedWidth)
  .addDecorator(story => (
    <Screener
      steps={new Steps()
        .snapshot('rest', { cropTo: '.testWrapper' })
        .hover('input')
        .snapshot('hover', { cropTo: '.testWrapper' })
        .mouseDown('input')
        .snapshot('active', { cropTo: '.testWrapper' })
        .end()}
    >
      {story()}
    </Screener>
  ))
  .addStory('unchecked', () => <Checkbox label="Unchecked" />, { includeRtl: true })
  .addStory('checked', () => <Checkbox checked label="Checked" />)
  .addStory('mixed', () => <Checkbox checked="mixed" label="Mixed" />)
  .addStory('disabled', () => <Checkbox disabled label="Disabled" />);
