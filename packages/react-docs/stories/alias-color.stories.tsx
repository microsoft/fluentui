import * as React from 'react';
import Color from 'color';

import { ColorRampItem } from '../src/components/ColorRamp';
import { webLightTheme, webDarkTheme } from '@fluentui/react-theme';

export default {
  title: 'Fluent UI Theme/Colors/Alias',
};

const buttonStyle = ({ active }): React.CSSProperties => ({
  padding: '0.5em 1em',
  width: 100,
  fontWeight: !!active ? 'bold' : 'normal',
  border: !!active ? '2px solid white' : '2px solid transparent',
  borderRadius: 0,
  outline: 'none ',
});

export const Alias = (args, { globals: { theme } }) => {
  const [color, setColor] = React.useState<string>('neutral');

  const COLUMN_WIDTH = 250;

  return (
    <>
      <div>
        <button
          style={{
            background: webDarkTheme.neutralColorTokens.neutralBackground1,
            color: webDarkTheme.neutralColorTokens.neutralForeground1,
            ...buttonStyle({ active: color === 'neutral' }),
          }}
          onClick={() => setColor('neutral')}
        >
          neutral
        </button>
        {Object.keys(webLightTheme.sharedColorTokens).map((colorName) => (
          <button
            key={colorName}
            style={{
              background: webLightTheme.sharedColors[colorName].primary,
              color:
                webLightTheme.sharedColors[colorName][
                  Color(webLightTheme.sharedColors[colorName].primary).isDark() ? 'tint60' : 'shade50'
                ],
              ...buttonStyle({ active: color === colorName }),
            }}
            onClick={() => setColor(colorName)}
          >
            {colorName}
          </button>
        ))}
      </div>

      <div>
        <div style={{ display: 'flex' }}>
          <h3 style={{ flex: `0 0 ${COLUMN_WIDTH}px`, padding: '1em', margin: 0 }}>Design Token</h3>
          <h3 style={{ flex: `0 0 ${COLUMN_WIDTH}px`, padding: '1em', margin: 0 }}>Web Light</h3>
          <h3 style={{ flex: `0 0 ${COLUMN_WIDTH}px`, padding: '1em', margin: 0 }}>Web Dark</h3>
          <h3 style={{ flex: `0 0 ${COLUMN_WIDTH}px`, padding: '1em', margin: 0 }}>Web High Contrast</h3>
        </div>
        {color === 'neutral'
          ? Object.keys(theme.light.neutralColorTokens).map((name) => (
              <div key={name} style={{ display: 'flex' }}>
                <div style={{ padding: '1em', width: COLUMN_WIDTH, fontWeight: 'bold' }}>{name}</div>
                <ColorRampItem value={theme.light.neutralColorTokens[name]} />
                <ColorRampItem value={theme.dark.neutralColorTokens[name]} />
                <ColorRampItem value={theme.highContrast.neutralColorTokens[name]} />
              </div>
            ))
          : Object.keys(theme.light.sharedColorTokens[color]).map((name) => (
              <div key={name} style={{ display: 'flex' }}>
                <div style={{ padding: '1em', width: COLUMN_WIDTH, fontWeight: 'bold' }}>{name}</div>
                <ColorRampItem value={theme.light.sharedColorTokens[color][name]} />
                <ColorRampItem value={theme.dark.sharedColorTokens[color][name]} />
                <ColorRampItem value={theme.highContrast.sharedColorTokens[color][name]} />
              </div>
            ))}
      </div>
    </>
  );
};

Alias.args = {};
