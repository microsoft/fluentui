import { style } from '@vanilla-extract/css';
import { webLightTheme as theme } from '@fluentui/react-theme';

export const className = style({
  alignItems: 'center',
  display: 'inline-flex',
  justifyContent: 'center',
  verticalAlign: 'middle',

  margin: 0,

  maxWidth: '280px',

  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',

  background: theme.colorNeutralBackground1,
  color: theme.colorNeutralForeground1,

  borderColor: theme.colorNeutralStroke1,
  borderStyle: 'solid',
  borderWidth: theme.strokeWidthThin,

  fontFamily: theme.fontFamilyBase,

  outline: 'none',

  ':hover': {
    background: theme.colorNeutralBackground1Hover,
    borderColor: theme.colorNeutralStroke1Hover,
    color: theme.colorNeutralForeground1,

    cursor: 'pointer',
  },

  ':active': {
    background: theme.colorNeutralBackground1Pressed,
    borderColor: theme.colorNeutralStroke1Pressed,
    color: theme.colorNeutralForeground1,

    outline: 'none',
  },
});
