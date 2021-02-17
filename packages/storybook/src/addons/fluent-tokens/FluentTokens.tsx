import * as React from 'react';
import { useChannel, useAddonState } from '@storybook/api';
import * as CoreEvents from '@storybook/core-events';

import { Telemetry } from '@fluentui/react-provider';

export const FluentTokens = ({ active }: { active: boolean }) => {
  const [data, setData] = useAddonState<Record<string, boolean>>('fluentui-tokens/data', {});

  useChannel({
    fui: (telemetry: Telemetry) => {
      setData(telemetry.tokens);
    },
    [CoreEvents.STORY_RENDER]: () => {
      setData({});
    },
  });

  return active ? (
    <div>
      <h2>Fluent Tokens</h2>
      <h3>Used</h3>
      <ul>
        {Object.keys(data)
          .filter(d => data[d])
          .map(d => (
            <li key={`t${d}`}>{d}</li>
          ))}
      </ul>
      <h3>Other</h3>
      <ul>
        {Object.keys(data)
          .filter(d => !data[d])
          .map(d => (
            <li key={`t${d}`}>{d}</li>
          ))}
      </ul>
    </div>
  ) : null;
};
