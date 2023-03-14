import * as React from 'react';
import {
  teamsDarkTheme,
  teamsHighContrastTheme,
  teamsLightTheme,
  webLightTheme,
  webDarkTheme,
  Theme,
} from '@fluentui/react-components';

import { ColorRampItem } from './ColorRamp.stories';

// FIXME: hardcoded theme
const theme = {
  webLight: webLightTheme,
  webDark: webDarkTheme,
  teamsLight: teamsLightTheme,
  teamsDark: teamsDarkTheme,
  teamsHighContrast: teamsHighContrastTheme,
};

const colorPalette = {
  Red: 'colorPaletteRed',
  Green: 'colorPaletteGreen',
  LightGreen: 'colorPaletteLightGreen',
  DarkOrange: 'colorPaletteDarkOrange',
  Marigold: 'colorPaletteMarigold',
  Yellow: 'colorPaletteYellow',
  Berry: 'colorPaletteBerry',

  DarkRed: `colorPaletteDarkRed`,
  Cranberry: 'colorPaletteCranberry',
  Pumpkin: 'colorPalettePumpkin',
  Peach: 'colorPalettePeach',
  Gold: 'colorPaletteGold',
  Brass: 'colorPaletteBrass',
  Brown: 'colorPaletteBrown',
  Forest: 'colorPaletteForest',
  Seafoam: 'colorPaletteSeafoam',
  DarkGreen: 'colorPaletteDarkGreen',
  LightTeal: 'colorPaletteLightTeal',
  Teal: 'colorPaletteTeal',
  Steel: 'colorPaletteSteel',
  Blue: 'colorPaletteBlue',
  RoyalBlue: 'colorPaletteRoyalBlue',
  Cornflower: 'colorPaletteCornflower',
  Navy: 'colorPaletteNavy',
  Lavender: 'colorPaletteLavender',
  Purple: 'colorPalettePurple',
  Grape: 'colorPaletteGrape',
  Lilac: 'colorPaletteLilac',
  Pink: 'colorPalettePink',
  Magenta: 'colorPaletteMagenta',
  Plum: 'colorPalettePlum',
  Beige: 'colorPaletteBeige',
  Mink: 'colorPaletteMink',
  Platinum: 'colorPalettePlatinum',
  Anchor: 'colorPaletteAnchor',
} as const;

type GlobalSharedColors = keyof typeof colorPalette;

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
    color: 'neutral' | GlobalSharedColors;
    active: boolean;
    setPreviewColor: (color: 'neutral' | GlobalSharedColors | null) => void;
    setColor: (color: 'neutral' | GlobalSharedColors) => void;
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

const neutralTokens = (Object.keys(theme.webLight) as Array<keyof Theme>).filter(tokenName =>
  tokenName.match(/^color(?!Palette).*/),
);

export const Colors = () => {
  const [color, setColor] = React.useState<'neutral' | GlobalSharedColors>('neutral');
  const [previewColor, setPreviewColor] = React.useState<'neutral' | GlobalSharedColors | null>(null);
  const activeColor = previewColor || color;

  const tokens: Array<keyof Theme> =
    activeColor === 'neutral'
      ? neutralTokens
      : (Object.keys(theme.webLight) as Array<keyof Theme>).filter(tokenName =>
          tokenName.startsWith(`colorPalette${activeColor}`),
        );

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
            background: theme.webLight.colorNeutralForeground1,
          }}
        />
        {(Object.keys(colorPalette) as GlobalSharedColors[]).map(colorName => (
          <ColorButton
            key={colorName}
            color={colorName}
            active={color === colorName}
            setColor={setColor}
            setPreviewColor={setPreviewColor}
            style={{
              background: theme.webLight[`colorPalette${colorName}BorderActive` as keyof Theme],
            }}
          />
        ))}
      </div>

      <div
        style={{
          display: 'inline-grid',
          gridTemplateColumns: '24em repeat(5, auto)',
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
        <h3 key="hrTeamsLight" style={{ padding: '1em', margin: 0 }}>
          Teams Light
        </h3>
        <h3 key="hrTeamsDark" style={{ padding: '1em', margin: 0 }}>
          Teams Dark
        </h3>
        <h3 key="hrHC" style={{ padding: '1em', margin: 0 }}>
          Teams High Contrast
        </h3>
        {tokens.map(name => [
          <div
            key={`${name}Token`}
            style={{ padding: '0 1em', fontWeight: 'bold', display: 'flex', alignItems: 'center' }}
          >
            {name}
          </div>,
          <ColorRampItem key={`${name}Light`} value={theme.webLight[name]} />,
          <ColorRampItem key={`${name}Dark`} value={theme.webDark[name]} />,
          <ColorRampItem key={`${name}TeamsLight`} value={theme.teamsLight[name]} />,
          <ColorRampItem key={`${name}TeamsDark`} value={theme.teamsDark[name]} />,
          <ColorRampItem key={`${name}HC`} value={theme.teamsHighContrast[name]} />,
        ])}
      </div>
    </>
  );
};

Colors.args = {};
