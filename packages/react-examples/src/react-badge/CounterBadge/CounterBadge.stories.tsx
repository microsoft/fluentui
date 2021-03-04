import * as React from 'react';
import { CounterBadge } from '@fluentui/react-badge';

const DisplayBadge: React.FC<{}> = (props) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: 4, margin: 4 }}>{props.children}</div>
);

export const BadgeAppearanceExample = () => {
  const [value, setValue] = React.useState(90);
  return (
    <>
      <div
        style={{
          marginBottom: 16,
        }}
      >
        <button
          onClick={() => {
            if (value > 0) {
              setValue((val) => val - 1);
            }
          }}
        >
          -
        </button>
        <button onClick={() => setValue((val) => val + 1)}>+</button>
      </div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          maxWidth: 200,
        }}
      >
        <DisplayBadge>
          <CounterBadge showZero={false} count={0} />
          <CounterBadge count={value} />
        </DisplayBadge>
        <DisplayBadge>
          <CounterBadge showZero={false} count={0} color="warning" />
          <CounterBadge count={value} color="warning" />
        </DisplayBadge>
        <DisplayBadge>
          <CounterBadge showZero={false} count={0} color="important" />
          <CounterBadge count={value} color="important" />
        </DisplayBadge>
        <DisplayBadge>
          <CounterBadge showZero={false} count={0} color="severe" />
          <CounterBadge count={value} color="severe" />
        </DisplayBadge>
        <DisplayBadge>
          <CounterBadge showZero={false} count={0} color="informative" />
          <CounterBadge count={value} color="informative" />
        </DisplayBadge>
      </div>
    </>
  );
};
