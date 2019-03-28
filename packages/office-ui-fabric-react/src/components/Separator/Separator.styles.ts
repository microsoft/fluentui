import { ISeparatorStyleProps, ISeparatorStyles } from './Separator.types';

export const getStyles = (props: ISeparatorStyleProps): ISeparatorStyles => {
  const { theme, alignContent, vertical, className } = props;

  const alignStart = alignContent === 'start';
  const alignCenter = alignContent === 'center';
  const alignEnd = alignContent === 'end';

  return {
    root: [
      theme.fonts.medium,
      {
        position: 'relative'
      },
      alignContent && {
        textAlign: alignContent
      },
      !alignContent && {
        textAlign: 'center'
      },
      vertical &&
        (alignCenter || !alignContent) && {
          verticalAlign: 'middle'
        },
      vertical &&
        alignStart && {
          verticalAlign: 'top'
        },
      vertical &&
        alignEnd && {
          verticalAlign: 'bottom'
        },
      vertical && {
        padding: '0 5px',
        height: 'inherit',
        display: 'table-cell',
        zIndex: 1,
        selectors: {
          ':after': {
            backgroundColor: theme.palette.neutralLight,
            width: '1px',
            content: '""',
            position: 'absolute',
            top: '0',
            bottom: '0',
            left: '50%',
            right: '0',
            zIndex: -1
          }
        }
      },
      !vertical && {
        padding: '5px 0',
        selectors: {
          ':before': {
            backgroundColor: theme.palette.neutralLight,
            height: '1px',
            content: '""',
            display: 'block',
            position: 'absolute',
            top: '50%',
            bottom: '0',
            left: '0',
            right: '0'
          }
        }
      },
      className
    ],
    content: [
      {
        position: 'relative',
        display: 'inline-block',
        padding: '0 20px',
        color: theme.semanticColors.bodyText,
        background: theme.semanticColors.bodyBackground
      },
      vertical && {
        padding: '20px 0'
      }
    ]
  };
};
