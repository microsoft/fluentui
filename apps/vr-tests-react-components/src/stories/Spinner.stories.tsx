import * as React from 'react';
import type { DecoratorFn, Meta } from '@storybook/react';
import { Spinner, spinnerClassNames } from '@fluentui/react-spinner';
import { tokens } from '@fluentui/react-theme';
import { Steps } from 'storywright';
import { makeResetStyles, mergeClasses } from '@griffel/react';

import { DARK_MODE, getStoryVariant, HIGH_CONTRAST, RTL, withStoryWrightSteps } from '../utilities';

const usePauseWrapperClass = makeResetStyles({
  minWidth: '300px',
  padding: '10px',
  [`& .${spinnerClassNames.spinner}, & .${spinnerClassNames.spinnerTail}`]: {
    animationPlayState: 'paused !important',
    animationDelay: 'var(--test-animation-delay, -1s) !important',
    animationDuration: '1.5s !important',
  },
});

const TestWrapperDecoratorPauseAnimation: DecoratorFn = story => (
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

export default {
  title: 'Spinner converged',

  decorators: [
    TestWrapperDecoratorPauseAnimation,
    story => withStoryWrightSteps({ story, steps: new Steps().snapshot('default', { cropTo: '.testWrapper' }).end() }),
  ],
} satisfies Meta<typeof Spinner>;

export const Primary = () => <Spinner />;

export const PrimaryHighContrast = getStoryVariant(Primary, HIGH_CONTRAST);

export const PrimaryDarkMode = getStoryVariant(Primary, DARK_MODE);

export const PrimaryWithLabel = () => (
  <div style={{ display: 'flex', flexDirection: 'column', rowGap: '20px' }}>
    <Spinner labelPosition="before" label="Before" />
    <Spinner labelPosition="after" label="After" />
    <Spinner labelPosition="above" label="Above" />
    <Spinner labelPosition="below" label="Below" />
  </div>
);

PrimaryWithLabel.storyName = 'Primary with Label';

export const PrimaryWithLabelHighContrast = getStoryVariant(PrimaryWithLabel, HIGH_CONTRAST);

export const PrimaryWithLabelDarkMode = getStoryVariant(PrimaryWithLabel, DARK_MODE);

export const PrimaryWithLabelRTL = getStoryVariant(PrimaryWithLabel, RTL);

export const PrimarySize = () => (
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
);
PrimarySize.storyName = 'Primary + size';

export const Inverted = () => (
  <InvertedWrapper>
    <Spinner appearance="inverted" />
  </InvertedWrapper>
);

export const InvertedHighContrast = getStoryVariant(Inverted, HIGH_CONTRAST);

export const InvertedDarkMode = getStoryVariant(Inverted, DARK_MODE);

export const InvertedWithLabel = () => (
  <InvertedWrapper>
    <div style={{ display: 'flex', flexDirection: 'column', rowGap: '20px' }}>
      <Spinner appearance="inverted" labelPosition="before" label="Before" />
      <Spinner appearance="inverted" labelPosition="after" label="After" />
      <Spinner appearance="inverted" labelPosition="above" label="Above" />
      <Spinner appearance="inverted" labelPosition="below" label="Below" />
    </div>
  </InvertedWrapper>
);

InvertedWithLabel.storyName = 'Inverted with Label';

export const InvertedWithLabelHighContrast = getStoryVariant(InvertedWithLabel, HIGH_CONTRAST);

export const InvertedWithLabelDarkMode = getStoryVariant(InvertedWithLabel, DARK_MODE);

export const Animation = () => (
  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(16, auto)', gap: '20px 2px' }}>
    {Array.from({ length: 75 }).map((_, i) => (
      <Spinner key={i} style={{ '--test-animation-delay': `${-0.02 * i}s` } as React.CSSProperties} />
    ))}
  </div>
);

export const AnimationRTL = getStoryVariant(Animation, RTL);
