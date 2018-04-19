import { IDialogFooterStyleProps, IDialogFooterStyles } from './DialogFooter.types';
import { globalClassNamesWhenEnabled } from '../../Styling';

export const getStyles = (
  props: IDialogFooterStyleProps
): IDialogFooterStyles => {
  const {
    className,
    theme,
  } = props;

  return ({
    actions: [
      globalClassNamesWhenEnabled(theme, ['ms-Dialog-actions']),
      {
        position: 'relative',
        width: '100%',
        minHeight: '24px',
        lineHeight: '24px',
        margin: '20px 0 0',
        fontSize: '0',

        selectors: {
          '.ms-Button': {
            lineHeight: 'normal',
          }
        }
      },
      className
    ],

    action: [
      globalClassNamesWhenEnabled(theme, ['ms-Dialog-action']),
    ],

    actionsRight: [
      globalClassNamesWhenEnabled(theme, ['ms-Dialog-actionsRight']),
      {
        textAlign: 'right',
        marginRight: '-4px',
        fontSize: '0',

        selectors: {
          '$action': {
            margin: '0 4px',
          }
        }
      }
    ]
  });
};
