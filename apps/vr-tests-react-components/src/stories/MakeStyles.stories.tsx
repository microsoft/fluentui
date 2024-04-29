import { shorthands, mergeClasses, makeStyles } from '@griffel/react';
import { FluentProvider } from '@fluentui/react-provider';
import { tokens, webLightTheme } from '@fluentui/react-theme';
import { storiesOf } from '@storybook/react';
import * as React from 'react';
import { Steps, StoryWright } from 'storywright';

const useStyles = makeStyles({
  box: {
    ...shorthands.border('5px', 'solid', tokens.colorNeutralStroke1),
    ...shorthands.borderLeft('20px', 'solid', tokens.colorPaletteBerryBorder2),

    backgroundColor: tokens.colorNeutralBackground1,
    color: tokens.colorNeutralForeground1,

    ...shorthands.margin('5px'),
    ...shorthands.padding('5px'),
    paddingLeft: '50px',
  },

  container: {
    ...shorthands.border('5px', 'solid', tokens.colorNeutralStroke1),
    ...shorthands.borderLeft('20px', 'solid', tokens.colorPaletteBerryBorder2),

    ...shorthands.margin('5px'),
    ...shorthands.padding('5px'),
  },
  containerPrimary: {
    borderLeftColor: tokens.colorPaletteDarkOrangeBorder2,
  },

  provider: {
    marginLeft: '20px',
  },
});

const useFocusStylesA = makeStyles({
  root: {
    ...shorthands.border('3px', 'solid', 'blue'),
    ...shorthands.padding('10px'),

    ':focus': {
      color: 'red',
    },
    ':hover': {
      color: 'blue',
    },
  },
});
const useFocusStylesB = makeStyles({
  root: {
    ...shorthands.border('3px', 'solid', 'orange'),
    ...shorthands.padding('10px'),

    ':hover': {
      color: 'orange',
    },
    ':focus': {
      color: 'green',
    },
  },
});

const Box: React.FC = props => {
  const classes = useStyles();

  return <div className={classes.box}>{props.children}</div>;
};

const BoxWithPseudo: React.FC = () => {
  const classesA = useFocusStylesA();
  const classesB = useFocusStylesB();

  return (
    <div style={{ display: 'flex', gap: '5px', flexDirection: 'column' }}>
      <p>When element is focused & hovered - border color & text color should match</p>

      <div className={classesA.root} id="boxA" tabIndex={0}>
        A focusable element
      </div>
      <div className={classesB.root} id="boxB" tabIndex={0}>
        A focusable element
      </div>
    </div>
  );
};

const Container: React.FC<{ className?: string; primary?: boolean }> = props => {
  const classes = useStyles();

  return (
    <div className={mergeClasses(classes.container, props.primary && classes.containerPrimary, props.className)}>
      {props.children}
    </div>
  );
};

const ClassNameProvider: React.FC<{
  children: (className: string) => React.ReactElement;
}> = props => {
  const classes = useStyles();

  return props.children(classes.provider);
};

export const Nested = () => (
  <>
    <p>This scenario shows that it's possible to have nested components (LTR inside RTL).</p>

    <FluentProvider dir="rtl" theme={webLightTheme}>
      <Container primary>مرحبا بالعالم!</Container>

      <FluentProvider dir="ltr">
        <Container primary>Hello world!</Container>
      </FluentProvider>
    </FluentProvider>
  </>
);

export const Propagation = () => (
  <>
    <p>
      This scenario shows classes propagation between boundaries with "mergeClasses()" function: classes generated in
      LTR context will be applied properly in RTL.
    </p>

    <FluentProvider theme={webLightTheme}>
      <ClassNameProvider>
        {className => (
          <FluentProvider dir="rtl">
            <Container className={className} primary>
              مرحبا بالعالم!
            </Container>
          </FluentProvider>
        )}
      </ClassNameProvider>

      <FluentProvider dir="rtl">
        <ClassNameProvider>
          {className => (
            <FluentProvider dir="ltr">
              <Container className={className} primary>
                Hello world!
              </Container>
            </FluentProvider>
          )}
        </ClassNameProvider>
      </FluentProvider>
    </FluentProvider>
  </>
);

// RTL stories
// Check for details: packages/react-examples/src/react-make-styles/RTL/RTL.stories.tsx

storiesOf('MakeStyles', module)
  .addDecorator(story => (
    <StoryWright steps={new Steps().snapshot('normal', { cropTo: '.testWrapper' }).end()}>
      <div className="testWrapper" style={{ width: '300px' }}>
        {story()}
      </div>
    </StoryWright>
  ))
  .addStory('RTL: two components in a single Provider', () => (
    <FluentProvider dir="rtl" theme={webLightTheme}>
      <Box>مرحبا بالعالم!</Box>
      <Container>مرحبا بالعالم!</Container>
    </FluentProvider>
  ))
  .addStory('RTL: two providers with different directions as siblings', () => (
    <>
      <FluentProvider theme={webLightTheme}>
        <Box>Hello world!</Box>
        <Container primary>Hello world!</Container>
      </FluentProvider>

      <FluentProvider dir="rtl" theme={webLightTheme}>
        <Box>مرحبا بالعالم!</Box>
        <Container primary>مرحبا بالعالم!</Container>
      </FluentProvider>
    </>
  ))
  .addStory('RTL: two providers with different directions as children', () => (
    <FluentProvider dir="rtl" theme={webLightTheme}>
      <Container primary>مرحبا بالعالم!</Container>

      <FluentProvider dir="ltr">
        <Container primary>Hello world!</Container>
      </FluentProvider>
    </FluentProvider>
  ));

// Pseudo selectors stories

storiesOf('MakeStyles (pseudo)', module)
  .addDecorator(story => (
    <StoryWright
      steps={new Steps()
        .snapshot('normal', { cropTo: '.testWrapper' })
        .focus('#boxA')
        .snapshot('boxA, focus', { cropTo: '.testWrapper' })
        .hover('#boxA')
        .snapshot('boxA, focus+hover', { cropTo: '.testWrapper' })
        .focus('#boxB')
        .hover('#boxB')
        .snapshot('boxB, focus+hover', { cropTo: '.testWrapper' })
        .end()}
    >
      <div className="testWrapper" style={{ width: '300px' }}>
        {story()}
      </div>
    </StoryWright>
  ))
  .addStory('insertion is ordered', () => <BoxWithPseudo />);
