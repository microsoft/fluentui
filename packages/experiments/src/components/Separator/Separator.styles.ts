import { ISeparatorStyleProps, ISeparatorStyles } from './Separator.types';

export const getStyles = (props: ISeparatorStyleProps): ISeparatorStyles => {
  const { theme, alignText, vertical } = props;

  return {
    root: [
      {
        position: 'relative'
      },
      alignText && {
        textAlign: alignText
      },
      !alignText && {
        textAlign: 'center'
      },
      vertical && {
        padding: '0 5px',
        height: '200px',
        textAlign: 'center',
        zIndex: 1,
        display: 'table-cell',
        verticalAlign: 'middle',
        selectors: {
          ':after': {
            backgroundColor: theme!.palette.neutralLight,
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
            backgroundColor: theme!.palette.neutralLight,
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
      }
    ],
    text: [
      {
        position: 'relative',
        display: 'inline-block',
        fontSize: '16px',
        padding: '0 20px',
        background: 'white'
      },
      vertical && {
        padding: '20px 0'
      }
    ]
  };
};
