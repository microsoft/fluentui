import { IDialogContentStyleProps, IDialogContentStyles } from 'office-ui-fabric-react/lib/Dialog';
import { FontWeights } from 'office-ui-fabric-react/lib/Styling';

export const DialogContentStyles = (props: IDialogContentStyleProps): Partial<IDialogContentStyles> => {
  const { theme, isMultiline, isLargeHeader } = props;
  const { palette, fonts } = theme;

  return {
    title: [
      fonts.xLarge,
      {
        padding: '20px 36px 20px 28px'
      },
      isLargeHeader && [
        fonts.xxLarge,
        {
          padding: '26px 28px 28px'
        }
      ]
    ],
    topButton: {
      padding: '12px 12px 0 0',
      selectors: {
        '.ms-Dialog-button': {
          color: palette.neutralSecondary
        },
        '.ms-Dialog-button:hover': {
          color: palette.neutralDark
        }
      }
    },
    inner: {
      padding: isMultiline ? '0 20px 20px' : '0 28px 20px'
    },
    subText: {
      fontWeight: FontWeights.semilight
    }
  };
};

export const DialogFooterStyles = {
  actions: {
    margin: '20px 0 0'
  }
};
