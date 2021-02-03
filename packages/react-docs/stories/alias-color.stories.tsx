import * as React from 'react';
import Color from 'color';

import { ColorRampItem } from '../src/components/ColorRamp';
import { sharedColors, webDarkTheme, webLightTheme } from '@fluentui/react-theme';

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

const ColorButton = ({ style = {}, color, active, setPreviewColor, setColor, ...rest }) => (
  <button
    style={{
      ...style,
      ...buttonStyle({ active }),
    }}
    onClick={() => {
      setColor(color);
      setPreviewColor(null);
    }}
    onMouseEnter={() => setPreviewColor(color)}
    onMouseLeave={() => setPreviewColor(null)}
    {...rest}
  />
);

export const Alias = (args, { globals: { theme } }) => {
  const [color, setColor] = React.useState<string>('neutral');
  const [previewColor, setPreviewColor] = React.useState<string>(null);

  const COLUMN_WIDTH = 250;
  const activeColor = previewColor || color;
  return (
    <>
      <div>
        <h2 style={{ color: previewColor ? '#888' : '#000' }}>{activeColor}</h2>
        <ColorButton
          color="neutral"
          active={color === 'neutral'}
          setColor={setColor}
          setPreviewColor={setPreviewColor}
          style={{
            background: webDarkTheme.alias.color.neutral.neutralBackground1,
            color: webDarkTheme.alias.color.neutral.neutralForeground1,
          }}
        />
        <ColorButton color="ghost" active={color === 'ghost'} setColor={setColor} setPreviewColor={setPreviewColor}>
          G
        </ColorButton>
        <ColorButton
          color="transparent"
          active={color === 'transparent'}
          setColor={setColor}
          setPreviewColor={setPreviewColor}
        >
          T
        </ColorButton>
        <ColorButton color="brand" active={color === 'brand'} setColor={setColor} setPreviewColor={setPreviewColor}>
          B
        </ColorButton>
        {Object.keys(sharedColors).map((colorName) => (
          <ColorButton
            key={colorName}
            color={colorName}
            active={color === colorName}
            setColor={setColor}
            setPreviewColor={setPreviewColor}
            style={{
              background: webLightTheme.global.palette[colorName].primary, // broken typing,
              color:
                webLightTheme.global.palette[colorName][
                  Color(webLightTheme.global.palette[colorName].primary).isDark() ? 'tint60' : 'shade50'
                ],
            }}
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
        {Object.keys(theme.light.alias.color[activeColor]).map((name) => (
          <div key={name} style={{ display: 'flex' }}>
            <div style={{ padding: '1em', width: COLUMN_WIDTH, fontWeight: 'bold' }}>{name}</div>
            <ColorRampItem value={theme.light.alias.color[activeColor][name]} />
            <ColorRampItem value={theme.dark.alias.color[activeColor][name]} />
            <ColorRampItem value={theme.highContrast.alias.color[activeColor][name]} />
          </div>
        ))}
      </div>
    </>
  );
};

Alias.args = {};
