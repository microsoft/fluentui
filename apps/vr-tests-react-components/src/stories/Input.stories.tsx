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
  .addStory('Appearance: outline (default)', () => <Input placeholder="Placeholder" />)
  .addStory('Appearance: underline', () => <Input appearance="underline" placeholder="Placeholder" />)
  .addStory('Appearance: filledDarker', () => <Input appearance="filledDarker" placeholder="Placeholder" />)
  .addStory('Appearance: filledLighter', () => (
    // filledLighter requires a background to show up (this is colorNeutralBackground3 in web light theme)
    <div style={{ background: '#f5f5f5', padding: '10px' }}>
      <Input appearance="filledLighter" placeholder="Placeholder" />
    </div>
  ))
  .addStory('Disabled', () => <Input disabled />)
  .addStory('With value', () => <Input defaultValue="Value!" />);

// Non-interactive stories
storiesOf('Input Converged', module)
  .addDecorator(TestWrapperDecoratorFixedWidth)
  // note: due to reused "Input Converged" story ID, TestWrapperDecoratorFixedWidth is also reused
  .addDecorator(story => (
    <Screener steps={new Steps().snapshot('default', { cropTo: '.testWrapper' }).end()}>{story()}</Screener>
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
  );
