import * as React from 'react';
import { makeStyles, Subtitle2Stronger, Text, typographyStyles } from '@fluentui/react-components';
import type { TypographyStyles } from '@fluentui/react-components';

const useStyles = makeStyles({
  container: {
    rowGap: '24px',
    columnGap: '48px',
    display: 'grid',
    gridTemplateColumns: 'auto auto 1fr',
    alignItems: 'start',
  },

  ...typographyStyles,
});

export const Typography = () => {
  const styles = useStyles();
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

  const tokens: [keyof TypographyStyles, string, string[]][] = tokenOrder.map(token => [
    token,
    token.replace(/([A-Z\d])/g, ' $1').replace(/^(.)/, firstChar => firstChar.toUpperCase()),
    Object.values(typographyStyles[token]).map(v => v.replace(/var\(--(.+)\)/, '$1')),
  ]);

  return (
    <div className={styles.container}>
      <Subtitle2Stronger>Name</Subtitle2Stronger>
      <Subtitle2Stronger>Tokens</Subtitle2Stronger>
      <Subtitle2Stronger>Example</Subtitle2Stronger>

      {tokens.map(([token, tokenName, values]) => (
        <React.Fragment key={token}>
          <Text>{token}</Text>

          <div>
            {values.map(value => (
              <div key={`${token}-${value}`}>{value}</div>
            ))}
          </div>

          <Text className={styles[token]}>{tokenName}</Text>
        </React.Fragment>
      ))}
    </div>
  );
};
