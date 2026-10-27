import { makeStyles } from '@griffel/react';
import { tokens } from '@fluentui/react-theme';

export const useIdNamespaceDemoStyles = makeStyles({
  root: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
    gap: tokens.spacingHorizontalL,
  },
  single: {
    gridTemplateColumns: 'minmax(0, 1fr)',
  },
  panel: {
    minWidth: 0,
  },
  controls: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: tokens.spacingHorizontalXS,
  },
  readout: {
    whiteSpace: 'pre-wrap',
    overflowWrap: 'anywhere',
    maxHeight: '24em',
    overflow: 'auto',
  },
  frame: {
    width: '100%',
    height: '24em',
    boxSizing: 'border-box',
    border: `${tokens.strokeWidthThin} solid ${tokens.colorNeutralStroke1}`,
  },
});
