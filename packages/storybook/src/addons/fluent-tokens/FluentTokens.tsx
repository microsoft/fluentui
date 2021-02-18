import * as React from 'react';
import { useChannel, useAddonState } from '@storybook/api';
import * as CoreEvents from '@storybook/core-events';

import { themeToCSSVariables, webLightThemeDebug } from '@fluentui/react-theme';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { Telemetry } from '@fluentui/react-provider';
import { useFluentTheme } from '../../knobs/useFluentTheme';
import { Theme } from '@fluentui/react-theme';

type TokenTypes = 'color' | 'scalar' | 'shadow' | 'other';

const resolveTokenAliasToGlobal = (tokenName: string, aliasToTokens: Record<string, string>) => {
  let value = tokenName;
  while (aliasToTokens[value]?.startsWith('--')) {
    value = aliasToTokens[value];
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

type ThemeData = {
  theme: Theme;
  tokensToValues: Record<string, string>;
  aliasToTokens: Record<string, string>;
  tokenNames: string[];
};

const InputMappedToken: React.FC<{
  tokenName: string;
  themeData: ThemeData;
}> = ({ tokenName, themeData }) => {
  const onChange = React.useCallback(e => console.log(e.target.value), []);

  // TODO: this walks the whole chain from tokenName to global - we should show all the intermediate aliases as well
  const globalTokenName = resolveTokenAliasToGlobal(tokenName, themeData.aliasToTokens);

  const isMappedToValidOption = themeData.tokenNames.indexOf(globalTokenName) !== -1;

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        ...(!isMappedToValidOption && {
          backgroundColor: '#FFE0E0',
        }),
      }}
    >
      {tokenName}
      <select value={globalTokenName} onChange={onChange}>
        {themeData.tokenNames.map(opt => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
      =>
      <InputColorToken tokenName={globalTokenName} themeData={themeData} />
    </div>
  );
};

const InputColorToken: React.FC<{ tokenName: string; themeData: ThemeData }> = ({ tokenName, themeData }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
    <input type="color" name={tokenName} value={themeData.tokensToValues[tokenName]} />
    {tokenName} ({themeData.tokensToValues[tokenName]})
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

const TokenControl: React.FC<{ tokenName: string; themeData: ThemeData }> = ({ tokenName, themeData, ...props }) => {
  if (isTokenAlias(tokenName)) {
    return <InputMappedToken tokenName={tokenName} themeData={themeData} />;
  }

  const type = getTokenType(tokenName);

  switch (type) {
    case 'color':
      return <InputColorToken tokenName={tokenName} themeData={themeData} {...props} />;
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

  const themeData: ThemeData = React.useMemo(() => {
    const tokensToValues = themeToCSSVariables(theme);
    return {
      theme,
      tokensToValues,
      aliasToTokens: webLightThemeDebug,
      tokenNames: Object.keys(tokensToValues),
    };
  }, [theme]);

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
      <h3
        style={{
          margin: '1em 0',
          fontWeight: 'bold',
          borderBottom: '1px dotted #ddddff',
          padding: '1em 0.4em',
        }}
      >
        Used
      </h3>
      <div>
        {used.map(token => (
          <TokenControl key={`t${token}`} tokenName={token} themeData={themeData} />
        ))}
      </div>
      <h3
        style={{
          margin: '1em 0',
          fontWeight: 'bold',
          borderBottom: '1px dotted #ddddff',
          padding: '1em 0.4em',
        }}
      >
        Other
      </h3>
      <div>
        {notUsed.map(token => (
          <TokenControl key={`t${token}`} tokenName={token} themeData={themeData} />
        ))}
      </div>
    </div>
  );
};
