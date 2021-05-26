/*
 FIXME: this is a temporary workaround - moving stories from react-examples
 reenable TS and fix errors in a subsequent PR
 */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import * as React from 'react';
import { ShadowLevelTokens, teamsDarkTheme, teamsHighContrastTheme, teamsLightTheme } from '../index';

export default {
  title: 'Theme/Alias/Shadows',
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

export const AliasShadows = () => {
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
      {Object.keys(theme.light.alias.shadow).map((shadow: keyof ShadowLevelTokens) => [
        <div key={shadow}>{shadow}</div>,
        <ShadowBox key={`${shadow}-light`} shadow={theme.light.alias.shadow[shadow]} />,
        <ShadowBox key={`${shadow}-dark`} shadow={theme.dark.alias.shadow[shadow]} />,
        <ShadowBox key={`${shadow}-hc`} shadow={theme.highContrast.alias.shadow[shadow]} />,
      ])}
    </div>
  );
};
