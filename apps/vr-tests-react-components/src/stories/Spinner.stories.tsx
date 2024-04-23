import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { Spinner, spinnerClassNames } from '@fluentui/react-spinner';
import { tokens } from '@fluentui/react-theme';
import { DecoratorFunction } from '@storybook/addons';
import { ExtendedStoryFnReturnType } from '../utilities/types';
import { StoryWright, Steps } from 'storywright';
import { makeResetStyles, mergeClasses } from '@griffel/react';

const usePauseWrapperClass = makeResetStyles({
  minWidth: '300px',
  padding: '10px',
  [`& .${spinnerClassNames.spinner}, & .${spinnerClassNames.spinnerTail}`]: {
    animationPlayState: 'paused !important',
    animationDelay: 'var(--test-animation-delay, -1s) !important',
    animationDuration: '1.5s !important',
  },
});

export const TestWrapperDecoratorPauseAnimation: DecoratorFunction<ExtendedStoryFnReturnType> = story => (
  <div style={{ display: 'flex' }}>
    <div className={mergeClasses('testWrapper', usePauseWrapperClass())}>{story()}</div>
  </div>
);

// Inverted Spinners are meant to be used over a dark background
// or photo. This wrapper ensures a dark background so the Spinners
// are consistently visible.
const InvertedWrapper: React.FC = ({ children }) => {
  return <div style={{ background: tokens.colorBrandBackgroundStatic, padding: '10px' }}>{children}</div>;
};

storiesOf('Spinner converged', module)
  .addDecorator(TestWrapperDecoratorPauseAnimation)
  .addDecorator(story => (
    <StoryWright steps={new Steps().snapshot('default', { cropTo: '.testWrapper' }).end()}>{story()}</StoryWright>
  ))
  .addStory('Primary', () => <Spinner />, {
    includeHighContrast: true,
    includeDarkMode: true,
  })
  .addStory(
    'Primary with Label',
    () => (
      <div style={{ display: 'flex', flexDirection: 'column', rowGap: '20px' }}>
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
    <div style={{ display: 'flex', flexDirection: 'column', rowGap: '20px' }}>
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
        <div style={{ display: 'flex', flexDirection: 'column', rowGap: '20px' }}>
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
  .addStory(
    'Animation',
    () => (
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(16, auto)', gap: '20px 2px' }}>
        {Array.from({ length: 75 }).map((_, i) => (
          <Spinner key={i} style={{ '--test-animation-delay': `${-0.02 * i}s` } as React.CSSProperties} />
        ))}
      </div>
    ),
    {
      includeRtl: true,
    },
  );
