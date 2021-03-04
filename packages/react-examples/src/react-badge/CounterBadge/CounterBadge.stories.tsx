import * as React from 'react';
import { CounterBadge } from '@fluentui/react-badge';

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
        <CounterBadge count={value} />
        <CounterBadge count={value} color="warning" />
        <CounterBadge count={value} color="important" />
        <CounterBadge count={value} color="severe" />
        <CounterBadge count={value} color="informative" />
      </div>
    </>
  );
};
