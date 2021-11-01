import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Button } from '@fluentui/react-button'; // codesandbox-dependency: @fluentui/react-button ^9.0.0-beta
import { makeStyles } from '@fluentui/react-make-styles';
import { FluentProvider } from '@fluentui/react-provider'; // codesandbox-dependency: @fluentui/react-provider ^9.0.0-beta
import { teamsDarkTheme, webLightTheme } from '@fluentui/react-theme'; // codesandbox-dependency: @fluentui/react-theme ^9.0.0-beta

const useStyles = makeStyles({
  example: {
    margin: '5px',
  },
  darkThemeBackground: theme => ({
    backgroundColor: theme.colorBrandBackground,
  }),
});

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

export const Frame = () => {
  const styles = useStyles();

  return (
    <>
      <FluentProvider theme={teamsDarkTheme}>
        <div className={styles.example}>
          <div className={styles.darkThemeBackground}>Teams Dark Theme before iframe</div>
        </div>
        <Button className={styles.example}>Teams Dark Theme before iframe</Button>
        <PortalFrame>
          {externalDocument => {
            return (
              <>
                <FluentProvider targetDocument={externalDocument}>
                  <div>
                    <div className={styles.example}>No theme within iframe</div>
                    <Button className={styles.example}>No theme within iframe</Button>
                  </div>
                </FluentProvider>
                <FluentProvider targetDocument={externalDocument} theme={webLightTheme}>
                  <div>
                    <div className={styles.example}>Web Light Theme within iframe</div>
                    <Button className={styles.example}>Web Light Theme within iframe</Button>
                  </div>
                </FluentProvider>
              </>
            );
          }}
        </PortalFrame>
      </FluentProvider>
    </>
  );
};

Frame.parameters = {
  docs: {
    description: {
      story: 'A Fluent provider does not cross iframes.',
    },
  },
};
