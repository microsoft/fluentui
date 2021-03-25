import { makeStyles, ax } from '@fluentui/react-make-styles';
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

  provider: {
    paddingLeft: '20px',
  },
});

const Box: React.FC = props => {
  const classes = useStyles();

  return <div className={classes.box}>{props.children}</div>;
};

const Container: React.FC<{ className?: string; primary?: boolean }> = props => {
  const classes = useStyles();

  return (
    <div className={ax(classes.container, props.primary && classes.containerPrimary, props.className)}>
      {props.children}
    </div>
  );
};

const ClassNameProvider: React.FC<{ children: (className: string) => React.ReactElement }> = props => {
  const classes = useStyles();

  return props.children(classes.provider);
};

export const RTL = () => (
  <>
    <p>
      This scenario renders "Box" (raw output from "makeStyles()") and "Container" ("ax()" usage) components in RTL.
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

export const Propagation = () => (
  <>
    <p>
      This scenario shows classes propagation between boundaries with "ax()" function: classes generated in LTR context
      will be applied properly in RTL.
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
