import * as React from 'react';
import {
  Button,
  FluentProvider,
  Overflow,
  OverflowItem,
  useOverflowMenu,
  webLightTheme,
  createFlatOverflowManager,
} from '@fluentui/react-components';

const itemIds = Array.from({ length: 20 }, (_, index) => `item-${index}`);

const OverflowMenu = (): React.ReactElement | null => {
  const { ref, isOverflowing, overflowCount } = useOverflowMenu<HTMLButtonElement>();

  if (!isOverflowing) {
    return null;
  }

  return (
    <button ref={ref} style={{ width: 64, height: 32, flexShrink: 0 }}>
      +{overflowCount}
    </button>
  );
};

const Scenario = () => {
  return (
    <Overflow padding={0} overflowAxis="horizontal" createManager={createFlatOverflowManager}>
      <div style={{ width: 320, display: 'flex', flexWrap: 'nowrap', whiteSpace: 'nowrap' }}>
        {itemIds.map(id => (
          <OverflowItem key={id} id={id}>
            <Button style={{ width: 64, flexShrink: 0 }}>{id}</Button>
          </OverflowItem>
        ))}
        <OverflowMenu />
      </div>
    </Overflow>
  );
};

Scenario.decorator = (props: { children: React.ReactNode }) => (
  <FluentProvider theme={webLightTheme}>{props.children}</FluentProvider>
);

export default Scenario;
