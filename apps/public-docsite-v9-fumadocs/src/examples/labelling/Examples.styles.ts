'use client';

import { makeStyles, tokens } from '@fluentui/react-components';

export const useStyles = makeStyles({
  visibleTextContainer: {
    marginTop: tokens.spacingVerticalM,
    display: 'flex',
    width: `calc(${tokens.spacingHorizontalXXXL} * 6)`,
    justifyContent: 'space-between',
  },
  divider: {
    marginTop: tokens.spacingVerticalM,
    marginBottom: tokens.spacingVerticalM,
  },
});
