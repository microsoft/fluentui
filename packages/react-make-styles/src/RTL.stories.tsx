import { makeStyles, mergeClasses } from './index';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore - (see https://github.com/microsoft/fluentui/pull/18695#issuecomment-868432982)
import { FluentProvider } from '@fluentui/react-provider';
import { webLightTheme } from '@fluentui/react-theme';
import * as React from 'react';

const useStyles = makeStyles({
  box: theme => ({
    border: `5px solid ${theme.alias.color.neutral.neutralStroke1}`,
    borderLeft: `20px solid ${theme.alias.color.blue.border2}`,

    backgroundColor: theme.alias.color.neutral.neutralBackground1,
    color: theme.alias.color.neutral.neutralForeground1,

    margin: '5px',
    padding: '5px',
    paddingLeft: '50px',
  }),

  container: theme => ({
    border: `5px solid ${theme.alias.color.neutral.neutralStroke1}`,
    borderLeft: `20px solid ${theme.alias.color.blue.border2}`,

    margin: '5px',
    padding: '5px',
  }),
  containerPrimary: theme => ({
    borderLeftColor: theme.alias.color.darkOrange.border2,
  }),
});

const Box: React.FC = props => {
  const classes = useStyles();

  return <div className={classes.box}>{props.children}</div>;
};

const Container: React.FC<{ className?: string; primary?: boolean }> = props => {
  const classes = useStyles();

  return (
    <div className={mergeClasses(classes.container, props.primary && classes.containerPrimary, props.className)}>
      {props.children}
    </div>
  );
};

export const RTL = () => (
  <>
    <p>
      This scenario renders "Box" (raw output from "makeStyles()") and "Container" ("mergeClasses()" usage) components
      in RTL.
    </p>

    <FluentProvider dir="rtl" theme={webLightTheme}>
      <Box>مرحبا بالعالم!</Box>
      <Container>مرحبا بالعالم!</Container>
    </FluentProvider>
  </>
);

export const MixedRTL = () => (
  <>
    <p>This scenario shows that it's possible to combine LTR and RTL layout on a page without collisions.</p>

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

export default {
  title: 'Components/RTL',
  component: RTL,
};
