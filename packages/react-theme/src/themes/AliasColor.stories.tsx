/*
 FIXME: this is a temporary workaround - moving stories from react-examples
 reenable TS and fix errors in a subsequent PR
 */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import * as React from 'react';
import { TinyColor } from '@ctrl/tinycolor';
import {
  BackgroundColorTokens,
  BrandColorTokens,
  NeutralColorTokens,
  SharedColorTokens,
  teamsDarkTheme,
  teamsHighContrastTheme,
  teamsLightTheme,
  webDarkTheme,
  Theme,
} from '../index';
import { ColorRampItem } from './ColorRamp.stories';

// FIXME: hardcoded theme
const theme = {
  light: teamsLightTheme,
  dark: webDarkTheme,
  teamsDark: teamsDarkTheme,
  highContrast: teamsHighContrastTheme,
};

export default {
  title: 'Theme/Alias/Colors',
};

type ThemeAliasColors = keyof Theme['alias']['color'];

const buttonStyle = ({ active }: { active: boolean }): React.CSSProperties => ({
  position: 'relative',
  verticalAlign: 'middle',
  padding: 0,
  margin: 0,
  width: 40,
  height: 40,
  border: 'none',
  boxShadow: active ? '0 0 0 1px white, 0 0 0 2px black' : 'none',
  borderRadius: 0,
  outline: 'none ',
  zIndex: active ? 2 : 1,
});

const ColorButton: React.FunctionComponent<
  {
    color: ThemeAliasColors;
    active: boolean;
    setPreviewColor: (color: ThemeAliasColors | null) => void;
    setColor: (color: ThemeAliasColors) => void;
  } & React.ButtonHTMLAttributes<HTMLButtonElement>
> = ({ style = {}, color, active, setPreviewColor, setColor, ...rest }) => (
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

export const AliasColors = () => {
  const [color, setColor] = React.useState<ThemeAliasColors>('neutral');
  const [previewColor, setPreviewColor] = React.useState<ThemeAliasColors | null>(null);

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
            background: theme.dark.alias.color.neutral.neutralBackground1,
            color: theme.dark.alias.color.neutral.neutralForeground1,
          }}
        />
        {Object.keys(theme.light.global.palette)
          // TODO: We iterate global.palette to show color swatches.
          //       The selected swatch then is used to populate the alias grid.
          //       But, global.palette has 'grey' and there is no alias.color.grey so it throws.
          //       Filtering grey out here, but this means our structure is wrong.
          .filter(key => key !== 'grey' && key !== 'brand')
          .map((colorName: Exclude<keyof Theme['global']['palette'], 'grey' | 'brand'>) => (
            <ColorButton
              key={colorName}
              color={colorName}
              active={color === colorName}
              setColor={setColor}
              setPreviewColor={setPreviewColor}
              style={{
                background: theme.light.global.palette[colorName].primary, // broken typing
                color:
                  theme.light.global.palette[colorName][
                    new TinyColor(theme.light.global.palette[colorName].primary).isDark() ? 'tint60' : 'shade50'
                  ],
              }}
            />
          ))}
      </div>

      <div
        style={{
          display: 'inline-grid',
          gridTemplateColumns: 'repeat(5, auto)',
          columnGap: '1em',
          alignItems: 'stretch',
        }}
      >
        <h3 key="hrToken" style={{ padding: '1em', margin: 0 }}>
          Design Token
        </h3>
        <h3 key="hrLight" style={{ padding: '1em', margin: 0 }}>
          Light
        </h3>
        <h3 key="hrDark" style={{ padding: '1em', margin: 0 }}>
          Dark
        </h3>
        <h3 key="hrTeamsDark" style={{ padding: '1em', margin: 0 }}>
          Teams Dark
        </h3>
        <h3 key="hrHC" style={{ padding: '1em', margin: 0 }}>
          High Contrast
        </h3>
        {Object.keys(theme.light.alias.color?.[activeColor] ?? []).map(
          (name: keyof (SharedColorTokens | NeutralColorTokens | BackgroundColorTokens | BrandColorTokens)) => [
            <div
              key={`${name}Token`}
              style={{ padding: '0 1em', fontWeight: 'bold', display: 'flex', alignItems: 'center' }}
            >
              {name}
            </div>,
            <ColorRampItem key={`${name}Light`} value={theme.light.alias.color[activeColor][name]} />,
            <ColorRampItem key={`${name}Dark`} value={theme.dark.alias.color[activeColor][name]} />,
            <ColorRampItem key={`${name}TeamsDark`} value={theme.teamsDark.alias.color[activeColor][name]} />,
            <ColorRampItem key={`${name}HC`} value={theme.highContrast.alias.color[activeColor][name]} />,
          ],
        )}
      </div>
    </>
  );
};

AliasColors.args = {};
