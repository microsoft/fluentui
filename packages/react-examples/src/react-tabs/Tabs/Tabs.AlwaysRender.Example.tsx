import * as React from 'react';
import { Tabs, TabItem } from '@fluentui/react-tabs';
import { Toggle } from '@fluentui/react/lib/Toggle';
import { useBoolean } from '@fluentui/react-hooks';

const ExpensiveToMount: React.FC = () => {
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => {
    setTimeout(() => {
      setMounted(true);
    }, 3000);
  }, []);
  return <div>{mounted ? 'Rendered' : 'Mounting...'}</div>;
};

export const TabsRenderActiveOnlyExample: React.FC = () => {
  const [alwaysRender, { toggle: toggleAlwaysRender }] = useBoolean(false);

  return (
    <div>
      <Toggle label="Always render children" inlineLabel checked={alwaysRender} onChange={toggleAlwaysRender} />
      <Tabs aria-label="Separately Rendered Content Tabs Example">
        <TabItem headerText="Expensive component #1" alwaysRender={alwaysRender}>
          <ExpensiveToMount />
          Component #1
        </TabItem>
        <TabItem headerText="Expensive component #2" alwaysRender={alwaysRender}>
          <ExpensiveToMount />
          Component #2
        </TabItem>
      </Tabs>
    </div>
  );
};
