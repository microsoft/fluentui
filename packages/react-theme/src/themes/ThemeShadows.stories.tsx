import * as React from 'react';
import { teamsDarkTheme, teamsHighContrastTheme, teamsLightTheme } from '../index';
import type { ShadowLevelTokens } from '../index';

export default {
  title: 'Theme/Shadows',
};

// FIXME: hardcoded theme
const theme = {
  light: teamsLightTheme,
  dark: teamsDarkTheme,
  highContrast: teamsHighContrastTheme,
};

const ShadowBox: React.FunctionComponent<
  React.HTMLAttributes<HTMLDivElement> & {
    shadow: string;
  }
> = props => (
  <div
    {...props}
    style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column',
      boxShadow: props.shadow,
      minHeight: '2rem',
      fontFamily: 'monospace',
      fontSize: 10,
    }}
  >
    {props.shadow.split('),').map((line, index, arr) => {
      const value = index < arr.length - 1 ? line + ')' : line;
      return <div key={value}>{value}</div>;
    })}
  </div>
);

export const Shadows = () => {
  const shadowTokens = Object.keys(theme.light).filter(tokenName =>
    tokenName.startsWith('shadowLevel'),
  ) as (keyof ShadowLevelTokens)[];

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
      {shadowTokens.map(shadow => [
        <div key={shadow}>{shadow}</div>,
        <ShadowBox key={`${shadow}-light`} shadow={theme.light[shadow]} />,
        <ShadowBox key={`${shadow}-dark`} shadow={theme.dark[shadow]} />,
        <ShadowBox key={`${shadow}-hc`} shadow={theme.highContrast[shadow]} />,
      ])}
    </div>
  );
};
