'use client';
import { makeStyles, tokens } from '@fluentui/react-components';

export const useStyles = makeStyles({
  root: { display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: tokens.spacingHorizontalL },
  sketch: {
    display: 'flex',
    alignItems: 'center',
    gap: tokens.spacingHorizontalS,
    border: `${tokens.strokeWidthThin} solid ${tokens.colorNeutralStroke2}`,
  },
  slot: {
    padding: tokens.spacingHorizontalXS,
    border: `${tokens.strokeWidthThick} dotted ${tokens.colorNeutralStroke2}`,
  },
});
