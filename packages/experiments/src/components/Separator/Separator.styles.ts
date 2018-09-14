import { ISeparatorStyleProps, ISeparatorStyles } from './Separator.types';

export const getStyles = (props: ISeparatorStyleProps): ISeparatorStyles => {
  const { theme } = props;

  return {
    root: [
      {
        textAlign: 'center',
        position: 'relative',
        whiteSpace: 'nowrap',
        width: '400px',
        padding: '5px',
        selectors: {
          ':before': {
            borderTop: `1px solid ${theme!.palette.neutralLight}`,
            content: '""',
            width: '100%',
            display: 'inline-block',
            position: 'relative',
            bottom: '5px'
          },
          ':after': {
            borderTop: `1px solid ${theme!.palette.neutralLight}`,
            content: '""',
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
        display: 'inline-block',
        fontSize: '20px',
        padding: '0 20px'
      }
    ]
  };
};
