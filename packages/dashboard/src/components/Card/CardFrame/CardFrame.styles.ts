import { ICardFrameStyles, ICardFrameProps } from './CardFrame.types';

const cardTitleBox = 40;

export const getStyles = (props: ICardFrameProps): ICardFrameStyles => {
  const { titleTextColor, fontFamily, fontSize, seperatorColor, href, disableDrag } = props;

  return {
    root: {
      height: '100%',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column'
    },
    cardTitleBox: {
      alignItems: 'center',
      display: 'flex',
      flexDirection: 'row',
      width: '100%',
      height: cardTitleBox,
      borderBottom: '1px solid',
      borderBottomColor: seperatorColor ? seperatorColor : 'rgba(0,0,0,0.1)',
      borderTopLeftRadius: '2px',
      borderTopRightRadius: '2px',
      cursor: disableDrag ? '' : 'move',
      transition: 'background-color .2s,color .2s,margin .2s,padding .2s,border-color .2s',
      selectors: {
        ':hover': {
          backgroundColor: disableDrag ? '' : '#eaeaea'
        }
      }
    },
    cardTitleEllipsisButton: {
      width: 40,
      height: 40
    },
    cardTitle: {
      overflow: 'hidden',
      flex: 1,
      lineHeight: '19px',
      paddingLeft: '16px',
      fontSize: fontSize ? fontSize : '14px',
      fontFamily: fontFamily ? fontFamily : 'Segoe UI',
      fontWeight: 600,
      display: 'inline-block',
      selectors: {
        a: {
          color: titleTextColor ? titleTextColor : 'rgba(0,0,0,1)',
          textDecoration: 'none',
          selectors: href
            ? {
                ':hover': {
                  color: '#0078d4'
                }
              }
            : {}
        }
      }
    },
    ellipsisIcon: {
      paddingTop: 12
    },
    layout: {
      display: 'flex',
      flex: 1,
      padding: '0 16px 16px 16px',
      overflow: 'hidden'
    },
    ellipsisButtonStyle: {
      width: '100%',
      height: '100%'
    }
  };
};
