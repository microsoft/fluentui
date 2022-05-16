import * as React from 'react';
import Screener, { Steps } from 'screener-storybook/src/screener';
import { storiesOf } from '@storybook/react';
import { Input } from '@fluentui/react-input';
import { SearchRegular, DismissRegular } from '@fluentui/react-icons';
import { TestWrapperDecoratorFixedWidth } from '../utilities/TestWrapperDecorator';

storiesOf('Input Converged', module)
  .addDecorator(TestWrapperDecoratorFixedWidth)
  .addDecorator(story => (
    <Screener
      steps={new Steps()
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
  .addStoryInteractive('Appearance: outline (default)', () => <Input placeholder="Placeholder" />)
  .addStoryInteractive('Appearance: underline', () => <Input appearance="underline" placeholder="Placeholder" />)
  .addStoryInteractive('Appearance: filledDarker', () => <Input appearance="filledDarker" placeholder="Placeholder" />)
  .addStoryInteractive('Appearance: filledLighter', () => (
    // filledLighter requires a background to show up (this is colorNeutralBackground3 in web light theme)
    <div style={{ background: '#f5f5f5', padding: '10px' }}>
      <Input appearance="filledLighter" placeholder="Placeholder" />
    </div>
  ))
  .addStoryInteractive('Disabled', () => <Input disabled />)
  .addStoryInteractive('With value', () => <Input defaultValue="Value!" />);

// Non-interactive stories
storiesOf('Input Converged', module)
  .addDecorator(TestWrapperDecoratorFixedWidth)
  // note: due to reused "Input Converged" story ID, TestWrapperDecoratorFixedWidth is also reused
  .addDecorator(story => (
    <Screener steps={new Steps().snapshot('default', { cropTo: '.testWrapper' }).end()}>{story()}</Screener>
  ))
  .addStoryInteractive('Size: small', () => <Input size="small" placeholder="Placeholder" />)
  .addStoryInteractive('Size: large', () => <Input size="large" placeholder="Placeholder" />)
  .addStoryInteractive('Inline', () => (
    <p>
      Some text with <Input placeholder="hello" style={{ width: '75px' }} /> inline input
    </p>
  ))
  .addStoryInteractive(
    'contentBefore',
    () => <Input contentBefore={<SearchRegular style={{ fontSize: '20px' }} />} placeholder="Placeholder" />,
    { includeRtl: true },
  )
  .addStoryInteractive(
    'contentAfter',
    () => <Input contentAfter={<DismissRegular style={{ fontSize: '20px' }} />} placeholder="Placeholder" />,
    { includeRtl: true },
  );
