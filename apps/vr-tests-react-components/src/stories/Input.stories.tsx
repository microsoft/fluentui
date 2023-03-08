import * as React from 'react';
import { Steps, StoryWright } from 'storywright';
import { storiesOf } from '@storybook/react';
import { Input } from '@fluentui/react-input';
import { SearchRegular, DismissRegular } from '@fluentui/react-icons';
import { TestWrapperDecoratorFixedWidth } from '../utilities/TestWrapperDecorator';
import { FluentProvider } from '@fluentui/react-provider';

storiesOf('Input Converged', module)
  .addDecorator(TestWrapperDecoratorFixedWidth)
  .addDecorator(story => (
    <StoryWright
      steps={new Steps()
        .snapshot('default', { cropTo: '.testWrapper' })
        .hover('input')
        .snapshot('hover', { cropTo: '.testWrapper' })
        .click('input')
        .wait(250) // let focus border animation finish
        .snapshot('focused', { cropTo: '.testWrapper' })
        .end()}
    >
      {story()}
    </StoryWright>
  ))
  .addStory('Appearance: outline (default)', () => <Input placeholder="Placeholder" />)
  .addStory('Appearance: underline', () => <Input appearance="underline" placeholder="Placeholder" />)
  .addStory('Appearance: filled-darker', () => <Input appearance="filled-darker" placeholder="Placeholder" />)
  .addStory('Appearance: filled-lighter', () => (
    // filledLighter requires a background to show up (this is colorNeutralBackground3 in web light theme)
    <div style={{ background: '#f5f5f5', padding: '10px' }}>
      <Input appearance="filled-lighter" placeholder="Placeholder" />
    </div>
  ))
  .addStory('Invalid, appearance: outline', () => <Input aria-invalid placeholder="Placeholder" />)
  .addStory('Invalid, appearance: underline', () => (
    <Input aria-invalid appearance="underline" placeholder="Placeholder" />
  ))
  .addStory('Invalid, appearance: filled-darker', () => (
    <Input aria-invalid appearance="filled-darker" placeholder="Placeholder" />
  ))
  .addStory('Invalid, appearance: filled-lighter', () => (
    // filledLighter requires a background to show up (this is colorNeutralBackground3 in web light theme)
    <div style={{ background: '#f5f5f5', padding: '10px' }}>
      <Input aria-invalid appearance="filled-lighter" placeholder="Placeholder" />
    </div>
  ))
  .addStory('Disabled, appearance: outline', () => <Input disabled value="Disabled" />)
  .addStory('Disabled, appearance: underline', () => <Input disabled appearance="underline" value="Disabled" />)
  .addStory('Disabled, appearance: filled-darker', () => <Input disabled appearance="filled-darker" value="Disabled" />)
  .addStory('Disabled, appearance: filled-lighter', () => (
    // filledLighter requires a background to show up (this is colorNeutralBackground3 in web light theme)
    <div style={{ background: '#f5f5f5', padding: '10px' }}>
      <Input disabled appearance="filled-lighter" value="Disabled" />
    </div>
  ))
  .addStory('With value', () => <Input defaultValue="Value!" />);

// Non-interactive stories
storiesOf('Input Converged', module)
  .addDecorator(TestWrapperDecoratorFixedWidth)
  // note: due to reused "Input Converged" story ID, TestWrapperDecoratorFixedWidth is also reused
  .addDecorator(story => (
    <StoryWright steps={new Steps().snapshot('default', { cropTo: '.testWrapper' }).end()}>{story()}</StoryWright>
  ))
  .addStory('Size: small', () => <Input size="small" placeholder="Placeholder" />)
  .addStory('Size: large', () => <Input size="large" placeholder="Placeholder" />)
  .addStory('Inline', () => (
    <p>
      Some text with <Input placeholder="hello" style={{ width: '75px' }} /> inline input
    </p>
  ))
  .addStory(
    'contentBefore',
    () => <Input contentBefore={<SearchRegular style={{ fontSize: '20px' }} />} placeholder="Placeholder" />,
    { includeRtl: true },
  )
  .addStory(
    'contentAfter',
    () => <Input contentAfter={<DismissRegular style={{ fontSize: '20px' }} />} placeholder="Placeholder" />,
    { includeRtl: true },
  )
  .addStory('With appearance override', () => (
    <FluentProvider overrides_unstable={{ inputDefaultAppearance: 'filled-darker' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <Input placeholder="Default overriden appearance" />
        <Input appearance="outline" placeholder="Outline appearance" />
      </div>
    </FluentProvider>
  ));
