'use client';

import { makeStyles, tokens } from '@fluentui/react-components';

export const useClasses = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
  },
  controls: {
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
    backgroundColor: tokens.colorNeutralBackground1,
    borderRadius: tokens.borderRadiusMedium,
    borderTopRightRadius: 0,
    padding: '30px',
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
    // Rows sit much further apart than a title sits from its own plot, so each title reads as part of the plot below it.
    gap: '56px 50px',
    placeItems: 'center',
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
    width: '100%',
    borderCollapse: 'collapse',
    fontFamily: tokens.fontFamilyMonospace,
    fontSize: tokens.fontSizeBase300,

    '& th, & td': {
      padding: `${tokens.spacingVerticalS} ${tokens.spacingHorizontalM}`,
      textAlign: 'left',
      whiteSpace: 'nowrap',
      borderBottom: `${tokens.strokeWidthThin} solid ${tokens.colorNeutralStroke1}`,
    },
    '& tbody th': {
      fontWeight: tokens.fontWeightRegular,
    },
  },
});

export const useCardClasses = makeStyles({
  container: {
    display: 'grid',
    gridTemplate: `
        "title ."
        "view point" auto / min-content var(--point-size)
    `,
    gap: '12px 10px',

    '--container-size': '250px',
    '--point-size': '20px',
    '--axis-label-width': '12px',
    '--axis-label-gap': '6px',
  },
  point: {
    gridArea: 'point',

    width: 'var(--point-size)',
    height: 'var(--point-size)',

    backgroundColor: tokens.colorBrandBackground,
    clipPath: 'polygon(25% 0%, 100% 0%, 100% 100%, 25% 100%, 0% 50%)',

    '@media (forced-colors: active)': {
      backgroundColor: 'LinkText',
    },
  },

  graph: {
    gridArea: 'view',
    display: 'grid',
    gridTemplate: `
      "graphP svg"
      ".      graphT" / var(--axis-label-width) 1fr
    `,
    gap: 'var(--axis-label-gap)',

    '@media (forced-colors: active)': {
      backgroundColor: 'Canvas',
    },
  },
  graphP: {
    gridArea: 'graphP',
    color: tokens.colorNeutralStroke1,
    fontFamily: tokens.fontFamilyMonospace,
  },
  graphT: {
    gridArea: 'graphT',
    justifySelf: 'end',
    color: tokens.colorNeutralStroke1,
    fontFamily: tokens.fontFamilyMonospace,
  },
  svg: {
    gridArea: 'svg',
    borderLeft: `1px solid ${tokens.colorNeutralStroke1}`,
    borderBottom: `1px solid ${tokens.colorNeutralStroke1}`,

    overflow: 'visible',

    height: 'var(--container-size)',
    width: 'var(--container-size)',
  },
  referenceLine: {
    stroke: tokens.colorNeutralForeground1,
    strokeWidth: tokens.strokeWidthThin,
    opacity: 0.2,
    vectorEffect: 'non-scaling-stroke',

    '@media (forced-colors: active)': {
      stroke: 'CanvasText',
      opacity: 1,
    },
  },
  path: {
    fill: 'none',
    stroke: tokens.colorNeutralStrokeAccessible,
    strokeWidth: '2',

    '@media (forced-colors: active)': {
      stroke: 'CanvasText',
    },
  },

  handle: {
    stroke: tokens.colorNeutralStrokeAccessible,
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
    fill: tokens.colorNeutralBackground1,
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
    backgroundColor: tokens.colorNeutralForeground3,

    '@media (forced-colors: active)': {
      backgroundColor: 'CanvasText',
    },
  },

  view: {
    '--duration-track-size': '128px',
    width: 'var(--duration-track-size)',
    height: tokens.spacingVerticalXXL,
  },
  title: {
    gridArea: 'title',
    // Start the text at the plot's vertical axis, past the "p" axis label column.
    paddingLeft: 'calc(var(--axis-label-width) + var(--axis-label-gap))',

    display: 'flex',
    flexDirection: 'column',
    gap: '2px',

    fontFamily: tokens.fontFamilyMonospace,
  },
  name: {
    fontSize: tokens.fontSizeBase400,
    lineHeight: tokens.lineHeightBase400,
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
