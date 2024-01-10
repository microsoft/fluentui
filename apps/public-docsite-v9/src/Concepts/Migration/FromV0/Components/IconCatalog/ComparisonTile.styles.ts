import { makeStyles, shorthands, tokens } from '@fluentui/react-components';

export const useComparisonTileStyles = makeStyles({
  root: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    ...shorthands.padding('5px', '0px'),
    ...shorthands.gap('10px'),
    ...shorthands.border(tokens.strokeWidthThin, 'solid', tokens.colorNeutralStroke1),
    maxHeight: '105px',
    ':hover': {
      backgroundColor: tokens.colorNeutralBackground2Hover,
    },
  },

  badge: {
    position: 'absolute',
    top: '5px',
    right: '10px',
  },

  warning: {
    color: tokens.colorPaletteDarkOrangeBackground3,
  },

  success: {
    color: tokens.colorPaletteGreenBackground3,
  },

  v0: {
    width: '16px',
    height: '16px',
  },

  v9: {
    width: '20px',
    height: '20px',
  },

  tile: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    ...shorthands.gap('2px'),
  },

  buttonReset: {
    resize: 'horizontal',
    boxSizing: 'content-box',
    backgroundColor: 'inherit',
    color: 'inherit',
    fontFamily: 'inherit',
    fontSize: 'inherit',
    lineHeight: 'normal',
    ...shorthands.overflow('visible'),
    ...shorthands.padding(0),
    ...shorthands.borderStyle('none'),
    WebkitAppearance: 'button',
    textAlign: 'unset',
  },
});
