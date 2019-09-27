import { ILegendsStyles, ILegendStyleProps } from './Legends.types';
import { HighContrastSelector } from 'office-ui-fabric-react/lib/Styling';

export const getStyles = (props: ILegendStyleProps): ILegendsStyles => {
  const { className, theme } = props;
  const { palette, fonts } = theme!;
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
      selectors: {
        [HighContrastSelector]: {
          backgroundColor: props.colorOnSelectedState,
          opacity: props.colorOnSelectedState === palette.white ? '0.6' : ''
        }
      },
      width: '12px',
      height: '12px',
      backgroundColor: props.colorOnSelectedState,
      marginRight: '8px',
      border: '1px solid',
      borderColor: props.borderColor ? props.borderColor : palette.black,
      opacity: props.colorOnSelectedState === palette.white ? '0.6' : ''
    },
    triangle: {
      width: '0',
      height: '0',
      borderLeft: '6px solid transparent',
      borderRight: '6px solid transparent',
      borderTop: '10.4px solid',
      borderTopColor: props.colorOnSelectedState,
      marginRight: '8px'
    },
    text: {
      ...fonts.small,
      lineHeight: '16px',
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
      ...fonts.small,
      lineHeight: '14px'
    }
  };
};
