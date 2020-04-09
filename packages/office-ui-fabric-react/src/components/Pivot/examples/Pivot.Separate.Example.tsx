import * as React from 'react';
import { Pivot, PivotItem } from 'office-ui-fabric-react/lib/Pivot';

const getTabId = (itemKey: string) => {
  return `ShapeColorPivot_${itemKey}`;
};

export const PivotSeparateExample = () => {
  const [selectedKey, setSelectedKey] = React.useState('rectangleRed');

  const handleLinkClick = (item: PivotItem) => {
    setSelectedKey(item.props.itemKey!);
  };

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
      <Pivot
        aria-label="Separately Rendered Content Pivot Example"
        selectedKey={selectedKey}
        onLinkClick={handleLinkClick}
        headersOnly={true}
        getTabId={getTabId}
      >
        <PivotItem headerText="Rectangle red" itemKey="rectangleRed" />
        <PivotItem headerText="Square red" itemKey="squareRed" />
        <PivotItem headerText="Rectangle green" itemKey="rectangleGreen" />
      </Pivot>
    </div>
  );
};
