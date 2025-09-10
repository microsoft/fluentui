import * as React from 'react';
import type { Decorator, Meta } from '@storybook/react';
import { Spinner, spinnerClassNames } from '@fluentui/react-spinner';
import { tokens } from '@fluentui/react-theme';
import { Steps, type StoryParameters } from 'storywright';
import { makeResetStyles, mergeClasses } from '@griffel/react';

import { DARK_MODE, getStoryVariant, HIGH_CONTRAST, RTL } from '../utilities';

const usePauseWrapperClass = makeResetStyles({
  minWidth: '300px',
  padding: '10px',
  [`& .${spinnerClassNames.spinner}, & .${spinnerClassNames.spinnerTail}`]: {
    animationPlayState: 'paused !important',
    animationDelay: 'var(--test-animation-delay, -1s) !important',
    animationDuration: '1.5s !important',
  },
});

const TestWrapperDecoratorPauseAnimation: Decorator = story => (
  <div style={{ display: 'flex' }}>
    <div className={mergeClasses('testWrapper', usePauseWrapperClass())}>{story()}</div>
  </div>
);

// Inverted Spinners are meant to be used over a dark background
// or photo. This wrapper ensures a dark background so the Spinners
// are consistently visible.
const InvertedWrapper: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  return <div style={{ background: tokens.colorBrandBackgroundStatic, padding: '10px' }}>{children}</div>;
};

export default {
  title: 'Spinner converged',

  decorators: [TestWrapperDecoratorPauseAnimation],
  parameters: {
    storyWright: { steps: new Steps().snapshot('default', { cropTo: '.testWrapper' }).end() },
  } satisfies StoryParameters,
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

export const SpinnerMinWidth = () => (
  <div
    style={{
      display: 'flex',
    }}
  >
    <Spinner />
    <span>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
      magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
      consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
      Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed
      ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam,
      eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam
      voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione
      voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci
      velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut
      enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea
      commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae
      consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?
    </span>
  </div>
);
