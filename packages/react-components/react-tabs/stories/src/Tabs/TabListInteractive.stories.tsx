import * as React from 'react';
import { Button, makeStyles, InteractiveTab, TabList } from '@fluentui/react-components';
import type { TabListProps } from '@fluentui/react-components';
import { CalendarMonthRegular, CalendarMonthFilled, bundleIcon } from '@fluentui/react-icons';

const CalendarMonth = bundleIcon(CalendarMonthFilled, CalendarMonthRegular);

const useStyles = makeStyles({
  root: {
    alignItems: 'flex-start',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    padding: '50px 20px',
    rowGap: '20px',
  },
  tab: {
    paddingInline: '20px',
  },
  contentBefore: {
    position: 'absolute',
    top: '6px',
    left: '6px',
    zIndex: 1,
  },
  contentAfter: {
    position: 'absolute',
    top: '6px',
    right: '6px',
    zIndex: 1,
  },
});

export const Interactive = (props: Partial<TabListProps>) => {
  const styles = useStyles();

  return (
    <div className={styles.root}>
      <TabList appearance="subtle" {...props}>
        <InteractiveTab
          value="tab1"
          className={styles.tab}
          contentBefore={
            <Button
              className={styles.contentBefore}
              appearance="subtle"
              icon={<CalendarMonth />}
              tabIndex={-1}
              onClick={() => alert('Button was clicked')}
            />
          }
          contentAfter={
            <Button
              className={styles.contentAfter}
              appearance="subtle"
              icon={<CalendarMonth />}
              onClick={() => alert('Button was clicked')}
              tabIndex={-1}
            />
          }
        >
          First Tab
        </InteractiveTab>
        <InteractiveTab value="tab2">Second Tab</InteractiveTab>
        <InteractiveTab value="tab3">Third Tab</InteractiveTab>
        <InteractiveTab value="tab4">Fourth Tab</InteractiveTab>
      </TabList>
    </div>
  );
};

Interactive.parameters = {
  docs: {
    description: {
      story: 'A tab can be used with interactive elements before and after the tab label.',
    },
  },
};
