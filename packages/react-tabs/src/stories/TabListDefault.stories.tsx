import { makeStyles } from '@fluentui/react-make-styles';
import * as React from 'react';
import { Tab, TabList, TabProps } from '../index'; // codesandbox-dependency: @fluentui/react-tabs ^9.0.0-beta

const useStyles = makeStyles({
  root: {
    alignItems: 'flex-start',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    padding: '50px 20px',
    rowGap: '5px',
  },
});

export const Default = (props: Partial<TabProps>) => {
  const styles = useStyles();

  return (
    <div className={styles.root}>
      <TabList defaultSelectedKey="2">
        <Tab {...props} value="1">
          First Tab
        </Tab>
        <Tab {...props} value="2">
          Second Tab
        </Tab>
        <Tab {...props} value="3">
          Third Tab
        </Tab>
        <Tab {...props} value="4">
          Fourth Tab
        </Tab>
      </TabList>
    </div>
  );
};
