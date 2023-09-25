import { getGlobalClassNames } from '../../Styling';
import type { IDialogFooterStyleProps, IDialogFooterStyles } from './DialogFooter.types';

const GlobalClassNames = {
  actions: 'ms-Dialog-actions',
  action: 'ms-Dialog-action',
  actionsRight: 'ms-Dialog-actionsRight',
};

export const getStyles = (props: IDialogFooterStyleProps): IDialogFooterStyles => {
  const { className, theme } = props;

  const classNames = getGlobalClassNames(GlobalClassNames, theme);

  return {
    actions: [
      classNames.actions,
      {
        position: 'relative',
        width: '100%',
        minHeight: '24px',
        lineHeight: '24px',
        margin: '16px 0 0',
        fontSize: '0',

        selectors: {
          '.ms-Button': {
            lineHeight: 'normal',
            verticalAlign: 'middle',
          },
        },
      },
      className,
    ],

    action: [
      classNames.action,
      {
        margin: '0 4px',
      },
    ],

    actionsRight: [
      classNames.actionsRight,
      {
        alignItems: 'center',
        display: 'flex',
        fontSize: '0',
        justifyContent: 'flex-end',
        marginRight: '-4px',
      },
    ],
  };
};
