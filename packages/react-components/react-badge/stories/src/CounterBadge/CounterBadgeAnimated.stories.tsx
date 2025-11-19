import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';

import { CounterBadge } from '@fluentui/react-components';
import type { CounterBadgeProps } from '@fluentui/react-components';

export const AnimatedBadge = (args: CounterBadgeProps): JSXElement => {
  const [count, setCount] = React.useState(5);

  return (
    <div>
      <CounterBadge count={count} isAnimated={true} />
      <div>
        <button onClick={() => setCount(count + 1)}>Increase</button>
        <button onClick={() => setCount(count - 1)}>Decrease</button>
      </div>
    </div>
  );
};
