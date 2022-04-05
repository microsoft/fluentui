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
        .snapshot('default', { cropTo: '.testWrapper' })
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
  .addStory('Appearance: outline (default)', () => <Textarea placeholder="Placeholder" />)
  .addStory('Appearance: filledDarker', () => <Textarea appearance="filledDarker" placeholder="Placeholder" />)
  .addStory('Appearance: filledLighter', () => (
    <div style={{ background: '#f5f5f5', padding: '10px' }}>
      <Textarea appearance="filledLighter" placeholder="Placeholder" />
    </div>
  ))
  .addStory('Disabled', () => <Textarea disabled />)
  .addStory('With value', () => <Textarea defaultValue="Value" />);

// Non interactive
storiesOf('Textarea Converged', module)
  .addDecorator(TestWrapperDecoratorFixedWidth)
  .addDecorator(story => (
    <Screener steps={new Steps().snapshot('default', { cropTo: '.testWrapper' }).end()}>{story()}</Screener>
  ))
  .addStory('Size: small', () => <Textarea size="small" placeholder="Placeholder" />)
  .addStory('Size: medium', () => <Textarea size="medium" placeholder="Placeholder" />)
  .addStory('Size: large', () => <Textarea size="large" placeholder="Placeholder" />);
