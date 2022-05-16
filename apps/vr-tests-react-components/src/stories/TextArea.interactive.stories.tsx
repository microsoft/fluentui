import * as React from 'react';
import Screener, { Steps } from 'screener-storybook/src/screener';
import { storiesOf } from '@storybook/react';
import { Textarea } from '@fluentui/react-textarea';
import { TestWrapperDecoratorFixedWidth } from '../utilities/TestWrapperDecorator';

storiesOf('Textarea Converged', module)
  .addDecorator(TestWrapperDecoratorFixedWidth)
  .addDecorator(story => (
    <Screener
      steps={new Steps()
        .hover('textarea')
        .snapshot('hover', { cropTo: '.testWrapper' })
        .click('textarea')
        .wait(250) // needed for bottom focus border animation
        .snapshot('focused', { cropTo: '.textWrapper' })
        .end()}
    >
      {story()}
    </Screener>
  ))
  .addStoryInteractive('Appearance: outline (default)', () => <Textarea placeholder="Placeholder" />)
  .addStoryInteractive('Appearance: filledDarker', () => (
    <Textarea appearance="filledDarker" placeholder="Placeholder" />
  ))
  .addStoryInteractive('Appearance: filledLighter', () => (
    <div style={{ background: '#f5f5f5', padding: '10px' }}>
      <Textarea appearance="filledLighter" placeholder="Placeholder" />
    </div>
  ))
  .addStoryInteractive('Disabled', () => <Textarea disabled />)
  .addStoryInteractive('With value', () => <Textarea defaultValue="Value" />);
