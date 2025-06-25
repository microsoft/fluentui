import { shorthands, mergeClasses, makeStyles } from '@griffel/react';
import { FluentProvider } from '@fluentui/react-provider';
import { tokens, webLightTheme } from '@fluentui/react-theme';
import * as React from 'react';
import type { Meta } from '@storybook/react';
import { Steps } from 'storywright';
import { withStoryWrightSteps } from '../../utilities';

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

const Box: React.FC<{ children?: React.ReactNode }> = props => {
  const classes = useStyles();

  return <div className={classes.box}>{props.children}</div>;
};

const Container: React.FC<{ className?: string; primary?: boolean; children?: React.ReactNode }> = props => {
  const classes = useStyles();

  return (
    <div className={mergeClasses(classes.container, props.primary && classes.containerPrimary, props.className)}>
      {props.children}
    </div>
  );
};

export default {
  title: 'MakeStyles',

  decorators: [
    (storyFn, context) => (
      <div className="testWrapper" style={{ width: '300px' }}>
        {storyFn(context)}
      </div>
    ),
    story => withStoryWrightSteps({ story, steps: new Steps().snapshot('normal', { cropTo: '.testWrapper' }).end() }),
  ],
} satisfies Meta<'div'>;

export const RtlTwoComponentsInASingleProvider = () => (
  <FluentProvider dir="rtl" theme={webLightTheme}>
    <Box>مرحبا بالعالم!</Box>
    <Container>مرحبا بالعالم!</Container>
  </FluentProvider>
);
RtlTwoComponentsInASingleProvider.storyName = 'RTL: two components in a single Provider';

export const RtlTwoProvidersWithDifferentDirectionsAsSiblings = () => (
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
);
RtlTwoProvidersWithDifferentDirectionsAsSiblings.storyName = 'RTL: two providers with different directions as siblings';

export const RtlTwoProvidersWithDifferentDirectionsAsChildren = () => (
  <FluentProvider dir="rtl" theme={webLightTheme}>
    <Container primary>مرحبا بالعالم!</Container>

    <FluentProvider dir="ltr">
      <Container primary>Hello world!</Container>
    </FluentProvider>
  </FluentProvider>
);
RtlTwoProvidersWithDifferentDirectionsAsChildren.storyName = 'RTL: two providers with different directions as children';
