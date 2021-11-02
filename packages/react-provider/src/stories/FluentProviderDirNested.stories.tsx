import * as React from 'react';
import { makeStyles } from '@fluentui/react-make-styles';
import { FluentProvider } from '@fluentui/react-provider';

const useStyles = makeStyles({
  example: {
    margin: '5px',
  },
  darkThemeBackground: theme => ({
    backgroundColor: theme.colorBrandBackground,
  }),
});

export const DirNested = () => {
  const styles = useStyles();
  return (
    <>
      <FluentProvider dir="rtl">
        <div className={styles.example}>نص من اليمين إلى اليسار</div>
        <FluentProvider dir="ltr">
          <div className={styles.example}>Text left to right</div>
        </FluentProvider>
      </FluentProvider>
    </>
  );
};

DirNested.parameters = {
  docs: {
    description: {
      story: 'Nested Fluent providers can have different LTR and RTL layout.',
    },
  },
};
