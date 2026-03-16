'use client';

import { makeStyles } from '@griffel/react';
import { tokens, typographyStyles } from '@fluentui/react-theme';

export const useAnnotationOnlyChartStyles = makeStyles({
  root: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    rowGap: '8px',
    backgroundColor: tokens.colorNeutralBackground1,
    color: tokens.colorNeutralForeground1,
    fontFamily: typographyStyles.body1.fontFamily,
  },
  content: {
    position: 'relative',
    flexGrow: 1,
    backgroundColor: 'transparent',
    borderRadius: tokens.borderRadiusMedium,
    boxSizing: 'border-box',
  },
  title: {
    textAlign: 'center',
  },
});
