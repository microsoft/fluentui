import { IDialogFooterStyleProps, IDialogFooterStyles } from './DialogFooter.types';
import { getGlobalClassNames } from '../../Styling';

const GlobalClassNames = {
  actions: 'ms-Dialog-actions',
  action: 'ms-Dialog-action',
  actionsRight: 'ms-Dialog-actionsRight'
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
            lineHeight: 'normal'
          }
        }
      },
      className
    ],

    action: [
      classNames.action,
      {
        margin: '0 4px'
      }
    ],

    actionsRight: [
      classNames.actionsRight,
      {
        textAlign: 'right',
        marginRight: '-4px',
        fontSize: '0'
      }
    ]
  };
};
