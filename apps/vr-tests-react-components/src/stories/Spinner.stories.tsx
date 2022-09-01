import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { Spinner } from '@fluentui/react-spinner';
import { tokens } from '@fluentui/react-theme';
import { TestWrapperDecoratorNoAnimation } from '../utilities/TestWrapperDecorator';

// Inverted Spinners are meant to be used over a dark background
// or photo. This wrapper ensures a dark background so the Spinners
// are consistently visible.
const InvertedWrapper: React.FC = ({ children }) => {
  return <div style={{ background: tokens.colorBrandBackgroundStatic, padding: '10px' }}>{children}</div>;
};

storiesOf('Spinner converged', module)
  .addDecorator(TestWrapperDecoratorNoAnimation)
  .addStory('Primary', () => <Spinner className="test-class" />, {
    includeHighContrast: true,
    includeDarkMode: true,
  })
  .addStory('Primary with Label', () => <Spinner className="test-class" label="Loading" />, {
    includeHighContrast: true,
    includeDarkMode: true,
  })
  .addStory(
    'Primary with Label Before',
    () => <Spinner className="test-class" labelPosition="before" label="Loading" />,
    {
      includeHighContrast: true,
      includeDarkMode: true,
      includeRtl: true,
    },
  )
  .addStory(
    'Primary with Label After',
    () => <Spinner className="test-class" labelPosition="after" label="Loading" />,
    {
      includeHighContrast: true,
      includeDarkMode: true,
      includeRtl: true,
    },
  )
  .addStory(
    'Primary with Label Above',
    () => <Spinner className="test-class" labelPosition="above" label="Loading" />,
    {
      includeHighContrast: true,
      includeDarkMode: true,
    },
  )
  .addStory(
    'Primary with Label Below',
    () => <Spinner className="test-class" labelPosition="below" label="Loading" />,
    {
      includeHighContrast: true,
      includeDarkMode: true,
    },
  )
  .addStory('Primary with Size Tiny', () => <Spinner className="test-class" size="tiny" />, {
    includeHighContrast: true,
    includeDarkMode: true,
  })
  .addStory('Primary with Size Extra Small', () => <Spinner className="test-class" size="extra-small" />, {
    includeHighContrast: true,
    includeDarkMode: true,
  })
  .addStory('Primary with Size Small', () => <Spinner className="test-class" size="small" />, {
    includeHighContrast: true,
    includeDarkMode: true,
  })
  .addStory('Primary with Size Medium', () => <Spinner className="test-class" size="medium" />, {
    includeHighContrast: true,
    includeDarkMode: true,
  })
  .addStory('Primary with Size Large', () => <Spinner className="test-class" size="large" />, {
    includeHighContrast: true,
    includeDarkMode: true,
  })
  .addStory('Primary with Size Extra Large', () => <Spinner className="test-class" size="extra-large" />, {
    includeHighContrast: true,
    includeDarkMode: true,
  })
  .addStory('Primary with Huge', () => <Spinner className="test-class" size="huge" />, {
    includeHighContrast: true,
    includeDarkMode: true,
  })
  .addStory(
    'Inverted',
    () => (
      <InvertedWrapper>
        <Spinner className="test-class" appearance="inverted" />
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
        <Spinner className="test-class" appearance="inverted" label="Loading" />
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
        <Spinner className="test-class" appearance="inverted" labelPosition="before" label="Loading" />
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
        <Spinner className="test-class" appearance="inverted" labelPosition="after" label="Loading" />
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
        <Spinner className="test-class" appearance="inverted" labelPosition="above" label="Loading" />
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
        <Spinner className="test-class" appearance="inverted" labelPosition="below" label="Loading" />
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
        <Spinner className="test-class" appearance="inverted" size="tiny" />
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
        <Spinner className="test-class" appearance="inverted" size="extra-small" />
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
        <Spinner className="test-class" appearance="inverted" size="small" />
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
        <Spinner className="test-class" appearance="inverted" size="medium" />
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
        <Spinner className="test-class" appearance="inverted" size="large" />
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
        <Spinner className="test-class" appearance="inverted" size="extra-large" />
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
        <Spinner className="test-class" appearance="inverted" size="huge" />
      </InvertedWrapper>
    ),
    {
      includeHighContrast: true,
      includeDarkMode: true,
    },
  );
