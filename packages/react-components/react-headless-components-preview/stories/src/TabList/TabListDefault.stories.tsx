import * as React from 'react';
import { TabList, Tab } from '@fluentui/react-headless-components-preview/tab-list';

import styles from './tab-list.module.css';
const tabs = [
  { value: 'account', label: 'Account', content: 'Manage your account settings and preferences.' },
  {
    value: 'security',
    label: 'Security',
    content: 'Update your password and configure two-factor authentication.',
  },
  { value: 'notifications', label: 'Notifications', content: 'Choose what you are notified about and how.' },
];

export const Default = (): React.ReactNode => {
  const [selected, setSelected] = React.useState('account');
  const active = tabs.find(t => t.value === selected);

  return (
    <div className={`${styles.layout} ${styles.demo}`}>
      <TabList
        selectedValue={selected}
        onTabSelect={(_, data) => setSelected(data.value as string)}
        className={styles.tabs}
      >
        {tabs.map(tab => (
          <Tab key={tab.value} value={tab.value} className={styles.tab}>
            {tab.label}
          </Tab>
        ))}
      </TabList>
      <div className={styles.panel}>
        <h4 className={styles.panelTitle}>{active?.label}</h4>
        {active?.content}
      </div>
    </div>
  );
};
