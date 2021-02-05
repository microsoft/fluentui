import * as React from 'react';
import { Tabs, TabItem } from '@fluentui/react-tabs';

const getTabId = (itemKey: string) => {
  return `ShapeColorTabs_${itemKey}`;
};

export const TabsSeparateExample = () => {
  const [selectedKey, setSelectedKey] = React.useState('rectangleRed');

  const handleTabClick = React.useCallback((item?: TabItem) => {
    if (item) {
      setSelectedKey(item.props.itemKey!);
    }
  }, []);

  return (
    <div>
      <div
        aria-labelledby={getTabId(selectedKey)}
        role="tabpanel"
        style={{
          float: 'left',
          width: 100,
          height: selectedKey === 'squareRed' ? 100 : 200,
          background: selectedKey === 'rectangleGreen' ? 'green' : 'red',
        }}
      />
      <Tabs
        aria-label="Separately Rendered Content Tabs Example"
        selectedKey={selectedKey}
        onTabClick={handleTabClick}
        headersOnly={true}
        getTabId={getTabId}
      >
        <TabItem headerText="Rectangle red" itemKey="rectangleRed" />
        <TabItem headerText="Square red" itemKey="squareRed" />
        <TabItem headerText="Rectangle green" itemKey="rectangleGreen" />
      </Tabs>
    </div>
  );
};
