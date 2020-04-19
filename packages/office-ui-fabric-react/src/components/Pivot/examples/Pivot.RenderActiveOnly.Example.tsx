import * as React from 'react';
import { Pivot, PivotItem } from 'office-ui-fabric-react/lib/Pivot';
import { Toggle } from 'office-ui-fabric-react/lib/Toggle';

const ExpensiveToMount: React.FC = () => {
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => {
    setTimeout(() => {
      setMounted(true);
    }, 3000);
  }, []);
  return <div>{mounted ? 'Rendered' : 'Mounting...'}</div>;
};

export const PivotRenderActiveOnlyExample: React.FC = () => {
  const [activeOnly, setActiveOnly] = React.useState(true);

  const toggleActiveOnly = () => {
    setActiveOnly(!activeOnly);
  };

  return (
    <div>
      <Toggle label="Render active only" inlineLabel checked={activeOnly} onChange={toggleActiveOnly} />
      <Pivot aria-label="Separately Rendered Content Pivot Example" renderActiveOnly={activeOnly}>
        <PivotItem headerText="Expensive component #1">
          <ExpensiveToMount />
          Component #1
        </PivotItem>
        <PivotItem headerText="Expensive component #2">
          <ExpensiveToMount />
          Component #2
        </PivotItem>
      </Pivot>
    </div>
  );
};
