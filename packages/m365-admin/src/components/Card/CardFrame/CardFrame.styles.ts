import { ICardFrameStyles, ICardFrameProps } from './CardFrame.types';
import { IButtonStyles } from 'office-ui-fabric-react';

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
    cardTitleBox: {
      height: cardTitleBox,
      overflow: 'hidden',
      borderBottom: '1px solid',
      borderBottomColor: seperatorColor ? seperatorColor : 'rgba(0,0,0,0.1)'
    },
    cardTitleEllipsisButton: {
      width: 40,
      float: 'right',
      height: '100%',
      textAlign: 'center',
      selectors: {
        div: {
          selectors: {
            div: {
              width: '40px',
              selectors: {
                button: {
                  width: '40px',
                  minWidth: '40px',
                  padding: '0px'
                }
              }
            }
          }
        }
      }
    },
    cardTitle: {
      overflow: 'hidden',
      padding: '9px 16px 12px 16px',
      fontSize: fontSize ? fontSize : '14px',
      fontFamily: fontFamily ? fontFamily : 'Segoe UI Semibold',
      color: titleTextColor ? titleTextColor : 'rgba(0,0,0,1)'
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

export const customOverflowStyle: IButtonStyles = {
  root: {
    height: '40px',
    width: '40px',
    backgroundColor: 'inherit'
  },
  rootHovered: {
    backgroundColor: 'rgba(0, 0, 0, 0.1)'
  }
};
