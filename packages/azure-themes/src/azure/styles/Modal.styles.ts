import { IModalStyles, IModalStyleProps } from '@fluentui/react';
import { Depths } from '../AzureDepths';
import * as StyleConstants from '../Constants';

export const ModalStyles = (props: IModalStyleProps): Partial<IModalStyles> => {
  const { theme } = props;
  const { semanticColors } = theme;

  return {
    root: {
      color: semanticColors.bodyText,
      fontSize: theme.fonts.medium.fontSize,
    },
    main: {
      borderColor: semanticColors.inputBorder,
      borderStyle: StyleConstants.borderSolid,
      borderWidth: StyleConstants.borderWidth,
      boxShadow: Depths.depth8,
    },
  };
};
