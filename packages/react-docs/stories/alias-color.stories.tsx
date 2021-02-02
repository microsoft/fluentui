import * as React from 'react';
import Color from 'color';

import { ColorRampItem } from '../src/components/ColorRamp';
import { webLightTheme, webDarkTheme } from '@fluentui/react-theme';

export default {
  title: 'Fluent UI Theme/Colors/Alias',
};

const buttonStyle = ({ active }): React.CSSProperties => ({
  position: 'relative',
  verticalAlign: 'middle',
  padding: 0,
  margin: 0,
  width: 40,
  height: 40,
  border: 'none',
  boxShadow: !!active ? '0 0 0 1px white, 0 0 0 2px black' : 'none',
  borderRadius: 0,
  outline: 'none ',
  zIndex: !!active ? 2 : 1,
});

export const Alias = (args, { globals: { theme } }) => {
  const [color, setColor] = React.useState<string>('neutral');
  const [previewColor, setPreviewColor] = React.useState<string>(null);

  const COLUMN_WIDTH = 250;
  const activeColor = previewColor || color;

  return (
    <>
      <div>
        <h2 style={{ color: previewColor ? '#888' : '#000' }}>{activeColor}</h2>
        <button
          style={{
            background: webDarkTheme.neutralColorTokens.neutralBackground1,
            color: webDarkTheme.neutralColorTokens.neutralForeground1,
            ...buttonStyle({ active: color === 'neutral' }),
          }}
          onClick={() => {
            setColor('neutral');
            setPreviewColor(null);
          }}
          onMouseEnter={() => setPreviewColor('neutral')}
          onMouseLeave={() => setPreviewColor(null)}
        />
        {Object.keys(webLightTheme.sharedColorTokens).map(colorName => (
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
            onClick={() => {
              setColor(colorName);
              setPreviewColor(null);
            }}
            onMouseEnter={() => setPreviewColor(colorName)}
            onMouseLeave={() => setPreviewColor(null)}
          />
        ))}
      </div>

      <div>
        <div style={{ display: 'flex' }}>
          <h3 style={{ flex: `0 0 ${COLUMN_WIDTH}px`, padding: '1em', margin: 0 }}>Design Token</h3>
          <h3 style={{ flex: `0 0 ${COLUMN_WIDTH}px`, padding: '1em', margin: 0 }}>Web Light</h3>
          <h3 style={{ flex: `0 0 ${COLUMN_WIDTH}px`, padding: '1em', margin: 0 }}>Web Dark</h3>
          <h3 style={{ flex: `0 0 ${COLUMN_WIDTH}px`, padding: '1em', margin: 0 }}>Web High Contrast</h3>
        </div>
        {activeColor === 'neutral'
          ? Object.keys(theme.light.neutralColorTokens).map(name => (
              <div key={name} style={{ display: 'flex' }}>
                <div style={{ padding: '1em', width: COLUMN_WIDTH, fontWeight: 'bold' }}>{name}</div>
                <ColorRampItem value={theme.light.neutralColorTokens[name]} />
                <ColorRampItem value={theme.dark.neutralColorTokens[name]} />
                <ColorRampItem value={theme.highContrast.neutralColorTokens[name]} />
              </div>
            ))
          : Object.keys(theme.light.sharedColorTokens[activeColor]).map(name => (
              <div key={name} style={{ display: 'flex' }}>
                <div style={{ padding: '1em', width: COLUMN_WIDTH, fontWeight: 'bold' }}>{name}</div>
                <ColorRampItem value={theme.light.sharedColorTokens[activeColor][name]} />
                <ColorRampItem value={theme.dark.sharedColorTokens[activeColor][name]} />
                <ColorRampItem value={theme.highContrast.sharedColorTokens[activeColor][name]} />
              </div>
            ))}
      </div>
    </>
  );
};

Alias.args = {};
