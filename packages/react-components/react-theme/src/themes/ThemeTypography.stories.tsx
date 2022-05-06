import * as React from 'react';
import { teamsLightTheme, typographyStyles } from '../index';
import type { FontFamilyTokens, FontSizeTokens, LineHeightTokens, FontWeightTokens, TypographyStyle } from '../index';

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

export const TypographyStyles = () => {
  // var(--tokenName) => tokenName
  function formatTypographyStyleValue(typographyStyleValue: TypographyStyle) {
    return (
      <div>
        {Object.values(typographyStyleValue).map(value => (
          <div key={value}>{value.replace(/var\(--(.+)\)/, '$1')}</div>
        ))}
      </div>
    );
  }

  // caption1Strong => Caption 1 Strong
  function formatTypographyStyleName(typographyStyleName: string) {
    return typographyStyleName.replace(/([A-Z\d])/g, ' $1').replace(/^(.)/, firstChar => firstChar.toUpperCase());
  }

  return (
    <div>
      <div>
        <em>Typography style is represented by a set of tokens instead of an individual token.</em>
      </div>
      <div
        style={{
          marginTop: '2em',
          fontFamily: theme.fontFamilyBase,
          display: 'grid',
          gridTemplateColumns: 'auto auto 1fr',
          gap: '10px',
          alignItems: 'center',
        }}
      >
        {(Object.keys(typographyStyles) as (keyof typeof typographyStyles)[]).map(typographyStyleName => [
          <div key={typographyStyleName}>{typographyStyleName}</div>,
          <div key={`${typographyStyleName}-value`}>
            {formatTypographyStyleValue(typographyStyles[typographyStyleName])}
          </div>,
          <div key={`${typographyStyleName}-demo`} style={typographyStyles[typographyStyleName]}>
            Hello, I am {formatTypographyStyleName(typographyStyleName)}
          </div>,
        ])}
      </div>
    </div>
  );
};
