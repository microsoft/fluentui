import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { Spinner } from '@fluentui/react-spinner';
import { tokens } from '@fluentui/react-theme';
import { PauseAnimationDecorator, TestWrapperDecoratorFixedWidth } from '../utilities/TestWrapperDecorator';
import { StoryWright, Steps } from 'storywright';

// Inverted Spinners are meant to be used over a dark background
// or photo. This wrapper ensures a dark background so the Spinners
// are consistently visible.
const InvertedWrapper: React.FC = ({ children }) => {
  return <div style={{ background: tokens.colorBrandBackgroundStatic, padding: '10px' }}>{children}</div>;
};

storiesOf('Spinner converged', module)
  .addDecorator(TestWrapperDecoratorFixedWidth)
  .addDecorator(PauseAnimationDecorator)
  .addDecorator(story => (
    <StoryWright steps={new Steps().snapshot('default', { cropTo: '.testWrapper' }).end()}>{story()}</StoryWright>
  ))
  .addStory('Primary', () => <Spinner />, {
    includeHighContrast: true,
    includeDarkMode: true,
  })
  .addStory('Primary with Label', () => <Spinner label="Loading" />, {
    includeHighContrast: true,
    includeDarkMode: true,
  })
  .addStory('Primary with Label Before', () => <Spinner labelPosition="before" label="Loading" />, {
    includeHighContrast: true,
    includeDarkMode: true,
    includeRtl: true,
  })
  .addStory('Primary with Label After', () => <Spinner labelPosition="after" label="Loading" />, {
    includeHighContrast: true,
    includeDarkMode: true,
    includeRtl: true,
  })
  .addStory('Primary with Label Above', () => <Spinner labelPosition="above" label="Loading" />, {
    includeHighContrast: true,
    includeDarkMode: true,
  })
  .addStory('Primary with Label Below', () => <Spinner labelPosition="below" label="Loading" />, {
    includeHighContrast: true,
    includeDarkMode: true,
  })
  .addStory('Primary with Size Tiny', () => <Spinner size="tiny" />, {
    includeHighContrast: true,
    includeDarkMode: true,
  })
  .addStory('Primary with Size Extra Small', () => <Spinner size="extra-small" />, {
    includeHighContrast: true,
    includeDarkMode: true,
  })
  .addStory('Primary with Size Small', () => <Spinner size="small" />, {
    includeHighContrast: true,
    includeDarkMode: true,
  })
  .addStory('Primary with Size Medium', () => <Spinner size="medium" />, {
    includeHighContrast: true,
    includeDarkMode: true,
  })
  .addStory('Primary with Size Large', () => <Spinner size="large" />, {
    includeHighContrast: true,
    includeDarkMode: true,
  })
  .addStory('Primary with Size Extra Large', () => <Spinner size="extra-large" />, {
    includeHighContrast: true,
    includeDarkMode: true,
  })
  .addStory('Primary with Huge', () => <Spinner size="huge" />, {
    includeHighContrast: true,
    includeDarkMode: true,
  })
  .addStory(
    'Inverted',
    () => (
      <InvertedWrapper>
        <Spinner appearance="inverted" />
      </InvertedWrapper>
    ),
    {
      includeHighContrast: true,
      includeDarkMode: true,
    },
  )
  .addStory(
    'Inverted with Label',
    () => (
      <InvertedWrapper>
        <Spinner appearance="inverted" label="Loading" />
      </InvertedWrapper>
    ),
    {
      includeHighContrast: true,
      includeDarkMode: true,
    },
  )
  .addStory(
    'Inverted with Label Before',
    () => (
      <InvertedWrapper>
        <Spinner appearance="inverted" labelPosition="before" label="Loading" />
      </InvertedWrapper>
    ),
    {
      includeHighContrast: true,
      includeDarkMode: true,
    },
  )
  .addStory(
    'Inverted with Label After',
    () => (
      <InvertedWrapper>
        <Spinner appearance="inverted" labelPosition="after" label="Loading" />
      </InvertedWrapper>
    ),
    {
      includeHighContrast: true,
      includeDarkMode: true,
    },
  )
  .addStory(
    'Inverted with Label Above',
    () => (
      <InvertedWrapper>
        <Spinner appearance="inverted" labelPosition="above" label="Loading" />
      </InvertedWrapper>
    ),
    {
      includeHighContrast: true,
      includeDarkMode: true,
    },
  )
  .addStory(
    'Inverted with Label Below',
    () => (
      <InvertedWrapper>
        <Spinner appearance="inverted" labelPosition="below" label="Loading" />
      </InvertedWrapper>
    ),
    {
      includeHighContrast: true,
      includeDarkMode: true,
    },
  )
  .addStory(
    'Primary with Size Tiny',
    () => (
      <InvertedWrapper>
        <Spinner appearance="inverted" size="tiny" />
      </InvertedWrapper>
    ),
    {
      includeHighContrast: true,
      includeDarkMode: true,
    },
  )
  .addStory(
    'Inverted with Size Extra Small',
    () => (
      <InvertedWrapper>
        <Spinner appearance="inverted" size="extra-small" />
      </InvertedWrapper>
    ),
    {
      includeHighContrast: true,
      includeDarkMode: true,
    },
  )
  .addStory(
    'Inverted with Size Small',
    () => (
      <InvertedWrapper>
        <Spinner appearance="inverted" size="small" />
      </InvertedWrapper>
    ),
    {
      includeHighContrast: true,
      includeDarkMode: true,
    },
  )
  .addStory(
    'Inverted with Size Medium',
    () => (
      <InvertedWrapper>
        <Spinner appearance="inverted" size="medium" />
      </InvertedWrapper>
    ),
    {
      includeHighContrast: true,
      includeDarkMode: true,
    },
  )
  .addStory(
    'Inverted with Size Large',
    () => (
      <InvertedWrapper>
        <Spinner appearance="inverted" size="large" />
      </InvertedWrapper>
    ),
    {
      includeHighContrast: true,
      includeDarkMode: true,
    },
  )
  .addStory(
    'Inverted with Size Extra Large',
    () => (
      <InvertedWrapper>
        <Spinner appearance="inverted" size="extra-large" />
      </InvertedWrapper>
    ),
    {
      includeHighContrast: true,
      includeDarkMode: true,
    },
  )
  .addStory(
    'Inverted with Huge',
    () => (
      <InvertedWrapper>
        <Spinner appearance="inverted" size="huge" />
      </InvertedWrapper>
    ),
    {
      includeHighContrast: true,
      includeDarkMode: true,
    },
  );
