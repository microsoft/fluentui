import { ILegendsStyles, ILegendStyleProps } from './Legends.types';

export const getStyles = (props: ILegendStyleProps): ILegendsStyles => {
  const { className, theme } = props;
  const { palette } = theme!;
  return {
    root: [
      {
        whiteSpace: 'nowrap',
        width: '100%',
        alignItems: 'center'
      },
      className
    ],
    legend: {
      display: 'flex',
      alignItems: 'center',
      cursor: 'pointer',
      margin: props.overflow ? '16px 0px 16px 16px' : ''
    },
    rect: {
      width: '12px',
      height: '12px',
      backgroundColor: props.colorOnSelectedState,
      marginRight: '8px',
      border: '1px solid',
      borderColor: props.borderColor ? props.borderColor : palette.black,
      opacity: props.colorOnSelectedState === palette.white ? '0.6' : ''
    },
    text: {
      fontSize: '12px',
      lineHeight: '14px',
      fontFamily: 'Segoe UI',
      marginRight: '16px',
      color: palette.black,
      opacity: props.colorOnSelectedState === palette.white ? '0.6' : ''
    },
    hoverChange: {
      width: '12px',
      height: '12px',
      backgroundColor: 'white',
      marginRight: '8px',
      border: '1px solid',
      borderColor: props.borderColor ? props.borderColor : palette.black
    },
    overflowIndicationTextStyle: {
      cursor: 'pointer',
      color: palette.themePrimary,
      fontFamily: 'Segoe UI',
      fontSize: '12px',
      lineHeight: '14px'
    }
  };
};
