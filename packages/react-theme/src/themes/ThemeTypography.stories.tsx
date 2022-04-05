import * as React from 'react';
import { teamsLightTheme } from '../index';
import type { FontFamilyTokens, FontSizeTokens, LineHeightTokens, FontWeightTokens } from '../index';

export default {
  title: 'Theme',
};

const theme = teamsLightTheme;

export const FontFamily = () => (
  <div style={{ display: 'grid', gridTemplateColumns: 'auto 1fr', gap: '10px', alignItems: 'center' }}>
    {(Object.keys(theme).filter(tokenName => tokenName.startsWith('fontFamily')) as (keyof FontFamilyTokens)[]).map(
      fontFamily => [
        <div key={fontFamily}>{fontFamily}</div>,
        <div key={`${fontFamily}-value`} style={{ fontFamily: `${theme[fontFamily]}` }}>
          {theme[fontFamily]}Font family {fontFamily}
        </div>,
      ],
    )}
  </div>
);

export const FontSize = () => (
  <div style={{ fontFamily: theme.fontFamilyBase }}>
    <div style={{ display: 'grid', gridTemplateColumns: 'auto 1fr', gap: '10px', alignItems: 'center' }}>
      {(Object.keys(theme).filter(tokenName => tokenName.startsWith('fontSize')) as (keyof FontSizeTokens)[]).map(
        fontSize => [
          <div key={fontSize}>{fontSize}</div>,
          <div key={`${fontSize}-value`} style={{ fontSize: theme[fontSize] }}>
            {fontSize}
          </div>,
        ],
      )}
    </div>
  </div>
);

export const LineHeight = () => (
  <div style={{ fontFamily: theme.fontFamilyBase }}>
    <div style={{ display: 'grid', gridTemplateColumns: 'auto 1fr', gap: '10px', alignItems: 'center' }}>
      {(Object.keys(theme).filter(tokenName => tokenName.startsWith('lineHeight')) as (keyof LineHeightTokens)[]).map(
        lineHeight => [
          <div key={lineHeight}>{lineHeight}</div>,
          <div key={`${lineHeight}-value`} style={{ lineHeight: theme[lineHeight], backgroundColor: '#eee' }}>
            {lineHeight}
          </div>,
        ],
      )}
    </div>
  </div>
);

export const FontWeight = () => (
  <div
    style={{
      fontFamily: theme.fontFamilyBase,
      display: 'grid',
      gridTemplateColumns: 'auto 1fr',
      gap: '10px',
      alignItems: 'center',
    }}
  >
    {(Object.keys(theme).filter(tokenName => tokenName.startsWith('fontWeight')) as (keyof FontWeightTokens)[]).map(
      fontWeight => [
        <div key={fontWeight}>{fontWeight}</div>,
        <div key={`${fontWeight}-value`} style={{ fontWeight: theme[fontWeight] }}>
          Font weight {fontWeight}
        </div>,
      ],
    )}
  </div>
);
