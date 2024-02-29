import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { Spinner, spinnerClassNames } from '@fluentui/react-spinner';
import { tokens } from '@fluentui/react-theme';
import { TestWrapperDecorator, TestWrapperDecoratorFixedWidth } from '../utilities/TestWrapperDecorator';
import { StoryWright, Steps } from 'storywright';
import { makeStyles, mergeClasses, shorthands } from '@griffel/react';

const useWrapperStyles = makeStyles({
  base: {
    display: 'flex',
    flexDirection: 'column',
    columnGap: '2px',
    rowGap: '20px',
    '& *': {
      animationPlayState: 'paused !important',
      animationDelay: 'var(--test-animation-delay, -1s) !important',
    },
  },
  animationGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(16, auto)',
  },
  inverted: {
    backgroundColor: tokens.colorBrandBackgroundStatic,
    ...shorthands.padding('10px'),
  },
  // The test runner has reduced-motion enabled by default, so need to override and 'undo' the reduced motion styles.
  noReducedMotion: {
    '& *': {
      animationDuration: '1.5s !important',
      animationIterationCount: 'infinite !important',
    },
    [`& .${spinnerClassNames.spinnerTail}`]: {
      backgroundImage: 'none !important',
      '&::before, &::after': {
        content: '"" !important',
      },
    },
  },
});

type WrapperProps = {
  animationGrid?: boolean;
  inverted?: boolean;
  reducedMotion?: boolean;
};

const Wrapper: React.FC<WrapperProps> = props => {
  const { animationGrid, inverted, reducedMotion, children } = props;

  const styles = useWrapperStyles();
  return (
    <div
      className={mergeClasses(
        styles.base,
        animationGrid && styles.animationGrid,
        inverted && styles.inverted,
        !reducedMotion && styles.noReducedMotion,
      )}
    >
      {children}
    </div>
  );
};

storiesOf('Spinner converged', module)
  .addDecorator(TestWrapperDecoratorFixedWidth)
  .addDecorator(story => (
    <StoryWright steps={new Steps().snapshot('default', { cropTo: '.testWrapper' }).end()}>{story()}</StoryWright>
  ))
  .addStory(
    'Primary',
    () => (
      <Wrapper>
        <Spinner />
      </Wrapper>
    ),
    {
      includeHighContrast: true,
      includeDarkMode: true,
    },
  )
  .addStory(
    'Primary - Reduced Motion',
    () => (
      <Wrapper reducedMotion>
        <Spinner />
      </Wrapper>
    ),
    {
      includeHighContrast: true,
      includeDarkMode: true,
    },
  )
  .addStory(
    'Primary with Label',
    () => (
      <Wrapper>
        <Spinner labelPosition="before" label="Before" />
        <Spinner labelPosition="after" label="After" />
        <Spinner labelPosition="above" label="Above" />
        <Spinner labelPosition="below" label="Below" />
      </Wrapper>
    ),
    {
      includeHighContrast: true,
      includeDarkMode: true,
      includeRtl: true,
    },
  )
  .addStory('Primary + size', () => (
    <Wrapper>
      <Spinner size="extra-tiny" label="Extra Tiny" />
      <Spinner size="tiny" label="Tiny" />
      <Spinner size="extra-small" label="Extra Small" />
      <Spinner size="small" label="Small" />
      <Spinner size="medium" label="Medium" />
      <Spinner size="large" label="Large" />
      <Spinner size="extra-large" label="Extra Large" />
      <Spinner size="huge" label="Huge" />
    </Wrapper>
  ))
  .addStory(
    'Inverted',
    () => (
      <Wrapper inverted>
        <Spinner appearance="inverted" />
      </Wrapper>
    ),
    {
      includeHighContrast: true,
      includeDarkMode: true,
    },
  )
  .addStory('Inverted - Reduced Motion', () => (
    <Wrapper inverted reducedMotion>
      <Spinner appearance="inverted" />
    </Wrapper>
  ))
  .addStory(
    'Inverted with Label',
    () => (
      <Wrapper inverted>
        <Spinner appearance="inverted" labelPosition="before" label="Before" />
        <Spinner appearance="inverted" labelPosition="after" label="After" />
        <Spinner appearance="inverted" labelPosition="above" label="Above" />
        <Spinner appearance="inverted" labelPosition="below" label="Below" />
      </Wrapper>
    ),
    {
      includeHighContrast: true,
      includeDarkMode: true,
    },
  );

storiesOf('Spinner converged', module)
  .addDecorator(TestWrapperDecorator)
  .addDecorator(story => (
    <StoryWright steps={new Steps().snapshot('default', { cropTo: '.testWrapper' }).end()}>{story()}</StoryWright>
  ))
  .addStory(
    'Animation',
    () => (
      <Wrapper animationGrid>
        {Array.from({ length: 75 }).map((_, i) => (
          <Spinner key={i} style={{ '--test-animation-delay': `${-0.02 * i}s` } as React.CSSProperties} />
        ))}
      </Wrapper>
    ),
    {
      includeRtl: true,
    },
  )
  .addStory(
    'Animation - Reduced Motion',
    () => (
      <Wrapper animationGrid reducedMotion>
        {Array.from({ length: 45 }).map((_, i) => (
          <Spinner key={i} style={{ '--test-animation-delay': `${-0.04 * i}s` } as React.CSSProperties} />
        ))}
      </Wrapper>
    ),
    {
      includeRtl: true,
    },
  );
