import * as React from 'react';
import { TabList, Tab } from '@fluentui/react-headless-components-preview';

const tabs = [
  { value: 'account', label: 'Account', content: 'Manage your account settings and preferences.' },
  { value: 'security', label: 'Security', content: 'Update your password and configure two-factor authentication.' },
  { value: 'notifications', label: 'Notifications', content: 'Choose what you are notified about and how.' },
];

export const Default = (): React.ReactNode => {
  const [selected, setSelected] = React.useState('account');

  return (
    <div className="w-full max-w-md">
      <TabList
        selectedValue={selected}
        onTabSelect={(_, data) => setSelected(data.value as string)}
        className="flex border-b border-gray-200"
      >
        {tabs.map(tab => (
          <Tab
            key={tab.value}
            value={tab.value}
            className="-mb-px px-4 py-2.5 text-sm font-medium text-gray-500 transition-colors hover:text-gray-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 border-b-2 border-b-transparent data-[selected]:border-gray-900 data-[selected]:text-gray-900"
          >
            {tab.label}
          </Tab>
        ))}
      </TabList>
      <div className="p-4 text-sm text-gray-600">{tabs.find(t => t.value === selected)?.content}</div>
    </div>
  );
};
