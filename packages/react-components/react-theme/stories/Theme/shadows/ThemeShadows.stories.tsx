import * as React from 'react';
import { teamsDarkTheme, teamsHighContrastTheme, teamsLightTheme } from '@fluentui/react-components';
import type { ShadowTokens } from '@fluentui/react-components';

// FIXME: hardcoded theme
const theme = {
  light: teamsLightTheme,
  dark: teamsDarkTheme,
  highContrast: teamsHighContrastTheme,
};

const ShadowBox: React.FunctionComponent<
  React.HTMLAttributes<HTMLDivElement> & {
    shadow: string;
    isBrand: boolean;
  }
> = ({ shadow, isBrand, ...rest }) => (
  <div
    {...rest}
    style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column',
      boxShadow: shadow,
      minHeight: '2rem',
      fontFamily: 'monospace',
      fontSize: 10,
      ...(isBrand && {
        backgroundColor: theme.light.colorBrandBackground,
        color: theme.light.colorNeutralForegroundOnBrand,
      }),
    }}
  >
    {shadow.split('),').map((line, index, arr) => {
      const value = index < arr.length - 1 ? line + ')' : line;
      return <div key={value}>{value}</div>;
    })}
  </div>
);

export const Shadows = () => {
  const shadowTokens = Object.keys(theme.light).filter(tokenName =>
    tokenName.startsWith('shadow'),
  ) as (keyof ShadowTokens)[];

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'auto 1fr 1fr 1fr',
        gap: '80px',
        alignItems: 'center',
        marginBottom: '6em',
      }}
    >
      <h3 key="shadow-title">Shadow</h3>
      <h3 key="shadow-title-light">Light</h3>
      <h3 key="shadow-title-dark">Dark</h3>
      <h3 key="shadow-title-hc">High Contrast</h3>
      {shadowTokens.map(shadow => {
        const isBrand = shadow.indexOf('Brand') >= 0;
        return [
          <div key={shadow}>{shadow}</div>,
          <ShadowBox key={`${shadow}-light`} shadow={theme.light[shadow]} isBrand={isBrand} />,
          <ShadowBox key={`${shadow}-dark`} shadow={theme.dark[shadow]} isBrand={isBrand} />,
          <ShadowBox key={`${shadow}-hc`} shadow={theme.highContrast[shadow]} isBrand={isBrand} />,
        ];
      })}
    </div>
  );
};
