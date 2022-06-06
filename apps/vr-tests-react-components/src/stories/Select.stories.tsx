import * as React from 'react';
import Screener, { Steps } from 'screener-storybook/src/screener';
import { storiesOf } from '@storybook/react';
import { Select } from '@fluentui/react-select';
import { TestWrapperDecoratorFixedWidth } from '../utilities/TestWrapperDecorator';

storiesOf('Select Converged', module)
  .addDecorator(TestWrapperDecoratorFixedWidth)
  .addDecorator(story => (
    <Screener
      steps={new Steps()
        .snapshot('default', { cropTo: '.testWrapper' })
        .hover('select')
        .snapshot('hover', { cropTo: '.testWrapper' })
        .focus('select')
        .wait(250) // let focus border animation finish
        .snapshot('focused', { cropTo: '.testWrapper' })
        .end()}
    >
      {story()}
    </Screener>
  ))
  .addStory('Appearance: outline (default)', () => (
    <Select>
      <option>text</option>
    </Select>
  ))
  .addStory('Appearance: underline', () => (
    <Select appearance="underline">
      <option>text</option>
    </Select>
  ))
  .addStory('Appearance: filled-darker', () => (
    <div style={{ background: '#00335c', padding: '10px' }}>
      <Select appearance="filled-darker">
        <option>text</option>
      </Select>
    </div>
  ))
  .addStory('Appearance: filled-lighter', () => (
    <div style={{ background: '#00335c', padding: '10px' }}>
      <Select appearance="filled-lighter">
        <option>text</option>
      </Select>
    </div>
  ));

// Non-interactive stories
storiesOf('Select Converged', module)
  .addDecorator(TestWrapperDecoratorFixedWidth)
  // note: due to reused "Select Converged" story ID, TestWrapperDecoratorFixedWidth is also reused
  .addDecorator(story => (
    <Screener steps={new Steps().snapshot('default', { cropTo: '.testWrapper' }).end()}>{story()}</Screener>
  ))
  .addStory('With value', () => (
    <Select>
      <option>Red</option>
      <option selected>Green</option>
      <option>Blue</option>
    </Select>
  ))
  .addStory('Disabled', () => (
    <Select disabled>
      <option>text</option>
    </Select>
  ))
  .addStory('Size: small', () => (
    <Select size="small">
      <option>text</option>
    </Select>
  ))
  .addStory('Size: large', () => (
    <Select size="large">
      <option>text</option>
    </Select>
  ))
  .addStory('Inline', () => (
    <p>
      Some text with{' '}
      <Select inline style={{ width: '75px' }}>
        <option>text</option>
      </Select>{' '}
      an inline select
    </p>
  ))
  .addStory('Custom Icon', () => (
    <Select icon="+">
      <option>text</option>
    </Select>
  ));
