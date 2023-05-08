import * as React from 'react';
import {
  makeStyles,
  Subtitle2Stronger,
  Text,
  Theme,
  typographyStyles,
  webLightTheme,
} from '@fluentui/react-components';
import type { TypographyStyles } from '@fluentui/react-components';

type TypographyTokens = [token: keyof TypographyStyles, tokenName: string, entries: [string, string][]][];

const useStyles = makeStyles({
  container: {
    rowGap: '24px',
    columnGap: '48px',
    display: 'grid',
    gridTemplateColumns: 'auto auto auto 1fr',
    alignItems: 'start',
  },
  value: {
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    overflowX: 'hidden',
    maxWidth: '10.5em',
  },

  ...typographyStyles,
});

// FIXME: hardcoded theme
const theme = webLightTheme;

const tokenOrder: (keyof TypographyStyles)[] = [
  'caption2',
  'caption2Strong',
  'caption1',
  'caption1Strong',
  'caption1Stronger',
  'body1',
  'body1Strong',
  'body1Stronger',
  'body2',
  'subtitle2',
  'subtitle2Stronger',
  'subtitle1',
  'title3',
  'title2',
  'title1',
  'largeTitle',
  'display',
];

const tokens: TypographyTokens = tokenOrder.map(token => [
  token,
  token.replace(/([A-Z\d])/g, ' $1').replace(/^(.)/, firstChar => firstChar.toUpperCase()),
  Object.entries(typographyStyles[token]).map(([k, v]) => [k, v.replace(/var\(--(.+)\)/, '$1')]),
]);

export const Typography = () => {
  const styles = useStyles();

  return (
    <div className={styles.container}>
      <Subtitle2Stronger>Name</Subtitle2Stronger>
      <Subtitle2Stronger>Tokens</Subtitle2Stronger>
      <Subtitle2Stronger>Default Values</Subtitle2Stronger>
      <Subtitle2Stronger>Example</Subtitle2Stronger>

      {tokens.map(([token, tokenName, entries]) => (
        <React.Fragment key={token}>
          <Text>{token}</Text>

          <div>
            {entries.map(([key, value]) => (
              <div key={`${token}-${key}`}>{value}</div>
            ))}
          </div>

          <div>
            {entries.map(([key, value]) => (
              <div key={`${token}-${key}`} className={styles.value}>
                {key}: {theme[value as keyof Theme]}
              </div>
            ))}
          </div>

          <Text className={styles[token]}>{tokenName}</Text>
        </React.Fragment>
      ))}
    </div>
  );
};
