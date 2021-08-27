import * as React from 'react';
import { styled } from '../../Utilities';
import { CommandBarBase } from './CommandBar.base';
import { getStyles } from './CommandBar.styles';
import type { ICommandBarProps, ICommandBarStyleProps, ICommandBarStyles } from './CommandBar.types';

// Create a CommandBar variant which uses these default styles and this styled subcomponent.
export const CommandBar: React.FunctionComponent<ICommandBarProps> = styled<
  ICommandBarProps,
  ICommandBarStyleProps,
  ICommandBarStyles
>(CommandBarBase, getStyles, undefined, {
  scope: 'CommandBar',
});
