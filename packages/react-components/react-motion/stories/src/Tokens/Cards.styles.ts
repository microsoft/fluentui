'use client';

import { makeStyles, tokens } from '@fluentui/react-components';

export const useClasses = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
  },
  controls: {
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
    gap: '30px 50px',
    placeItems: 'center',
    border: `2px solid ${tokens.colorNeutralStroke1}`,
  },
});

export const useCardClasses = makeStyles({
  container: {
    display: 'grid',
    gridTemplate: `
        "view point"
        "title ." auto / min-content var(--point-size)
    `,
    gap: '10px',

    '--container-size': '250px',
    '--point-size': '20px',
  },
  point: {
    gridArea: 'point',

    width: 'var(--point-size)',
    height: 'var(--point-size)',

    backgroundColor: tokens.colorBrandBackground,
    clipPath: 'polygon(25% 0%, 100% 0%, 100% 100%, 25% 100%, 0% 50%)',

    animationName: {
      '0%': { transform: 'translateY(calc(var(--container-size) - var(--point-size) / 2))' },
      '60%, 100%': { transform: 'translateY(calc(var(--point-size) / 2 * -1))' },
    },
    animationDuration: '2s',
    animationIterationCount: 'infinite',
    animationFillMode: 'forwards',

    '@media (forced-colors: active)': {
      backgroundColor: 'LinkText',
    },
  },

  graph: {
    gridArea: 'view',
    display: 'grid',
    gridTemplate: `
      "graphP svg"
      ".      graphT" / min-content 1fr
    `,
    gap: '6px',

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
  path: {
    fill: 'none',
    stroke: tokens.colorNeutralStrokeAccessible,
    strokeWidth: '2',

    '@media (forced-colors: active)': {
      stroke: 'CanvasText',
    },
  },

  duration: {
    placeSelf: 'center',

    width: '128px',
    height: '4px',
    margin: '64px auto',
    backgroundColor: tokens.colorNeutralForeground3,

    animationName: {
      from: { transform: 'rotate(0)' },
      to: { transform: 'rotate(180deg)' },
    },
    animationIterationCount: 'infinite',

    '@media (forced-colors: active)': {
      backgroundColor: 'CanvasText',
    },
  },

  view: {
    gridArea: 'view',
  },
  title: {
    gridArea: 'title',
    justifySelf: 'center',
    margin: '0 20px',

    display: 'flex',
    flexDirection: 'column',
    gap: '5px',

    fontFamily: tokens.fontFamilyMonospace,
    fontSize: tokens.fontSizeBase400,
    padding: '5px 10px',
    backgroundColor: tokens.colorNeutralBackground3,
    borderRadius: tokens.borderRadiusMedium,
  },
  name: {
    textAlign: 'center',
  },
  value: {
    fontSize: tokens.fontSizeBase200,
    fontStyle: 'italic',
    whiteSpace: 'nowrap',
    textAlign: 'center',
  },
});
