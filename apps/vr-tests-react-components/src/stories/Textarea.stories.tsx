import * as React from 'react';
import { Steps, StoryWright } from 'storywright';
import { storiesOf } from '@storybook/react';
import { Button } from '@fluentui/react-button';
import { Textarea } from '@fluentui/react-textarea';
import { TestWrapperDecoratorFixedWidth } from '../utilities/TestWrapperDecorator';
import { FluentProvider } from '@fluentui/react-provider';
import { AttachFilled, DrawTextRegular, EmojiRegular, SendRegular } from '@fluentui/react-icons';

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
  .addStory('Size: large', () => <Textarea size="large" placeholder="Placeholder" />)
  .addStory('With appearance override', () => (
    <FluentProvider overrides_unstable={{ inputDefaultAppearance: 'filled-darker' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <Textarea placeholder="Default overriden appearance" />
        <Textarea appearance="outline" placeholder="Outline appearance" />
      </div>
    </FluentProvider>
  ))
  .addStory('contentAbove', () => (
    <Textarea
      contentAbove={
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, max-content) 1fr' }}>
          <Button appearance="transparent" icon={<DrawTextRegular />} />
          <Button appearance="transparent" icon={<EmojiRegular />} />
          <Button appearance="transparent" icon={<AttachFilled />} />
        </div>
      }
      placeholder="Placeholder"
    />
  ))
  .addStory('contentBelow', () => (
    <Textarea
      contentBelow={
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, max-content) 1fr' }}>
          <Button appearance="transparent" icon={<DrawTextRegular />} />
          <Button appearance="transparent" icon={<EmojiRegular />} />
          <Button appearance="transparent" icon={<AttachFilled />} />
          <Button style={{ justifySelf: 'flex-end' }} appearance="transparent" icon={<SendRegular />} />
        </div>
      }
      placeholder="Placeholder"
    />
  ));
