import { CalendarMonth24Regular } from '@fluentui/react-icons';
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
  sizeExamples: {
    alignItems: 'flex-start',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    rowGap: '20px',
    padding: '20px 0',
  },
});

export const Size = (props: Partial<TabProps>) => {
  const styles = useStyles();

  const renderTabs = () => {
    return (
      <>
        <Tab icon={<CalendarMonth24Regular />} value="tab1">
          First Tab
        </Tab>
        <Tab icon={<CalendarMonth24Regular />} value="tab2">
          Second Tab
        </Tab>
        <Tab icon={<CalendarMonth24Regular />} value="tab3">
          Third Tab
        </Tab>
        <Tab icon={<CalendarMonth24Regular />} value="tab4">
          Fourth Tab
        </Tab>
      </>
    );
  };

  return (
    <div className={styles.root}>
      <div className={styles.sizeExamples}>
        <TabList defaultSelectedKey="tab2" size="small">
          {renderTabs()}
        </TabList>
        <TabList defaultSelectedKey="tab2" size="medium">
          {renderTabs()}
        </TabList>
      </div>
      <div className={styles.sizeExamples}>
        <TabList defaultSelectedKey="tab2" size="small" vertical>
          {renderTabs()}
        </TabList>
        <TabList defaultSelectedKey="tab2" size="medium" vertical>
          {renderTabs()}
        </TabList>
      </div>
      <div className={styles.sizeExamples}>
        <TabList defaultSelectedKey="tab2" size="small" verticalTabContent>
          {renderTabs()}
        </TabList>
        <TabList defaultSelectedKey="tab2" size="medium" verticalTabContent>
          {renderTabs()}
        </TabList>
      </div>
      <div className={styles.sizeExamples}>
        <TabList defaultSelectedKey="tab2" size="small" vertical verticalTabContent>
          {renderTabs()}
        </TabList>
        <TabList defaultSelectedKey="tab2" size="medium" vertical verticalTabContent>
          {renderTabs()}
        </TabList>
      </div>
    </div>
  );
};
