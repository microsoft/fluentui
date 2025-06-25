import { tokens } from '@fluentui/react-theme';
import { GriffelStyle } from '@griffel/react';
import * as semanticTokens from '@fluentui/semantic-tokens';

export const drawerSeparatorStyles: GriffelStyle = {
  height: '1px',
  position: 'absolute',
  right: 0,
  left: 0,
  opacity: 0,
  backgroundColor: semanticTokens.strokeDividerStrong,
  transitionDuration: tokens.durationNormal,
  transitionProperty: 'opacity',
  transitionTimingFunction: tokens.curveEasyEase,
  content: '""',
};
