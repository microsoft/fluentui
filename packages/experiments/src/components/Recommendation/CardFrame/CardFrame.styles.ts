import { ICardFrameStyles, ICardFrameProps } from './CardFrame.types';

const cardTitleBox = 40;

export const getStyles = (props: ICardFrameProps): ICardFrameStyles => {
  const { titleTextColor, fontFamily, fontSize, seperatorColor } = props;

  return {
    root: {
      boxShadow: '1px 1px 1px 1px #cdcdcd',
      height: '100%',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column'
    },
    cardTitleBox: [
      {
        height: cardTitleBox,
        overflow: 'hidden'
      }
    ],
    cardTitleEllipsisButton: {
      width: 40,
      float: 'right',
      height: '100%',
      textAlign: 'center'
    },
    cardTitle: {
      overflow: 'hidden',
      padding: '9px 16px 12px 16px',
      fontSize: fontSize ? fontSize : '14px',
      fontFamily: fontFamily ? fontFamily : 'Segoe UI Semibold',
      color: titleTextColor ? titleTextColor : 'rgba(0,0,0,1)'
    },
    seperator: {
      margin: '0px',
      width: '100%',
      color: seperatorColor ? seperatorColor : 'rgba(0,0,0,0.1)'
    },
    ellipsisIcon: {
      paddingTop: 12
    },
    layout: {
      display: 'flex',
      flex: 1,
      padding: '0 16px 16px 16px'
    }
  };
};
