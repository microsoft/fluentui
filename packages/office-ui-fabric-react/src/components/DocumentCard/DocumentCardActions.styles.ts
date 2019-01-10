import { getGlobalClassNames, FontSizes } from '../../Styling';
import { IDocumentCardActionsStyleProps, IDocumentCardActionsStyles } from './DocumentCardActions.types';

const actionSize = 34;
const horizontalPadding = 12;
const verticalPadding = 4;

const GlobalClassNames = {
  root: 'ms-DocumentCardActions',
  action: 'ms-DocumentCardActions-action',
  views: 'ms-DocumentCardActions-views'
};

export const getStyles = (props: IDocumentCardActionsStyleProps): IDocumentCardActionsStyles => {
  const { className, theme } = props;
  const { palette } = theme;

  const classNames = getGlobalClassNames(GlobalClassNames, theme);

  return {
    root: [
      classNames.root,
      {
        height: `${actionSize}px`,
        padding: `${verticalPadding}px ${horizontalPadding}px`,
        position: 'relative'
      },
      className
    ],
    action: [
      classNames.action,
      {
        float: 'left',
        marginRight: '4px',
        color: palette.neutralSecondary,
        cursor: 'pointer',

        selectors: {
          '.ms-Button': {
            fontSize: '16px',
            height: actionSize,
            width: actionSize
          },
          '.ms-Button:hover .ms-Button-icon': {
            color: theme.semanticColors.buttonText,
            cursor: 'pointer'
          }
        }
      }
    ],
    views: [
      classNames.views,
      {
        textAlign: 'right',
        lineHeight: actionSize
      }
    ],
    viewsIcon: {
      marginRight: '8px',
      fontSize: FontSizes.medium,
      verticalAlign: 'top'
    }
  };
};
