import {
  IExpandingCardStyleProps,
  IExpandingCardStyles,
  IPlainCardStyleProps,
  IPlainCardStyles,
} from '@fluentui/react/lib/HoverCard';
import * as StyleConstants from '../Constants';

export const ExpandingCardStyles = (props: IExpandingCardStyleProps): Partial<IExpandingCardStyles> => {
  const { theme } = props;
  const { semanticColors } = theme;

  return {
    root: {
      selectors: {
        '.ms-Callout-main': {
          borderColor: semanticColors.inputBorder,
          borderStyle: StyleConstants.borderSolid,
          borderWidth: StyleConstants.borderWidth,
        },
      },
    },
  };
};

export const PlainCardStyles = (props: IPlainCardStyleProps): Partial<IPlainCardStyles> => {
  const { theme } = props;
  const { semanticColors } = theme;

  return {
    root: {
      selectors: {
        '.ms-Callout-main': {
          borderColor: semanticColors.inputBorder,
          borderStyle: StyleConstants.borderSolid,
          borderWidth: StyleConstants.borderWidth,
        },
      },
    },
  };
};
