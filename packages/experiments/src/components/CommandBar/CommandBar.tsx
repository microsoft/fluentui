import * as React from 'react';
import { styled } from '../../Utilities';
import {
  ICommandBarProps
} from './CommandBar.types';
import { CommandBarBase } from './CommandBar.base';
import { getStyles } from './CommandBar.styles';

// Create a CommandBar variant which uses these default styles and this styled subcomponent.
export const CommandBar = styled(
  CommandBarBase,
  getStyles
);