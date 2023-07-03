import * as React from 'react';
import { Steps, StoryWright } from 'storywright';
import { storiesOf } from '@storybook/react';
import { SearchBox } from '@fluentui/react-search';
import { ArrowEnterLeftRegular, MicRegular } from '@fluentui/react-icons';
import { TestWrapperDecorator } from '../utilities/TestWrapperDecorator';

// Focused & unfocused stories
storiesOf('SearchBox Converged', module)
  .addDecorator(TestWrapperDecorator)
  .addDecorator(story => (
    <StoryWright
      steps={new Steps()
        .snapshot('default', { cropTo: '.testWrapper' })
        .click('input')
        .snapshot('hover', { cropTo: '.testWrapper' })
        .click('input')
        .wait(250) // let focus border animation finish
        .snapshot('focused', { cropTo: '.testWrapper' })
        .end()}
    >
      {story()}
    </StoryWright>
  ))
  .addStory('With value', () => <SearchBox defaultValue="Value!" />)
  .addStory('Appearance: outline (default)', () => <SearchBox placeholder="Placeholder" />)
  .addStory('Appearance: underline', () => <SearchBox appearance="underline" placeholder="Placeholder" />)
  .addStory('Appearance: filled-darker', () => <SearchBox appearance="filled-darker" placeholder="Placeholder" />)
  .addStory('Appearance: filled-lighter', () => (
    // filledLighter requires a background to show up (this is colorNeutralBackground3 in web light theme)
    <div style={{ background: '#f5f5f5', padding: '10px' }}>
      <SearchBox appearance="filled-lighter" placeholder="Placeholder" />
    </div>
  ))
  .addStory('Size: small', () => <SearchBox size="small" placeholder="Placeholder" />)
  .addStory('Size: large', () => <SearchBox size="large" placeholder="Placeholder" />)
  .addStory('Disabled, appearance: outline', () => <SearchBox disabled value="Disabled" />)
  .addStory('Disabled, appearance: underline', () => <SearchBox disabled appearance="underline" value="Disabled" />)
  .addStory('Disabled, appearance: filled-darker', () => (
    <SearchBox disabled appearance="filled-darker" value="Disabled" />
  ))
  .addStory('Disabled, appearance: filled-lighter', () => (
    // filledLighter requires a background to show up (this is colorNeutralBackground3 in web light theme)
    <div style={{ background: '#f5f5f5', padding: '10px' }}>
      <SearchBox disabled appearance="filled-lighter" value="Disabled" />
    </div>
  ))
  .addStory('WIth contentAfter', () => <SearchBox contentAfter={<MicRegular />} placeholder="Placeholder" />, {
    includeRtl: true,
  })
  .addStory('With custom dismiss', () => <SearchBox dismiss={<ArrowEnterLeftRegular />} placeholder="Placeholder" />, {
    includeRtl: true,
  });

// Focused & unfocused stories
storiesOf('SearchBox Converged', module)
  .addDecorator(TestWrapperDecorator)
  .addDecorator(story => (
    <StoryWright
      steps={new Steps()
        .snapshot('default', { cropTo: '.testWrapper' })
        .keys('input', 'Tab')
        .wait(250) // let focus border animation finish
        .snapshot('input focused', { cropTo: '.testWrapper' })
        .focus('[role=button]')
        .snapshot('dismiss focused', { cropTo: '.testWrapper' })
        .click('[role=button]')
        .snapshot('dismiss clicked', { cropTo: '.testWrapper' })
        .end()}
    >
      {story()}
    </StoryWright>
  ))
  .addStory('Clears value', () => <SearchBox defaultValue="Value!" />);
