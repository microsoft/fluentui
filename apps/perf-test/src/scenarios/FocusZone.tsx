import * as React from 'react';
import { FocusZone } from 'office-ui-fabric-react';

const FocusZoneExample: React.FunctionComponent = () => {
  const items: React.ReactNode[] = [];

  for (let i = 0; i < 20; i++) {
    items.push(<li key={i} data-is-focusable={true} />);
  }

  return <FocusZone as="ul">{items}</FocusZone>;
};

const scenario = <FocusZoneExample />;

export default scenario;
