'use client';

import { makeStyles } from '@griffel/react';
import { tokens } from '@fluentui/react-theme';

export const useStyles = makeStyles({
  wrapper: {
    display: 'none',
    height: 0,
    width: 0,
    pointerEvents: 'none',
  },
  wrapperActive: {
    display: 'block',
  },
  svg: {
    fill: 'transparent',
    pointerEvents: 'none',
    position: 'fixed',
    top: 0,
    left: 0,
  },
  triangle: {
    pointerEvents: 'auto',
  },
  triangleDebug: {
    cursor: 'crosshair',
    fill: `color-mix(in srgb, ${tokens.colorPaletteGreenBackground3} 20%, transparent)`,
  },
  rectDebug: {
    fill: `color-mix(in srgb, ${tokens.colorPaletteRedBackground3} 20%, transparent)`,
  },
});
