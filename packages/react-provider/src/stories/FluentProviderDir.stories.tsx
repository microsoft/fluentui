import * as React from 'react';
import { makeStyles } from '@fluentui/react-make-styles';
import { FluentProvider } from '../FluentProvider';

const useStyles = makeStyles({
  example: {
    display: 'flex',
    flexDirection: 'column',
    gap: '5px',
    width: '300px',
  },
  text: theme => ({
    backgroundColor: theme.colorBrandBackground2,
    color: theme.colorBrandForeground2,
    fontSize: '18px',
    border: '1px',
    borderRadius: '5px',
    padding: '5px',
  }),
});

export const Dir = () => {
  const styles = useStyles();
  return (
    <>
      <div className={styles.example}>
        <FluentProvider>
          <div className={styles.text}>Text left to right</div>
        </FluentProvider>
        <FluentProvider dir="rtl">
          <div className={styles.text}>نص من اليمين إلى اليسار</div>
        </FluentProvider>
      </div>
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
