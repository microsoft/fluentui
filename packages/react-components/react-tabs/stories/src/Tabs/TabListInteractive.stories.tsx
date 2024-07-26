import * as React from 'react';
import { makeStyles, InteractiveTab, TabList } from '@fluentui/react-components';
import type { TabListProps } from '@fluentui/react-components';

const useStyles = makeStyles({
  root: {
    alignItems: 'flex-start',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    padding: '50px 20px',
    rowGap: '20px',
  },
});

export const Interactive = (props: Partial<TabListProps>) => {
  const styles = useStyles();

  return (
    <div className={styles.root}>
      <TabList {...props}>
        <InteractiveTab value="tab1" contentBefore={<button>Before</button>} contentAfter={<button>x</button>}>
          First Tab
        </InteractiveTab>
        <InteractiveTab value="tab2">Second Tab</InteractiveTab>
        <InteractiveTab value="tab3">Third Tab</InteractiveTab>
        <InteractiveTab value="tab4">Fourth Tab</InteractiveTab>
      </TabList>
    </div>
  );
};
