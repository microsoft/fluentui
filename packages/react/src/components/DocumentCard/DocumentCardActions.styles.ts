import { getGlobalClassNames } from '../../Styling';
import type { IDocumentCardActionsStyleProps, IDocumentCardActionsStyles } from './DocumentCardActions.types';

const ACTION_SIZE = 34;
const HORIZONTAL_PADDING = 12;
const VERTICAL_PADDING = 4;

const GlobalClassNames = {
  root: 'ms-DocumentCardActions',
  action: 'ms-DocumentCardActions-action',
  views: 'ms-DocumentCardActions-views',
};

export const getStyles = (props: IDocumentCardActionsStyleProps): IDocumentCardActionsStyles => {
  const { className, theme } = props;
  const { palette, fonts } = theme;

  const classNames = getGlobalClassNames(GlobalClassNames, theme);

  return {
    root: [
      classNames.root,
      {
        height: `${ACTION_SIZE}px`,
        padding: `${VERTICAL_PADDING}px ${HORIZONTAL_PADDING}px`,
        position: 'relative',
      },
      className,
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
            fontSize: fonts.mediumPlus.fontSize,
            height: ACTION_SIZE,
            width: ACTION_SIZE,
          },
          '.ms-Button:hover .ms-Button-icon': {
            color: theme.semanticColors.buttonText,
            cursor: 'pointer',
          },
        },
      },
    ],
    views: [
      classNames.views,
      {
        textAlign: 'right',
        lineHeight: ACTION_SIZE,
      },
    ],
    viewsIcon: {
      marginRight: '8px',
      fontSize: fonts.medium.fontSize,
      verticalAlign: 'top',
    },
  };
};
