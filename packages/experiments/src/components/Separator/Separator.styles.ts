import { ISeparatorStyleProps, ISeparatorStyles } from './Separator.types';

export const getStyles = (props: ISeparatorStyleProps): ISeparatorStyles => {
  return {
    root: [
      {
        textAlign: 'center',
        position: 'relative',
        whiteSpace: 'nowrap',
        // width: '400px',
        padding: '5px',
        selectors: {
          '::before': {
            borderTop: '1px solid black',
            content: '',
            width: '100%',
            display: 'inline-block',
            position: 'relative',
            bottom: '5px'
          },
          '::after': {
            borderTop: '1px solid black',
            content: '',
            width: '100%',
            display: 'inline-block',
            position: 'relative',
            bottom: '5px'
          }
        }
      }
    ],
    text: [
      {
        position: 'relative',
        whiteSpace: 'nowrap',
        fontSize: '20px',
        padding: '0 10px'
      }
    ]
  };
};
