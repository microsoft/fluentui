'use client';

import { makeStyles, tokens } from '@fluentui/react-components';

export const useClasses = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
  },
  header: {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    columnGap: tokens.spacingHorizontalL,
  },
  legend: {
    // Let the key wrap its own text before it pushes the controls onto another line.
    flex: '1 1 12em',
    display: 'flex',
    flexDirection: 'column',
    paddingBlock: tokens.spacingVerticalS,
    fontSize: tokens.fontSizeBase200,
    lineHeight: tokens.lineHeightBase200,
    color: tokens.colorNeutralForeground3,
  },
  controls: {
    marginLeft: 'auto',
    display: 'flex',
    flexWrap: 'wrap',
    alignSelf: 'end',
    backgroundColor: tokens.colorNeutralBackground1,
    borderRadius: tokens.borderRadiusMedium,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    padding: '6px 10px',
    border: `2px solid ${tokens.colorNeutralStroke1}`,
    borderBottom: 'none',
    width: 'fit-content',
  },
  card: {
    backgroundColor: tokens.colorNeutralBackground2,
    borderRadius: tokens.borderRadiusMedium,
    borderTopRightRadius: 0,
    padding: tokens.spacingHorizontalM,
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))',
    gap: tokens.spacingHorizontalS,
    border: `2px solid ${tokens.colorNeutralStroke1}`,
  },
  durationTableContainer: {
    overflowX: 'auto',
    backgroundColor: tokens.colorNeutralBackground1,
    border: `${tokens.strokeWidthThick} solid ${tokens.colorNeutralStroke1}`,
    borderRadius: tokens.borderRadiusMedium,
    borderTopRightRadius: 0,
  },
  durationTable: {
    display: 'grid',
    gridTemplateColumns: 'max-content max-content 1fr',
    minWidth: 'max-content',
    fontFamily: tokens.fontFamilyMonospace,
    fontSize: tokens.fontSizeBase300,
    lineHeight: tokens.lineHeightBase300,

    '& [role="rowgroup"], & [role="row"]': {
      display: 'grid',
      gridTemplateColumns: 'subgrid',
      gridColumn: '1 / -1',
    },
    '& [role="columnheader"], & [role="rowheader"], & [role="cell"]': {
      display: 'flex',
      alignItems: 'center',
      padding: `${tokens.spacingVerticalS} ${tokens.spacingHorizontalL}`,
      whiteSpace: 'nowrap',
      borderBottom: `${tokens.strokeWidthThin} solid ${tokens.colorNeutralStroke2}`,
    },
    '& [role="columnheader"]': {
      fontFamily: tokens.fontFamilyBase,
      fontSize: tokens.fontSizeBase200,
      fontWeight: tokens.fontWeightSemibold,
      color: tokens.colorNeutralForeground2,
      borderBottomColor: tokens.colorNeutralStroke1,
    },
    '& [role="rowgroup"] > [role="row"]:last-child:not(:only-child) > *': {
      borderBottom: 'none',
    },
  },
});

export const useCardClasses = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: tokens.spacingVerticalL,
    padding: `${tokens.spacingVerticalL} ${tokens.spacingHorizontalXXL}`,
    backgroundColor: tokens.colorNeutralBackground1,
    borderRadius: tokens.borderRadiusLarge,
    boxShadow: tokens.shadow4,
    // Forced colors removes the background, and paints the transparent border so tiles stay separate.
    border: `${tokens.strokeWidthThin} solid transparent`,
  },
  markerLayer: {
    position: 'absolute',
    inset: 0,
    pointerEvents: 'none',
  },
  marker: {
    '--tick-thickness': tokens.strokeWidthThick,
    position: 'absolute',
    // Span the plot square and keep the line inside it at progress 0 and 1.
    top: 'var(--tick-thickness)',
    insetInline: 0,
    height: 'calc(100% - var(--tick-thickness))',
    pointerEvents: 'none',

    '::after': {
      content: '""',
      position: 'absolute',
      insetInline: 0,
      bottom: 0,
      height: 'var(--tick-thickness)',
      backgroundColor: tokens.colorBrandBackground,
    },

    '@media (forced-colors: active)': {
      '::after': {
        backgroundColor: 'LinkText',
      },
    },
  },
  plot: {
    position: 'relative',
  },
  svg: {
    display: 'block',
    width: '100%',
    height: 'auto',
    aspectRatio: '1',
    overflow: 'visible',
    // The filled square marks the 0 to 1 range of both time and progress.
    backgroundColor: tokens.colorNeutralBackground3,

    '@media (forced-colors: active)': {
      outline: `${tokens.strokeWidthThin} solid CanvasText`,
    },
  },
  overlay: {
    position: 'absolute',
    inset: 0,
    width: '100%',
    height: '100%',
    overflow: 'visible',
    pointerEvents: 'none',
  },
  referenceLine: {
    stroke: tokens.colorNeutralStroke1,
    strokeWidth: tokens.strokeWidthThin,
    vectorEffect: 'non-scaling-stroke',

    '@media (forced-colors: active)': {
      stroke: 'GrayText',
    },
  },
  path: {
    fill: 'none',
    stroke: tokens.colorNeutralForeground1,
    strokeWidth: tokens.strokeWidthThicker,
    strokeLinecap: 'round',
    vectorEffect: 'non-scaling-stroke',

    '@media (forced-colors: active)': {
      stroke: 'CanvasText',
    },
  },

  handle: {
    stroke: tokens.colorNeutralForeground3,
    strokeWidth: tokens.strokeWidthThin,
    strokeDasharray: '4 3',

    '& line': {
      vectorEffect: 'non-scaling-stroke',
    },

    '@media (forced-colors: active)': {
      stroke: 'CanvasText',
    },
  },
  controlPoint: {
    fill: tokens.colorNeutralBackground3,
    stroke: tokens.colorBrandForeground1,
    strokeWidth: tokens.strokeWidthThick,
    vectorEffect: 'non-scaling-stroke',

    '@media (forced-colors: active)': {
      fill: 'Canvas',
      stroke: 'LinkText',
    },
  },
  endpoint: {
    fill: tokens.colorNeutralForeground1,

    '@media (forced-colors: active)': {
      fill: 'CanvasText',
    },
  },

  duration: {
    width: tokens.strokeWidthThicker,
    height: '100%',
    backgroundColor: tokens.colorBrandBackground,

    '@media (forced-colors: active)': {
      backgroundColor: 'LinkText',
    },
  },

  durationValue: {
    display: 'flex',
    alignItems: 'center',
    gap: tokens.spacingHorizontalM,

    '& > :first-child': {
      minWidth: '5ch',
      textAlign: 'end',
    },
  },
  // Static bar whose length is proportional to the duration, readable while previews are paused.
  durationBar: {
    '--duration-bar-max': '96px',
    width: 'calc(var(--duration-bar-max) * var(--duration-fraction))',
    height: tokens.spacingVerticalS,
    borderRadius: tokens.borderRadiusSmall,
    backgroundColor: tokens.colorNeutralForeground3,

    '@media (forced-colors: active)': {
      backgroundColor: 'CanvasText',
    },
  },

  view: {
    '--duration-track-size': '128px',
    position: 'relative',
    width: 'var(--duration-track-size)',
    height: tokens.spacingVerticalXXL,
    // Short stops at each end of the track, joined by a centred rail.
    borderLeft: `${tokens.strokeWidthThin} solid ${tokens.colorNeutralStroke1}`,
    borderRight: `${tokens.strokeWidthThin} solid ${tokens.colorNeutralStroke1}`,

    '::before': {
      content: '""',
      position: 'absolute',
      insetInline: 0,
      top: '50%',
      borderTop: `${tokens.strokeWidthThin} solid ${tokens.colorNeutralStroke2}`,
    },

    '@media (forced-colors: active)': {
      borderLeftColor: 'GrayText',
      borderRightColor: 'GrayText',
      '::before': {
        borderTopColor: 'GrayText',
      },
    },
  },
  title: {
    display: 'flex',
    flexDirection: 'column',
    gap: tokens.spacingVerticalXXS,
    overflowWrap: 'anywhere',

    fontFamily: tokens.fontFamilyMonospace,
  },
  name: {
    fontSize: tokens.fontSizeBase300,
    lineHeight: tokens.lineHeightBase300,
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
  },
  value: {
    fontSize: tokens.fontSizeBase200,
    lineHeight: tokens.lineHeightBase200,
    whiteSpace: 'nowrap',
    color: tokens.colorNeutralForeground3,
  },
});
