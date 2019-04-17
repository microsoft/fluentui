import { styled } from '../../Utilities';
import { ICommandBarProps, ICommandBarStyleProps, ICommandBarStyles } from './CommandBar.types';
import { CommandBarBase } from './CommandBar.base';
import { getStyles } from './CommandBar.styles';

// Create a CommandBar variant which uses these default styles and this styled subcomponent.
export const CommandBar: React.StatelessComponent<ICommandBarProps> = styled<ICommandBarProps, ICommandBarStyleProps, ICommandBarStyles>(
  CommandBarBase,
  getStyles,
  undefined,
  {
    scope: 'CommandBar'
  }
);
