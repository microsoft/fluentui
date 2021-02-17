import * as React from 'react';
import { useChannel, useAddonState } from '@storybook/api';
import * as CoreEvents from '@storybook/core-events';

import { webLightThemeDebug } from '@fluentui/react-theme';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { Telemetry } from '@fluentui/react-provider';
import { useFluentTheme } from '../../knobs/useFluentTheme';
import { Theme } from '@fluentui/react-theme';

type TokenTypes = 'color' | 'scalar' | 'shadow' | 'other';

const resolveTokenValue = (tokenName: string) => {
  let value = tokenName;
  while (webLightThemeDebug[value]) {
    value = webLightThemeDebug[value];
  }
  return value;
};

// const isTokenGlobal = (tokenName: string) => /global/i.test(tokenName);
const isTokenAlias = (tokenName: string) => /alias/i.test(tokenName);

const getTokenType = (tokenName: string): TokenTypes => {
  if (/-color-|-palette-/i.test(tokenName)) {
    return 'color';
  }

  if (/size|weight|height|width|radius/i.test(tokenName)) {
    return 'scalar';
  }

  if (/shadow/i.test(tokenName)) {
    return 'shadow';
  }

  return 'other';
};

const InputMappedToken: React.FC<{
  tokenName: string;
  mappedTo: string;
  options: Array<string>;
}> = ({ tokenName, mappedTo, options }) => {
  const onChange = React.useCallback(e => console.log(e.target.value), []);
  const isMappedToValidOption = options.indexOf(mappedTo) !== -1;

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        border: !isMappedToValidOption ? '1px solid red' : '',
      }}
    >
      {tokenName}
      <select value={mappedTo} onChange={onChange}>
        {options.map(opt => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
      =>
      <InputColorToken tokenName={mappedTo} />
    </div>
  );
};

const InputColorToken: React.FC<{ tokenName: string }> = ({ tokenName }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
    <input type="color" name={tokenName} value={resolveTokenValue(tokenName)} />
    {tokenName}
  </div>
);

const InputScalarToken: React.FC<{ tokenName: string }> = ({ tokenName, ...rest }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
    <input type="range" name={tokenName} {...rest} />
    {tokenName}
  </div>
);

const InputShadowToken: React.FC<{ tokenName: string }> = ({ tokenName, ...rest }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
    <input type="text" name={tokenName} {...rest} />
    {tokenName}
  </div>
);

const TokenControl: React.FC<{ tokenName: string; theme: Theme }> = ({ tokenName, theme, ...props }) => {
  if (isTokenAlias(tokenName)) {
    // TODO: get alias type and show options from proper global type
    const options = Object.keys(theme.global.palette.grey).map(key => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      return `--global-palette-grey-${key}`;
    });

    // TODO: get the correct theme debug object before looking up alias
    const globalTokenName = webLightThemeDebug[tokenName];

    return <InputMappedToken tokenName={tokenName} mappedTo={globalTokenName} options={options} />;
  }

  const type = getTokenType(tokenName);

  switch (type) {
    case 'color':
      return <InputColorToken tokenName={tokenName} {...props} />;
    case 'scalar':
      return <InputScalarToken tokenName={tokenName} {...props} />;
    case 'shadow':
      return <InputShadowToken tokenName={tokenName} {...props} />;
    case 'other':
      return <strong>OH No, WHATS THIS?{tokenName}</strong>;
  }
};

export const FluentTokens = ({ active }: { active: boolean }) => {
  const { theme } = useFluentTheme();
  const [data, setData] = useAddonState<Record<string, boolean>>('fluentui-tokens/data', {});

  useChannel({
    fui: (telemetry: Telemetry) => {
      setData(telemetry.tokens);
    },
    [CoreEvents.STORY_RENDER]: () => {
      setData({});
    },
  });

  if (!active) {
    return null;
  }

  const sortedTokens = Object.keys(data).sort();
  const used: Array<string> = [];
  const notUsed: Array<string> = [];

  sortedTokens.forEach(token => {
    if (data[token]) {
      used.push(token);
    } else {
      notUsed.push(token);
    }
  });

  return (
    <div>
      <h2>Fluent Tokens</h2>
      <h3>Used</h3>
      <div>
        {used.map(token => (
          <TokenControl key={`t${token}`} tokenName={token} theme={theme} />
        ))}
      </div>
      <h3>Other</h3>
      <div>
        {notUsed.map(token => (
          <TokenControl key={`t${token}`} tokenName={token} theme={theme} />
        ))}
      </div>
    </div>
  );
};
