import { ISeparatorStyleProps, ISeparatorStyles } from './Separator.types';

export const getStyles = (props: ISeparatorStyleProps): ISeparatorStyles => {
  const { theme, alignText, vertical } = props;

  return {
    root: [
      alignText && {
        textAlign: alignText
      },
      !alignText && {
        textAlign: 'center'
      },
      vertical && {
        position: 'relative',
        paddingTop: '20%',
        paddingBottom: '20%',
        zIndex: '1',
        textAlign: 'center',
        display: 'block',
        height: '40px',
        selectors: {
          ':before': {
            backgroundColor: theme!.palette.neutralLight,
            width: '1px',
            height: '100%',
            content: '""',
            position: 'absolute',
            top: '0',
            bottom: '0',
            left: '50%',
            right: '0',
            zIndex: '-1'
          }
        }
      },
      !vertical && {
        position: 'relative',
        paddingTop: '5px',
        paddingBottom: '5px',
        display: 'block',
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
    center: [
      {
        textAlign: 'center'
      }
    ],
    start: [
      {
        textAlign: 'start'
      }
    ],
    end: [
      {
        textAlign: 'end'
      }
    ],
    text: [
      vertical && {
        position: 'relative',
        display: 'inline-block',
        fontSize: '16px',
        padding: '20px 0',
        background: 'white'
      },
      !vertical && {
        position: 'relative',
        display: 'inline-block',
        fontSize: '16px',
        padding: '0 20px',
        background: 'white'
      }
    ]
  };
};
