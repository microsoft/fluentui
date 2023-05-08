import * as React from 'react';
import { makeStyles, teamsLightTheme } from '@fluentui/react-components';
import type { FontFamilyTokens, FontSizeTokens, FontWeightTokens, LineHeightTokens } from '@fluentui/react-components';

const theme = teamsLightTheme;

const useStyles = makeStyles({
  propGrid: {
    display: 'grid',
    gridTemplateColumns: 'auto 1fr',
    gridTemplateRows: '1fr',
    rowGap: '10px',
    columnGap: '10px',
    fontFamily: theme.fontFamilyBase,
    alignContent: 'center',
    alignItems: 'center',
  },
});

export const FontFamily = () => {
  const styles = useStyles();

  const fontFamilies = Object.keys(theme).filter(tokenName =>
    tokenName.startsWith('fontFamily'),
  ) as (keyof FontFamilyTokens)[];

  return (
    <div className={styles.propGrid}>
      {fontFamilies.map(fontFamily => [
        <div key={fontFamily}>{fontFamily}</div>,
        <div key={`${fontFamily}-value`} style={{ fontFamily: `${theme[fontFamily]}` }}>
          {theme[fontFamily]}
        </div>,
      ])}
    </div>
  );
};

export const FontSize = () => {
  const styles = useStyles();

  const fontSizes = Object.keys(theme).filter(tokenName =>
    tokenName.startsWith('fontSize'),
  ) as (keyof FontSizeTokens)[];

  return (
    <div className={styles.propGrid}>
      {fontSizes.map(fontSize => (
        <>
          <div key={fontSize}>{fontSize}</div>
          <div key={`${fontSize}-value`} style={{ fontSize: theme[fontSize], lineHeight: theme[fontSize] }}>
            {fontSize}
          </div>
        </>
      ))}
    </div>
  );
};

export const LineHeight = () => {
  const styles = useStyles();

  const lineHeightKeys = Object.keys(theme).filter(tokenName =>
    tokenName.startsWith('lineHeight'),
  ) as (keyof LineHeightTokens)[];

  return (
    <div className={styles.propGrid}>
      {lineHeightKeys.map(lineHeight => [
        <div key={lineHeight}>{lineHeight}</div>,
        <div key={`${lineHeight}-value`} style={{ lineHeight: theme[lineHeight], backgroundColor: '#eee' }}>
          {lineHeight}
        </div>,
      ])}
    </div>
  );
};

export const FontWeight = () => {
  const styles = useStyles();

  const fontWeights = Object.keys(theme).filter(tokenName =>
    tokenName.startsWith('fontWeight'),
  ) as (keyof FontWeightTokens)[];

  return (
    <div className={styles.propGrid}>
      {fontWeights.map(fontWeight => [
        <div key={fontWeight}>{fontWeight}</div>,
        <div key={`${fontWeight}-value`} style={{ fontWeight: theme[fontWeight] }}>
          Font weight {fontWeight}
        </div>,
      ])}
    </div>
  );
};
