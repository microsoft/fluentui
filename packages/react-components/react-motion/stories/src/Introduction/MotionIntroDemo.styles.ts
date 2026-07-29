'use client';

import { makeStyles, tokens } from '@fluentui/react-components';

export const useClasses = makeStyles({
  demo: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: tokens.spacingVerticalM,
    padding: tokens.spacingVerticalXL,
  },
  card: {
    padding: `${tokens.spacingVerticalL} ${tokens.spacingHorizontalXXL}`,
    fontWeight: tokens.fontWeightSemibold,
    fontSize: tokens.fontSizeBase300,
    textAlign: 'center',
  },
});
