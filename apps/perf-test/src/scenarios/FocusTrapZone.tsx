import * as React from 'react';
import { FocusTrapZone } from '@fluentui/react';

const FocusTrapZoneContent: React.FunctionComponent = () => {
  const items: React.ReactNode[] = [];

  for (let i = 0; i < 20; i++) {
    items.push(<li key={i} data-is-focusable />);
  }
  return <>{items}</>;
};

const Scenario = () => (
  <FocusTrapZone>
    <FocusTrapZoneContent />
  </FocusTrapZone>
);

export default Scenario;
