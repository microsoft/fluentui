import { ISeparatorStyleProps, ISeparatorStyles } from './Separator.types';

export const getStyles = (props: ISeparatorStyleProps): ISeparatorStyles => {
  const { theme } = props;

  return {
    root: [
      {
        position: 'relative',
        padding: '5px',
        display: 'block',
        selectors: {
          ':before': {
            borderTop: `1px solid ${theme!.palette.neutralLight}`,
            content: '""',
            display: 'block',
            position: 'relative',
            top: '12px'
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
    isVertical: [
      {
        textAlign: 'center',
        position: 'relative',
        padding: '5px',
        display: 'block',
        selectors: {
          ':before': {
            borderLeft: `1px solid ${theme!.palette.neutralLight}`,
            content: '""',
            display: 'block',
            position: 'relative'
            // left: '12px'
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
      }
    ]
  };
};
