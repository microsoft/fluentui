import * as React from 'react';
import { Steps, StoryWright } from 'storywright';
import { storiesOf } from '@storybook/react';
import { SearchBox } from '@fluentui/react-search';
import { ArrowEnterLeftRegular, MicRegular, PersonRegular } from '@fluentui/react-icons';
import { TestWrapperDecorator } from '../utilities/TestWrapperDecorator';
import { FluentProvider } from '@fluentui/react-provider';

// Focused & unfocused stories
storiesOf('SearchBox Converged', module)
  .addDecorator(TestWrapperDecorator)
  .addDecorator(story => (
    <StoryWright
      steps={new Steps()
        .snapshot('default', { cropTo: '.testWrapper' })
        .click('input')
        .wait(250) // let focus border animation finish
        .snapshot('focused', { cropTo: '.testWrapper' })
        .end()}
    >
      {story()}
    </StoryWright>
  ))
  .addStory('With value', () => <SearchBox defaultValue="Value!" />)
  .addStory('Size: small', () => <SearchBox size="small" placeholder="Placeholder" />)
  .addStory('Size: large', () => <SearchBox size="large" placeholder="Placeholder" />)
  .addStory(
    'custom contentBefore',
    () => <SearchBox contentBefore={<PersonRegular style={{ fontSize: '20px' }} />} placeholder="Placeholder" />,
    { includeRtl: true },
  )
  .addStory(
    'contentAfter',
    () => <SearchBox contentAfter={<MicRegular style={{ fontSize: '20px' }} />} placeholder="Placeholder" />,
    { includeRtl: true },
  )
  .addStory(
    'custom dismiss',
    () => <SearchBox dismiss={<ArrowEnterLeftRegular style={{ fontSize: '20px' }} />} placeholder="Placeholder" />,
    { includeRtl: true },
  );
