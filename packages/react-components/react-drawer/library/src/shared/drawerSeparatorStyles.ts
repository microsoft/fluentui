import { tokens } from '@fluentui/react-theme';
import { GriffelStyle } from '@griffel/react';

export const drawerSeparatorStyles: GriffelStyle = {
  height: '1px',
  position: 'absolute',
  right: 0,
  left: 0,
  opacity: 0,
  backgroundColor: tokens.colorNeutralStroke1,
  transitionDuration: tokens.durationNormal,
  transitionProperty: 'opacity',
  transitionTimingFunction: tokens.curveEasyEase,
  content: '""',
};
