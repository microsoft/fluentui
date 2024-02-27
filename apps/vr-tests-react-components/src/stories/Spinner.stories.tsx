import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { Spinner, spinnerClassNames } from '@fluentui/react-spinner';
import { tokens } from '@fluentui/react-theme';
import { TestWrapperDecoratorFixedWidth } from '../utilities/TestWrapperDecorator';
import { StoryWright, Steps } from 'storywright';
import { makeStyles } from '@griffel/react';

const useStyles = makeStyles({
  paused: {
    '& *': {
      animationPlayState: 'paused !important',
      animationDelay: 'var(--test-animation-delay, -1s) !important',
      animationDuration: '1.5s !important',
    },
    [`& .${spinnerClassNames.spinner}, & .fui-Spinner__Progressbar`]: {
      animationDuration: '3s !important',
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
        <Spinner labelPosition="before" label="Before" />
        <Spinner labelPosition="after" label="After" />
        <Spinner labelPosition="above" label="Above" />
        <Spinner labelPosition="below" label="Below" />
      </div>
    ),
    {
      includeHighContrast: true,
      includeDarkMode: true,
      includeRtl: true,
    },
  )
  .addStory('Primary + size', () => (
    <div className={useStyles().paused} style={{ display: 'flex', flexDirection: 'column', rowGap: '20px' }}>
      <Spinner size="extra-tiny" label="Extra Tiny" />
      <Spinner size="tiny" label="Tiny" />
      <Spinner size="extra-small" label="Extra Small" />
      <Spinner size="small" label="Small" />
      <Spinner size="medium" label="Medium" />
      <Spinner size="large" label="Large" />
      <Spinner size="extra-large" label="Extra Large" />
      <Spinner size="huge" label="Huge" />
    </div>
  ))
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
    },
  )
  .addStory(
    'Inverted with Label',
    () => (
      <InvertedWrapper>
        <div className={useStyles().paused} style={{ display: 'flex', flexDirection: 'column', rowGap: '20px' }}>
          <Spinner appearance="inverted" labelPosition="before" label="Before" />
          <Spinner appearance="inverted" labelPosition="after" label="After" />
          <Spinner appearance="inverted" labelPosition="above" label="Above" />
          <Spinner appearance="inverted" labelPosition="below" label="Below" />
        </div>
      </InvertedWrapper>
    ),
    {
      includeHighContrast: true,
      includeDarkMode: true,
    },
  )
  .addStory('Animation', () => (
    <div className={useStyles().paused} style={{ display: 'flex', columnGap: '5px' }}>
      {Array.from({ length: 15 }).map((_, i) => (
        <Spinner key={i} style={{ '--test-animation-delay': `-${0.1 * i}s` } as React.CSSProperties} />
      ))}
    </div>
  ));
