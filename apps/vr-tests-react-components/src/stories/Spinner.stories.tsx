import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { Spinner } from '@fluentui/react-spinner';
import { tokens } from '@fluentui/react-theme';
import { TestWrapperDecoratorFixedWidth } from '../utilities/TestWrapperDecorator';
import { StoryWright, Steps } from 'storywright';
import { makeStyles } from '@griffel/react';

const useStyles = makeStyles({
  paused: {
    '& *': {
      animationPlayState: 'paused !important',
      animationDelay: '-1s !important',
    },
  },
});

// Inverted Spinners are meant to be used over a dark background
// or photo. This wrapper ensures a dark background so the Spinners
// are consistently visible.
const InvertedWrapper: React.FC = ({ children }) => {
  return <div style={{ background: tokens.colorBrandBackgroundStatic, padding: '10px' }}>{children}</div>;
};

storiesOf('Spinner converged', module)
  .addDecorator(TestWrapperDecoratorFixedWidth)
  .addDecorator(story => (
    <StoryWright steps={new Steps().snapshot('default', { cropTo: '.testWrapper' }).end()}>{story()}</StoryWright>
  ))
  .addStory('Primary', () => <Spinner className={useStyles().paused} />, {
    includeHighContrast: true,
    includeDarkMode: true,
  })
  .addStory(
    'Primary with Label',
    () => (
      <div className={useStyles().paused} style={{ display: 'flex', flexDirection: 'column', rowGap: '20px' }}>
        <Spinner labelPosition="before" label="Loading" />
        <Spinner labelPosition="after" label="Loading" />
        <Spinner labelPosition="above" label="Loading" />
        <Spinner labelPosition="below" label="Loading" />
      </div>
    ),
    {
      includeHighContrast: true,
      includeDarkMode: true,
      includeRtl: true,
    },
  )
  .addStory(
    'Primary + size',
    () => (
      <div className={useStyles().paused} style={{ display: 'flex', flexDirection: 'column', rowGap: '20px' }}>
        <Spinner size="extra-tiny" />
        <Spinner size="tiny" />
        <Spinner size="extra-small" />
        <Spinner size="small" />
        <Spinner size="medium" />
        <Spinner size="large" />
        <Spinner size="extra-large" />
        <Spinner size="huge" />
      </div>
    ),
    {
      includeHighContrast: true,
      includeDarkMode: true,
      includeRtl: true,
    },
  )
  .addStory(
    'Inverted',
    () => (
      <InvertedWrapper>
        <Spinner className={useStyles().paused} appearance="inverted" />
      </InvertedWrapper>
    ),
    {
      includeHighContrast: true,
      includeDarkMode: true,
      includeRtl: true,
    },
  )
  .addStory(
    'Inverted with Label',
    () => (
      <InvertedWrapper>
        <div className={useStyles().paused} style={{ display: 'flex', flexDirection: 'column', rowGap: '20px' }}>
          <Spinner appearance="inverted" labelPosition="before" label="Loading" />
          <Spinner appearance="inverted" labelPosition="after" label="Loading" />
          <Spinner appearance="inverted" labelPosition="above" label="Loading" />
          <Spinner appearance="inverted" labelPosition="below" label="Loading" />
        </div>
      </InvertedWrapper>
    ),
    {
      includeHighContrast: true,
      includeDarkMode: true,
      includeRtl: true,
    },
  )
  .addStory(
    'Inverted + size',
    () => (
      <InvertedWrapper>
        <div className={useStyles().paused} style={{ display: 'flex', flexDirection: 'column', rowGap: '20px' }}>
          <Spinner appearance="inverted" size="extra-tiny" />
          <Spinner appearance="inverted" size="tiny" />
          <Spinner appearance="inverted" size="extra-small" />
          <Spinner appearance="inverted" size="small" />
          <Spinner appearance="inverted" size="medium" />
          <Spinner appearance="inverted" size="large" />
          <Spinner appearance="inverted" size="extra-large" />
          <Spinner appearance="inverted" size="huge" />
        </div>
      </InvertedWrapper>
    ),
    {
      includeHighContrast: true,
      includeDarkMode: true,
    },
  );
