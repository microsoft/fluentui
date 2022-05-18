import * as React from 'react';
import { teamsLightTheme } from '../index';
import type { HorizontalSpacingTokens, VerticalSpacingTokens } from '../index';

export default {
  title: 'Theme/Spacing',
};

const theme = teamsLightTheme;

const SpacingHorizontal = () => (
  <div
    style={{
      display: 'grid',
      gridTemplateColumns: 'auto auto 1fr',
      gap: '10px',
      alignItems: 'center',
    }}
  >
    {(Object.keys(theme).filter(tokenName =>
      tokenName.startsWith('spacingHorizontal'),
    ) as (keyof HorizontalSpacingTokens)[]).map(spacingToken => [
      <div key={spacingToken}>{spacingToken}</div>,
      <div key={`${spacingToken}-value`}>{theme[spacingToken]}</div>,
      <div
        key={`${spacingToken}-demo`}
        style={{
          width: theme[spacingToken],
          height: '2em',
          background: '#00CC6A',
        }}
      />,
    ])}
  </div>
);

const SpacingVertical = () => (
  <div
    style={{
      display: 'grid',
      gridTemplateColumns: 'auto auto 1fr',
      gap: '10px',
      alignItems: 'center',
    }}
  >
    {(Object.keys(theme).filter(tokenName =>
      tokenName.startsWith('spacingVertical'),
    ) as (keyof VerticalSpacingTokens)[]).map(spacingToken => [
      <div key={spacingToken}>{spacingToken}</div>,
      <div key={`${spacingToken}-value`}>{theme[spacingToken]}</div>,
      <div
        key={`${spacingToken}-demo`}
        style={{
          height: theme[spacingToken],
          width: '20em',
          background: '#CC006A',
        }}
      />,
    ])}
  </div>
);

export const Spacing = () => (
  <>
    <h2>Vertical</h2>
    <SpacingVertical />
    <h2>Horizontal</h2>
    <SpacingHorizontal />
  </>
);
