import * as React from 'react';
import { teamsLightTheme } from '../index';
import type { BorderRadiusTokens } from '../index';

export default {
  title: 'Theme/Border Radii',
};

const theme = teamsLightTheme;

export const BorderRadii = () => {
  const borderRadiiTokens = Object.keys(theme).filter(tokenName =>
    tokenName.startsWith('borderRadius'),
  ) as (keyof BorderRadiusTokens)[];

  return (
    <div
      style={{ display: 'grid', gridTemplateColumns: 'repeat(3, auto) 1fr ', gap: '10px 20px', alignItems: 'center' }}
    >
      {borderRadiiTokens.map(radius => [
        <div key={radius}>{radius}</div>,
        <div key={`${radius}-value`} style={{ textAlign: 'right' }}>
          {theme[radius]}
        </div>,
        <div
          key={`${radius}-col1`}
          style={{
            background: '#bbb',
            width: '3em',
            height: '3em',
            borderRadius: theme[radius],
          }}
        />,
        <div
          key={`${radius}-col2`}
          style={{
            border: `${theme.strokeWidthThin} solid black`,
            width: '3em',
            height: '3em',
            borderRadius: theme[radius],
          }}
        />,
      ])}
    </div>
  );
};
