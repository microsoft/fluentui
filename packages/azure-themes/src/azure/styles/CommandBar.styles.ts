import { ICommandBarStyleProps, ICommandBarStyles } from 'office-ui-fabric-react/lib/CommandBar';
import * as StyleConstants from '../Constants';

export const CommandBarStyles = (props: ICommandBarStyleProps): Partial<ICommandBarStyles> => {
  const { theme } = props;
  const { semanticColors } = theme;

  return {
    root: [
      {
        backgroundColor: semanticColors.bodyBackground,
        borderBottomWidth: StyleConstants.borderWidth,
        borderBottomStyle: StyleConstants.borderSolid,
        borderBottomColor: semanticColors.inputBorder,
      },
    ],
  };
};
