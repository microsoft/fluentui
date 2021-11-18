import * as React from 'react';
import Screener, { Steps } from 'screener-storybook/src/screener';
import { storiesOf } from '@storybook/react';
import { DecoratorFunction } from '@storybook/addons';
import { Input } from '@fluentui/react-input';
import { Search20Regular, Dismiss20Regular } from '@fluentui/react-icons';
import { StoryFnReactReturnType } from '@storybook/react/dist/ts3.9/client/preview/types';

const InputDecorator: DecoratorFunction<StoryFnReactReturnType> = story => (
  <div style={{ display: 'flex' }}>
    <div className="testWrapper" style={{ padding: '10px', width: '300px' }}>
      {story()}
    </div>
  </div>
);

// TODO move input.* props to root once primary slot helper is integrated

storiesOf('Input Converged', module)
  .addDecorator(InputDecorator)
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
    // filledLighter requires a background to show up (this is colorNeutralBackground3)
    <div style={{ background: '#141414', padding: '10px' }}>
      <Input appearance="filledLighter" input={{ placeholder: 'Placeholder' }} />
    </div>
  ))
  .addStory('Disabled', () => <Input input={{ disabled: true }} />)
  // TODO move defaultValue prop to root
  .addStory('With value', () => <Input input={{ defaultValue: 'Value!' }} />);

storiesOf('Input Converged (non-interactive)', module)
  .addDecorator(InputDecorator)
  .addDecorator(story => (
    <Screener steps={new Steps().snapshot('default', { cropTo: '.testWrapper' }).end()}>
      {story()}
    </Screener>
  ))
  .addStory('Size: small', () => <Input fieldSize="small" input={{ placeholder: 'Placeholder' }} />)
  .addStory('Size: large', () => <Input fieldSize="large" input={{ placeholder: 'Placeholder' }} />)
  .addStory('Inline', () => (
    <p>
      Some text with <Input inline input={{ placeholder: 'Placeholder' }} /> inline input
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
