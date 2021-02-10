import { ax, makeOverrides } from '@fluentui/react-make-styles';
import { FluentProvider } from '@fluentui/react-provider';
import { webLightTheme, teamsLightTheme } from '@fluentui/react-theme';
import * as React from 'react';
import * as ReactDOM from 'react-dom';

const useBasicStyles = makeOverrides({
  root: theme => ({
    border: `5px solid ${theme.alias.color.neutral.neutralStroke1}`,
    backgroundColor: theme.alias.color.neutral.neutralBackground1,
    color: theme.alias.color.neutral.neutralForeground1,

    margin: '5px',
    padding: '5px',
  }),

  primary: theme => ({
    borderColor: theme.alias.color.neutral.brandForeground,
    color: theme.alias.color.neutral.brandForeground,
  }),
});

const useOverrideStyles = makeOverrides({
  root: {
    color: 'red',
    borderColor: 'red',
  },
});

const Container: React.FC<{ className?: string; primary?: boolean }> = props => {
  const classes = useBasicStyles();
  const className = ax(classes.root, props.primary && classes.primary, props.className);

  return <div className={className}>{props.children}</div>;
};

const ContainerWithOverrides: React.FC = props => {
  const classes = useOverrideStyles();

  return (
    <Container className={classes.root} primary>
      {props.children}
    </Container>
  );
};

const PortalFrame: React.FunctionComponent<{
  children: (externalDocument: Document) => React.ReactElement;
}> = ({ children }) => {
  const [frameRef, setFrameRef] = React.useState<HTMLIFrameElement | null>(null);

  return (
    <>
      <iframe
        ref={setFrameRef}
        style={{ height: 300, width: 600, border: 0, padding: 20 }}
        title="An example of Provider in iframe"
      />
      {frameRef &&
        ReactDOM.createPortal(
          children(frameRef.contentDocument as Document),
          (frameRef.contentDocument as Document).body,
        )}
    </>
  );
};

export const Basic = () => (
  <FluentProvider theme={webLightTheme}>
    <Container>Hello world!</Container>
    <Container primary>Hello world!</Container>
  </FluentProvider>
);

export const Overrides = () => (
  <FluentProvider theme={webLightTheme}>
    <ContainerWithOverrides>Hello world!</ContainerWithOverrides>
  </FluentProvider>
);

export const Nesting = () => (
  <FluentProvider theme={webLightTheme}>
    <FluentProvider theme={teamsLightTheme}>
      <Container primary>Hello world!</Container>
    </FluentProvider>
  </FluentProvider>
);

export const Frame = () => (
  <PortalFrame>
    {externalDocument => (
      <FluentProvider document={externalDocument} theme={webLightTheme}>
        <Container>Hello world!</Container>
        <Container primary>Hello world!</Container>
      </FluentProvider>
    )}
  </PortalFrame>
);
