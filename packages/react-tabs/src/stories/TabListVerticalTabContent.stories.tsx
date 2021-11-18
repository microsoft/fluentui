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
    rowGap: '20px',
  },
  cube: theme => ({
    background: theme.colorBrandBackground2,
    border: '1px solid',
    borderColor: theme.colorBrandStroke1,
    display: 'block',
    margin: '2px',
    height: '10px',
    width: '10px',
  }),
});

export const VerticalTabContent = (props: Partial<TabProps>) => {
  const styles = useStyles();

  const renderTabs = () => {
    return (
      <>
        <Tab value="tab1">
          <div className={styles.cube} />
          First Tab
        </Tab>
        <Tab value="tab2">
          <div className={styles.cube} />
          Second Tab
        </Tab>
        <Tab value="tab3">
          <div className={styles.cube} />
          Third Tab
        </Tab>
        <Tab value="tab4">
          <div className={styles.cube} />
          Fourth Tab
        </Tab>
      </>
    );
  };

  return (
    <div className={styles.root}>
      <TabList defaultSelectedValue="tab2" verticalTabContent>
        {renderTabs()}
      </TabList>
      <TabList defaultSelectedValue="tab2" vertical verticalTabContent>
        {renderTabs()}
      </TabList>
    </div>
  );
};

VerticalTabContent.parameters = {
  docs: {
    description: {
      story: 'The content within each tab can be arranged vertically. The default is false.',
    },
  },
};
