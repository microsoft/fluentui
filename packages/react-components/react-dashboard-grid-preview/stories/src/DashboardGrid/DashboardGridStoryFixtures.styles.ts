'use client';

import { makeStyles, tokens } from '@fluentui/react-components';

export const useTileStyles = makeStyles({
  tile: {
    boxSizing: 'border-box',
    blockSize: '100%',
    display: 'flex',
    flexDirection: 'column',
    gap: tokens.spacingVerticalS,
    padding: `${tokens.spacingVerticalM} ${tokens.spacingHorizontalM}`,
    color: tokens.colorNeutralForeground1,
    backgroundColor: tokens.colorNeutralBackground1,
    border: `${tokens.strokeWidthThin} solid ${tokens.colorNeutralStroke1}`,
    borderRadius: tokens.borderRadiusMedium,
    overflow: 'auto',
  },
  tileTitle: {
    marginBlock: 0,
  },
  tileBody: {
    display: 'flex',
    flexDirection: 'column',
    gap: tokens.spacingVerticalS,
  },
  inlineControls: {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    gap: `${tokens.spacingVerticalS} ${tokens.spacingHorizontalS}`,
  },
  nestedGrid: {
    flexGrow: 1,
  },
  subdued: {
    color: tokens.colorNeutralForeground2,
  },
  metric: {
    color: tokens.colorBrandForeground1,
    fontFamily: tokens.fontFamilyMonospace,
  },
});
