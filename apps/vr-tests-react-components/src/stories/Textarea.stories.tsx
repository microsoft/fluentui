import * as React from 'react';
import { StoryWright, Steps } from 'storywright';
import { storiesOf } from '@storybook/react';
import { Textarea } from '@fluentui/react-textarea';
import { TestWrapperDecoratorFixedWidth } from '../utilities/TestWrapperDecorator';

storiesOf('Textarea Converged', module)
  .addDecorator(TestWrapperDecoratorFixedWidth)
  .addDecorator(story => (
    <StoryWright
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
    </StoryWright>
  ))
  .addStory('Appearance: outline (default)', () => <Textarea placeholder="Placeholder" />)
  .addStory('Appearance: filled-darker', () => <Textarea appearance="filled-darker" placeholder="Placeholder" />)
  .addStory('Appearance: filled-lighter', () => (
    <div style={{ background: '#f5f5f5', padding: '10px' }}>
      <Textarea appearance="filled-lighter" placeholder="Placeholder" />
    </div>
  ))
  .addStory('Invalid: outline', () => <Textarea aria-invalid placeholder="Placeholder" />)
  .addStory('Invalid: filled-darker', () => (
    <Textarea aria-invalid appearance="filled-darker" placeholder="Placeholder" />
  ))
  .addStory('Invalid: filled-lighter', () => (
    <div style={{ background: '#f5f5f5', padding: '10px' }}>
      <Textarea aria-invalid appearance="filled-lighter" placeholder="Placeholder" />
    </div>
  ))
  .addStory('Disabled', () => <Textarea disabled />)
  .addStory('With value', () => <Textarea defaultValue="Value" />);

// Non interactive
storiesOf('Textarea Converged', module)
  .addDecorator(TestWrapperDecoratorFixedWidth)
  .addDecorator(story => (
    <StoryWright steps={new Steps().snapshot('default', { cropTo: '.testWrapper' }).end()}>{story()}</StoryWright>
  ))
  .addStory('Size: small', () => <Textarea size="small" placeholder="Placeholder" />)
  .addStory('Size: medium', () => <Textarea size="medium" placeholder="Placeholder" />)
  .addStory('Size: large', () => <Textarea size="large" placeholder="Placeholder" />);
