import {
  IDialogContentStyleProps,
  IDialogContentStyles,
  IDialogFooterStyleProps,
  IDialogFooterStyles
} from 'office-ui-fabric-react/lib/Dialog';
import { FontWeights } from '@uifabric/styling';
import { FontSizes } from '../FluentType';

export const DialogContentStyles = (props: IDialogContentStyleProps): Partial<IDialogContentStyles> => {
  const { theme } = props;
  const { palette, effects } = theme;

  return {
    title: {
      fontSize: FontSizes.size20,
      fontWeight: FontWeights.semibold,
      padding: '16px 46px 24px 24px',
      lineHeight: 'normal'
    },
    topButton: {
      padding: '14px 14px 0 0',
      selectors: {
        '.ms-Dialog-button': {
          color: palette.neutralSecondary
        },
        '.ms-Dialog-button:hover': {
          color: palette.neutralDark,
          borderRadius: effects.roundedCorner2
        }
      }
    },
    inner: {
      padding: '0 24px 24px 24px'
    },
    subText: {
      fontWeight: FontWeights.regular
    }
  };
};

export const DialogFooterStyles = (props: IDialogFooterStyleProps): Partial<IDialogFooterStyles> => {
  return {
    actions: {
      margin: '16px 0 0'
    }
  };
};
