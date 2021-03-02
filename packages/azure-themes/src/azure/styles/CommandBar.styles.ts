import { ICommandBarStyleProps, ICommandBarStyles } from '@fluentui/react/lib/CommandBar';
import * as StyleConstants from '../Constants';
import { IExtendedSemanticColors } from '../IExtendedSemanticColors';

export const CommandBarStyles = (props: ICommandBarStyleProps): Partial<ICommandBarStyles> => {
  const { theme } = props;
  const { semanticColors } = theme;
  const extendedSemanticColors = semanticColors as IExtendedSemanticColors;

  return {
    root: [
      {
        backgroundColor: semanticColors.bodyBackground,
        height: '36px',
        borderBottomWidth: StyleConstants.borderWidth,
        borderBottomStyle: StyleConstants.borderSolid,
        borderBottomColor: extendedSemanticColors.commandBarBorder,
        padding: 0,
      },
    ],
  };
};
