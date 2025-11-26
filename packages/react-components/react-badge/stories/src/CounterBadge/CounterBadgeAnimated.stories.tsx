import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';

import { CounterBadge } from '@fluentui/react-components';
import type { CounterBadgeProps } from '@fluentui/react-components';

export const AnimatedBadge = (args: CounterBadgeProps): JSXElement => {
  const [count, setCount] = React.useState(5);
  const [inputValue, setInputValue] = React.useState('5');

  const handleUpdate = () => {
    const newCount = Number(inputValue);
    if (!isNaN(newCount)) {
      setCount(newCount);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleUpdate();
    }
  };

  return (
    <div>
      <CounterBadge count={count} isAnimated={true} />
      <div>
        <button onClick={() => setCount(count + 1)}>Increase</button>
        <button onClick={() => setCount(count - 1)}>Decrease</button>
        <input
          type="number"
          value={inputValue}
          onChange={e => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          style={{ marginLeft: '10px', padding: '5px' }}
        />
        <button onClick={handleUpdate} style={{ marginLeft: '5px' }}>
          Update
        </button>
      </div>
    </div>
  );
};
