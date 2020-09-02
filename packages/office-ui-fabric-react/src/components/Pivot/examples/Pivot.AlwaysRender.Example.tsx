import * as React from 'react';
import { Pivot, PivotItem } from 'office-ui-fabric-react/lib/Pivot';
import { Toggle } from 'office-ui-fabric-react/lib/Toggle';
import { useBoolean } from '@uifabric/react-hooks';

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
  const [alwaysRender, { toggle: toggleActiveOnly }] = useBoolean(false);

  return (
    <div>
      <Toggle label="Always render children" inlineLabel checked={alwaysRender} onChange={toggleActiveOnly} />
      <Pivot aria-label="Separately Rendered Content Pivot Example">
        <PivotItem headerText="Expensive component #1" alwaysRender={alwaysRender}>
          <ExpensiveToMount />
          Component #1
        </PivotItem>
        <PivotItem headerText="Expensive component #2" alwaysRender={alwaysRender}>
          <ExpensiveToMount />
          Component #2
        </PivotItem>
      </Pivot>
    </div>
  );
};
