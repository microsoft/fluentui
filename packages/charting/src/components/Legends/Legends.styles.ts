import { ILegendsStyles, ILegendStyleProps } from './Legends.types';

export const getStyles = (props: ILegendStyleProps): ILegendsStyles => {
  return {
    root: {
      whiteSpace: 'nowrap',
      width: '100%',
      alignItems: 'center'
    },
    legend: {
      display: 'flex',
      alignItems: 'center',
      cursor: 'pointer',
      marginTop: props.overflow ? '8px' : '',
      marginLeft: props.overflow ? '8px' : ''
    },
    rect: {
      width: '12px',
      height: '12px',
      backgroundColor: props.colorOnSelectedState,
      marginRight: '8px',
      border: '1px solid',
      borderColor: props.borderColor ? props.borderColor : '#000000'
    },
    text: {
      fontSize: '12px',
      lineHeight: '14px',
      fontFamily: 'Segoe UI',
      marginRight: '16px',
      color: '#000000',
      opacity: props.colorOnSelectedState === '#FFFFFF' ? '0.6' : ''
    },
    hoverChange: {
      width: '12px',
      height: '12px',
      backgroundColor: 'white',
      marginRight: '8px',
      border: '1px solid',
      borderColor: props.borderColor ? props.borderColor : '#000000'
    },
    overflowIndicationTextStyle: {
      cursor: 'pointer',
      color: '#0078D4',
      fontFamily: 'Segoe UI',
      fontSize: '12px',
      lineHeight: '14px'
    }
  };
};
