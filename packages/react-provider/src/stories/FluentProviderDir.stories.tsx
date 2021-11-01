import * as React from 'react';
import { makeStyles } from '@fluentui/react-make-styles';
import { FluentProvider } from '@fluentui/react-provider'; // codesandbox-dependency: @fluentui/react-provider ^9.0.0-beta

const useStyles = makeStyles({
  example: {
    margin: '5px',
  },
  darkThemeBackground: theme => ({
    backgroundColor: theme.colorBrandBackground,
  }),
});

export const Dir = () => {
  const styles = useStyles();
  return (
    <>
      <FluentProvider>
        <div className={styles.example}>Text left to right</div>
      </FluentProvider>
      <FluentProvider dir="rtl">
        <div className={styles.example}>نص من اليمين إلى اليسار</div>
      </FluentProvider>
    </>
  );
};

Dir.parameters = {
  docs: {
    description: {
      story: 'A Fluent provider can render text left-to-right (LTR) or right-to-left (RTL).',
    },
  },
};
