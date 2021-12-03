import * as React from 'react';
import Screener, { Steps } from 'screener-storybook/src/screener';
import { storiesOf } from '@storybook/react';
import { Input } from '@fluentui/react-input';
import { Search20Regular, Dismiss20Regular } from '@fluentui/react-icons';
import { TestWrapperDecoratorFixedWidth } from '../utilities/TestWrapperDecorator';

// TODO move input.* props to root once primary slot helper is integrated

storiesOf('Input Converged', module)
  .addDecorator(TestWrapperDecoratorFixedWidth)
  .addDecorator(story => (
    <Screener
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
    </Screener>
  ))
  .addStory('Appearance: outline (default)', () => <Input input={{ placeholder: 'Placeholder' }} />)
  .addStory('Appearance: underline', () => (
    <Input appearance="underline" input={{ placeholder: 'Placeholder' }} />
  ))
  .addStory('Appearance: filledDarker', () => (
    <Input appearance="filledDarker" input={{ placeholder: 'Placeholder' }} />
  ))
  .addStory('Appearance: filledLighter', () => (
    // filledLighter requires a background to show up (this is colorNeutralBackground3 in web light theme)
    <div style={{ background: '#f5f5f5', padding: '10px' }}>
      <Input appearance="filledLighter" input={{ placeholder: 'Placeholder' }} />
    </div>
  ))
  .addStory('Disabled', () => <Input input={{ disabled: true }} />)
  // TODO move defaultValue prop to root
  .addStory('With value', () => <Input input={{ defaultValue: 'Value!' }} />);

// Non-interactive stories
storiesOf('Input Converged', module)
  // note: due to reused "Input Converged" story ID, TestWrapperDecoratorFixedWidth is also reused
  .addDecorator(story => (
    <Screener steps={new Steps().snapshot('default', { cropTo: '.testWrapper' }).end()}>
      {story()}
    </Screener>
  ))
  .addStory('Size: small', () => <Input size="small" input={{ placeholder: 'Placeholder' }} />)
  .addStory('Size: large', () => <Input size="large" input={{ placeholder: 'Placeholder' }} />)
  .addStory('Inline', () => (
    <p>
      Some text with <Input inline input={{ placeholder: 'hello', style: { width: '75px' } }} />{' '}
      inline input
    </p>
  ))
  .addStory(
    'contentBefore',
    () => <Input contentBefore={<Search20Regular />} input={{ placeholder: 'Placeholder' }} />,
    { includeRtl: true },
  )
  .addStory(
    'contentAfter',
    () => <Input contentAfter={<Dismiss20Regular />} input={{ placeholder: 'Placeholder' }} />,
    { includeRtl: true },
  );
